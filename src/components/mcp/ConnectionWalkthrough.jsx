import { useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { MCP_URL, connectionSteps as steps } from '../../content/mcpGuides';
import ConversationDemo from './ConversationDemo';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const hydrationStatus = {
  subscribe: () => () => {},
  getSnapshot: () => true,
  getServerSnapshot: () => false,
};

function AppCodeIllustration() {
  return <div className="walk-app" aria-label="Illustration of getting a connection code in P.R.O.">
    <div className="walk-app-download">
      <img src="/mcp-guide/pro-icon-256.png" width="44" height="44" alt="P.R.O. icon" />
      <span><strong>P.R.O.</strong><small>For iPhone</small></span>
      <a href={APP_STORE} target="_blank" rel="noopener noreferrer">Download ↗</a>
    </div>
    <p className="walk-app-setup">Sign in. Allow Apple Health access.</p>
    <div className="walk-app-screen">
      <p className="walk-app-route">Settings <span aria-hidden="true">›</span> MCP Connect</p>
      <div className="walk-app-code" aria-hidden="true">
        <span className="walk-get-code">Get connection code</span>
        <div className="walk-issued-code">
          <div className="walk-app-cells">{'ABC234'.split('').map((char, i) => <span key={i}>{char}</span>)}</div>
          <div className="walk-app-expiry"><i /><span>10:00</span></div>
          <div className="walk-copy-state"><span>Tap the code to copy</span><strong>Copied ✓</strong></div>
        </div>
      </div>
      <p className="walk-app-code-note">One-time code · valid for 10 minutes</p>
    </div>
    <p className="walk-app-shortcut">On iPhone, <strong>Open P.R.O.</strong> on the authorization page gets and copies the code for you.</p>
  </div>;
}

function StepIllustration({ step, active, copied, failed, copy }) {
  return <div className={`walk-preview walk-preview-${step}`}>
    <div className="walk-preview-content">
          {step === 0 && <div className="walk-address"><img src="/mcp-guide/pro-icon-256.png" width="48" height="48" alt="P.R.O. icon" /><span>P.R.O. MCP</span><code>{MCP_URL}</code><button type="button" onClick={copy}>{copied ? 'Copied ✓' : 'Copy server address ⧉'}</button><p role="status">{failed ? 'Select the address above and copy it.' : ''}</p></div>}
          {step === 1 && <div className="walk-form" aria-label="Illustration of custom MCP connection settings"><div className="walk-form-heading"><span>Custom MCP connection</span><span>↗</span></div><div className="walk-field"><span>Name</span><div>P.R.O.</div></div><div className="walk-field"><span>Server address</span><div><span className="walk-typing">{MCP_URL}</span></div></div><div className="walk-field"><span>Authentication</span><div>OAuth <span>⌄</span></div></div><p>Menu names vary. See your assistant’s guide below.</p></div>}
          {step === 2 && <AppCodeIllustration />}
          {step === 3 && <div className="walk-auth" aria-label="Illustration of P.R.O. authorization on iPhone"><div className="walk-browser">▣ <span>mcp.proapp.uk</span> ↗</div><div className="walk-auth-body"><span className="walk-brand-dot">P.R.O.</span><h3>Connect your AI<br />to P.R.O.</h3><div className="walk-code"><span className="walk-code-value"><i>••••••</i><b>ABC234</b></span><span className="walk-faux-button walk-paste">Paste</span></div><span className="walk-faux-button walk-connect">Connect</span><p>Choose what to share in P.R.O.</p></div></div>}
          {step === 4 && <ConversationDemo active={active} />}
    </div>
    {step === 3 && <p className="walk-computer"><strong>On a computer?</strong> Type the six-character code from your iPhone into this page.</p>}
  </div>;
}

export default function ConnectionWalkthrough() {
  const { hash, key } = useLocation();
  const [selection, setSelection] = useState(null);
  // Match the static HTML first; the server cannot see a URL fragment.
  const hydrated = useSyncExternalStore(hydrationStatus.subscribe, hydrationStatus.getSnapshot, hydrationStatus.getServerSnapshot);
  const requestedStep = hydrated ? /^#connect-step-([1-5])$/.exec(hash) : null;
  const step = selection?.key === key ? selection.step : requestedStep ? Number(requestedStep[1]) - 1 : 0;
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(MCP_URL); setCopied(true); setFailed(false); }
    catch { setFailed(true); }
  }
  function choose(i, event) {
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const closing = mobile && step === i;
    setSelection({ key, step: closing ? null : i });
    if (mobile && !closing) {
      const button = event.currentTarget;
      requestAnimationFrame(() => button.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
    }
  }
  return <div className="connection-walkthrough">
    <ol className="connection-steps">{steps.map((s, i) => <li key={s.title} className={step === i ? 'step-current' : ''} style={{ '--step-row': i + 1 }}>
      <button id={`connect-step-${i + 1}`} className="connection-step-button" type="button" onClick={event => choose(i, event)} aria-expanded={step === i} aria-current={step === i ? 'step' : undefined} aria-controls={`connection-preview-${i}`}><span className="connection-step-no">0{i + 1}</span><span><strong>{s.title}</strong><span className="connection-step-text">{s.text}</span></span><span className="connection-step-indicator" aria-hidden="true">{step === i ? '−' : '+'}</span></button>
      <div id={`connection-preview-${i}`} className="walk-demo" hidden={step !== i} role="region" aria-label={`Step ${i + 1} illustration`}>
        <StepIllustration key={`${i}-${step === i}`} step={i} active={step === i} copied={copied} failed={failed} copy={copy} />
      </div>
    </li>)}</ol>
  </div>;
}
