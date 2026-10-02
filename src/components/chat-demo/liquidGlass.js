import { useEffect, useState } from 'react';

/*
 * Liquid Glass (iOS 26) для пилюли модели — своя реализация без зависимостей.
 *
 * Как в разборе kube.io «Liquid Glass in the Browser» и проектах вроде
 * rizroze/liquid-glass: под форму капсулы считается карта смещений (R = dx,
 * G = dy, 128 = ноль) по профилю «выпуклый сквиркл» и закону Снелла (n = 1.5),
 * и фон под пилюлей прогоняется через SVG-фильтр feDisplacementMap —
 * у краёв картинка изгибается, как в линзе. Три прохода с чуть разным scale для
 * R/G/B дают лёгкую хроматическую аберрацию. Блик (specular) — отдельная
 * картинка, тоже по нормалям капсулы: тонкий яркий ободок со стороны света
 * и слабый отражённый с противоположной.
 *
 * backdrop-filter: url(#…) понимает только Chromium, поэтому рефракция
 * включается только там. Safari и Firefox получают blur + saturate + тот же
 * блик (он обычная картинка). Всё считается после монтирования: при SSR и
 * гидрации разметка одинаковая, id фильтра постоянный.
 */

export const LENS_FILTER_ID = 'cd-pill-lens';

const N_GLASS = 1.5;
const SAMPLES = 128;

/** Профиль смещения вдоль ширины кромки: 0 у кромки … 1 к центру. */
const LENS_PROFILE = (() => {
  const out = new Float32Array(SAMPLES);
  let max = 0;
  for (let i = 0; i < SAMPLES; i++) {
    const t = (i + 0.5) / SAMPLES; // 0 — край, 1 — конец пояса линзы
    const u = 1 - t;
    // Выпуклый сквиркл y = (1 - (1-t)^4)^(1/4) и его наклон.
    const base = Math.max(1e-6, 1 - u ** 4);
    const height = base ** 0.25;
    const slope = u ** 3 * base ** -0.75;
    const theta1 = Math.atan(slope); // угол падения к нормали поверхности
    const theta2 = Math.asin(Math.sin(theta1) / N_GLASS);
    const d = height * Math.tan(theta1 - theta2);
    out[i] = d;
    if (d > max) max = d;
  }
  for (let i = 0; i < SAMPLES; i++) out[i] /= max || 1;
  return out;
})();

function capsuleGeometry(x, y, w, h) {
  const r = h / 2;
  const cx = Math.min(Math.max(x, r), w - r);
  const vx = x - cx;
  const vy = y - r;
  const len = Math.hypot(vx, vy) || 1e-6;
  return { edge: r - len, nx: vx / len, ny: vy / len, r };
}

/** Карта смещений под размер пилюли (CSS-пиксели). */
function displacementMap(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const band = h * 0.46; // ширина «линзы» у кромки
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const { edge, nx, ny } = capsuleGeometry(x + 0.5, y + 0.5, w, h);
      let mag = 0;
      if (edge > 0 && edge < band) {
        mag = LENS_PROFILE[Math.min(SAMPLES - 1, Math.floor((edge / band) * SAMPLES))];
      }
      // Смещение внутрь: у кромки виден фон ближе к центру — как в выпуклом стекле.
      const i = (y * w + x) * 4;
      img.data[i] = 128 - nx * mag * 127;
      img.data[i + 1] = 128 - ny * mag * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/** Блик по форме: ободок, яркий со стороны света (сверху-слева) и слабее напротив. */
function specularMap(w, h, scale) {
  const W = Math.round(w * scale);
  const H = Math.round(h * scale);
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W, H);
  const lx = -0.55;
  const ly = -0.83;
  const rim = 1.1 * scale; // толщина яркой кромки, px
  const glow = h * 0.32 * scale; // мягкое внутреннее свечение
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const { edge, nx, ny } = capsuleGeometry(x + 0.5, y + 0.5, W, H);
      if (edge <= 0) continue;
      const facing = Math.max(0, nx * lx + ny * ly);
      const back = Math.max(0, -(nx * lx + ny * ly));
      const light = 0.18 + 0.82 * facing ** 1.6 + 0.45 * back ** 2.2;
      const aa = Math.min(1, edge); // сглаживание по краю
      const thin = Math.exp(-((edge / rim) ** 2)) * light;
      const soft = Math.exp(-edge / glow) * 0.16 * (0.4 + facing);
      // Верхний «глянец» — едва заметная засветка верхней половины.
      const gloss = y < H * 0.5 ? 0.05 * (1 - y / (H * 0.5)) ** 2 : 0;
      const a = Math.min(1, (thin * 0.95 + soft + gloss) * aa);
      const i = (y * W + x) * 4;
      img.data[i] = 255;
      img.data[i + 1] = 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = Math.round(a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function supportsSvgBackdrop() {
  // Только Chromium применяет SVG-фильтр в backdrop-filter.
  const brands = navigator.userAgentData?.brands;
  return Array.isArray(brands) && brands.some((b) => /Chromium/i.test(b.brand));
}

/**
 * Следит за размером пилюли и пересчитывает карты. Возвращает
 * { size, lensUrl, specUrl, lens } — до монтирования всё пусто.
 */
export function useLiquidGlass(ref) {
  const [state, setState] = useState({ w: 0, h: 0, lensUrl: '', specUrl: '', lens: false });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches;
    const lens = !reduce && supportsSvgBackdrop();
    let raf = 0;
    let last = '';
    const build = () => {
      raf = 0;
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w < 8 || h < 8) return;
      const key = `${w}x${h}`;
      if (key === last) return;
      last = key;
      const scale = Math.min(3, window.devicePixelRatio || 1);
      setState({
        w,
        h,
        lens,
        lensUrl: lens ? displacementMap(w, h) : '',
        specUrl: reduce ? '' : specularMap(w, h, scale),
      });
    };
    const ro = new ResizeObserver(() => {
      if (!raf) raf = requestAnimationFrame(build);
    });
    ro.observe(el);
    build();
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return state;
}

