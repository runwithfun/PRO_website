import { Link } from 'react-router-dom';
import AssistantIcon from '../components/mcp/AssistantIcon';
import { MCP_URL } from '../content/mcpGuides';
import { CHECKED, alternatives } from '../content/alternatives';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';
import './alternatives.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const ICONS = ['ChatGPT', 'Claude', 'Gemini', 'Grok', 'Perplexity', 'Codex'];

// Shared template for the "WHOOP alternative" / "Runna alternative" pages.
// Content and sources live in src/content/alternatives.js.
export default function Alternative({ id }) {
  const page = alternatives.find((a) => a.id === id);
  const other = alternatives.filter((a) => a.id !== id);
  const name = page.competitor;
  return (
    <div className="mcp-page tool-page alt-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">{page.eyebrow}</p>
        <h1 className="font-display font-extrabold tool-h1">{page.h1}</h1>
        <div className="ag-answer">
          {page.answer.map((p) => <p key={p}>{p}</p>)}
        </div>
        <dl className="ag-facts">
          {page.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
      </header>

      <section className="connect-wrap connect-section" aria-labelledby="mcp">
        <div className="alt-mcp">
          <p className="connect-eyebrow">MCP CONNECTOR · FREE</p>
          <h2 id="mcp">{page.mcp.title}</h2>
          <p className="alt-mcp-lead">{page.mcp.lead}</p>
          <ul className="alt-mcp-icons" aria-label="Works in">
            {ICONS.map((n) => <li key={n}><AssistantIcon name={n} /><span>{n}</span></li>)}
          </ul>
          <p className="alt-mcp-label">Try this prompt</p>
          <blockquote className="alt-mcp-prompt">“{page.mcp.prompt}”</blockquote>
          <ul className="ag-prompts">{page.mcp.more.map((q) => <li key={q}>{q}</li>)}</ul>
          <p className="alt-mcp-after">{page.mcp.after}</p>
          <div className="alt-mcp-cta">
            <Link className="tool-btn" to="/mcp-connect">Connect in two minutes</Link>
            <Link className="alt-link" to="/apple-health-mcp">How the Apple Health MCP server works →</Link>
          </div>
          <p className="tool-small">Connector address: <code>{MCP_URL}</code></p>
        </div>
      </section>

      <section className="connect-wrap connect-section" aria-labelledby="compare">
        <div className="connect-section-heading">
          <h2 id="compare">P.R.O. vs {name} and other alternatives</h2>
          <p>US prices and features from each developer’s official pages, checked {CHECKED}. Sources below.</p>
        </div>
        <div className="ag-table alt-table" tabIndex={0} aria-label="Comparison table">
          <table>
            <caption className="sr-only">P.R.O. compared with {page.columns.slice(1).join(', ')}, checked {CHECKED}</caption>
            <thead><tr>
              <th scope="col">Feature</th>
              {page.columns.map((c, i) => <th key={c} scope="col" className={i === 0 ? 'is-pro' : undefined}>{c}</th>)}
            </tr></thead>
            <tbody>{page.rows.map(([label, ...cells], r) => (
              <tr key={label} className={r === 0 ? 'is-mcp' : undefined}>
                <th scope="row">{label}</th>
                {cells.map((cell, i) => <td key={page.columns[i]} data-label={page.columns[i]} className={i === 0 ? 'is-pro' : undefined}>{cell}</td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="choose">
        {page.cost && (
          <>
            <h2 id="cost">{page.cost.title}</h2>
            <p className="tool-lead">{page.cost.lead}</p>
            <div className="tool-table"><table>
              <caption className="sr-only">{page.cost.title}</caption>
              <thead><tr>{page.cost.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
              <tbody>{page.cost.rows.map(([k, ...v]) => <tr key={k}><th scope="row">{k}</th>{v.map((x, i) => <td key={i}>{x}</td>)}</tr>)}</tbody>
            </table></div>
            <p className="tool-small">{page.cost.note}</p>
          </>
        )}

        {page.beginner && (
          <>
            <h2 id="beginners">{page.beginner.title}</h2>
            <p className="tool-lead">{page.beginner.lead}</p>
            <p>{page.beginner.text}</p>
            <p>{page.beginner.links.map(([to, label], i) => <span key={to}>{i > 0 && ' · '}<Link to={to}>{label}</Link></span>)}</p>
          </>
        )}

        <h2 id="choose">Who should pick what</h2>
        <ul>{page.picks.map(([n, t]) => <li key={n}><strong>{n}</strong> — {t}</li>)}</ul>

        <h2 id="switch">How to switch from {name} to P.R.O.</h2>
        <ol className="ag-steps">{page.steps.map((s, i) => (
          <li key={s.title} id={`step-${i + 1}`} className="ag-step">
            <strong>{s.title}</strong>
            <p>{s.text}</p>
            {s.links && <p className="alt-step-links">{s.links.map(([to, label], j) => <span key={to}>{j > 0 && ' · '}<Link to={to}>{label}</Link></span>)}</p>}
          </li>
        ))}</ol>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> is free on the App Store and works with any device that writes to Apple Health: readiness, training load, sleep score, an AI coach, adaptive training plans across 50+ sports and a free MCP connector for ChatGPT, Claude, Gemini, Grok and Perplexity.</p>
          <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
          <p className="tool-small">Comparing more apps? See the <Link to="/compare">full AI coach comparison</Link>{other.map((o) => <span key={o.id}> or the <Link to={o.path}>{o.competitor} alternative</Link></span>)}.</p>
        </div>
      </section>

      <section className="connect-wrap connect-section connect-questions" aria-labelledby="alt-faq">
        <div className="connect-section-heading"><h2 id="alt-faq">{name} alternative questions</h2></div>
        {page.faq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
        <h2 className="tool-sources-title">Sources, checked {CHECKED}</h2>
        <ul className="tool-sources">{page.sources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
        <p className="tool-small">Prices and plans change. If something here is out of date, tell us at <a href="mailto:mail@proapp.uk">mail@proapp.uk</a>.</p>
      </section>

      <section className="connect-wrap connect-section ag-others" aria-labelledby="alt-more">
        <h2 id="alt-more">Related guides</h2>
        <div className="ag-other-links">
          <Link to="/apple-health-mcp"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>Apple Health MCP server</span></Link>
          <Link to="/apple-watch-readiness-score"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>Readiness score on any Apple Watch</span></Link>
          <Link to="/what-is-a-good-hrv"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>What is a good HRV?</span></Link>
          <Link to="/zone-2-calculator"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>Zone 2 heart rate calculator</span></Link>
          <Link to="/apple-health-sync"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>Sync any tracker with Apple Health</span></Link>
          <Link to="/compare"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>Compare AI coach apps</span></Link>
          {other.map((o) => <Link key={o.id} to={o.path}><span className="assistant-other-icon" aria-hidden="true">↗</span><span>{o.competitor} alternative</span></Link>)}
        </div>
      </section>
    </div>
  );
}
