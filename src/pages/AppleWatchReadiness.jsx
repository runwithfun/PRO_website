import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APPLE_BANDS, RULES, REVIEWED, readinessFaq, readinessSources } from '../content/readiness';
import './mcp-connect.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const num = (v, lo, hi) => {
  const n = Number(v);
  return v !== '' && Number.isFinite(n) && n >= lo && n <= hi ? n : null;
};
const digits = (v) => v.replace(/\D/g, '').slice(0, 3);
const decimal = (v) => v.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 4);

const STATUS = {
  ready: ['Ready', 'No warning signs. Train as planned — a hard session is fine if your plan has one.'],
  caution: ['Caution', 'One warning sign. Keep today easy or shorten the hard part, and look at what changed — sleep, alcohol, stress or a coming cold.'],
  recover: ['Recover', 'Two or more warning signs. Rest or move gently today and save intensity for when the numbers come back to your normal.'],
};

// Same rules as the readiness read in P.R.O.: each signal is checked only when its inputs are present.
function readiness({ hrv, hrvBase, rhr, rhrBase, sleep }) {
  const checks = [];
  if (hrv && hrvBase) {
    const dev = Math.round(((hrv - hrvBase) / hrvBase) * 1000) / 10;
    checks.push({ id: 'hrv', flag: dev <= -RULES.hrvDropPct, text: `HRV ${dev > 0 ? '+' : ''}${dev}% vs your average`, rule: `flag at ${RULES.hrvDropPct}% or more below` });
  }
  if (rhr && rhrBase) {
    const diff = Math.round((rhr - rhrBase) * 10) / 10;
    checks.push({ id: 'rhr', flag: diff >= RULES.rhrRiseBpm, text: `Resting heart rate ${diff > 0 ? '+' : ''}${diff} bpm vs your average`, rule: `flag at ${RULES.rhrRiseBpm} bpm or more above` });
  }
  if (sleep !== null) {
    checks.push({ id: 'sleep', flag: sleep < RULES.sleepMinHours, text: `${sleep} h of sleep last night`, rule: `flag under ${RULES.sleepMinHours} h` });
  }
  if (!checks.length) return null;
  const flags = checks.filter((c) => c.flag).length;
  return { checks, status: flags >= 2 ? 'recover' : flags ? 'caution' : 'ready' };
}

function ReadinessChecker() {
  const [hrv, setHrv] = useState('38');
  const [hrvBase, setHrvBase] = useState('45');
  const [rhr, setRhr] = useState('57');
  const [rhrBase, setRhrBase] = useState('54');
  const [sleep, setSleep] = useState('7.2');
  const result = readiness({
    hrv: num(hrv, 1, 300), hrvBase: num(hrvBase, 1, 300),
    rhr: num(rhr, 25, 150), rhrBase: num(rhrBase, 25, 150),
    sleep: num(sleep, 0, 16),
  });
  return (
    <div className="tool-card" aria-labelledby="rd-tool-title">
      <h3 id="rd-tool-title" className="tool-title">Readiness checker for any Apple Watch</h3>
      <div className="tool-fields tool-fields-2">
        <label>Latest HRV, ms<input inputMode="numeric" value={hrv} onChange={(e) => setHrv(digits(e.target.value))} /></label>
        <label>28-day average HRV, ms<input inputMode="numeric" value={hrvBase} onChange={(e) => setHrvBase(digits(e.target.value))} /></label>
        <label>Resting heart rate, bpm<input inputMode="numeric" value={rhr} onChange={(e) => setRhr(digits(e.target.value))} /></label>
        <label>28-day average resting HR, bpm<input inputMode="numeric" value={rhrBase} onChange={(e) => setRhrBase(digits(e.target.value))} /></label>
        <label className="rd-wide">Sleep last night, hours<input inputMode="decimal" value={sleep} onChange={(e) => setSleep(decimal(e.target.value))} /></label>
      </div>
      <p className="tool-hint">Leave a pair empty if you don’t have it — for example HRV from a Garmin, which doesn’t reach Apple Health. Only the signals you fill in are checked.</p>
      {result ? (
        <div className="tool-result" aria-live="polite">
          <p className="tool-headline"><span className={`rd-status is-${result.status}`}>{STATUS[result.status][0]}</span> {STATUS[result.status][1]}</p>
          <ul className="rd-checks">
            {result.checks.map((c) => (
              <li key={c.id} className={c.flag ? 'is-flag' : 'is-ok'}>
                <span aria-hidden="true">{c.flag ? '!' : '✓'}</span>
                <span><strong>{c.text}</strong> · {c.flag ? 'warning sign' : 'within your normal'} <em>({c.rule})</em></span>
              </li>
            ))}
          </ul>
          <p className="tool-note">A rule of thumb for training decisions, not a diagnosis and not Apple’s 0–10 score. Single HRV readings on older watches are noisy, so compare like with like and trust a streak of bad days more than one.</p>
        </div>
      ) : <p className="tool-note">Fill in at least one pair of HRV or resting heart rate values, or your sleep.</p>}
    </div>
  );
}

