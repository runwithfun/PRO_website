import { useState } from 'react';
import { Link } from 'react-router-dom';
import { methods, hrmax, pctRange, ZONES, BY_AGE, zone2Faq, zone2Sources, REVIEWED } from '../content/zone2';
import './mcp-connect.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const num = (v, lo, hi) => {
  const n = Number(v);
  return v !== '' && Number.isFinite(n) && n >= lo && n <= hi ? n : null;
};
const digits = (v) => v.replace(/\D/g, '').slice(0, 3);

function Calculator() {
  const [age, setAge] = useState('35');
  const [sex, setSex] = useState('any');
  const [rest, setRest] = useState('');
  const [max, setMax] = useState('');
  const a = num(age, 13, 90);
  const rhr = num(rest, 30, 110);
  const known = num(max, 120, 230);
  const list = a ? methods({ age: a, sex, rest: rhr, knownMax: known }) : [];
  const main = list[0];
  const lo = list.length ? Math.min(...list.map((m) => m.range[0])) - 8 : 0;
  const hi = list.length ? Math.max(...list.map((m) => m.range[1])) + 8 : 1;
  const pos = (x) => `${((x - lo) / (hi - lo)) * 100}%`;
  const overlap = list.length ? [Math.max(...list.map((m) => m.range[0])), Math.min(...list.map((m) => m.range[1]))] : null;
  const maxForZones = known ?? (a ? hrmax.classic(a) : 0);
  return (
    <div className="tool-card tool-card-wide" aria-labelledby="z2-tool-title">
      <h2 id="z2-tool-title" className="tool-title">Zone 2 heart rate calculator</h2>
      <div className="tool-fields">
        <label>Age<input inputMode="numeric" value={age} onChange={(e) => setAge(digits(e.target.value))} /></label>
        <label>Sex<select value={sex} onChange={(e) => setSex(e.target.value)}><option value="any">Not set</option><option value="f">Female</option><option value="m">Male</option></select></label>
        <label><span>Resting HR<span className="tool-opt">optional</span></span><input inputMode="numeric" placeholder="e.g. 60" value={rest} onChange={(e) => setRest(digits(e.target.value))} /></label>
        <label><span>Max HR<span className="tool-opt">if known</span></span><input inputMode="numeric" placeholder="e.g. 188" value={max} onChange={(e) => setMax(digits(e.target.value))} /></label>
      </div>
      <p className="tool-hint">Resting heart rate: Health → Browse → Heart → Resting Heart Rate (use the monthly average). Max heart rate: the highest reading from a hard, all-out effort.</p>
      {main ? (
        <div className="tool-result" aria-live="polite">
          <p className="tool-big"><span>Your Zone 2</span><strong>{main.range[0]}–{main.range[1]} bpm</strong></p>
          <p className="tool-note">{main.name}. {main.note}</p>
          <div className="tool-methods" role="list" aria-label="Zone 2 by method">
            {list.map((m) => <div className="tool-method" role="listitem" key={m.id}>
              <span className="tool-method-name">{m.name}</span>
              <span className="tool-track"><span className={`tool-bar${m === main ? ' is-main' : ''}`} style={{ left: pos(m.range[0]), width: `calc(${pos(m.range[1])} - ${pos(m.range[0])})` }} /></span>
              <span className="tool-method-bpm">{m.range[0]}–{m.range[1]}</span>
            </div>)}
          </div>
          <p className="tool-note">{overlap[0] <= overlap[1] ? <>All methods agree on <strong>{overlap[0]}–{overlap[1]} bpm</strong>, a safe place to start.</> : <>The methods don’t overlap here — start with the main range and confirm it with the talk test.</>} Formulas can be off by about ±11 bpm for an individual, so use the talk test to fine-tune.</p>
          <div className="tool-table tool-zones"><table>
            <caption className="sr-only">Five heart rate zones from a maximum heart rate of {Math.round(maxForZones)} bpm</caption>
            <thead><tr><th scope="col">Zone</th><th scope="col">bpm</th><th scope="col">How it feels</th></tr></thead>
            <tbody>{ZONES.map((z) => { const [l, h] = pctRange(maxForZones, z.lo, z.hi); return <tr key={z.z} className={z.z === 2 ? 'is-z2' : ''}><th scope="row">{z.z} · {z.name}</th><td>{l}–{z.z === 5 ? h : h - 1}</td><td>{z.feel}</td></tr>; })}</tbody>
          </table></div>
          <p className="tool-small">Zones as percent of a max heart rate of {Math.round(maxForZones)} bpm ({known ? 'your known max' : '220 − age'}), the same model P.R.O. uses by default.</p>
        </div>
      ) : <p className="tool-note">Enter an age between 13 and 90.</p>}
    </div>
  );
}

