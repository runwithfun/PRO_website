import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { methods, hrmax, pctRange, hrrRange, zoneRanges, LAB_BAND, MAF_ADJUST, BY_AGE, BY_AGE_REST, zone2Faq, zone2Sources, REVIEWED } from '../content/zone2';
import './mcp-connect.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const num = (v, lo, hi) => {
  const n = Number(v);
  return v !== '' && Number.isFinite(n) && n >= lo && n <= hi ? n : null;
};
const digits = (v) => v.replace(/\D/g, '').slice(0, 3);
const bpm = (r) => `${r[0]}–${r[1]} bpm`;

// Two-option segmented control (buttons with aria-pressed).
function Seg({ label, value, onChange, options }) {
  return (
    <div className="z2-seg" role="group" aria-label={label}>
      {options.map(([v, text]) => <button type="button" key={v} aria-pressed={value === v} onClick={() => onChange(v)}>{text}</button>)}
    </div>
  );
}

// One bpm axis: five zones as background, the lab band, and every method as a bar.
function Scale({ list, main, zones, lab, zoneLabel }) {
  const all = [...list.map((m) => m.range), ...zones.map((z) => z.range)];
  const lo = Math.floor((Math.min(...all.map((x) => x[0])) - 3) / 10) * 10;
  const hi = Math.ceil((Math.max(...all.map((x) => x[1])) + 1) / 10) * 10;
  const pos = (x) => ((Math.min(Math.max(x, lo), hi) - lo) / (hi - lo)) * 100;
  const span = (r) => ({ left: `${pos(r[0])}%`, width: `${pos(r[1]) - pos(r[0])}%` });
  const ticks = [];
  for (let t = lo; t <= hi; t += 10) ticks.push(t);
  const groups = [
    { id: 'pct', title: 'Percent of max — conservative', items: list.filter((m) => !m.family) },
    { id: 'reserve', title: 'Heart rate reserve / MAF — closer to lab tests', items: list.filter((m) => m.family === 'reserve') },
  ];
  return (
    <figure className="z2-scale">
      <figcaption className="z2-scale-cap">Zone 2 by method on one heart rate scale</figcaption>
      <div className="z2-plot">
        <div className="z2-bg" aria-hidden="true">
          {zones.map((z) => <span key={z.z} className={`z2-zone z2-zone-${z.z}`} style={span(z.range)}><b>Z{z.z}</b></span>)}
          {ticks.map((t) => <span key={t} className="z2-grid" style={{ left: `${pos(t)}%` }} />)}
          <span className="z2-lab" style={span(lab)} />
        </div>
        {groups.map((g) => <div className="z2-group" key={g.id}>
          <p className="z2-group-title">{g.title}</p>
          <ul aria-label={g.title}>
            {g.items.map((m) => <li className={`z2-row${m === main ? ' is-main' : ''}`} key={m.id}>
              <span className="z2-row-label"><span>{m.name}{m === main ? <span className="sr-only"> (your main method)</span> : null}</span><span className="z2-row-bpm">{bpm(m.range)}</span></span>
              <span className="z2-row-track" aria-hidden="true"><span className="z2-row-bar" style={span(m.range)} /></span>
            </li>)}
          </ul>
        </div>)}
      </div>
      <div className="z2-axis" aria-hidden="true">{ticks.map((t) => <span key={t} className={(t / 10) % 2 ? 'is-odd' : ''} style={{ left: `${pos(t)}%` }}>{t}</span>)}</div>
      <p className="z2-legend"><span className="z2-key" aria-hidden="true" />Where lab tests often find Zone 2 in trained people: <strong>{bpm(lab)}</strong> (72–81% of max, Meixner 2025). Coloured bands are your five zones by {zoneLabel}.</p>
    </figure>
  );
}

