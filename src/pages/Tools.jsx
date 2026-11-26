import { Link } from 'react-router-dom';
import FreeTools from '../components/FreeTools';
import { MCP_URL } from '../content/mcpGuides';
import './mcp-connect.css';
import './assistant-guide.css';
import './tools.css';

// Hub for the free tools and guides, so each tool is one click from a single page.
const MORE = [
  ['/apple-watch-readiness-score', 'Readiness on any Apple Watch', 'Apple’s score is Series 12 and Ultra 4 only. Check yours from HRV, resting heart rate and sleep.'],
  ['/what-is-a-good-hrv', 'HRV checker by age', 'Is your Apple Watch HRV typical for your age and sex? About 30–70 ms at 25–34.'],
  ['/zone-2-calculator', 'Zone 2 heart rate calculator', 'Five methods side by side, from 60–70% of max to Karvonen and MAF.'],
  ['/analyze-apple-health-data-with-ai', 'Analyze Apple Health data with AI', 'Five ways compared, from an MCP connector to uploading an export.'],
  ['/best-apple-health-mcp-servers', 'Apple Health MCP servers compared', 'Hosted and open-source options with prices and setup.'],
  ['/apple-health-ai-outside-us', 'Apple Health in ChatGPT and Claude outside the US', 'What works in the UK, EU, Canada, Australia and India.'],
  ['/apple-health-sync', 'Sync any tracker with Apple Health', 'Garmin, WHOOP, Oura, Polar, COROS and more, step by step.'],
];

export default function Tools() {
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">FREE TOOLS</p>
        <h1 className="font-display font-extrabold tool-h1">Free tools for your Apple Health data</h1>
        <div className="ag-answer">
          <p>Check your HRV against your age, find your Zone 2 heart rate, get a readiness read on any Apple Watch, and ask ChatGPT or Claude about all of it through the free P.R.O. MCP connector at <code>{MCP_URL}</code>. No sign-up for the calculators.</p>
        </div>
      </header>
      <FreeTools title="Pick a tool." />
      <section className="connect-wrap connect-section tool-prose" aria-labelledby="all-tools">
        <h2 id="all-tools">All tools and guides</h2>
        <ul>{MORE.map(([to, name, text]) => <li key={to}><Link to={to}><strong>{name}</strong></Link>. {text}</li>)}</ul>
      </section>
    </div>
  );
}