export default function AppleWatchReadiness() {
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">GUIDE · APPLE WATCH READINESS</p>
        <h1 className="font-display font-extrabold tool-h1">Apple Watch Readiness score: can older watches get it?</h1>
        <div className="ag-answer">
          <p><strong>No — Apple’s Readiness score is only on Apple Watch Series 12 and Ultra 4.</strong> Series 9, 10 and 11, Ultra 2 and 3 and SE 3 run watchOS 27 but don’t get it. Every Apple Watch still records <strong>HRV, resting heart rate and sleep</strong>, so you can get a daily readiness read by comparing them with <strong>your own 4-week baseline</strong> — here’s how, with a free checker below.</p>
        </div>
        <p className="tool-reviewed">Last reviewed {REVIEWED} · Sources below · Not medical advice</p>
      </header>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="ask-ai">
        <div className="rd-mcp">
          <p className="connect-eyebrow">APPLE HEALTH MCP · FREE</p>
          <h2 id="ask-ai">Ask ChatGPT, Claude, Gemini, Grok or Perplexity “am I ready to train today?”</h2>
          <p className="tool-lead">With the free P.R.O. MCP connector at <strong>https://mcp.proapp.uk</strong>, your AI assistant reads your readiness, HRV against your baseline, resting heart rate and sleep from Apple Health — and answers with your real numbers. It works with any Apple Watch, no Series 12 needed.</p>
          <div className="rd-chat" aria-label="Example conversation with sample data">
            <p className="rd-chat-you">Am I ready to train today? I have intervals on the plan.</p>
            <p className="rd-chat-ai"><strong>Caution — one warning sign.</strong> Your HRV is 38 ms, 16% below your 28-day average of 45 ms. Resting heart rate is 57 bpm, 3 bpm above your average, and you slept 7.2 hours. Your training load over the last 7 days is in line with the last 4 weeks. I’d swap the intervals for an easy 40-minute run today and move them to Thursday if your HRV is back to normal.</p>
            <p className="tool-small">Example with sample data. Answers depend on your assistant and your own Apple Health data.</p>
          </div>
          <ul>
            <li><strong>Tested by us in every assistant:</strong> ChatGPT, Claude, Gemini, Grok, Perplexity, Codex, Claude Code and Cursor.</li>
            <li><strong>Completely free:</strong> the connector costs nothing; you only need the free P.R.O. app on iPhone to sync Apple Health.</li>
            <li><strong>Two minutes to set up:</strong> add https://mcp.proapp.uk as a custom connector, get a code in P.R.O. under Settings → MCP Connect, paste it — and choose which data categories the assistant can read.</li>
          </ul>
          <p className="rd-mcp-links"><Link className="tool-btn" to="/mcp-connect">Connect your AI assistant</Link> <Link to="/apple-health-mcp">How the Apple Health MCP server works</Link></p>
        </div>
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="what">
        <h2 id="what">What is Apple’s Readiness score?</h2>
        <p className="tool-lead">Readiness is a daily score from 0 to 10 that tells you how hard to train today. It arrived with watchOS 27 in September 2026 on Apple Watch Series 12 and Ultra 4.</p>
        <div className="tool-table"><table>
          <caption className="sr-only">Apple Readiness score bands</caption>
          <thead><tr><th scope="col">Recommendation</th><th scope="col">Score</th></tr></thead>
          <tbody>{APPLE_BANDS.map(([name, range]) => <tr key={name}><th scope="row">{name}</th><td>{range}</td></tr>)}</tbody>
        </table></div>
        <ul>
          <li><strong>Activity:</strong> active calories, workout effort ratings and training load, including recent history. More activity can lower the score.</li>
          <li><strong>Vitals:</strong> overnight heart rate, respiratory rate, wrist temperature, HRV and blood oxygen, plus daytime heart rate, each compared with your recent baseline. On these models HRV is measured as often as every five minutes; DC Rainmaker reports the overnight Recovery HRV is now RMSSD.</li>
          <li><strong>Sleep:</strong> last night’s sleep score and your recent sleep history.</li>
          <li><strong>During the day:</strong> the score moves after workouts, naps and changes in daytime heart rate.</li>
          <li><strong>Where:</strong> the Readiness app on Apple Watch, and Readiness in the Fitness app on iPhone. Apple also plans it for the redesigned Health app.</li>
          <li><strong>Before the first score:</strong> enter height, weight and age, set up Activity, Sleep and Overnight Vitals, and sleep with the watch for at least seven nights. DC Rainmaker reports each night needs at least 4 hours of sleep.</li>
        </ul>

        <h2 id="models">Which Apple Watch has Readiness?</h2>
        <p className="tool-lead">Only Series 12 and Ultra 4. Apple ties Readiness to their new heart sensors, so installing watchOS 27 on an older watch doesn’t add it.</p>
        <div className="tool-table"><table>
          <caption className="sr-only">Readiness and related features by Apple Watch model</caption>
          <thead><tr><th scope="col">Apple Watch</th><th scope="col">Readiness 0–10</th><th scope="col">Recovery HRV, daytime vitals</th><th scope="col">HRV in Health (SDNN)</th><th scope="col">Sleep score</th></tr></thead>
          <tbody>
            <tr><th scope="row">Series 12, Ultra 4</th><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><th scope="row">Series 9, 10, 11 · Ultra 2, 3 · SE 3 (watchOS 27)</th><td>No</td><td>No</td><td>Yes</td><td>Yes</td></tr>
            <tr><th scope="row">Series 6, 7, 8 · Ultra · SE 2 (up to watchOS 26)</th><td>No</td><td>No</td><td>Yes</td><td>Yes</td></tr>
          </tbody>
        </table></div>
        <p>Older watches keep the overnight Vitals app (watchOS 11 or later) with heart rate, respiratory rate, sleep duration and, depending on the model, wrist temperature (Series 8 and later, all Ultra) and blood oxygen — but no HRV there. HRV is still recorded as SDNN in short readings while you are still and lands in Health → Heart → Heart Rate Variability. See <Link to="/what-is-a-good-hrv">what a good HRV is on Apple Watch</Link>.</p>

        <h2 id="diy">How to get a readiness read on an older Apple Watch</h2>
        <p className="tool-lead">Compare today with your own last four weeks. Three signals cover most of what a readiness score reacts to: HRV, resting heart rate and sleep.</p>
        <div className="tool-table"><table>
          <caption className="sr-only">Readiness rules against your 28-day baseline</caption>
          <thead><tr><th scope="col">Signal</th><th scope="col">Compare with</th><th scope="col">Warning sign</th></tr></thead>
          <tbody>
            <tr><th scope="row">HRV</th><td>Your 28-day average</td><td>{RULES.hrvDropPct}% or more below</td></tr>
            <tr><th scope="row">Resting heart rate</th><td>Your 28-day average</td><td>{RULES.rhrRiseBpm} bpm or more above</td></tr>
            <tr><th scope="row">Sleep</th><td>Last night</td><td>Under {RULES.sleepMinHours} hours</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li><strong>No warning signs — Ready:</strong> train as planned.</li>
          <li><strong>One — Caution:</strong> keep it easy or shorter today.</li>
          <li><strong>Two or more — Recover:</strong> rest or move gently.</li>
        </ul>
        <p>In the Health app, open Browse → Heart → Heart Rate Variability and Resting Heart Rate, switch to M (month) to see your average, and check Sleep for last night. In athletes, a falling HRV trend is an early sign of accumulated fatigue (Plews 2013), and a resting heart rate several beats above normal often comes with poor sleep, alcohol or a coming cold. Day-to-day HRV swings of about 10% are normal, which is why the bar is set at {RULES.hrvDropPct}%.</p>
      </section>

      <section className="connect-wrap connect-section" aria-label="Readiness checker">
        <ReadinessChecker />
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="pro">
        <h2 id="pro">Get a daily readiness read automatically with P.R.O.</h2>
        <p className="tool-lead">P.R.O. is a free AI coach for Apple Health that runs these same checks every day — on any Apple Watch, and with other devices that write to Apple Health.</p>
        <ul>
          <li><strong>Readiness with reasons:</strong> your latest HRV and resting heart rate against your previous 28 days, plus last night’s sleep, give a status — ready, caution or recover — and the signals behind it.</li>
          <li><strong>No calibration week:</strong> the baseline comes from the history already in Apple Health, so if your watch has been recording, it works from day one.</li>
          <li><strong>Plans that adapt:</strong> the AI coach reads your readiness and training load (last 7 days against the last 4 weeks) and adjusts the next sessions of your plan.</li>
          <li><strong>Ask in your AI assistant:</strong> the same read is available in ChatGPT, Claude, Gemini, Grok, Perplexity, Codex, Claude Code and Cursor through the free <Link to="/apple-health-mcp">Apple Health MCP connector</Link> at https://mcp.proapp.uk — <a href="#ask-ai">see the example above</a>.</li>
          <li><strong>Other trackers:</strong> Garmin, WHOOP and Oura don’t write HRV to Apple Health, but WHOOP writes resting heart rate and Garmin and Oura write sleep — P.R.O. uses what arrives. See <Link to="/apple-health-sync">what each tracker syncs to Apple Health</Link>.</li>
        </ul>

        <h2 id="apps">Other recovery-score apps</h2>
        <p className="tool-lead">Apps such as Athlytic and Bevel also turn Apple Watch data into a recovery score.</p>
        <p>They focus on the score itself. P.R.O. is free to start, explains the reasons behind each day’s status, turns it into an adaptive training plan with an AI coach you can chat with, and brings your data into the AI assistant you already use. Full side-by-side: <Link to="/compare">P.R.O. vs Athlytic, Bevel, WHOOP and Apple Readiness</Link>.</p>
        <p>To set easy days by heart rate, use the <Link to="/zone-2-calculator">Zone 2 calculator</Link>.</p>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> reads HRV, resting heart rate and sleep from Apple Health — from Apple Watch or any device that syncs there — and tells you whether to push, ease off or recover, with the reasons.</p>
          <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
          <p className="tool-small">Prefer to ask ChatGPT or Claude? <Link to="/mcp-connect">Connect Apple Health to your AI assistant</Link> — the connector is free.</p>
        </div>
      </section>

      <section className="connect-wrap connect-section connect-questions" aria-labelledby="rd-faq">
        <div className="connect-section-heading"><h2 id="rd-faq">Readiness questions</h2></div>
        {readinessFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
        <h2 className="tool-sources-title">Sources</h2>
        <ul className="tool-sources">{readinessSources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
      </section>
    </div>
  );
}
