import { Link } from 'react-router-dom';
import { MethodBadge, SyncMark, MenuPath, PriorityMock } from '../components/DeviceSync';
import { deviceGuides } from '../content/deviceGuides';
import { HUB_CHECKED, APP_STORE, APPLE_PRIORITY_SOURCE, KEY_TYPES, PRIORITY_PATH, hubAnswer, hubFaq, syncOf, syncSummary } from '../content/appleHealthSync';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './device-guide.css';

// Hub of the device guides: cards, a device × data type matrix and how Health merges sources.
export default function AppleHealthSync() {
  return <div className="mcp-page tool-page device-page">
    <header className="connect-intro connect-wrap">
      <nav aria-label="Breadcrumb"><ol className="ag-crumbs dg-crumbs">
        <li><Link to="/">P.R.O.</Link></li>
        <li aria-current="page">Apple Health sync</li>
      </ol></nav>
      <h1 className="font-display font-extrabold tool-h1 hero-in">Sync any fitness tracker with Apple Health</h1>
      <div className="ag-answer dg-answer hero-fade" style={{ animationDelay: '120ms' }}>{hubAnswer.map((p) => <p key={p}>{p}</p>)}</div>
      <p className="tool-reviewed">Each guide checked against official help pages · Last reviewed {HUB_CHECKED}</p>
    </header>

    <section className="connect-wrap connect-section" aria-labelledby="devices-heading">
      <div className="connect-section-heading"><h2 id="devices-heading">Choose your device</h2><p>Setup steps, what syncs and fixes for each one.</p></div>
      <ul className="dg-cards">{deviceGuides.map((g) => <li key={g.id}>
        <Link className="dg-card" to={g.path}>
          <span className="dg-card-top"><strong>{g.name}</strong><MethodBadge method={g.method} /></span>
          <span className="dg-card-app">{g.app ? `via ${g.app}` : 'No official Apple Health link'}</span>
          <span className="dg-card-syncs">{syncSummary(g)}</span>
          <span className="dg-card-go">How to sync {g.name} →</span>
        </Link>
      </li>)}</ul>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="matrix-heading">
      <div className="connect-section-heading"><h2 id="matrix-heading">What each device writes to Apple Health</h2><p>The key data types side by side. Every guide has the full list with notes.</p></div>
      <div className="dg-matrix"><table>
        <caption className="sr-only">Devices and the key data types they write to Apple Health</caption>
        <thead><tr><th scope="col">Device</th>{KEY_TYPES.map((k) => <th scope="col" key={k.label}>{k.label}</th>)}</tr></thead>
        <tbody>{deviceGuides.map((g) => <tr key={g.id}>
          <th scope="row"><Link to={g.path}>{g.name}</Link></th>
          {KEY_TYPES.map((k) => <td key={k.label}><SyncMark ok={syncOf(g, k)?.ok} label={false} /></td>)}
        </tr>)}</tbody>
      </table></div>
      <p className="dg-legend"><SyncMark ok /> <SyncMark ok="partial" /> <SyncMark ok={false} /></p>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="merge-heading">
      <h2 id="merge-heading">How Apple Health merges data from several devices</h2>
      <p className="tool-lead">Apple Health keeps every sample with its source. When two devices record the same data type, the source at the top of that type’s Data Sources & Access list wins, so steps and energy aren’t added up twice.</p>
      <ul>
        <li><strong>Default order:</strong> data you enter yourself comes first, then iPhone, iPad and Apple Watch, then apps and Bluetooth devices. A newly added app or device goes to the top automatically.</li>
        <li><strong>Choose the winner per data type:</strong> the order is set separately for steps, energy, distance, heart rate and so on, so you can trust your tracker for sleep and your iPhone for steps.</li>
        <li><strong>Workouts are listed per source:</strong> if two apps both write the same session, Health can show it twice. Switch off Workouts sharing in one of them.</li>
        <li><strong>Activity rings need Apple Watch:</strong> data from other devices appears in Health but doesn’t move the rings.</li>
      </ul>
      <div className="dg-priority">
        <div className="dg-priority-copy">
          <h3>Change the order of sources</h3>
          <MenuPath items={PRIORITY_PATH} label="Apple Health path" />
          <p className="tool-small">Health → Browse → a category and data type → Data Sources & Access → Edit, then drag your tracker’s app to the top and tap Done. <a href={APPLE_PRIORITY_SOURCE[1]} target="_blank" rel="noopener nofollow">Apple Support ↗</a></p>
        </div>
        <PriorityMock app="Your tracker’s app" />
      </div>

      <div className="tool-cta">
        <p><strong>P.R.O.</strong> reads Apple Health, so it works with every device on this page — and with any other tracker that syncs there. Chat with an AI coach that answers with your real numbers, build widget dashboards, see your training history across 50+ sports, follow adaptive training plans and get a sleep score for every night.</p>
        <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
        <p className="tool-small">Ask ChatGPT, Claude, Gemini or Perplexity about the same data with the free connector: <Link to="/mcp-connect">connect Apple Health to your AI assistant</Link>.</p>
      </div>
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="hub-faq">
      <div className="connect-section-heading"><h2 id="hub-faq">Apple Health sync questions</h2></div>
      {hubFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
      <h2 className="tool-sources-title">Sources</h2>
      <ul className="tool-sources"><li><a href={APPLE_PRIORITY_SOURCE[1]} target="_blank" rel="noopener nofollow">{APPLE_PRIORITY_SOURCE[0]}</a></li><li>Device makers’ own help pages, linked from each guide</li></ul>
    </section>
  </div>;
}
