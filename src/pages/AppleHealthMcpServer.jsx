import { useState } from 'react';
import { Link } from 'react-router-dom';
import AssistantIcon from '../components/mcp/AssistantIcon';
import { MCP_URL } from '../content/mcpGuides';
import { mcpTools } from '../content/mcpTools';
import { AHM_CHECKED, ahmClients, ahmColumnNotes, ahmColumns, ahmCompare, ahmFaq, ahmSources } from '../content/appleHealthMcp';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './apple-health-mcp.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

function CopyAddress() {
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard?.writeText(MCP_URL).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  });
  return <span className="ag-address"><code>{MCP_URL}</code><button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></span>;
}

function ClientCard({ c }) {
  return <article className="ahm-client" id={`client-${c.id}`}>
    <div className="ahm-client-head">
      {c.id === 'cursor' ? <span className="assistant-icon" aria-hidden="true"><span className="assistant-other-icon">↗</span></span> : <AssistantIcon name={c.icon ?? c.name} />}
      <div><h3>{c.name}</h3>
        <span className={`ahm-badge${c.status === 'tested' ? ' is-tested' : ''}`}>{c.status === 'tested' ? 'Tested by us' : `Per ${c.vendor} docs`}</span></div>
    </div>
    <ol>{c.steps.map((s) => <li key={s}>{s}</li>)}</ol>
    {c.code && <pre><code>{c.code}</code></pre>}
    {c.after && <p>{c.after}</p>}
    {c.note && <p>{c.note}</p>}
    {c.guide
      ? <Link to={c.guide}>Step-by-step {c.name.split(' ')[0]} guide →</Link>
      : <a href={c.helpUrl} target="_blank" rel="noopener noreferrer">{c.vendor}’s MCP docs ↗</a>}
  </article>;
}

