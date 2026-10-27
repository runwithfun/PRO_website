import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KORA, OURA, bandFor, hrvFaq, hrvSources, REVIEWED } from '../content/hrv';
import './mcp-connect.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const num = (v, lo, hi) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= lo && n <= hi ? n : null;
};
const statsFor = (band, sex, metric) => {
  if (sex === 'f' || sex === 'm') return band[sex][metric];
  const [fm, fs] = band.f[metric];
  const [mm, ms] = band.m[metric];
  return [(fm + mm) / 2, (fs + ms) / 2];
};

function HrvChecker() {
  const [age, setAge] = useState('35');
  const [sex, setSex] = useState('any');
  const [metric, setMetric] = useState('sdnn');
  const [value, setValue] = useState('42');
  const a = num(age, 18, 100);
  const v = num(value, 1, 300);
  const night = metric === 'night';
  const band = a ? bandFor(a) : null;
  const outside = a && (a < band.from || a > band.to);
  let headline = 'Enter your HRV to compare.';
  let scale = null;
  let note = null;
  if (night) {
    const ref = sex === 'f' ? OURA.women : sex === 'm' ? OURA.men : OURA.all;
    const mid = ref.median ?? ref.mean;
    if (v) {
      const r = v / mid;
      headline = <>Your {v} ms is <strong>{r < 0.75 ? 'below' : r > 1.3 ? 'above' : 'around'} the typical overnight HRV</strong>.</>;
    }
    const max = Math.max(100, (v ?? 0) + 20);
    scale = { max, mark: mid };
    note = <>Overnight HRV (RMSSD) of Oura members{sex === 'f' ? ', women' : sex === 'm' ? ', men' : ''}: {ref.median ? <>median {ref.median} ms, average {ref.mean} ms</> : <>average {ref.mean} ms</>}, from 6 million people of all ages (Jan–Aug 2026). No age breakdown is published, and HRV falls with age. WHOOP, Garmin and Recovery HRV on Apple Watch Series 12 also report overnight RMSSD, but each device measures a little differently.</>;
  } else if (band) {
    const [mean, sd] = statsFor(band, sex, 'sdnn');
    const lo = Math.max(1, Math.round(mean - sd));
    const hi = Math.round(mean + sd);
    if (v) headline = <>Your {v} ms is <strong>{v < lo ? 'lower than most people your age' : v > hi ? 'higher than most people your age' : 'within the typical range for your age'}</strong>.</>;
    scale = { max: Math.max(100, hi + 20, v ?? 0), lo, hi };
    note = <>Typical SDNN at {band.ages}{sex === 'any' ? '' : sex === 'f' ? ', women' : ', men'}: about {lo}–{hi} ms, average {Math.round(mean)} ms{outside ? ` (the study covered ages 25–74, so the nearest group is shown)` : ''}. From 5-minute resting ECGs (Voss et al. 2015); a one-minute wrist reading isn’t directly comparable and varies more. Your own 30-day trend matters more than this comparison.</>;
  }
  const pct = (x) => `${Math.min(100, (x / scale.max) * 100)}%`;
  return (
    <div className="tool-card" aria-labelledby="hrv-tool-title">
      <h3 id="hrv-tool-title" className="tool-title">Where does your HRV sit?</h3>
      <div className="tool-fields">
        <label>Age<input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
        <label>Sex<select value={sex} onChange={(e) => setSex(e.target.value)}><option value="any">Not set</option><option value="f">Female</option><option value="m">Male</option></select></label>
        <label>Your HRV, ms<input inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
        <label>Reading<select value={metric} onChange={(e) => setMetric(e.target.value)}><option value="sdnn">Apple Watch HRV in Health</option><option value="night">Overnight: WHOOP, Oura, Garmin, Recovery HRV</option></select></label>
      </div>
      {scale ? (
        <div className="tool-result" aria-live="polite">
          <p className="tool-headline">{headline}</p>
          <div className="tool-scale" aria-hidden="true">
            {scale.lo !== undefined && <span className="tool-scale-band" style={{ left: pct(scale.lo), width: `calc(${pct(scale.hi)} - ${pct(scale.lo)})` }} />}
            {scale.mark !== undefined && <span className="tool-scale-mark" style={{ left: pct(scale.mark) }} />}
            {v && <span className="tool-scale-dot" style={{ left: pct(v) }} />}
          </div>
          <p className="tool-note">{note}</p>
        </div>
      ) : <p className="tool-note">Enter an age between 18 and 100.</p>}
    </div>
  );
}

