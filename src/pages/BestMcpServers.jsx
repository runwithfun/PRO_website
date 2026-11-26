import { Link } from 'react-router-dom';
import { MCP_URL } from '../content/mcpGuides';
import { BEST_MCP_CHECKED, bestMcpAll, bestMcpColumns, bestMcpFaq, bestMcpPicks, bestMcpQuick, bestMcpRows, bestMcpVendors } from '../content/bestMcpServers';
import { formatChecked } from '../content/appleHealthSync';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './apple-health-mcp.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

// Internal links stay in the app; vendor pages open in a new tab.
const SourceLink = ({ label, url }) => url.startsWith('/')
  ? <Link to={url}>{label}</Link>
  : <a href={url} target="_blank" rel="noopener nofollow">{label}</a>;

export default function BestMcpServers() {
  return <div className="mcp-page assistant-page tool-page ahm-page">
    <header className="connect-intro connect-wrap">
      <nav className="ag-crumbs" aria-label="Breadcrumb"><Link to="/">P.R.O.</Link><span aria-hidden="true">/</span><Link to="/apple-health-mcp">Apple Health MCP server</Link><span aria-hidden="true">/</span><span>Compared</span></nav>
      <p className="connect-eyebrow">COMPARISON · PRICES CHECKED {BEST_MCP_CHECKED.toUpperCase()}</p>
      <h1 className="font-display font-extrabold tool-h1 hero-in">Best Apple Health MCP servers: {bestMcpAll.length} options compared</h1>
      <p className="tool-lead hero-fade ahm-lead" style={{ animationDelay: '80ms' }}>Every way we found to get Apple Health into ChatGPT, Claude and other assistants, hosted and open source: what each costs, whether you need a computer, and who it suits.</p>
      <div className="ag-answer hero-fade" style={{ animationDelay: '200ms' }}>
        <p><strong>P.R.O.</strong> is a free hosted option: add <code>{MCP_URL}</code> to your assistant, confirm with a one-time code from the iPhone app and ask. There’s no paid plan, no export file and no Mac, and it works with anything that writes to Apple Health, from Apple Watch to Garmin, WHOOP and Oura.</p>
        <p>We make P.R.O., so this is a vendor’s comparison. Every fact about another product comes from that product’s own site, GitHub or App Store listing, re-checked on the date in its column and linked there.</p>
      </div>
      <p className="tool-reviewed">Last reviewed {BEST_MCP_CHECKED} · Sources below</p>
    </header>

    <section className="connect-wrap connect-section" aria-labelledby="quick">
      <div className="connect-section-heading"><h2 id="quick">Quick answer: which Apple Health MCP server should you use?</h2></div>
      <ul className="best-mcp-quick">{bestMcpQuick.map((q) => <li key={q.who}>
        <span className="best-mcp-who">{q.who}</span>
        <strong>{q.to ? <Link to={q.to}>{q.pick}</Link> : q.pick}</strong>
        <span>{q.why}</span>
      </li>)}</ul>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="all">
      <div className="connect-section-heading"><h2 id="all">All {bestMcpAll.length} Apple Health MCP servers at a glance</h2><p>Hosted servers first, then the ones you run yourself. Checked {BEST_MCP_CHECKED} on each project’s own site or GitHub.</p></div>
      <div className="ag-table best-mcp-all"><table>
        <caption className="sr-only">All Apple Health MCP servers we found, with type, computer requirement, price and best use</caption>
        <thead><tr><th scope="col">Server</th><th scope="col">Type</th><th scope="col">Computer needed</th><th scope="col">Price for MCP</th><th scope="col">Best for</th></tr></thead>
        <tbody>{bestMcpAll.map(([name, type, pc, price, best, sources]) => <tr key={name} className={name === 'P.R.O.' ? 'is-pro' : undefined}>
          <th scope="row">{name}<small>{sources.map(([label, url], i) => <span key={url}>{i > 0 && ' · '}<SourceLink label={label} url={url} /></span>)}</small></th>
          <td data-label="Type">{type}</td>
          <td data-label="Computer needed">{pc}</td>
          <td data-label="Price for MCP">{price}</td>
          <td data-label="Best for">{best}</td>
        </tr>)}</tbody>
      </table></div>
    </section>

    <section className="connect-wrap connect-section" aria-labelledby="table">
      <div className="connect-section-heading"><h2 id="table">Hosted Apple Health MCP servers in detail</h2><p>Hosted servers run in the vendor’s cloud and work from any device; local ones run on your own phone, computer or server. “Not mentioned” means the vendor’s pages don’t say, not that the feature is missing.</p></div>
      <div className="ag-table ahm-compare best-mcp-compare"><table>
        <caption className="sr-only">Apple Health MCP servers compared</caption>
        <thead><tr><th scope="col"><span className="sr-only">Feature</span></th>{bestMcpVendors.map((v) => <th scope="col" key={v.name}>{v.name}<small>{v.note}</small></th>)}</tr></thead>
        <tbody>{bestMcpRows.map(([k, ...cells]) => <tr key={k}><th scope="row">{k}</th>{cells.map((v, i) => <td key={i} data-label={bestMcpColumns[i]}>{v}</td>)}</tr>)}
          <tr className="best-mcp-checked"><th scope="row">Checked</th>{bestMcpVendors.map((v) => <td key={v.name} data-label={v.name}>
            <time dateTime={v.checked}>{formatChecked(v.checked)}</time>
            <span>{v.sources.map(([label, url], i) => <span key={url}>{i > 0 && ' · '}<SourceLink label={label} url={url} /></span>)}</span>
          </td>)}</tr>
        </tbody>
      </table></div>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="pick">
      <h2 id="pick">How to choose</h2>
      <ul>{bestMcpPicks.map((p) => <li key={p.name}><strong>{p.name}</strong> {p.text}{p.to && <> <Link to={p.to}>Set it up →</Link></>}</li>)}</ul>
      <div className="tool-cta">
        <p><strong>P.R.O.</strong> is a free iPhone app with an AI coach, widget dashboards and training history for 50+ sports, and the Apple Health MCP server is included for free.</p>
        <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
      </div>
    </section>

    <section className="connect-wrap connect-section connect-questions" aria-labelledby="best-mcp-faq">
      <div className="connect-section-heading"><h2 id="best-mcp-faq">Questions about Apple Health MCP servers</h2></div>
      {bestMcpFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
      <h2 className="tool-sources-title">Sources</h2>
      <ul className="tool-sources">{[...new Map([...bestMcpVendors.slice(1).flatMap((v) => v.sources.map(([t, u]) => [u, `${v.name} — ${t}`])), ...bestMcpAll.slice(1).flatMap(([name, , , , , src]) => src.map(([t, u]) => [u, `${name} — ${t}`]))]).entries()].map(([u, t]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
      <div className="connect-end">
        <p>Checked {BEST_MCP_CHECKED}. Products and prices change; each vendor’s own page has the current details.</p>
        <div><Link to="/apple-health-mcp">P.R.O. MCP server ↗</Link><Link to="/mcp-connect">All assistants ↗</Link></div>
      </div>
    </section>
  </div>;
}