// Apple Watch setup filled with the user's Zone 2.
function WatchCard({ range }) {
  const text = bpm(range);
  const ref = useRef(null);
  const [status, setStatus] = useState({ text: '', msg: '' });
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ text, msg: 'Copied' });
    } catch {
      const sel = window.getSelection();
      const r = document.createRange();
      r.selectNodeContents(ref.current);
      sel.removeAllRanges();
      sel.addRange(r);
      setStatus({ text, msg: 'Selected — copy it from your browser menu' });
    }
  };
  return (
    <section className="z2-watch" aria-labelledby="z2-watch-title">
      <h3 id="z2-watch-title">Set it on your Apple Watch</h3>
      <div className="z2-watch-copy">
        <span>Manual Zone 2</span>
        <strong ref={ref}>{text}</strong>
        <button type="button" className="z2-copy" onClick={copy}>Copy</button>
        <span className="z2-copy-status" role="status">{status.text === text ? status.msg : ''}</span>
      </div>
      <ol>
        <li><strong>Set Zone 2.</strong> On the watch: Settings → Workout → Heart Rate Zones → Manual → zone 2, then enter {range[0]} as the lower and {range[1]} as the upper limit. Or on iPhone: Apple Watch app → My Watch → Workout → Heart Rate Zones. Zones need your date of birth in the Health app.</li>
        <li><strong>Add an alert.</strong> In the Workout app, turn the Digital Crown to your workout, tap the Alerts button and set a heart rate alert for {range[0]}–{range[1]} bpm. Apple’s own example is 133–141 bpm for an Outdoor Run; the alert is used every time you do that workout.</li>
        <li><strong>Check time in zones afterwards.</strong> Fitness app on iPhone → Sessions → your workout → Show More next to Heart Rate: a graph shows the estimated time in each zone.</li>
      </ol>
      <p className="tool-small">Steps follow Apple’s watchOS 26 guide; menu and button names differ between watchOS and iOS versions.</p>
    </section>
  );
}

function Calculator({ age, setAge }) {
  const [sex, setSex] = useState('any');
  const [rest, setRest] = useState('');
  const [max, setMax] = useState('');
  const [mafAdj, setMafAdj] = useState(0);
  const [model, setModel] = useState('pct');
  const [zoneModel, setZoneModel] = useState('pct');
  const a = num(age, 13, 90);
  const rhr = num(rest, 30, 110);
  const known = num(max, 120, 230);
  const list = a ? methods({ age: a, sex, rest: rhr, knownMax: known, mafAdj }) : [];
  const useHrr = Boolean(rhr) && model === 'hrr';
  const main = (useHrr && list.find((m) => m.id === 'hrr')) || list[0];
  const pct = list.filter((m) => !m.family);
  const overlap = pct.length ? [Math.max(...pct.map((m) => m.range[0])), Math.min(...pct.map((m) => m.range[1]))] : null;
  const maxForZones = known ?? (a ? hrmax.classic(a) : 0);
  const zonesHrr = Boolean(rhr) && zoneModel === 'hrr';
  const zones = zoneRanges(zonesHrr ? 'hrr' : 'pct', maxForZones, rhr);
  const lab = pctRange(maxForZones, ...LAB_BAND);
  const maxLabel = known ? 'your known max' : '220 − age';
  const pickMain = (v) => { setModel(v); setZoneModel(v); };
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
      <div className="z2-options">
        <div className="z2-option">
          <span className="z2-option-label">Main method</span>
          {rhr ? <Seg label="Main method" value={model} onChange={pickMain} options={[['pct', '% of max'], ['hrr', 'Heart rate reserve']]} />
            : <p className="z2-option-hint">Add your resting heart rate to switch to the heart rate reserve (Karvonen) method.</p>}
        </div>
        <label className="z2-option">
          <span className="z2-option-label">MAF adjustment <span className="tool-opt">Maffetone</span></span>
          <select className="z2-select" value={mafAdj} disabled={Boolean(a) && a <= 16} onChange={(e) => setMafAdj(Number(e.target.value))}>
            {MAF_ADJUST.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
          </select>
        </label>
      </div>
      {main ? (
        <div className="tool-result" aria-live="polite">
          <p className="tool-big"><span>Your Zone 2</span><strong>{bpm(main.range)}</strong></p>
          <p className="tool-note">{main.name}. {main.note}</p>
          <Scale list={list} main={main} zones={zones} lab={lab} zoneLabel={zonesHrr ? 'heart rate reserve' : `% of max (${maxLabel})`} />
          <p className="tool-note">{pct.length > 1 && overlap[0] <= overlap[1] ? <>The percent-of-max formulas agree on <strong>{overlap[0]}–{overlap[1]} bpm</strong>, a safe place to start. </> : null}{rhr ? 'Heart rate reserve and MAF give' : 'MAF gives'} higher numbers, closer to lab results in trained people: maximal fat burning at about 72% of max and the first ventilatory threshold at about 81%. Age formulas can be off by 7–11 bpm or more for an individual, so use the talk test to fine-tune.{a > 65 && mafAdj === 5 ? ' Over 65, Maffetone says up to 10 more beats may be added in the +5 category, but not automatically.' : ''}</p>
          <div className="z2-zones-head">
            <h3 className="z2-h3">Your five heart rate zones</h3>
            {rhr ? <Seg label="Zone model" value={zoneModel} onChange={setZoneModel} options={[['pct', '% of max'], ['hrr', 'Heart rate reserve']]} /> : null}
          </div>
          <div className="tool-table tool-zones"><table>
            <caption className="sr-only">Five heart rate zones {zonesHrr ? `by heart rate reserve, resting ${rhr} and max ${Math.round(maxForZones)} bpm` : `from a maximum heart rate of ${Math.round(maxForZones)} bpm`}</caption>
            <thead><tr><th scope="col">Zone</th><th scope="col">bpm</th><th scope="col">How it feels</th></tr></thead>
            <tbody>{zones.map((z) => <tr key={z.z} className={z.z === 2 ? 'is-z2' : ''}><th scope="row">{z.z} · {z.name}</th><td>{z.range[0]}–{z.range[1]}</td><td>{z.feel}</td></tr>)}</tbody>
          </table></div>
          <p className="tool-small">{zonesHrr
            ? <>Zones as 50–60%, 60–70%, 70–80%, 80–90% and 90–100% of heart rate reserve: resting {rhr} + % × ({Math.round(maxForZones)} − {rhr}), the Karvonen method with {maxLabel}. Garmin and other sports watches can set zones this way.</>
            : <>Zones as percent of a max heart rate of {Math.round(maxForZones)} bpm ({maxLabel}), the same model P.R.O. uses by default.</>}</p>
          <WatchCard range={main.range} />
        </div>
      ) : <p className="tool-note">Enter an age between 13 and 90.</p>}
    </div>
  );
}