export default function Zone2Calculator() {
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">TOOL · HEART RATE ZONES</p>
        <h1 className="font-display font-extrabold tool-h1">Zone 2 heart rate calculator</h1>
        <div className="ag-answer"><p>Zone 2 is usually <strong>60–70% of your maximum heart rate</strong> — about <strong>111–130 bpm at 35</strong> and <strong>102–119 bpm at 50</strong> with the classic 220 − age estimate. Enter your age, and your resting heart rate from Apple Health if you have it, to compare every common method at once.</p></div>
        <p className="tool-reviewed">Last reviewed {REVIEWED} · Sources below · Not medical advice</p>
      </header>

      <section className="connect-wrap connect-section" aria-label="Calculator"><Calculator /></section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="by-age">
        <h2 id="by-age">Zone 2 heart rate by age</h2>
        <p className="tool-lead">At 30, Zone 2 is about 114–133 bpm; at 40, 108–126 bpm; at 60, 96–112 bpm by 60–70% of 220 − age.</p>
        <div className="tool-table"><table>
          <caption className="sr-only">Zone 2 heart rate by age and method</caption>
          <thead><tr><th scope="col">Age</th><th scope="col">60–70% of 220 − age</th><th scope="col">60–70% of Tanaka max</th><th scope="col">MAF ceiling</th></tr></thead>
          <tbody>{BY_AGE.map((age) => { const c = pctRange(hrmax.classic(age), 0.6, 0.7); const t = pctRange(hrmax.tanaka(age), 0.6, 0.7); return <tr key={age}><th scope="row">{age}</th><td>{c[0]}–{c[1]} bpm</td><td>{t[0]}–{t[1]} bpm</td><td>{180 - age} bpm</td></tr>; })}</tbody>
        </table></div>

        <h2 id="differ">Why do Zone 2 calculators give different numbers?</h2>
        <p className="tool-lead">Because they use different formulas: for the same person, percent of max, heart rate reserve and MAF can differ by 20–30 bpm.</p>
        <ul>
          <li><strong>Percent of max</strong> (60–70%) depends only on your maximum heart rate. 220 − age is the classic estimate; Tanaka (208 − 0.7 × age) fits older adults better.</li>
          <li><strong>Heart rate reserve (Karvonen)</strong> adds your resting heart rate: resting + (max − resting) × 60–70%. It is more personal and usually gives higher numbers.</li>
          <li><strong>MAF</strong> (180 − age) is an aerobic ceiling from coach Phil Maffetone; it hasn’t been validated in research but is popular with runners.</li>
          <li><strong>Lab tests</strong> (lactate around 2 mmol/L or the first ventilatory threshold) are the gold standard; fixed percentages only approximate them.</li>
        </ul>

        <h2 id="apple-watch">How does Apple Watch calculate heart rate zones?</h2>
        <p className="tool-lead">Apple Watch sets five heart rate zones automatically from your age and heart rate data in Health, and you can set zones 2–4 yourself.</p>
        <ol>
          <li>Make sure your date of birth is set in the Health app — zones need it.</li>
          <li>On Apple Watch open Settings → Workout → Heart Rate Zones (or the Watch app on iPhone → Workout → Heart Rate Zones).</li>
          <li>Choose Manual to enter your own Zone 2 limits, for example the range from this calculator.</li>
        </ol>
        <p>During a workout, the Workout app can show a Heart Rate Zones view with the time you spend in each zone. Apple doesn’t publish its exact zone percentages, so its Zone 2 may differ from this calculator.</p>

        <h2 id="women">Zone 2 heart rate for women</h2>
        <p className="tool-lead">The same methods apply; the Gulati formula (206 − 0.88 × age), built from data on 5,437 women, gives a maximum and Zone 2 a few beats lower than 220 − age.</p>

        <h2 id="how-much">How much Zone 2 per week?</h2>
        <p className="tool-lead">The WHO recommends 150–300 minutes of moderate activity a week; many coaches suggest about three hours of Zone 2 over three to four sessions.</p>
        <p>Zone 2 is popular for building an aerobic base and for longevity, but a 2025 review found no evidence that it is uniquely better than higher intensities for fitness. Most plans combine plenty of easy Zone 2 with one or two harder sessions.</p>

        <h2 id="talk-test">Check it with the talk test</h2>
        <p className="tool-lead">In Zone 2 you can speak in full sentences but wouldn’t want to sing; if you can only say a few words, slow down.</p>
        <p>Formulas can be off by about ±11 bpm for an individual, so let the talk test have the final word. Heart rate formulas don’t apply if you take beta-blockers or have a heart condition — ask your doctor for your zones.</p>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> reads your workouts and heart rate from Apple Health, shows the heart rate zones of every workout and lets you set your own zones — and its AI coach answers questions about your training with your real numbers.</p>
          <a className="tool-btn" href={APP_STORE} target="_blank" rel="noopener">Get P.R.O. — free on the App Store</a>
          <p className="tool-small">Ask ChatGPT or Claude about your Zone 2 runs with your real data: <Link to="/mcp-connect">connect Apple Health to your AI assistant</Link>.</p>
        </div>
      </section>

      <section className="connect-wrap connect-section connect-questions" aria-labelledby="z2-faq">
        <div className="connect-section-heading"><h2 id="z2-faq">Zone 2 questions</h2></div>
        {zone2Faq.map((f) => <details className="connect-question" key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}
        <h2 className="tool-sources-title">Sources</h2>
        <ul className="tool-sources">{zone2Sources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener nofollow">{t}</a></li>)}</ul>
        <p className="tool-small">See also: <Link to="/what-is-a-good-hrv">what is a good HRV on Apple Watch</Link>.</p>
      </section>
    </div>
  );
}
