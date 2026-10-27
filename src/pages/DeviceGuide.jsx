import { Link } from 'react-router-dom';
import { MethodBadge, SyncMark, MenuPath, StepMock, PriorityMock } from '../components/DeviceSync';
import { deviceGuides } from '../content/deviceGuides';
import { HUB_PATH, APP_STORE, APPLE_PRIORITY_SOURCE, PRIORITY_PATH, PRIORITY_STEPS, METHOD_HINT, formatChecked } from '../content/appleHealthSync';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './device-guide.css';

// One page per device, generated from deviceGuides.js: how to get its data into Apple Health.
export default function DeviceGuide({ id }) {
  const g = deviceGuides.find((x) => x.id === id);
  const app = g.app || g.name;
  const others = deviceGuides.filter((x) => x.id !== id);
  const synced = g.syncs.filter((s) => s.ok === true).map((s) => s.type);
  const counts = { yes: synced.length, part: g.syncs.filter((s) => s.ok === 'partial').length };
  const sources = g.sources.some(([, url]) => url === APPLE_PRIORITY_SOURCE[1]) ? g.sources : [...g.sources, APPLE_PRIORITY_SOURCE];
  const checked = formatChecked(g.checked);

  return <div className="mcp-page tool-page device-page">
    <header className="connect-intro connect-wrap">
      <nav aria-label="Breadcrumb"><ol className="ag-crumbs dg-crumbs">
        <li><Link to="/">P.R.O.</Link></li>
        <li><Link to={HUB_PATH}>Apple Health sync</Link></li>
        <li aria-current="page">{g.name}</li>
      </ol></nav>
      <h1 className="font-display font-extrabold tool-h1 hero-in">How to sync {g.name} with Apple Health</h1>
      <div className="ag-answer dg-answer hero-fade" style={{ animationDelay: '120ms' }}>{g.answer.map((p) => <p key={p}>{p}</p>)}</div>
      <dl className="ag-facts dg-facts hero-fade" style={{ animationDelay: '200ms' }}>
        <div><dt>{g.method === 'third-party' ? 'Official app' : 'App'}</dt><dd>{g.app || 'No official Apple Health link'}</dd></div>
        <div><dt>Method</dt><dd><MethodBadge method={g.method} /><span className="dg-fact-hint">{METHOD_HINT[g.method]}</span></dd></div>
        <div><dt>Data types</dt><dd>{counts.yes} of {g.syncs.length} sync{counts.part ? `, ${counts.part} partly` : ''}</dd></div>
        <div><dt>Checked</dt><dd><time dateTime={g.checked}>{checked}</time></dd></div>
      </dl>
    </header>

    <section className="connect-wrap connect-section" aria-labelledby="syncs-heading">
      <div className="connect-section-heading"><h2 id="syncs-heading">What {g.name} syncs to Apple Health</h2><p>Apple Health data types, checked against official documentation on {checked}.</p></div>
      <div className="dg-table"><table>
        <caption className="sr-only">Which data types {g.name} writes to Apple Health</caption>
        <thead><tr><th scope="col">Data type</th><th scope="col">Apple Health</th><th scope="col">Notes</th></tr></thead>
        <tbody>{g.syncs.map((s) => <tr key={s.type} className={`is-${String(s.ok)}`}>
          <th scope="row">{s.type}</th>
          <td><SyncMark ok={s.ok} /></td>
          <td>{s.note ?? ''}</td>
        </tr>)}</tbody>
      </table></div>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="steps-heading">
      <div className="connect-section-heading"><h2 id="steps-heading">How to connect {g.name} to Apple Health</h2><p>{g.steps.length} steps on your iPhone, about two minutes.</p></div>
      <div className="ag-before"><h3>Before you start</h3><ul>{g.requirements.map((r) => <li key={r}>{r}</li>)}</ul></div>
      <ol className="dg-steps">{g.steps.map((s, i) => <li key={s.title} id={`step-${i + 1}`} className="dg-step">
        <div className="dg-step-copy">
          <span className="dg-step-num" aria-hidden="true">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {s.menu?.length > 1 && <MenuPath items={s.menu} label={`Tap path for step ${i + 1}`} />}
        </div>
        <StepMock step={s} app={app} device={g.name} types={synced} />
      </li>)}</ol>
      <p className="guide-recorded">Menu names checked against {g.name}’s help pages on {checked}. Apps change; if a menu looks different, see the sources below.</p>
    </section>

    {g.thirdParty && <section className="connect-wrap connect-section" aria-labelledby="bridges-heading">
      <div className="connect-section-heading"><h2 id="bridges-heading">Bridge apps for {g.name}</h2><p>Independent apps that copy {g.name} data into Apple Health. Prices as listed on the App Store on {checked}.</p></div>
      <ul className="dg-bridges">{g.thirdParty.map((t) => <li key={t.name} className="dg-bridge">
        <h3>{t.name}</h3>
        <p className="dg-bridge-price">{t.pricing}</p>
        {t.note && <p>{t.note}</p>}
        <a href={t.url} target="_blank" rel="noopener nofollow">View on the App Store ↗</a>
      </li>)}</ul>
    </section>}

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="after-heading">
      <h2 id="after-heading">After setup</h2>
      <p className="tool-lead">{g.afterSetup}</p>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="dupes-heading">
      <h2 id="dupes-heading">Avoid double-counting</h2>
      <p className="tool-lead">{g.duplicates}</p>
      <div className="dg-priority">
        <div className="dg-priority-copy">
          <h3>Put {app} first in Apple Health</h3>
          <MenuPath items={PRIORITY_PATH} label="Apple Health path" />
          <ol>{PRIORITY_STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
          <p className="tool-small">The source at the top wins when several write the same data type. New apps and devices are added at the top automatically. <a href={APPLE_PRIORITY_SOURCE[1]} target="_blank" rel="noopener nofollow">Apple Support ↗</a></p>
        </div>
        <PriorityMock app={app} />
      </div>
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="trouble-heading">
      <div className="connect-section-heading"><h2 id="trouble-heading">{g.name} not syncing to Apple Health?</h2></div>
      {g.trouble.map((t) => <details className="connect-question" key={t.q}><summary>{t.q}<span aria-hidden="true">+</span></summary><p>{t.a}</p></details>)}
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="pro-heading">
      <div className="dg-pro">
        <p className="connect-eyebrow">WHAT TO DO WITH YOUR {g.name.toUpperCase()} DATA</p>
        <h2 id="pro-heading">Your {g.name} data, with an AI coach</h2>
        <p className="dg-pro-lead">Once {g.name} syncs to Apple Health, <strong>P.R.O.</strong> reads it. Ask the AI coach about your training and it answers with your real numbers.</p>
        <ul className="dg-pro-list">
          <li><strong>AI coach chat</strong> grounded in your own workouts, sleep and heart rate</li>
          <li><strong>Widget dashboards</strong> for the numbers you care about</li>
          <li><strong>Training history</strong> across 50+ sports, with records and trends</li>
          <li><strong>Adaptive training plans</strong> that follow your load and recovery</li>
          <li><strong>Sleep score</strong> for every night</li>
        </ul>
        <p className="dg-pro-lead">You can also ask ChatGPT, Claude, Gemini or Perplexity about your {g.name} data through the free P.R.O. connector.</p>
        <div className="dg-pro-actions">
          <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
          <Link className="dg-pro-link" to="/mcp-connect">Connect ChatGPT or Claude →</Link>
        </div>
      </div>
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="faq-heading">
      <div className="connect-section-heading"><h2 id="faq-heading">{g.name} and Apple Health: questions</h2></div>
      {g.faq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
      <h2 className="tool-sources-title">Sources</h2>
      <ul className="tool-sources">{sources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
    </section>

    <section className="connect-wrap connect-section ag-others" aria-labelledby="others-heading">
      <h2 id="others-heading">Other devices</h2>
      <div className="ag-other-links dg-other-links">
        {others.map((o) => <Link key={o.id} to={o.path}><span>{o.name} → Apple Health</span><MethodBadge method={o.method} /></Link>)}
        <Link to={HUB_PATH}><span>All devices and what they sync</span><span className="dg-arrow" aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </div>;
}
