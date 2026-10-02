import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './icons';
import { TOOLS } from './data';

/* ── Мини-разметка ответа ────────────────────────────────────────────────────
   В приложении текст ответа рисуется нативно (ChatNativeMarkdown.swift, Down):
   абзацы, **жирный**, заголовки и списки. Здесь — то же подмножество без
   зависимостей. Каждое слово — отдельный span, чтобы «печать» шла без
   перекладки (как перекраска диапазонов в UITextView). */

function parseInline(text) {
  const parts = text.split('**');
  return parts.map((t, i) => ({ text: t, bold: i % 2 === 1 })).filter((p) => p.text);
}

function parseMarkdown(md) {
  const out = [];
  md.trim()
    .split(/\n\s*\n/)
    .forEach((chunk) => {
      let para = [];
      const flush = () => {
        if (para.length) out.push({ type: 'p', inline: parseInline(para.join(' ')) });
        para = [];
      };
      chunk.split('\n').forEach((line) => {
        if (line.startsWith('### ')) {
          flush();
          out.push({ type: 'h3', inline: parseInline(line.slice(4)) });
        } else if (line.startsWith('- ')) {
          flush();
          const last = out[out.length - 1];
          const item = parseInline(line.slice(2));
          if (last?.type === 'ul' && last.open) last.items.push(item);
          else out.push({ type: 'ul', items: [item], open: true });
        } else {
          para.push(line);
        }
      });
      flush();
      const last = out[out.length - 1];
      if (last?.type === 'ul') last.open = false;
    });
  return out;
}

/** Нумерует слова, чтобы каждой досталась своя задержка проявления. */
function renderInline(inline, counter, animate) {
  return inline.map((part, pi) => {
    const words = part.text.split(/(\s+)/);
    const nodes = words.map((w, wi) => {
      if (!w) return null;
      if (/^\s+$/.test(w)) return <Fragment key={wi}>{w}</Fragment>;
      const i = counter.n++;
      return animate ? (
        <span key={wi} className="cd-tw" style={{ '--i': i }}>
          {w}
        </span>
      ) : (
        <Fragment key={wi}>{w}</Fragment>
      );
    });
    return part.bold ? <strong key={pi}>{nodes}</strong> : <Fragment key={pi}>{nodes}</Fragment>;
  });
}

