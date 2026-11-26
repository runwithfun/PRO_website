import { Link } from 'react-router-dom';
import { MCP_URL } from '../content/mcpGuides';
import { ANALYZE_CHECKED, analyzeFaq, analyzePrompts, analyzeWays } from '../content/analyzeAppleHealth';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export default function AnalyzeAppleHealth() {
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">GUIDE · UPDATED {ANALYZE_CHECKED.toUpperCase()}</p>
        <h1 className="font-display font-extrabold tool-h1">Analyze Apple Health data with AI</h1>
        <div className="ag-answer">
          <p>The fastest way is to connect the assistant you already use. Add the free <strong>P.R.O. MCP connector</strong> at <code>{MCP_URL}</code> to ChatGPT, Claude, Grok or Perplexity, and ask about your workouts, sleep, heart rate, HRV and training load in plain words. It works from your phone, in any country, with no export.</p>
          <p>There are four other ways: built-in health features (US only), uploading an export, an iPhone app with its own AI, or an open-source server on your computer. Here is how they compare.</p>
        </div>
        <div className="rd-chat ag-chat" aria-label="Example conversation with sample data">
          <p className="rd-chat-you">Compare my sleep on training days and rest days over the last two months.</p>
          <p className="rd-chat-ai">On training days you slept 7 h 21 min on average, 19 minutes more than on rest days, and your deep sleep was 9 minutes longer. Your three shortest nights all came after evening workouts that ended past 9 pm. Moving hard sessions earlier is the clearest change to try.</p>
          <p className="tool-small ag-chat-note">Example answer with sample data. Yours comes from your own Apple Health.</p>
        </div>
        <p className="tool-reviewed">Checked {ANALYZE_CHECKED} · Wellness information, not medical advice</p>
      </header>

      <section className="connect-wrap connect-section" aria-labelledby="ways">
        <div className="connect-section-heading"><h2 id="ways">5 ways to analyze Apple Health data with AI</h2><p>Compared on what matters day to day: fresh data, where it works and what it costs.</p></div>
        <div className="ag-table an-table"><table>
          <caption className="sr-only">Ways to analyze Apple Health data with AI, checked {ANALYZE_CHECKED}</caption>
          <thead><tr><th scope="col">Way</th><th scope="col">How it works</th><th scope="col">Fresh data</th><th scope="col">Outside the US</th><th scope="col">Computer needed</th><th scope="col">Cost</th><th scope="col">Best for</th></tr></thead>
          <tbody>{analyzeWays.map(([way, how, fresh, outside, pc, cost, best, to]) => (
            <tr key={way}>
              <th scope="row">{to ? <Link to={to}>{way}</Link> : way}</th>
              <td data-label="How it works">{how}</td>
              <td data-label="Fresh data">{fresh}</td>
              <td data-label="Outside the US">{outside}</td>
              <td data-label="Computer needed">{pc}</td>
              <td data-label="Cost">{cost}</td>
              <td data-label="Best for">{best}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="mcp-way">
        <h2 id="mcp-way">Connect ChatGPT, Claude or Grok in two minutes</h2>
        <p className="tool-lead">The assistant asks P.R.O. for exactly the data a question needs, by day, week or month, from your iPhone’s latest sync. You pick the categories it can read.</p>
        <ol>
          <li>Install <a href={APP_STORE} target="_blank" rel="noopener">P.R.O. on your iPhone</a>, sign in and allow Apple Health. It’s free.</li>
          <li>In your assistant, add a custom connector with the address <code>{MCP_URL}</code>. In ChatGPT, install P.R.O. from the plugin directory.</li>
          <li>Confirm with the one-time code from P.R.O. → Settings → MCP Connect → Get connection code.</li>
        </ol>
        <p>Guides with screenshots: <Link to="/apple-health-chatgpt">ChatGPT</Link> · <Link to="/apple-health-claude">Claude</Link> · <Link to="/apple-health-grok">Grok</Link> · <Link to="/apple-health-perplexity">Perplexity</Link> · <Link to="/mcp-connect">all assistants</Link>.</p>
        <h2 id="prompts">Questions to ask</h2>
        <ul className="ag-prompts">{analyzePrompts.map((p) => <li key={p}>“{p}”</li>)}</ul>
        <h2 id="export">If you’d rather upload an export</h2>
        <p>In the Health app, tap your profile picture, then Export All Health Data. You get export.zip with an XML file that grows with every year of history and is often more than a chat can read at once, so convert the part you need to CSV first. The answer covers only the dates in the file, and you repeat the export whenever you want newer numbers.</p>
      </section>

      <section className="connect-wrap connect-section connect-questions" aria-labelledby="analyze-faq">
        <div className="connect-section-heading"><h2 id="analyze-faq">Questions about Apple Health and AI</h2></div>
        {analyzeFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
        <div className="connect-end">
          <p>P.R.O. reads only the Apple Health categories you allow, and you can disconnect any assistant in Settings → MCP Connect.<br />P.R.O. provides fitness and wellness information, not medical advice.</p>
          <div><Link to="/apple-health-mcp">Apple Health MCP server ↗</Link><Link to="/best-apple-health-mcp-servers">All MCP servers compared ↗</Link></div>
        </div>
      </section>
    </div>
  );
}
