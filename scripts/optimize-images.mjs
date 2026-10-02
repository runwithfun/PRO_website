// Пережимает картинки сайта из media/ в AVIF и WebP нужных размеров.
//
// Исходники (PNG по 4–6 МБ) лежат в media/ и на сайт не публикуются. На выходе:
//   public/img/<путь>-<ширина>.avif|webp  — набор ширин для srcset
//   src/generated/images.json             — размеры, цвет-плейсхолдер и
//                                            крошечное превью для <Picture>
// Обе папки генерируются (в .gitignore), запускается перед dev и build.
// Уже готовые файлы новее исходника не пересчитываются.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'media');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'generated', 'images.json');

// Ширины для srcset; больше исходника не увеличиваем.
const WIDTHS = [240, 480, 720, 960, 1440, 1920];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.(png|jpe?g)$/i.test(e.name) ? [p] : [];
  });
}

const fresh = (out, src) => fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

const manifest = {};
for (const file of walk(SRC)) {
  const key = path.relative(SRC, file).split(path.sep).join('/');
  const stem = key.replace(/\.(png|jpe?g)$/i, '');
  const img = sharp(file);
  const { width, height, hasAlpha } = await img.metadata();

  const widths = WIDTHS.filter((w) => w < width);
  if (!widths.length || width - widths.at(-1) > 120) widths.push(width);

  fs.mkdirSync(path.dirname(path.join(OUT, stem)), { recursive: true });
  for (const w of widths) {
    const base = path.join(OUT, `${stem}-${w}`);
    if (!fresh(`${base}.avif`, file)) {
      await sharp(file).resize({ width: w }).avif({ quality: 55, effort: 4 }).toFile(`${base}.avif`);
    }
    if (!fresh(`${base}.webp`, file)) {
      await sharp(file).resize({ width: w }).webp({ quality: 80, alphaQuality: 90 }).toFile(`${base}.webp`);
    }
  }

  // Плейсхолдер для непрозрачных картинок: средний цвет + превью 24px в blur.
  let placeholder = null;
  if (!hasAlpha) {
    const { dominant } = await img.stats();
    const tiny = await sharp(file).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
    placeholder = {
      color: `rgb(${dominant.r},${dominant.g},${dominant.b})`,
      blur: `data:image/webp;base64,${tiny.toString('base64')}`,
    };
  }

  manifest[key] = { base: `/img/${stem}`, width, height, widths, placeholder };
}
console.log(`images: ${Object.keys(manifest).length} картинок в public/img`);

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