function countWords(md) {
  return md.replace(/\*\*|###|^- /gm, '').split(/\s+/).filter(Boolean).length;
}

/* Печать занимает ~2.6 с независимо от длины (ChatTypingSpeed.targetDuration). */
const TYPE_DURATION = 2600;

export function AnswerText({ markdown, animate, onFinished }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);
  const total = useMemo(() => countWords(markdown), [markdown]);
  const step = TYPE_DURATION / Math.max(total, 1);
  const finished = useRef(onFinished);
  finished.current = onFinished;

  useEffect(() => {
    if (!animate) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => finished.current?.(), reduce ? 0 : TYPE_DURATION + 120);
    return () => clearTimeout(t);
  }, [animate]);

  const counter = { n: 0 };
  return (
    <div className="cd-md" style={{ '--tw-step': `${step}ms` }}>
      {blocks.map((b, bi) => {
        if (b.type === 'h3') return <h3 key={bi}>{renderInline(b.inline, counter, animate)}</h3>;
        if (b.type === 'ul') {
          return (
            <ul key={bi}>
              {b.items.map((it, ii) => (
                <li key={ii}>
                  <span className="cd-md-bullet" aria-hidden="true">
                    •
                  </span>
                  {renderInline(it, counter, animate)}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={bi}>{renderInline(b.inline, counter, animate)}</p>;
      })}
    </div>
  );
}

/* ── Структурные блоки (ChatWebAssets/chat.css, single-message-mode) ──────── */

function TableBlock({ head, rows }) {
  return (
    <div className="cd-table-wrap">
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, ci) => (
                <td key={ci}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Пирог — та же разметка, что выдаёт Mermaid `pie showData` в ChatWebAssets
   с темой setChatTheme(dark): viewBox ≈623×450, центр (225,225), радиус 185,
   сектора pie1..pie4 с opacity 0.7 и чёрной обводкой 2px, подписи процентов на
   0.75 радиуса, легенда справа с шагом 22. Mermaid (3+ МБ) ради одной
   картинки не грузим — рисуем те же примитивы сами. */
const PIE_COLORS = ['#d42d78', '#ff7ab8', '#e86baf', '#ffffff'];

function PieBlock({ title, slices }) {
  const total = slices.reduce((s, [, v]) => s + v, 0);
  const r = 185;
  let angle = 0; // Mermaid начинает с 12 часов и идёт по часовой
  const pt = (a, rad) => [rad * Math.sin(a), -rad * Math.cos(a)].map((n) => +n.toFixed(3));
  const arcs = slices.map(([label, value], i) => {
    const a0 = angle;
    const a1 = angle + (value / total) * Math.PI * 2;
    angle = a1;
    const [x0, y0] = pt(a0, r);
    const [x1, y1] = pt(a1, r);
    const [tx, ty] = pt((a0 + a1) / 2, r * 0.75);
    return {
      label,
      value,
      color: PIE_COLORS[i % PIE_COLORS.length],
      d: `M${x0},${y0}A${r},${r},0,${a1 - a0 > Math.PI ? 1 : 0},1,${x1},${y1}L0,0Z`,
      tx,
      ty,
      pct: `${((value / total) * 100).toFixed(0)}%`,
    };
  });
  const legendTop = -(slices.length * 22) / 2;

  return (
    <div className="cd-table-wrap cd-pie">
      <svg viewBox="0 0 622.625 450" role="img" aria-label={title}>
        <g transform="translate(225,225)">
          <circle r="186" fill="none" stroke="#000" strokeWidth="2" />
          {arcs.map((a) => (
            <path key={a.label} d={a.d} fill={a.color} stroke="#000" strokeWidth="2" opacity="0.7" />
          ))}
          {arcs.map((a) => (
            <text key={a.label} transform={`translate(${a.tx},${a.ty})`} textAnchor="middle" className="cd-pie-txt">
              {a.pct}
            </text>
          ))}
          <text y="-200" x="0" textAnchor="middle" className="cd-pie-title">
            {title}
          </text>
          {arcs.map((a, i) => (
            <g key={a.label} transform={`translate(216,${legendTop + i * 22})`}>
              <rect width="18" height="18" fill={a.color} stroke={a.color} />
              <text x="22" y="14" className="cd-pie-txt">
                {a.label} [{a.value}]
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export function AnswerBlocks({ blocks }) {
  return (
    <div className="cd-blocks">
      {blocks.map((b, i) =>
        b.type === 'pie' ? <PieBlock key={i} {...b} /> : <TableBlock key={i} {...b} />,
      )}
    </div>
  );
}

/* ── «⚡ workouts, health data» над ответом (ChatToolTraceRow) ─────────────── */

export function ToolTrace({ tools }) {
  const [open, setOpen] = useState(false);
  if (!tools?.length) return null;
  const summary = `⚡ ${tools.map((t) => TOOLS[t].title).join(', ')}`;
  return (
    <div className="cd-trace">
      <button type="button" className="cd-trace-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{summary}</span>
        <Icon name="chevronDown" className={`cd-trace-chev ${open ? 'is-open' : ''}`} />
      </button>
      {open && (
        <div className="cd-trace-list">
          {tools.map((t) => (
            <div key={t} className="cd-trace-item">
              <Icon name={TOOLS[t].icon} />
              <span>{TOOLS[t].label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Живой статус-бабл агента (ChatLiveStatusBubble) ───────────────────────── */

export function LiveStatus({ tool, fallback }) {
  const target = (tool ? TOOLS[tool].label : fallback || '').replace(/\.\.\.$/, '');
  const icon = tool ? TOOLS[tool].icon : null;
  const [shown, setShown] = useState(target);
  const [visible, setVisible] = useState(0);
  const [fading, setFading] = useState(false);

  // Старый статус уходит fade+blur, новый печатается с нуля (statusTick = 25 мс).
  useEffect(() => {
    if (target === shown) return undefined;
    setFading(true);
    const t = setTimeout(() => {
      setShown(target);
      setVisible(0);
      setFading(false);
    }, 170);
    return () => clearTimeout(t);
  }, [target, shown]);

  useEffect(() => {
    if (!shown) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(shown.length);
      return undefined;
    }
    const id = setInterval(() => {
      setVisible((v) => {
        if (v >= shown.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 25);
    return () => clearInterval(id);
  }, [shown]);

  return (
    <div className={`cd-live ${shown ? 'is-wide' : ''}`} role="status" aria-label={target || 'Thinking'}>
      {icon && <Icon name={icon} className="cd-live-icon" key={icon} />}
      {shown && (
        <span className={`cd-live-text ${fading ? 'is-fading' : ''}`}>{shown.slice(0, visible)}</span>
      )}
      <span className="cd-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
