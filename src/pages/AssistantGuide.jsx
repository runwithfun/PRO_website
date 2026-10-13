import { useState } from 'react';
import { Link } from 'react-router-dom';
import AssistantIcon from '../components/mcp/AssistantIcon';
import Picture from '../components/ui/Picture';
import { assistantGuides, CHECKED } from '../content/assistantGuides';
import { MCP_URL } from '../content/mcpGuides';
import './mcp-connect.css';
import './assistant-guide.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

function CopyAddress() {
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard?.writeText(MCP_URL).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  });
  return <span className="ag-address"><code>{MCP_URL}</code><button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></span>;
}

function Shot({ shot }) {
  return <figure className="ag-shot">
    <Picture src={shot.src} alt={shot.alt} sizes="(max-width: 700px) 92vw, 620px" lazy />
    <figcaption>{shot.caption}</figcaption>
  </figure>;
}

export default function AssistantGuide({ id }) {
  const g = assistantGuides.find((x) => x.id === id);
  const others = assistantGuides.filter((x) => x.id !== id);
  return <div className="mcp-page assistant-page">
    <header className="connect-intro connect-wrap">
      <nav className="ag-crumbs" aria-label="Breadcrumb"><Link to="/mcp-connect">Connect AI assistants</Link><span aria-hidden="true">/</span><span>{g.name}</span></nav>
      <div className="ag-title">
        <AssistantIcon name={g.name} className="ag-title-icon" />
        <h1 className="font-display font-extrabold hero-in">Connect Apple Health to {g.name}</h1>
      </div>
      <div className="ag-answer hero-fade" style={{ animationDelay: '120ms' }}>{g.answer.map((p) => <p key={p}>{p}</p>)}</div>
      <dl className="ag-facts hero-fade" style={{ animationDelay: '200ms' }}>
        <div><dt>Server address</dt><dd><CopyAddress /></dd></div>
        <div><dt>Sign-in</dt><dd>OAuth with a one-time code from P.R.O.</dd></div>
        <div><dt>Time</dt><dd>About 2 minutes</dd></div>
        <div><dt>Recorded</dt><dd>{g.recorded}</dd></div>
      </dl>
    </header>

    {g.builtIn && <section className="connect-wrap connect-section" aria-labelledby="ways-heading">
      <div className="connect-section-heading"><h2 id="ways-heading">{g.builtIn.name} or P.R.O.?</h2><p>Both bring Apple Health into {g.name}. They differ in where they work and what you get. Checked {CHECKED}.</p></div>
      <div className="ag-table"><table>
        <caption className="sr-only">{g.builtIn.name} compared with the P.R.O. connector</caption>
        <thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">{g.builtIn.name}</th><th scope="col">P.R.O. connector</th></tr></thead>
        <tbody>{g.builtIn.rows.map(([k, a, b]) => <tr key={k}><th scope="row">{k}</th><td data-label={g.builtIn.name}>{a}</td><td data-label="P.R.O. connector">{b}</td></tr>)}</tbody>
      </table></div>
    </section>}

    <section className="connect-wrap connect-section" aria-labelledby="steps-heading">
      <div className="connect-section-heading"><h2 id="steps-heading">How to connect {g.name}</h2><p>{g.guide.intro}</p></div>
      <div className="ag-before"><h3>Before you start</h3><ul>{g.before.map((b) => <li key={b}>{b}</li>)}</ul>
        <a className="ag-store" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. on the App Store ↗</a></div>
      <ol className="ag-steps">{g.guide.steps.map((s, i) => <li key={i}>
        <div className="ag-step"><strong>{s.title}</strong>{s.text && <p>{s.text}</p>}
          {s.pairing && <p className="ag-code">On your iPhone, open <b>P.R.O. → Settings → MCP Connect</b> and tap <b>Get connection code</b>. Enter the six-character code on the authorization page and select <b>Connect</b>. The code works once, for 10 minutes.</p>}
          {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer">{s.linkText}</a>}
        </div>
        {g.shots[i + 1] && <Shot shot={g.shots[i + 1]} />}
      </li>)}</ol>
      <p className="guide-recorded">{g.guide.verified}. Interfaces change; if a menu looks different, see <a href={g.guide.helpUrl} target="_blank" rel="noopener noreferrer">{g.name}’s own setup help ↗</a></p>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="ask-heading">
      <div className="connect-section-heading"><h2 id="ask-heading">What to ask {g.name}</h2><p>Ask in your own words. {g.name} calls P.R.O. when it needs your data.</p></div>
      <ul className="ag-prompts">{g.prompts.map((p) => <li key={p}>“{p}”</li>)}</ul>
      {g.cards.length > 0 && <>
        <div className="ag-cards">{g.cards.map((c) => <figure key={c.src} className="ag-card">
          <Picture src={c.src} alt={c.alt} sizes="(max-width: 700px) 92vw, 460px" lazy />
          <figcaption>{c.caption}</figcaption>
        </figure>)}</div>
        <p className="guide-recorded">{g.cardsNote}</p>
      </>}
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="faq-heading">
      <div className="connect-section-heading"><h2 id="faq-heading">If something goes wrong</h2></div>
      {g.trouble.map(([q, a]) => <details className="connect-question" key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
      <h2 className="ag-subhead">Questions about {g.name} and Apple Health</h2>
      {g.faq.map((item) => <details className="connect-question" key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}
      <div className="connect-end">
        <p>P.R.O. reads only the Apple Health categories you allow and you can disconnect {g.name} any time in Settings → MCP Connect.<br />P.R.O. provides fitness and wellness information, not medical advice.</p>
        <div><Link to="/support">Get help ↗</Link><Link to="/privacy">Privacy ↗</Link></div>
      </div>
    </section>

    <section className="connect-wrap connect-section ag-others" aria-labelledby="others-heading">
      <h2 id="others-heading">Other assistants</h2>
      <div className="ag-other-links">
        {others.map((o) => <Link key={o.id} to={o.path}><AssistantIcon name={o.name} /><span>Apple Health in {o.name}</span></Link>)}
        <Link to="/mcp-connect"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>All assistants and the five-step guide</span></Link>
      </div>
    </section>
  </div>;
}
