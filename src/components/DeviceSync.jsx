// Building blocks of the Apple Health sync pages: method badge, sync marks and
// illustrated phone mock-ups of each step. The mock-ups are drawn in CSS from the
// menu path in the guide data — no vendor screenshots or logos.
import { METHOD_LABEL, METHOD_HINT } from '../content/appleHealthSync';

export function MethodBadge({ method }) {
  return <span className={`dg-badge is-${method}`} title={METHOD_HINT[method]}>{METHOD_LABEL[method]}</span>;
}

const MARK = {
  true: ['✓', 'Syncs', 'is-yes'],
  partial: ['◐', 'Partly', 'is-part'],
  false: ['✕', 'Doesn’t sync', 'is-no'],
};

// ok: true | false | "partial"; undefined means the guide doesn't cover the type.
export function SyncMark({ ok, label = true }) {
  if (ok === undefined) return <span className="dg-mark is-none"><span aria-hidden="true">–</span><span className="sr-only">Not listed</span></span>;
  const [icon, text, cls] = MARK[String(ok)];
  return <span className={`dg-mark ${cls}`}><span className="dg-mark-icon" aria-hidden="true">{icon}</span>{label ? <span>{text}</span> : <span className="sr-only">{text}</span>}</span>;
}

export function MenuPath({ items, label = 'Menu path' }) {
  return <ol className="dg-path" aria-label={label}>
    {items.map((item, i) => <li key={`${item}-${i}`} className={i === items.length - 1 ? 'is-target' : undefined}>{item}</li>)}
  </ol>;
}

function Phone({ app, title, children }) {
  return <div className="dg-phone" aria-hidden="true">
    <div className="dg-phone-screen">
      <div className="dg-phone-notch" />
      <div className="dg-phone-bar"><span>{app}</span></div>
      {title && <p className="dg-phone-title">{title}</p>}
      {children}
    </div>
  </div>;
}

const Filler = ({ n }) => Array.from({ length: n }, (_, i) => <span key={i} className="dg-row is-filler"><i /></span>);
const Tap = () => <span className="dg-tap" />;

function InstallScreen({ app }) {
  return <>
    <div className="dg-store-row">
      <span className="dg-store-icon">{app.charAt(0)}</span>
      <span className="dg-store-name"><b>{app}</b><i /></span>
      <span className="dg-store-get">Get<Tap /></span>
    </div>
    <Filler n={3} />
  </>;
}

function PermissionScreen({ types }) {
  return <>
    <span className="dg-row is-target">Turn On All<Tap /></span>
    {types.slice(0, 4).map((t) => <span key={t} className="dg-row dg-toggle-row">{t}<span className="dg-toggle" /></span>)}
    <span className="dg-allow">Allow</span>
  </>;
}

function SyncScreen({ device }) {
  return <div className="dg-sync">
    <span className="dg-sync-node">{device}</span>
    <span className="dg-sync-flow"><i /><i /><i /></span>
    <span className="dg-sync-node is-phone">App open</span>
    <span className="dg-sync-flow"><i /><i /><i /></span>
    <span className="dg-sync-node is-health">♥ Health</span>
  </div>;
}

// The switch a toggle step names: the first quoted label, "the X toggle", or the step title.
function toggleLabel(step) {
  return step.text.match(/[‘'“"]([^’'”"]{2,40})[’'”"]/)?.[1] ?? step.text.match(/\bthe ([A-Z][\w ]{1,30}?) (?:toggle|switch)\b/)?.[1] ?? step.title;
}

function ToggleScreen({ label }) {
  return <>
    <Filler n={1} />
    <span className="dg-row is-target">{label}<span className="dg-toggle" /></span>
    <Filler n={3} />
  </>;
}

// One step of a guide as a phone screen: the parent menu with the next tap highlighted,
// a permission sheet, an install row or the sync flow.
export function StepMock({ step, app, device, types }) {
  if (step.ui === 'install') return <Phone app="App Store"><InstallScreen app={app} /></Phone>;
  if (step.ui === 'permissions') return <Phone app="Health" title="Health Access"><PermissionScreen types={types} /></Phone>;
  if (step.ui === 'sync') return <Phone app={app}><SyncScreen device={device} /></Phone>;
  if (step.ui === 'toggle') return <Phone app={app}><ToggleScreen label={toggleLabel(step)} /></Phone>;
  const menu = step.menu ?? [];
  const target = menu.at(-1) ?? step.title;
  const inHealth = /\bHealth app\b|\bin Health\b/.test(step.text);
  const bar = menu.length > 2 && /^[A-Z0-9]/.test(menu[0]) ? menu[0].replace(/ app$/i, '') : inHealth ? 'Health' : app;
  const parent = menu.length > 1 ? menu.at(-2) : undefined;
  return <Phone app={bar} title={parent && parent !== bar ? parent : undefined}>
    <Filler n={2} />
    <span className="dg-row is-target">{target}<Tap /></span>
    <Filler n={2} />
  </Phone>;
}

// Apple Health's Data Sources & Access list in edit mode, with the device dragged to the top.
export function PriorityMock({ app }) {
  return <Phone app="Health" title="Data Sources & Access">
    <span className="dg-phone-edit">Done</span>
    <span className="dg-row is-target dg-drag"><span className="dg-handle" />{app}<span className="dg-up">↑</span></span>
    <span className="dg-row dg-drag"><span className="dg-handle" />iPhone</span>
    <span className="dg-row dg-drag"><span className="dg-handle" />Other apps</span>
  </Phone>;
}
