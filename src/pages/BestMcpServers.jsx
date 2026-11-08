import { Link } from 'react-router-dom';
import { MCP_URL } from '../content/mcpGuides';
import { BEST_MCP_CHECKED, bestMcpColumnNotes, bestMcpColumns, bestMcpFaq, bestMcpPicks, bestMcpRows, bestMcpSources } from '../content/bestMcpServers';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './apple-health-mcp.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export default function BestMcpServers() {
  return <div className="mcp-page assistant-page tool-page ahm-page">
    <header className="connect-intro connect-wrap">
      <nav className="ag-crumbs" aria-label="Breadcrumb"><Link to="/">P.R.O.</Link><span aria-hidden="true">/</span><Link to="/apple-health-mcp">Apple Health MCP server</Link><span aria-hidden="true">/</span><span>Compared</span></nav>
      <p className="connect-eyebrow">COMPARISON · PRICES CHECKED {BEST_MCP_CHECKED.toUpperCase()}</p>
      <h1 className="font-display font-extrabold tool-h1 hero-in">Best Apple Health MCP servers, compared</h1>
      <p className="tool-lead hero-fade ahm-lead" style={{ animationDelay: '80ms' }}>Six ways to get Apple Health into ChatGPT, Claude and other assistants, side by side: what they cost, what you have to run and how you sign in.</p>
      <div className="ag-answer hero-fade" style={{ animationDelay: '200ms' }}>
        <p><strong>P.R.O.</strong> is the free hosted option: add <code>{MCP_URL}</code> to your assistant, confirm with a one-time code from the iPhone app and ask. There’s no paid plan, no export file and no Mac, and it works with anything that writes to Apple Health, from Apple Watch to Garmin, WHOOP and Oura.</p>
        <p>We make P.R.O., so this is a vendor’s comparison. Every fact about another product comes from that product’s own site or App Store listing, linked below.</p>
      </div>
      <p className="tool-reviewed">Last reviewed {BEST_MCP_CHECKED} · Sources below</p>
    </header>

    <section className="connect-wrap connect-section" aria-labelledby="table">
      <div className="connect-section-heading"><h2 id="table">Apple Health MCP servers side by side</h2><p>“Not mentioned” means the vendor’s pages don’t say, not that the feature is missing.</p></div>
      <div className="ag-table ahm-compare best-mcp-compare"><table>
        <caption className="sr-only">Apple Health MCP servers compared</caption>
        <thead><tr><th scope="col"><span className="sr-only">Feature</span></th>{bestMcpColumns.map((c, i) => <th scope="col" key={c}>{c}<small>{bestMcpColumnNotes[i]}</small></th>)}</tr></thead>
        <tbody>{bestMcpRows.map(([k, ...cells]) => <tr key={k}><th scope="row">{k}</th>{cells.map((v, i) => <td key={i} data-label={bestMcpColumns[i]}>{v}</td>)}</tr>)}</tbody>
      </table></div>
    </section>

    <section className="connect-wrap connect-section tool-prose" aria-labelledby="pick">
      <h2 id="pick">Which one to pick</h2>
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
      <ul className="tool-sources">{bestMcpSources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
      <div className="connect-end">
        <p>Checked {BEST_MCP_CHECKED}. Products and prices change; each vendor’s own page has the current details.</p>
        <div><Link to="/apple-health-mcp">P.R.O. MCP server ↗</Link><Link to="/mcp-connect">All assistants ↗</Link></div>
      </div>
    </section>
  </div>;
}
