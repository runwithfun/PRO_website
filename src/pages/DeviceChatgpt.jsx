import { Link } from 'react-router-dom';
import { SyncMark } from '../components/DeviceSync';
import { deviceChats, chatRows, chatSteps, guideOf, CHATGPT_PLUGIN, DEVICE_CHAT_CHECKED } from '../content/deviceChatgpt';
import { APP_STORE, formatChecked } from '../content/appleHealthSync';
import { MCP_URL } from '../content/mcpGuides';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './device-guide.css';

const CHAT_WORDS = { true: 'Yes', partial: 'Partly', false: 'No' };
const listOf = (names, joiner = 'and') => (names.length > 1 ? `${names.slice(0, -1).join(', ')} ${joiner} ${names.at(-1)}` : names[0] ?? '');
const lower = (type) => (/^(HRV|VO2|ECG)/.test(type) ? type : type.toLowerCase());

// One page per device, generated from deviceChatgpt.js: Garmin / WHOOP / Oura → Apple Health → P.R.O. → ChatGPT.
export default function DeviceChatgpt({ id }) {
  const c = deviceChats.find((x) => x.id === id);
  const g = guideOf(c);
  const app = g.app || g.name;
  const rows = chatRows(g);
  const can = rows.filter((r) => r.ok !== false).map((r) => lower(r.type));
  const cannot = rows.filter((r) => r.ok === false).map((r) => lower(r.type));
  const steps = chatSteps(c);
  const checked = formatChecked(DEVICE_CHAT_CHECKED);
  const others = deviceChats.filter((x) => x.id !== id);

  return <div className="mcp-page tool-page device-page">
    <header className="connect-intro connect-wrap">
      <nav aria-label="Breadcrumb"><ol className="ag-crumbs dg-crumbs">
        <li><Link to="/">P.R.O.</Link></li>
        <li><Link to={g.path}>{g.name} and Apple Health</Link></li>
        <li aria-current="page">ChatGPT</li>
      </ol></nav>
      <h1 className="font-display font-extrabold tool-h1 hero-in">Connect {g.name} to ChatGPT</h1>
      <div className="ag-answer dg-answer hero-fade" style={{ animationDelay: '120ms' }}>{c.answer.map((p) => <p key={p}>{p}</p>)}</div>
      {c.example && <div className="rd-chat dc-chat hero-fade" style={{ animationDelay: '140ms' }} aria-label="Example conversation with sample data">
        <p className="rd-chat-you">{c.example.q}</p>
        <p className="rd-chat-ai">{c.example.a}</p>
        <p className="tool-small dc-chat-note">Example answer with sample data. Yours comes from your own {g.name} history.</p>
      </div>}
      <ol className="dc-flow hero-fade" style={{ animationDelay: '160ms' }} aria-label={`How ${g.name} data reaches ChatGPT`}>
        <li>{g.name}</li><li>Apple Health</li><li className="is-pro">P.R.O.</li><li>ChatGPT</li>
      </ol>
      <a className="ag-cta hero-fade" style={{ animationDelay: '200ms' }} href={CHATGPT_PLUGIN} target="_blank" rel="noopener noreferrer">Open P.R.O. in ChatGPT ↗</a>
      <p className="tool-reviewed">Checked {checked} · Free connector · Wellness information, not medical advice</p>
    </header>

    <section className="connect-wrap connect-section" aria-labelledby="see-heading">
      <div className="connect-section-heading">
        <h2 id="see-heading">What ChatGPT can see from {g.name}</h2>
        <p>ChatGPT can answer about your {listOf(can)}. It can’t see {listOf(cannot, 'or')}. <Link to={g.path}>Full {g.name} sync guide</Link></p>
      </div>
      <div className="dg-table"><table>
        <caption className="sr-only">Which {g.name} data ChatGPT can read through Apple Health and P.R.O.</caption>
        <thead><tr><th scope="col">Data type</th><th scope="col">In ChatGPT</th><th scope="col">Why</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.type} className={`is-${String(r.ok)}`}>
          <th scope="row">{r.type}</th>
          <td><SyncMark ok={r.ok} words={CHAT_WORDS} /></td>
          <td>{r.note ?? ''}</td>
        </tr>)}</tbody>
      </table></div>
      <p className="guide-recorded">{c.gapNote}</p>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="steps-heading">
      <div className="connect-section-heading"><h2 id="steps-heading">How to connect {g.name} to ChatGPT</h2><p>Four steps on your iPhone and in ChatGPT. Screenshots of the ChatGPT part are in the <Link to="/apple-health-chatgpt">Apple Health to ChatGPT guide</Link>.</p></div>
      <ol className="dg-steps">{steps.map((s, i) => <li key={s.title} id={`step-${i + 1}`} className="dg-step dc-step">
        <div className="dg-step-copy">
          <span className="dg-step-num" aria-hidden="true">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {i === 1 && <a className="dc-step-link" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. on the App Store ↗</a>}
          {i === 2 && <a className="dc-step-link" href={CHATGPT_PLUGIN} target="_blank" rel="noopener noreferrer">Open P.R.O. in ChatGPT ↗</a>}
        </div>
      </li>)}</ol>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="ask-heading">
      <div className="connect-section-heading"><h2 id="ask-heading">First questions to ask</h2><p>These work with the data {app} writes to Apple Health.</p></div>
      <ul className="ag-prompts">{c.prompts.map((p) => <li key={p}>“{p}”</li>)}</ul>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="others-ai-heading">
      <h2 id="others-ai-heading">Claude and Grok work the same way</h2>
      <p className="tool-lead">The same P.R.O. connection works in other assistants: add {MCP_URL} as a custom connector and confirm with a code from the app. See <Link to="/apple-health-claude">Apple Health in Claude</Link> and <Link to="/apple-health-grok">Apple Health in Grok</Link>.</p>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="official-heading">
      <h2 id="official-heading">Does {g.name} have its own ChatGPT integration?</h2>
      <p className="tool-lead">{c.official.text}</p>
      <p className="tool-small">Checked {checked}: {c.official.sources.map(([t, u], i) => <span key={u}>{i > 0 && ' · '}<a href={u} target="_blank" rel="noopener nofollow">{t}</a></span>)}</p>
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="trouble-heading">
      <div className="connect-section-heading"><h2 id="trouble-heading">If {g.name} data is missing in ChatGPT</h2></div>
      {c.trouble.map((t) => <details className="connect-question" key={t.q}><summary>{t.q}<span aria-hidden="true">+</span></summary><p>{t.a}</p></details>)}
      <h2 className="ag-subhead" id="faq-heading">{g.name} and ChatGPT: questions</h2>
      {c.faq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
      <div className="connect-end">
        <p>P.R.O. reads only the Apple Health categories you allow, and you can disconnect ChatGPT any time in Settings → MCP Connect.<br />P.R.O. provides fitness and wellness information, not medical advice.</p>
        <div><Link to="/support">Get help ↗</Link><Link to="/privacy">Privacy ↗</Link></div>
      </div>
    </section>

    <section className="connect-wrap connect-section ag-others" aria-labelledby="more-heading">
      <h2 id="more-heading">More guides</h2>
      <div className="ag-other-links dg-other-links">
        {others.map((o) => <Link key={o.id} to={o.path}><span>{guideOf(o).name} → ChatGPT</span><span className="dg-arrow" aria-hidden="true">↗</span></Link>)}
        <Link to={g.path}><span>Sync {g.name} with Apple Health</span><span className="dg-arrow" aria-hidden="true">↗</span></Link>
        <Link to="/apple-health-chatgpt"><span>Apple Health to ChatGPT, with screenshots</span><span className="dg-arrow" aria-hidden="true">↗</span></Link>
        <Link to="/apple-health-mcp"><span>Apple Health MCP server: tools and privacy</span><span className="dg-arrow" aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </div>;
}