export default function Zone2Calculator() {
  const [age, setAge] = useState('35');
  const a = num(age, 13, 90);
  const nearest = a ? BY_AGE.reduce((b, x) => (Math.abs(x - a) < Math.abs(b - a) ? x : b)) : null;
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">TOOL · HEART RATE ZONES</p>
        <h1 className="font-display font-extrabold tool-h1">Zone 2 heart rate calculator</h1>
        <div className="ag-answer"><p>Zone 2 is usually <strong>60–70% of your maximum heart rate</strong> — about <strong>111–130 bpm at 35</strong> and <strong>102–119 bpm at 50</strong> with the classic 220 − age estimate. Enter your age, and your resting heart rate from Apple Health if you have it, to compare every common method at once.</p></div>
        <p className="tool-reviewed">Last reviewed {REVIEWED} · Sources below · Not medical advice</p>
      </header>

      <section className="connect-wrap connect-section" aria-label="Calculator"><Calculator age={age} setAge={setAge} /></section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="by-age">
        <h2 id="by-age">Zone 2 heart rate by age</h2>
        <p className="tool-lead">At 30, Zone 2 is about 114–133 bpm; at 40, 108–126 bpm; at 60, 96–112 bpm by 60–70% of 220 − age.</p>
        <div className="tool-table z2-age"><table>
          <caption className="sr-only">Zone 2 heart rate by age and method</caption>
          <thead><tr><th scope="col">Age</th><th scope="col">60–70% of 220 − age</th><th scope="col">60–70% of Tanaka max</th><th scope="col">60–70% of Gulati max (women)</th><th scope="col">Karvonen 60–70%, resting HR {BY_AGE_REST}</th><th scope="col">MAF ceiling</th></tr></thead>
          <tbody>{BY_AGE.map((x) => {
            const c = pctRange(hrmax.classic(x), 0.6, 0.7);
            const t = pctRange(hrmax.tanaka(x), 0.6, 0.7);
            const g = pctRange(hrmax.gulati(x), 0.6, 0.7);
            const k = hrrRange(hrmax.classic(x), BY_AGE_REST, 0.6, 0.7);
            return <tr key={x} className={x === nearest ? 'is-you' : ''}><th scope="row">{x}{x === nearest ? <span className="z2-you">your age</span> : null}</th><td>{bpm(c)}</td><td>{bpm(t)}</td><td>{bpm(g)}</td><td>{bpm(k)}</td><td>{180 - x} bpm</td></tr>;
          })}</tbody>
        </table></div>
        <p className="tool-small">The Karvonen column assumes a resting heart rate of {BY_AGE_REST} bpm and a max of 220 − age; enter your own resting heart rate in the calculator. MAF is before Maffetone’s adjustments.</p>

        <h2 id="140-bpm">Is 140 bpm Zone 2?</h2>
        <p className="tool-lead">It depends on your age and the method: 140 bpm is Zone 2 by 60–70% of 220 − age only up to age 20, by heart rate reserve (resting 60) at roughly 27–45, and it is the MAF ceiling at 40.</p>
        <p>That is why one number from a forum or a friend’s watch rarely fits you. Enter your age and resting heart rate above to see where 140 bpm falls on your own scale.</p>

        <h2 id="differ">Why do Zone 2 calculators give different numbers?</h2>
        <p className="tool-lead">Because they use different formulas: for the same person, percent of max, heart rate reserve and MAF can differ by 20–30 bpm.</p>
        <ul>
          <li><strong>Percent of max</strong> (60–70%) depends only on your maximum heart rate. 220 − age is the classic estimate; Tanaka (208 − 0.7 × age) fits older adults better.</li>
          <li><strong>Heart rate reserve (Karvonen)</strong> adds your resting heart rate: resting + (max − resting) × 60–70%. It is more personal and usually gives higher numbers. By the ACSM’s general-population labels, 60% of reserve or more already counts as vigorous, so confirm it with the talk test.</li>
          <li><strong>MAF</strong> (180 − age) is an aerobic ceiling from coach Phil Maffetone, with adjustments for health and training history; it hasn’t been validated in research but is popular with runners.</li>
          <li><strong>Lab tests</strong> (lactate around 2 mmol/L or the first ventilatory threshold) are the gold standard; fixed percentages only approximate them. In 50 trained cyclists the first ventilatory threshold averaged 81% of measured max heart rate, with big differences between people (Meixner 2025).</li>
        </ul>

        <h2 id="zone-2-vs-zone-3">Zone 2 vs Zone 3</h2>
        <p className="tool-lead">In the common five-zone model, Zone 2 is 60–70% of max heart rate (full sentences) and Zone 3 is 70–80% (a few sentences at a time).</p>
        <p>Research papers often use a three-zone model instead, where zone 1 is everything below the first lactate or ventilatory threshold — so a study’s “zone 2” sits between the two thresholds and is harder than a watch’s Zone 2 (Seiler 2010). A 2025 panel of 14 sport scientists and coaches defined Zone 2 training as just below the first threshold (Sitko 2025).</p>

        <h2 id="apple-watch">How does Apple Watch calculate heart rate zones?</h2>
        <p className="tool-lead">Apple Watch sets five heart rate zones automatically from your age and heart rate data in Health, and you can set zones 2–4 yourself.</p>
        <ol>
          <li>Make sure your date of birth is set in the Health app — zones need it.</li>
          <li>On Apple Watch open Settings → Workout → Heart Rate Zones (or the Apple Watch app on iPhone → My Watch → Workout → Heart Rate Zones).</li>
          <li>Choose Manual to enter your own Zone 2 limits, for example the range from this calculator.</li>
          <li>Optional: in the Workout app, add a heart rate alert for that range to your workout’s alerts, so the watch taps you when you drift out of Zone 2. Apple’s own example is 133–141 bpm for an outdoor run; menu names differ slightly between watchOS versions.</li>
        </ol>
        <p>During a workout, the Workout app can show a Heart Rate Zones view with the time you spend in each zone. Apple says its zones are a percentage of your maximum heart rate, personalised with your health data, but doesn’t say how it estimates that maximum — so its Zone 2 may differ from this calculator. These steps match watchOS 26 and 27. The calculator card above fills in your own numbers.</p>

        <h2 id="accuracy">Is Apple Watch accurate enough for Zone 2?</h2>
        <p className="tool-lead">For steady running and cycling, usually yes: against ECG, Apple Watch agreed well (concordance 0.92), second only to a Polar chest strap (0.996), in a Cleveland Clinic study.</p>
        <p>All wrist devices were least accurate on an elliptical with arm levers (Gillinov 2017), and that study tested an early Apple Watch. Wear the watch snugly; for intervals, rowing or other arm-heavy exercise, a chest strap is more reliable.</p>

        <h2 id="cycling">Zone 2 for cycling vs running</h2>
        <p className="tool-lead">Heart rate at the same effort is often a few beats lower on a bike, but the difference varies a lot between people.</p>
        <p>In 16 triathletes, threshold heart rate averaged 154 bpm cycling and 157 bpm running, yet the individual error between the two was about 12 bpm (Carey 2009). In 371 athletes, threshold heart rates in cycling and running didn’t correlate (Roecker 2003). If you do both, use a cycling max or a cycling test for bike zones.</p>

        <h2 id="walking">Can walking be Zone 2?</h2>
        <p className="tool-lead">Yes, for many people: the CDC counts brisk walking (about 2.5 mph or faster) as moderate intensity, and the ACSM puts moderate intensity at 64–76% of max heart rate, overlapping Zone 2.</p>
        <p>Beginners, older adults and people coming back to exercise often reach Zone 2 at a brisk walk. Fitter people usually need hills, a treadmill incline or very easy jogging.</p>

        <h2 id="women">Zone 2 heart rate for women</h2>
        <p className="tool-lead">The same methods apply; the Gulati formula (206 − 0.88 × age), built from data on 5,437 women, gives a maximum and Zone 2 a few beats lower than 220 − age.</p>

        <h2 id="over-50">Zone 2 after 50 and 60</h2>
        <p className="tool-lead">At 50, Zone 2 is about 102–119 bpm by 220 − age or 104–121 bpm by Tanaka; at 60, 96–112 bpm or 100–116 bpm.</p>
        <p>Tanaka’s formula fits older adults better than 220 − age. Beta-blockers and some other medications lower heart rate, so a formula won’t fit — ask your doctor for your zones (American Heart Association). The WHO also advises adults over 65 to add balance and strength activities on three or more days a week.</p>

        <h2 id="how-much">How much Zone 2 per week?</h2>
        <p className="tool-lead">The WHO recommends 150–300 minutes of moderate activity (or 75–150 minutes vigorous) a week plus two days of strength training; many coaches suggest about three hours of Zone 2 over three to four sessions.</p>
        <p>Zone 2 is popular for building an aerobic base and for longevity, but a 2025 review found no evidence that it is uniquely better than higher intensities for fitness. Most plans combine plenty of easy Zone 2 with one or two harder sessions.</p>

        <h2 id="session-length">How long should a Zone 2 session be?</h2>
        <p className="tool-lead">There is no research-based minimum — the WHO 2020 guidelines dropped the 10-minute rule — but 30–45 minutes suits beginners and 60–90 minutes is common for endurance athletes.</p>
        <p>In long steady sessions heart rate drifts upward at the same pace (in triathletes, 159 bpm in a 30-minute time trial vs 154 bpm at threshold in a ramp test), so slow down to stay in range.</p>

        <h2 id="sample-week">Sample Zone 2 week</h2>
        <p className="tool-lead">One example with about three hours of Zone 2, one harder session and two strength days:</p>
        <div className="tool-table z2-week"><table>
          <caption className="sr-only">Example Zone 2 training week</caption>
          <thead><tr><th scope="col">Day</th><th scope="col">Session</th></tr></thead>
          <tbody>
            <tr><th scope="row">Mon</th><td>Rest or an easy walk</td></tr>
            <tr><th scope="row">Tue</th><td>45 min Zone 2 — run, ride or brisk incline walk</td></tr>
            <tr><th scope="row">Wed</th><td>Strength, 30–45 min</td></tr>
            <tr><th scope="row">Thu</th><td>45 min Zone 2</td></tr>
            <tr><th scope="row">Fri</th><td>Strength or rest</td></tr>
            <tr><th scope="row">Sat</th><td>75–90 min long Zone 2</td></tr>
            <tr><th scope="row">Sun</th><td>Intervals, e.g. 4 × 4 min hard with 3 min easy</td></tr>
          </tbody>
        </table></div>
        <p>Start with less if you are new to training, and add time gradually.</p>

        <h2 id="talk-test">Check it with the talk test</h2>
        <p className="tool-lead">In Zone 2 you can speak in full sentences but wouldn’t want to sing; if you can only say a few words, slow down.</p>
        <p>Age formulas can be off by 7–11 bpm or more for an individual, so let the talk test have the final word. Heart rate formulas don’t apply if you take beta-blockers or have a heart condition — ask your doctor for your zones.</p>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> reads your workouts and heart rate from Apple Health — from Apple Watch, Garmin, WHOOP, Oura or any app that writes there — shows the heart rate zones of every workout and lets you set your own zones; its AI coach answers questions about your training with your real numbers.</p>
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