function BaselineChecker() {
  const [base, setBase] = useState('45');
  const [today, setToday] = useState('38');
  const b = num(base, 1, 300);
  const t = num(today, 1, 300);
  const diff = b && t ? Math.round(((t - b) / b) * 100) : null;
  let msg = '';
  if (diff !== null) {
    if (diff <= -20) msg = 'Well below your normal. Recover today: sleep, easy movement, no hard session. If it stays low for days without a reason, check in with a doctor.';
    else if (diff < -10) msg = 'Lower than usual. Keep training easy and look at sleep, alcohol, stress or a coming cold.';
    else if (diff <= 10) msg = 'Within your normal day-to-day variation.';
    else msg = 'Above your normal — usually a sign you are well recovered.';
  }
  return (
    <div className="tool-card" aria-labelledby="baseline-tool-title">
      <h3 id="baseline-tool-title" className="tool-title">Today vs your baseline</h3>
      <div className="tool-fields tool-fields-2">
        <label>30-day average HRV, ms<input inputMode="numeric" value={base} onChange={(e) => setBase(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
        <label>Today or 7-day average, ms<input inputMode="numeric" value={today} onChange={(e) => setToday(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
      </div>
      {diff !== null && (
        <div className="tool-result" aria-live="polite">
          <p className="tool-headline"><strong>{diff > 0 ? '+' : ''}{diff}%</strong> vs your average. {msg}</p>
          <p className="tool-note">In the Health app: Browse → Heart → Heart Rate Variability, switch to M (month) for your average. A single watch reading can be off by 20 ms or more, so a 7-day average is more reliable than one day. Swings of about ±10% are normal; this is a rule of thumb, not a diagnosis.</p>
        </div>
      )}
    </div>
  );
}

export default function GoodHrv() {
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">GUIDE · HEART RATE VARIABILITY</p>
        <h1 className="font-display font-extrabold tool-h1">What is a good HRV on Apple Watch?</h1>
        <div className="ag-answer"><p>There is no validated “normal HRV” chart for Apple Watch. The HRV in Health is <strong>SDNN</strong> (Series 12 and Ultra 4 add an overnight Recovery HRV), and in resting ECG studies healthy adults aged 25–34 average about <strong>50 ms</strong>, falling to about <strong>31 ms</strong> at 55–64 — with wide ranges. A good HRV is one that is stable or rising against <strong>your own 30-day average</strong>.</p></div>
        <p className="tool-reviewed">Last reviewed {REVIEWED} · Sources below · Not medical advice</p>
      </header>

      <section className="connect-wrap connect-section" aria-label="HRV tools">
        <div className="tool-grid"><HrvChecker /><BaselineChecker /></div>
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="measure">
        <h2 id="measure">What does Apple Watch actually measure?</h2>
        <p className="tool-lead">Apple Watch measures HRV as SDNN — the standard deviation of the intervals between normal heartbeats — in short readings taken while you are still.</p>
        <ul>
          <li><strong>When:</strong> in the background when you are still, by default about every four hours (more often with irregular rhythm notifications or AFib History on), and after every Breathe session in the Mindfulness app.</li>
          <li><strong>Where to see it:</strong> Health → Browse → Heart → Heart Rate Variability.</li>
          <li><strong>Accuracy:</strong> against a chest strap, Apple Watch read HRV about 8 ms lower on average, with sizeable individual errors (O’Grady 2024). Trends are more reliable than single readings.</li>
        </ul>

        <h2 id="recovery-hrv">Apple Watch HRV vs Recovery HRV</h2>
        <p className="tool-lead">Since September 2026, Apple Watch Series 12 and Ultra 4 show two kinds of HRV: Recovery HRV for daily stress and recovery, and overall HRV for broader health trends.</p>
        <ul>
          <li><strong>How often:</strong> Apple measures HRV up to 24 times more often than before. According to DC Rainmaker’s review, that is every five minutes overnight, averaged over your sleep.</li>
          <li><strong>Which formula:</strong> the same review reports that Recovery HRV and all values in the Vitals app are now RMSSD — the metric WHOOP, Oura and Garmin use. Apple’s own announcement doesn’t name it.</li>
          <li><strong>Baseline:</strong> overnight values are compared with your personal baseline; daytime values with your own history for the same time of day, at rest only.</li>
          <li><strong>Readiness:</strong> a 0–10 score (Recover, Pace yourself, Ready, Go for it) from activity, vitals and sleep. It needs at least seven nights of sleep tracked with the watch.</li>
        </ul>
        <div className="tool-table"><table>
          <caption className="sr-only">Which Apple Watch models have which HRV features</caption>
          <thead><tr><th scope="col">Apple Watch</th><th scope="col">HRV in Health (SDNN)</th><th scope="col">Recovery HRV and Readiness</th></tr></thead>
          <tbody>
            <tr><th scope="row">Series 12, Ultra 4</th><td>Yes</td><td>Yes</td></tr>
            <tr><th scope="row">Series 9–11, SE 3, Ultra 2–3 on watchOS 27</th><td>Yes</td><td>No</td></tr>
            <tr><th scope="row">Older models</th><td>Yes, on the latest watchOS they support</td><td>No</td></tr>
          </tbody>
        </table></div>

        <h2 id="norms">Normal HRV by age and sex</h2>
        <p className="tool-lead">HRV falls with age: in a population study of 1,906 adults, average SDNN dropped from about 50 ms at 25–34 to about 29 ms at 65–74.</p>
        <div className="tool-table"><table>
          <caption className="sr-only">Resting 5-minute ECG HRV by age and sex, mean ± SD (Voss et al. 2015)</caption>
          <thead><tr><th scope="col">Age</th><th scope="col">Women SDNN</th><th scope="col">Men SDNN</th><th scope="col">Women RMSSD</th><th scope="col">Men RMSSD</th></tr></thead>
          <tbody>{KORA.map((b) => <tr key={b.ages}><th scope="row">{b.ages}</th><td>{b.f.sdnn[0]} ± {b.f.sdnn[1]} ms</td><td>{b.m.sdnn[0]} ± {b.m.sdnn[1]} ms</td><td>{b.f.rmssd[0]} ± {b.f.rmssd[1]} ms</td><td>{b.m.rmssd[0]} ± {b.m.rmssd[1]} ms</td></tr>)}</tbody>
        </table></div>
        <p className="tool-small">Mean ± standard deviation from 5-minute resting ECGs lying down (KORA S4, Voss et al. 2015). A one-minute wrist reading uses a different sensor, window and posture, so it isn’t directly comparable. Differences between women and men are small and inconsistent across studies.</p>

        <h2 id="vs-whoop">Why is Apple Watch HRV lower than WHOOP or Oura?</h2>
        <p className="tool-lead">Because they measure different things at different times: Apple Watch takes SDNN readings while you are still, often during the day; WHOOP and Oura average RMSSD over your sleep, when HRV is highest.</p>
        <p>HRV follows a daily rhythm — highest early in the morning, lower in the evening (Fitbit data from 8 million people). Longer recordings also produce higher values. Recovery HRV on Series 12 and Ultra 4 is an overnight RMSSD too, so it lands much closer to WHOOP and Oura. Compare each device only with itself.</p>

        <h2 id="low">Why is my HRV low or dropping?</h2>
        <p className="tool-lead">The usual causes are poor or short sleep, alcohol, illness, hard training without recovery, stress and the time of day.</p>
        <ul>
          <li><strong>Alcohol:</strong> even small amounts lowered overnight HRV recovery in a study of 4,098 people, more with higher doses.</li>
          <li><strong>Training load:</strong> in athletes, a falling 7-day average is an early sign of accumulated fatigue.</li>
          <li><strong>Illness and stress:</strong> HRV often dips when your body is fighting something or under pressure.</li>
        </ul>

        <h2 id="consistent">How to get a consistent reading</h2>
        <p className="tool-lead">Do a one-minute Breathe session at the same time every morning, sitting still, and look at the weekly trend instead of single numbers.</p>

        <h2 id="doctor">When should I talk to a doctor?</h2>
        <p className="tool-lead">If your HRV stays well below your normal for more than a week without an obvious reason, or comes with symptoms such as chest pain, dizziness or palpitations.</p>
        <p>Apple Watch HRV is a wellness metric, not a diagnosis, and it can be distorted by irregular heart rhythms such as AFib.</p>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> reads your HRV, resting heart rate and sleep from Apple Health and shows how today compares with your own norm — and its AI coach can take it into account when you ask about training.</p>
          <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
          <p className="tool-small">Ask about your HRV in ChatGPT or Claude too: <Link to="/mcp-connect">connect Apple Health to your AI assistant</Link>.</p>
        </div>
      </section>

      <section className="connect-wrap connect-section connect-questions" aria-labelledby="hrv-faq">
        <div className="connect-section-heading"><h2 id="hrv-faq">HRV questions</h2></div>
        {hrvFaq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
        <h2 className="tool-sources-title">Sources</h2>
        <ul className="tool-sources">{hrvSources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
        <p className="tool-small">See also the <Link to="/zone-2-calculator">Zone 2 heart rate calculator</Link>.</p>
      </section>
    </div>
  );
}
