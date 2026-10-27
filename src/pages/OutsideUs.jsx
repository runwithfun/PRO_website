import { Link } from 'react-router-dom';
import AssistantIcon from '../components/mcp/AssistantIcon';
import { MCP_URL } from '../content/mcpGuides';
import { CHECKED, ROUTES_OUTSIDE, STATUS, STOREFRONTS, outsideUsFaq, outsideUsSources } from '../content/outsideUs';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const listOf = (items) => items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];

export default function OutsideUs() {
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">GUIDE · UK, EU, CANADA, AUSTRALIA, INDIA</p>
        <h1 className="font-display font-extrabold tool-h1">Apple Health in ChatGPT &amp; Claude outside the US</h1>
        <div className="ag-answer">
          <p>Built-in Apple Health features in <strong>ChatGPT, Claude, Perplexity and Copilot are US only</strong> as of October 2026. Outside the US you can connect Apple Health through a custom connector such as <strong>P.R.O.</strong>, which works in any country where the app is available — in ChatGPT, Claude, Perplexity, Grok and Codex.</p>
          <p>Gemini is the exception: Google offers custom apps in Gemini only in the US.</p>
        </div>
        <p className="tool-reviewed">Checked {CHECKED} against each provider’s help pages · Sources below</p>
      </header>

      <section className="connect-wrap connect-section" aria-labelledby="status">
        <div className="connect-section-heading">
          <h2 id="status">What works where</h2>
          <p>Each assistant’s own Apple Health feature, and whether you can add a custom connector instead from outside the US. Checked {CHECKED}.</p>
        </div>
        <div className="ag-table"><table>
          <caption className="sr-only">Built-in Apple Health features in AI assistants and custom connector availability outside the US, checked {CHECKED}</caption>
          <thead><tr>
            <th scope="col">Assistant</th>
            <th scope="col">Built-in Apple Health feature</th>
            <th scope="col">Where it works</th>
            <th scope="col">Plans and apps</th>
            <th scope="col">P.R.O. connector outside the US</th>
          </tr></thead>
          <tbody>{STATUS.map(([name, feature, where, plan, connector, path]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              <td data-label="Built-in feature">{feature}</td>
              <td data-label="Where it works">{where}</td>
              <td data-label="Plans and apps">{plan}</td>
              <td data-label="P.R.O. connector outside the US">{connector}{path && <span className="tool-small"> <Link to={path}>Guide →</Link></span>}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="how">
        <h2 id="how">How to do it from the UK, EU, Canada, Australia or India</h2>
        <p className="tool-lead">The steps are the same in every country: install P.R.O., add {MCP_URL} as a custom connector in your assistant, and approve it with a one-time code from the app.</p>
        <ol>
          <li>Install P.R.O. on your iPhone, sign in and allow Apple Health access. It’s free. On {CHECKED} we found the App Store listing in {listOf(STOREFRONTS)}.</li>
          <li>In your assistant, add a custom connector with the address <code>{MCP_URL}</code> and OAuth.</li>
          <li>In P.R.O., open Settings → MCP Connect → Get connection code, enter the six-character code on the authorization page and choose which data the assistant can read. The code works once, for 10 minutes.</li>
        </ol>
        <p>Step-by-step guides with screenshots:</p>
        <ul>{ROUTES_OUTSIDE.map((r) => <li key={r.path}><Link to={r.path}><strong>Apple Health in {r.name}</strong></Link> — {r.text}</li>)}</ul>
        <p>Two assistants don’t work from outside the US today. Gemini custom apps are US only, for adults with a personal Google account; if you wear a Fitbit or Pixel Watch, Google Health Coach in the Google Health app is offered in the UK, much of the EU, Canada, Australia and India. Microsoft’s help for consumer Copilot lists only built-in connections, and we haven’t tested P.R.O. there.</p>

        <h2 id="privacy">Privacy: what goes where</h2>
        <p className="tool-lead">Nothing is shared until you type the pairing code, and the assistant only sees the categories you leave switched on.</p>
        <ul>
          <li>P.R.O. syncs the Apple Health categories you allow from your iPhone. You can switch off profile, goals, daily metrics, workouts, workout routes, sleep, heart rate and HRV, or coach memory in Settings → MCP Connect.</li>
          <li>When you ask your assistant something and it calls P.R.O., the permitted data is processed by the MCP operator, Dorokhov Daniil, an independent developer in Armenia, and returned to that assistant. From then on, the assistant’s own privacy policy applies — OpenAI, Anthropic, Perplexity or xAI.</li>
          <li>Detailed uploads, such as a full-day heart-rate series or a GPS route, happen only on request and are deleted from P.R.O.’s servers after 48 hours.</li>
          <li>P.R.O. does not sell your data, use health data for advertising or train AI models on it.</li>
          <li>To revoke access, tap × beside the assistant in Settings → MCP Connect. Removing the connector only inside the assistant doesn’t revoke it. Deleting your P.R.O. account deletes your data on P.R.O.’s servers and revokes every connection.</li>
          <li>If you live in the EU or EEA, GDPR rights (Articles 15–22) apply to data held by HAOTONG TECHNOLOGY (HK) CO., LIMITED, which operates the app. Write to <a href="mailto:mail@proapp.uk">mail@proapp.uk</a>; for data an assistant holds, contact that provider. Details are in Part C of the <Link to="/privacy">Privacy Policy</Link>.</li>
        </ul>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> works with any device that syncs to Apple Health. It brings your workouts, sleep, heart rate and HRV into ChatGPT, Claude, Perplexity, Grok and Codex wherever you live, and adds interactive workout, sleep and plan cards in ChatGPT and Claude.</p>
          <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
          <p className="tool-small">Or start with the <Link to="/mcp-connect">five-step connection guide</Link>.</p>
        </div>
      </section>

      <section className="connect-wrap connect-section connect-questions" aria-labelledby="outside-faq">
        <div className="connect-section-heading"><h2 id="outside-faq">Questions from outside the US</h2></div>
        {outsideUsFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
        <h2 className="tool-sources-title">Sources, checked {CHECKED}</h2>
        <ul className="tool-sources">{outsideUsSources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
        <p className="tool-small">Availability changes often. If something here is out of date, tell us at <a href="mailto:mail@proapp.uk">mail@proapp.uk</a>.</p>
      </section>

      <section className="connect-wrap connect-section ag-others" aria-labelledby="outside-guides">
        <h2 id="outside-guides">Guides by assistant</h2>
        <div className="ag-other-links">
          {ROUTES_OUTSIDE.map((r) => <Link key={r.path} to={r.path}><AssistantIcon name={r.name} /><span>Apple Health in {r.name}</span></Link>)}
          <Link to="/mcp-connect"><span className="assistant-other-icon" aria-hidden="true">↗</span><span>All assistants and the five-step guide</span></Link>
        </div>
      </section>
    </div>
  );
}