export default function AppleHealthMcpServer() {
  return <div className="mcp-page assistant-page tool-page ahm-page">
    <header className="connect-intro connect-wrap">
      <nav className="ag-crumbs" aria-label="Breadcrumb"><Link to="/">P.R.O.</Link><span aria-hidden="true">/</span><span>Apple Health MCP server</span></nav>
      <p className="connect-eyebrow">GUIDE · MODEL CONTEXT PROTOCOL</p>
      <h1 className="font-display font-extrabold tool-h1 hero-in">Apple Health MCP server</h1>
      <div className="ag-answer hero-fade" style={{ animationDelay: '120ms' }}>
        <p>Apple doesn’t ship an MCP server for Apple Health, and HealthKit data lives on your iPhone, so every Apple Health MCP server needs either an iPhone app or a Health export. <strong>P.R.O.</strong> is the app route: the free iPhone app syncs the Apple Health categories you allow, and a hosted remote MCP server at <strong>{MCP_URL}</strong> serves them to ChatGPT, Claude, Claude Code, Codex, Cursor, Grok, Perplexity and Gemini — with OAuth sign-in, no export.xml, no Mac and no terminal. The connector is free.</p>
        <p>It works with whatever writes to Apple Health — Apple Watch, Garmin, WHOOP, Oura or any other device or app that syncs there. You add the address once in your assistant, confirm with a one-time code from P.R.O., and choose which data the assistant can read.</p>
      </div>
      <dl className="ag-facts hero-fade" style={{ animationDelay: '200ms' }}>
        <div><dt>Server address</dt><dd><CopyAddress /></dd></div>
        <div><dt>Transport</dt><dd>Remote MCP, Streamable HTTP</dd></div>
        <div><dt>Sign-in</dt><dd>OAuth 2.1 with a one-time code from P.R.O.</dd></div>
        <div><dt>Price</dt><dd>Free — iPhone with P.R.O.</dd></div>
      </dl>
      <p className="tool-reviewed">Last reviewed {AHM_CHECKED} · Sources below</p>
    </header>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="why-iphone">
      <h2 id="why-iphone">Why Apple Health needs an iPhone app for MCP</h2>
      <p className="tool-lead">Apple Health has no cloud API to connect a server to. Apple’s HealthKit documentation says the device stores all HealthKit data locally, so the data has to leave the iPhone through an app or an export.</p>
      <ul>
        <li><strong>On-device store:</strong> iPhone, Apple Watch, iPad (iPadOS 17 and later) and Vision Pro each keep their own HealthKit store and sync it with each other. The store is encrypted while the phone is locked.</li>
        <li><strong>No Health data on a Mac:</strong> the HealthKit framework exists on macOS 13 and later, but a Mac has no HealthKit store, so a Mac app can’t read your Health data. That’s why local MCP servers work from an export file.</li>
        <li><strong>iCloud doesn’t help:</strong> Health data synced to iCloud is end-to-end encrypted — Apple says it can’t read it — and Apple documents no web API for it.</li>
        <li><strong>No official server:</strong> as of {AHM_CHECKED}, Apple publishes no MCP server for Apple Health or HealthKit. All of them, including P.R.O., are third-party.</li>
      </ul>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="compare">
      <div className="connect-section-heading"><h2 id="compare">Why a hosted Apple Health MCP server</h2><p>P.R.O. compared with export-based and local Apple Health MCP servers, from each project’s own docs. Checked {AHM_CHECKED}; prices can change.</p></div>
      <div className="ag-table ahm-compare"><table>
        <caption className="sr-only">Apple Health MCP server types compared</caption>
        <thead><tr><th scope="col"><span className="sr-only">Feature</span></th>{ahmColumns.map((c, i) => <th scope="col" key={c}>{c}<small>{ahmColumnNotes[i]}</small></th>)}</tr></thead>
        <tbody>{ahmCompare.map(([k, ...cells]) => <tr key={k}><th scope="row">{k}</th>{cells.map((v, i) => <td key={i} data-label={ahmColumns[i]}>{v}</td>)}</tr>)}</tbody>
      </table></div>
      <div className="tool-prose">
        <p className="tool-small">With P.R.O. there is nothing to export or run: your Apple Health data stays current, the same connection works on your phone, on the web and in desktop tools, and you decide category by category what each assistant can read.</p>
      </div>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="connect">
      <div className="connect-section-heading"><h2 id="connect">How to connect your MCP client</h2><p>Every client uses the same address, {MCP_URL}. When it asks you to sign in, open <strong>P.R.O. → Settings → MCP Connect → Get connection code</strong> on your iPhone and enter the six-character code on the P.R.O. page. The code works once, for 10 minutes. On iPhone, Open P.R.O. on that page copies a code for you.</p></div>
      <div className="ahm-clients">{ahmClients.map((c) => <ClientCard key={c.id} c={c} />)}</div>
      <p className="guide-recorded">Other clients that support remote MCP over Streamable HTTP with OAuth may work too. Full five-step walkthrough: <Link to="/mcp-connect">Connect Apple Health to your AI assistant</Link>.</p>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="exposes">
      <h2 id="exposes">What the P.R.O. MCP server exposes</h2>
      <p className="tool-lead">Read tools for your profile, goals, daily metrics, workouts, training plan and sleep, plus three limited write actions. Data tools respect your access settings.</p>
      <div className="connect-tools"><table><caption>P.R.O. MCP tools and access</caption><thead><tr><th scope="col">Tool</th><th scope="col">What it does</th><th scope="col">Access</th></tr></thead><tbody>{mcpTools.map((t) => <tr key={t.name}><th scope="row"><code>{t.name}</code></th><td>{t.what}</td><td>{t.access}</td></tr>)}</tbody></table></div>
      <ul>
        <li><strong>Training-plan proposals:</strong> an assistant can suggest plan changes; they are saved as pending and change nothing until you accept them in P.R.O.</li>
        <li><strong>Permissions:</strong> in P.R.O., Settings → MCP Connect → Data the assistant can read lets you switch off profile, goals, daily metrics, workouts, workout routes, sleep, heart rate and HRV, or coach memory. Allow saving coach notes is off by default.</li>
        <li><strong>Revoking access:</strong> open Settings → MCP Connect, tap × beside the assistant under Connected and confirm Disconnect. Removing the connector only inside the assistant does not revoke its access; deleting your P.R.O. account revokes all connector tokens.</li>
        <li><strong>Not possible:</strong> the server can’t delete data, make payments, send messages or change account settings, and P.R.O. never writes to Apple Health.</li>
      </ul>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="privacy">
      <h2 id="privacy">Privacy: where your Apple Health data goes</h2>
      <p className="tool-lead">Nothing is shared until you enter the pairing code, and the assistant reads data only when you ask it something and it decides to use P.R.O.</p>
      <ol className="ahm-flow">
        <li><strong>iPhone.</strong> P.R.O. reads Apple Health with your HealthKit permission and syncs only the categories you allow.</li>
        <li><strong>P.R.O. server.</strong> When the assistant calls a tool, the server returns the permitted data. Detailed data — a full-day heart-rate series, an older night or workout, a GPS route — is uploaded only on request, after you open P.R.O., and cached for 48 hours, then deleted.</li>
        <li><strong>Your assistant.</strong> The answer becomes part of your conversation, and the assistant provider’s own privacy terms apply from there.</li>
      </ol>
      <p>Your P.R.O. data is not sold, not used for advertising or data mining, and not used to train models by P.R.O. or the MCP operator. Account deletion removes connector tokens, pairing codes and cached detailed uploads. Details are in <Link to="/privacy">Privacy Policy Part C</Link>. P.R.O. provides fitness and wellness information, not medical advice.</p>
      <div className="tool-cta">
        <p><strong>P.R.O.</strong> is a free iPhone app with an AI coach, widget dashboards and training history for 50+ sports — and the Apple Health MCP server is included for free.</p>
        <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
      </div>
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="ahm-faq">
      <div className="connect-section-heading"><h2 id="ahm-faq">Apple Health MCP questions</h2></div>
      {ahmFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
      <h2 className="tool-sources-title">Sources</h2>
      <ul className="tool-sources">{ahmSources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
      <div className="connect-end">
        <p>Client setup checked {AHM_CHECKED}. Interfaces change; if a menu looks different, follow the client’s own docs.</p>
        <div><Link to="/support">Get help ↗</Link><Link to="/mcp-connect">All assistants ↗</Link></div>
      </div>
    </section>
  </div>;
}
