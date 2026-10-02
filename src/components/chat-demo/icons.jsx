// Векторные аналоги SF Symbols, которые использует экран чата приложения.
// Рисуются в currentColor; размер задаётся снаружи через CSS (width/height).

const S = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

const ICONS = {
  // xmark
  close: <path {...S} strokeWidth="1.9" d="M4.6 4.6l10.8 10.8M15.4 4.6L4.6 15.4" />,
  // line.3.horizontal
  menu: <path {...S} strokeWidth="1.8" d="M2.6 4.8h14.8M2.6 10h14.8M2.6 15.2h14.8" />,
  // chevron.down
  chevronDown: <path {...S} strokeWidth="2.3" d="M4.2 7.2L10 13l5.8-5.8" />,
  // checkmark
  checkmark: <path {...S} strokeWidth="2.2" d="M4.2 10.6l3.8 3.8 7.8-8.8" />,
  // chevron.right
  chevronRight: <path {...S} strokeWidth="2.3" d="M7.2 4.2L13 10l-5.8 5.8" />,
  // plus
  plus: <path {...S} strokeWidth="2.2" d="M10 3.2v13.6M3.2 10h13.6" />,
  // arrow.up
  arrowUp: <path {...S} strokeWidth="2.3" d="M10 16.6V3.8M4.4 9.2L10 3.6l5.6 5.6" />,
  // bolt.fill
  bolt: <path fill="currentColor" d="M11.6 1.2L3.4 11.2c-.3.4 0 .9.5.9h5.2l-1.6 6.4c-.1.5.5.8.8.4l8.2-10c.3-.4 0-.9-.5-.9H10.8l1.6-6.4c.1-.5-.5-.8-.8-.4z" />,
  // sparkles
  sparkles: (
    <g fill="currentColor">
      <path d="M8 3.6c.5 3.6 2 5.3 5.8 5.9-3.8.6-5.3 2.3-5.8 5.9-.5-3.6-2-5.3-5.8-5.9C6 8.9 7.5 7.2 8 3.6z" />
      <path d="M15.2 1.4c.25 1.7 1 2.5 2.7 2.75-1.7.25-2.45 1.05-2.7 2.75-.25-1.7-1-2.5-2.7-2.75 1.7-.25 2.45-1.05 2.7-2.75z" />
      <path d="M15 12.6c.2 1.35.8 2 2.15 2.2-1.35.2-1.95.85-2.15 2.2-.2-1.35-.8-2-2.15-2.2 1.35-.2 1.95-.85 2.15-2.2z" />
    </g>
  ),
  // star.fill
  star: <path fill="currentColor" d="M10 1.8l2.4 5.2 5.7.6-4.3 3.8 1.2 5.6L10 14.2 5 17l1.2-5.6L1.9 7.6l5.7-.6z" />,
  // diamond.fill
  diamond: <path fill="currentColor" d="M10 1.6l7.6 8.4-7.6 8.4L2.4 10z" />,
  // chart.line.uptrend.xyaxis
  chart: (
    <g {...S} strokeWidth="1.8">
      <path d="M2.6 2.6v14.8h14.8" />
      <path d="M5.6 13.2l3.6-4.2 3 2.6 4.6-5.8" />
      <path d="M13.6 5.6h3.4V9" />
    </g>
  ),
  // figure.run
  run: (
    <g>
      <circle cx="12.9" cy="3" r="1.9" fill="currentColor" />
      <path
        {...S}
        strokeWidth="2.3"
        d="M10.6 6.6L8.2 11.2l3.2 2.6-.8 4.6M8.2 11.2l-1.6 3.4-3.8.6M10.6 6.6l-3.6 1-1.6 2.6M10.6 6.6l2.2 3.2 3.4.6"
      />
    </g>
  ),
  // figure.walk
  walk: (
    <g>
      <circle cx="10.6" cy="2.9" r="1.9" fill="currentColor" />
      <path {...S} strokeWidth="2.2" d="M9.8 6.6l-1 5.4 2.6 2.6.6 3.8M8.8 12l-1.8 5.8M9.8 6.6l-3 2.6-.4 2.8M9.8 6.6l1.8 3 2.6 1" />
    </g>
  ),
  // heart.fill
  heart: (
    <path
      fill="currentColor"
      d="M10 17.6c-.3 0-.6-.1-.9-.3C4.6 14.2 1.8 11.2 1.8 7.4 1.8 4.7 3.8 2.6 6.4 2.6c1.5 0 2.8.8 3.6 2 .8-1.2 2.1-2 3.6-2 2.6 0 4.6 2.1 4.6 4.8 0 3.8-2.8 6.8-7.3 9.9-.3.2-.6.3-.9.3z"
    />
  ),
  // target
  target: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="10" cy="10" r="7.8" />
      <circle cx="10" cy="10" r="4.6" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </g>
  ),
  // info.circle.fill
  info: (
    <g>
      <circle cx="10" cy="10" r="8.6" fill="currentColor" />
      <circle cx="10" cy="6.1" r="1.3" fill="#000" />
      <path d="M8.3 8.7h2.6v5.6h1.2v1.4H8v-1.4h1.3v-4.2h-1z" fill="#000" />
    </g>
  ),
  // checkmark.circle.fill
  check: (
    <g>
      <circle cx="10" cy="10" r="9.2" fill="currentColor" />
      <path d="M6 10.3l2.7 2.7L14.2 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  // lock.fill
  lock: (
    <g>
      <path {...S} strokeWidth="1.9" d="M6.4 8.8V6.4a3.6 3.6 0 017.2 0v2.4" />
      <rect x="3.8" y="8.6" width="12.4" height="9" rx="2.2" fill="currentColor" />
    </g>
  ),
  // key.fill
  key: (
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 1.4a5 5 0 00-1.6 9.74V17c0 .2.08.4.22.55l.85.85c.3.3.77.3 1.06 0l1.6-1.6a.5.5 0 000-.7l-.9-.9.9-.9a.5.5 0 000-.7l-.9-.9.62-.62c.14-.14.22-.33.22-.53v-1.5A5 5 0 0010 1.4zm0 2.2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
    />
  ),
  // square.and.pencil
  compose: (
    <g {...S} strokeWidth="1.7">
      <path d="M9 3.4H5a2 2 0 00-2 2v9.6a2 2 0 002 2h9.6a2 2 0 002-2V11" />
      <path d="M15.2 2.6l2.2 2.2-7.6 7.6-3 .8.8-3z" />
    </g>
  ),
  // calendar
  calendar: (
    <g>
      <rect x="2.6" y="3.6" width="14.8" height="13.6" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.6 7.6h14.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.6 1.8v3.2M13.4 1.8v3.2" {...S} strokeWidth="1.7" />
      <g fill="currentColor">
        <circle cx="6.6" cy="10.8" r="1" /><circle cx="10" cy="10.8" r="1" /><circle cx="13.4" cy="10.8" r="1" />
        <circle cx="6.6" cy="14" r="1" /><circle cx="10" cy="14" r="1" />
      </g>
    </g>
  ),
  // gauge.with.dots.needle.67percent
  gauge: (
    <g>
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 10.6l3.6-3.8" {...S} strokeWidth="2" />
      <g fill="currentColor">
        <circle cx="10" cy="10.6" r="1.6" /><circle cx="5.6" cy="12.6" r=".9" /><circle cx="5.4" cy="8.2" r=".9" />
        <circle cx="8" cy="5.2" r=".9" /><circle cx="12" cy="5.2" r=".9" />
      </g>
    </g>
  ),
  // bed.double.fill
  bed: (
    <g fill="currentColor">
      <path d="M3.6 4.4c0-.9.7-1.6 1.6-1.6h9.6c.9 0 1.6.7 1.6 1.6v4H3.6z" opacity=".55" />
      <rect x="1.6" y="8.6" width="16.8" height="5.4" rx="1.6" />
      <rect x="2.4" y="13.4" width="1.8" height="3.4" rx=".8" />
      <rect x="15.8" y="13.4" width="1.8" height="3.4" rx=".8" />
    </g>
  ),
  // bolt.heart.fill
  boltHeart: (
    <g>
      <path fill="currentColor" d="M10 17.6c-.3 0-.6-.1-.9-.3C4.6 14.2 1.8 11.2 1.8 7.4 1.8 4.7 3.8 2.6 6.4 2.6c1.5 0 2.8.8 3.6 2 .8-1.2 2.1-2 3.6-2 2.6 0 4.6 2.1 4.6 4.8 0 3.8-2.8 6.8-7.3 9.9-.3.2-.6.3-.9.3z" />
      <path fill="#1c1c1e" d="M10.9 5.2L7.2 10h2.4l-.8 4.2 4-5.2h-2.4z" />
    </g>
  ),
  // flag.checkered
  flag: (
    <g>
      <path d="M4 18V2.6" {...S} strokeWidth="1.8" />
      <path d="M4 3.2h12.6v8.4H4z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path fill="currentColor" d="M4 3.2h3.2v2.8H4zM10.3 3.2h3.2v2.8h-3.2zM7.2 6h3.1v2.8H7.2zM13.5 6h3.1v2.8h-3.1zM4 8.8h3.2v2.8H4zM10.3 8.8h3.2v2.8h-3.2z" />
    </g>
  ),
  // bandage.fill
  bandage: (
    <g transform="rotate(-45 10 10)">
      <rect x="1.4" y="6.4" width="17.2" height="7.2" rx="3.6" fill="currentColor" />
      <g fill="#1c1c1e"><circle cx="8.6" cy="8.8" r=".7" /><circle cx="11.4" cy="8.8" r=".7" /><circle cx="8.6" cy="11.2" r=".7" /><circle cx="11.4" cy="11.2" r=".7" /></g>
    </g>
  ),
  // fork.knife
  fork: (
    <g {...S} strokeWidth="1.7">
      <path d="M5 2.4v4.6a2 2 0 004 0V2.4M7 2.4V18" />
      <path d="M14.4 18V2.4c-1.8.6-2.8 2.6-2.8 5.4v3.4h2.8" />
    </g>
  ),
  // takeoutbag.and.cup.and.straw.fill
  bag: (
    <g fill="currentColor">
      <path d="M2.8 7.4h9.6l-1 10.2H3.8z" />
      <path d="M5.4 7.4V5.6a2.2 2.2 0 014.4 0v1.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.2 9.4h4.2l-.8 8.2h-2.6z" opacity=".8" />
      <path d="M15.6 9.4l1.2-6.4h1.4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  ),
  // brain
  brain: (
    <g {...S} strokeWidth="1.5">
      <path d="M10 3.4v13.4M10 3.6a2.6 2.6 0 00-4.8.6 2.6 2.6 0 00-2 3.6 2.8 2.8 0 00.6 4.6 2.6 2.6 0 003.6 3.2A2.4 2.4 0 0010 16.6" />
      <path d="M10 3.6a2.6 2.6 0 014.8.6 2.6 2.6 0 012 3.6 2.8 2.8 0 01-.6 4.6 2.6 2.6 0 01-3.6 3.2A2.4 2.4 0 0110 16.6" />
    </g>
  ),
};

export default function Icon({ name, className = '' }) {
  const glyph = ICONS[name];
  if (!glyph) return null;
  return (
    <svg className={`cd-icon ${className}`} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      {glyph}
    </svg>
  );
}

/* ── Статус-бар iPhone ──────────────────────────────────────────────────────── */

export function StatusBar() {
  return (
    <div className="cd-status" aria-hidden="true">
      <span className="cd-status-time">9:41</span>
      <span className="cd-island" />
      <span className="cd-status-right">
        {/* cellular */}
        <svg viewBox="0 0 19 12" className="cd-sb-cell">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="1" fill="currentColor" />
          <rect x="5.1" y="5.2" width="3.2" height="6.8" rx="1" fill="currentColor" />
          <rect x="10.2" y="2.7" width="3.2" height="9.3" rx="1" fill="currentColor" />
          <rect x="15.3" y="0" width="3.2" height="12" rx="1" fill="currentColor" />
        </svg>
        {/* wifi */}
        <svg viewBox="0 0 17 12" className="cd-sb-wifi">
          <path
            fill="currentColor"
            d="M8.5 2.4c2.4 0 4.6.9 6.3 2.5.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4C14.3 1.3 11.5.1 8.5.1S2.7 1.3.6 3.3c-.1.1-.1.3 0 .4l1.2 1.2c.1.1.3.1.4 0C3.9 3.3 6.1 2.4 8.5 2.4zm0 3.9c1.3 0 2.6.5 3.6 1.4.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4-1.4-1.3-3.2-2-5.2-2s-3.8.7-5.2 2c-.1.1-.1.3 0 .4l1.2 1.2c.1.1.3.1.4 0 1-.9 2.3-1.4 3.6-1.4zm2.3 2.7c.1-.1.1-.3 0-.4-.6-.6-1.4-.9-2.3-.9s-1.7.3-2.3.9c-.1.1-.1.3 0 .4l2.1 2.1c.1.1.3.1.4 0z"
          />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 28 13" className="cd-sb-batt">
          <rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity=".4" />
          <rect x="2" y="2" width="21" height="9" rx="2.4" fill="currentColor" />
          <path d="M26 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1s-.6-1.8-1.4-2.1z" fill="currentColor" fillOpacity=".45" />
        </svg>
      </span>
    </div>
  );
}

/* ── Логотипы моделей / провайдеров (ассеты ai_* из приложения) ───────────── */

const MONO = new Set(['openai', 'qwen', 'moonshot', 'openrouter']);

export function BrandLogo({ brand, className = '' }) {
  const src = `${import.meta.env.BASE_URL}chat-logos/${brand}.svg`;
  if (MONO.has(brand)) {
    // Монохромный ассет: тонируем в цвет текста через маску (как template-рендеринг в iOS).
    return (
      <span
        className={`cd-logo cd-logo-mono ${className}`}
        style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
        aria-hidden="true"
      />
    );
  }
  return <img className={`cd-logo ${className}`} src={src} alt="" aria-hidden="true" draggable={false} />;
}
