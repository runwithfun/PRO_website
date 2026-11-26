import { Link } from 'react-router-dom';
import { changelog } from '../content/changelog';
import { MCP_CATALOG } from '../content/mcpTools';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './changelog.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const KIND = { connector: 'MCP connector', app: 'iOS app' };
const formatDate = (date) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
const anchor = (e) => `${e.kind}-${e.version.replaceAll('.', '-')}`;

export default function Changelog() {
  return <div className="mcp-page assistant-page tool-page cl-page">
    <header className="connect-intro connect-wrap">
      <nav className="ag-crumbs" aria-label="Breadcrumb"><Link to="/">P.R.O.</Link><span aria-hidden="true">/</span><span>What’s new</span></nav>
      <h1 className="font-display font-extrabold tool-h1 hero-in">What’s new in P.R.O.</h1>
      <p className="tool-lead hero-fade" style={{ animationDelay: '80ms' }}>Releases of the P.R.O. iPhone app and of the free MCP connector at <strong>{MCP_CATALOG.server}</strong>, newest first. App versions and dates come from the <a href={APP_STORE} target="_blank" rel="noopener">App Store version history</a>.</p>
      <p className="tool-small">Current connector version {MCP_CATALOG.version}. <a href={MCP_CATALOG.inventory}>See all tools in tools.json</a> or <Link to="/mcp-connect">connect your assistant</Link>.</p>
    </header>
    <section className="connect-wrap connect-section" aria-label="Releases">
      <ol className="cl-list">{changelog.map((e) => <li key={anchor(e)} id={anchor(e)} className={`cl-entry is-${e.kind}`}>
        <div className="cl-meta"><span className="cl-kind">{KIND[e.kind]}</span><time dateTime={e.date}>{formatDate(e.date)}</time></div>
        <h2>{e.kind === 'connector' ? 'Connector' : 'P.R.O.'} {e.version}</h2>
        <ul>{e.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </li>)}</ol>
      <div className="connect-end"><p>P.R.O. provides fitness and wellness information, not medical advice.</p><div><Link to="/apple-health-mcp">Apple Health MCP server ↗</Link><Link to="/support">Get help ↗</Link></div></div>
    </section>
  </div>;
}
