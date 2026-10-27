import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { KORA, OURA, GRID_MS, approxPercentile, bandFor, classify, hrvFaq, hrvSources, rangeFor, statsFor, REVIEWED } from '../content/hrv';
import './mcp-connect.css';
import './tools.css';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const num = (v, lo, hi) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= lo && n <= hi ? n : null;
};
const METRIC_NAME = { sdnn: 'SDNN', rmssd: 'RMSSD' };
const sexWord = (sex) => (sex === 'f' ? 'women' : sex === 'm' ? 'men' : 'people');
const sexNote = (sex) => (sex === 'f' ? 'women' : sex === 'm' ? 'men' : 'women and men combined');
const pctLabel = (p) => (p < 5 ? 'below the 5th percentile' : p > 95 ? 'above the 95th percentile' : `about the ${Math.round(p / 5) * 5}th percentile`);

// Tracks the rendered width so chart text stays at a readable pixel size.
// Starts from a fixed width so the prerendered HTML and the first client render match.
function useWidth(initial) {
  const ref = useRef(null);
  const [width, setWidth] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

const PAD = { l: 34, r: 12, t: 28, b: 30 };
const AGE_FROM = 25;
const AGE_TO = 75;

function HrvAgeChart({ sex, metric, age, value }) {
  const [ref, w] = useWidth(640);
  const h = w < 480 ? 240 : 290;
  const rows = KORA.map((b) => ({ b, s: statsFor(b, sex, metric) }));
  const top = Math.max(...rows.map(({ s }) => s[0] + s[1]));
  const yMax = Math.min(200, Math.ceil(Math.max(top + 5, value ? value + 10 : 0) / 20) * 20);
  const step = yMax > 120 ? 40 : 20;
  const r1 = (n) => Math.round(n * 10) / 10;
  const x = (a) => r1(PAD.l + ((a - AGE_FROM) / (AGE_TO - AGE_FROM)) * (w - PAD.l - PAD.r));
  const y = (v) => r1(PAD.t + (1 - Math.min(v, yMax) / yMax) * (h - PAD.t - PAD.b));
  const ticks = Array.from({ length: yMax / step + 1 }, (_, i) => i * step);
  const youBand = age ? bandFor(age) : null;
  const point = age && value ? { x: x(Math.min(74, Math.max(25, age)) + 0.5), y: y(value) } : null;
  const anchor = point && point.x > w - 70 ? 'end' : point && point.x < PAD.l + 40 ? 'start' : 'middle';
  const labelY = point && point.y < PAD.t + 24 ? 24 : -14;
  const first = Math.round(rows[0].s[0]);
  const last = Math.round(rows[rows.length - 1].s[0]);
  const label = `HRV by age chart, ${METRIC_NAME[metric]} from 5-minute resting ECGs, ${sexNote(sex)}. The average falls from ${first} ms at 25–34 to ${last} ms at 65–74; the shaded band is the typical range, mean ± 1 SD.${point ? ` Your ${value} ms at age ${age} is marked.` : ''}`;
  return (
    <div ref={ref}>
      <svg className="hrv-svg" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
        {ticks.map((t) => (
          <g key={t}>
            <line className="hrv-grid-line" x1={PAD.l} x2={w - PAD.r} y1={y(t)} y2={y(t)} />
            <text className="hrv-axis" x={PAD.l - 8} y={y(t) + 4} textAnchor="end">{t}</text>
          </g>
        ))}
        <text className="hrv-axis" x={PAD.l - 8} y={10} textAnchor="end">ms</text>
        {rows.map(({ b, s: [mean, sd] }) => (
          <g key={b.ages}>
            <rect className={`hrv-band${youBand === b ? ' is-you' : ''}`} x={x(b.from) + 2} width={x(b.to + 1) - x(b.from) - 4} y={y(mean + sd)} height={y(Math.max(0, mean - sd)) - y(mean + sd)} rx="6" />
            <line className="hrv-mean" x1={x(b.from) + 8} x2={x(b.to + 1) - 8} y1={y(mean)} y2={y(mean)} />
            <text className={`hrv-axis${youBand === b ? ' is-you' : ''}`} x={(x(b.from) + x(b.to + 1)) / 2} y={h - 8} textAnchor="middle">{b.ages}</text>
          </g>
        ))}
        <polyline className="hrv-trend" points={rows.map(({ b, s }) => `${(x(b.from) + x(b.to + 1)) / 2},${y(s[0])}`).join(' ')} />
        {point && (
          <g className="hrv-you" style={{ transform: `translate(${point.x}px, ${point.y}px)` }}>
            <circle r="7" />
            <text y={labelY} textAnchor={anchor} dx={anchor === 'end' ? 8 : anchor === 'start' ? -8 : 0}>You · {value} ms</text>
          </g>
        )}
      </svg>
    </div>
  );
}

function HrvChecker({ age, setAge, sex, setSex }) {
  const [reading, setReading] = useState('sdnn');
  const [chart, setChart] = useState('sdnn');
  const [value, setValue] = useState('42');
  const a = num(age, 18, 100);
  const v = num(value, 1, 300);
  const night = reading === 'night';
  const band = a ? bandFor(a) : null;
  const outside = a && (a < band.from || a > band.to);
  const pickReading = (r) => {
    setReading(r);
    if (r !== 'night') setChart(r);
  };
  let headline = 'Enter your HRV to compare.';
  let pct = null;
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
    note = <>Overnight HRV (RMSSD) of Oura members{sex === 'f' ? ', women' : sex === 'm' ? ', men' : ''}: {ref.median ? <>median {ref.median} ms, average {ref.mean} ms</> : <>average {ref.mean} ms</>}, from 6 million people of all ages (Jan–Aug 2026). No age breakdown is published, and HRV falls with age. WHOOP, Garmin and Recovery HRV on Apple Watch Series 12 also report overnight RMSSD, but each device measures a little differently. The age chart uses short daytime ECG readings, so it isn’t shown for overnight values.</>;
  } else if (band) {
    const stats = statsFor(band, sex, reading);
    const [lo, hi] = rangeFor(stats);
    const cls = v ? classify(v, [lo, hi]) : null;
    if (v) {
      headline = <>Your {v} ms is <strong>{cls === 'below' ? 'lower than most people your age' : cls === 'above' ? 'higher than most people your age' : 'within the typical range for your age'}</strong>.</>;
      pct = <>That’s {pctLabel(approxPercentile(v, stats))} for {sexWord(sex)} aged {band.ages} <span>(approximate)</span>.</>;
    }
    note = <>Typical {METRIC_NAME[reading]} at {band.ages}{sex === 'any' ? '' : sex === 'f' ? ', women' : ', men'}: about {lo}–{hi} ms, average {Math.round(stats[0])} ms{outside ? ` (the study covered ages 25–74, so the nearest group is shown)` : ''}. From 5-minute resting ECGs lying down (Voss et al. 2015); {reading === 'sdnn' ? 'a one-minute wrist reading isn’t directly comparable and varies more' : 'a morning reading taken lying still with a chest strap comes closest, but apps and positions differ'}. The percentile is an estimate from the study’s mean ± SD, assuming a log-normal spread, not from individual data. Your own 30-day trend matters more than this comparison.</>;
  }
  const pctPos = (x) => `${Math.min(100, (x / scale.max) * 100)}%`;
  return (
    <div className="tool-card hrv-card" aria-labelledby="hrv-tool-title">
      <h3 id="hrv-tool-title" className="tool-title">Where does your HRV sit for your age?</h3>
      <div className="tool-fields">
        <label>Age<input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
        <label>Sex<select value={sex} onChange={(e) => setSex(e.target.value)}><option value="any">Not set</option><option value="f">Female</option><option value="m">Male</option></select></label>
        <label>Your HRV, ms<input inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, 3))} /></label>
        <label>Reading<select value={reading} onChange={(e) => pickReading(e.target.value)}><option value="sdnn">Apple Watch (SDNN)</option><option value="rmssd">Morning RMSSD (strap or app)</option><option value="night">Overnight (WHOOP, Oura, Garmin, Recovery HRV)</option></select></label>
      </div>
      {night || band ? (
        <div className="tool-result" aria-live="polite">
          <p className="tool-headline">{headline}</p>
          {pct && <p className="hrv-pct">{pct}</p>}
          {scale && (
            <div className="tool-scale" aria-hidden="true">
              <span className="tool-scale-mark" style={{ left: pctPos(scale.mark) }} />
              {v && <span className="tool-scale-dot" style={{ left: pctPos(v) }} />}
            </div>
          )}
        </div>
      ) : <p className="tool-note">Enter an age between 18 and 100.</p>}
      {!night && (
        <div className="hrv-chart">
          <div className="hrv-chart-head">
            <p className="hrv-chart-title">HRV chart by age · {sexNote(sex)}</p>
            <div className="hrv-toggle" role="group" aria-label="Chart metric">
              {['sdnn', 'rmssd'].map((m) => <button type="button" key={m} aria-pressed={chart === m} onClick={() => setChart(m)}>{METRIC_NAME[m]}</button>)}
            </div>
          </div>
          <HrvAgeChart sex={sex} metric={chart} age={a} value={chart === reading ? v : null} />
          <div className="hrv-legend" aria-hidden="true">
            <span><i className="hrv-key-mean" />Average</span>
            <span><i className="hrv-key-band" />Typical range (mean ± 1 SD)</span>
            {chart === reading && v && a ? <span><i className="hrv-key-you" />You</span> : null}
          </div>
          {chart !== reading && v ? <p className="tool-small">Your reading is {METRIC_NAME[reading]}, so it isn’t plotted on the {METRIC_NAME[chart]} chart.</p> : null}
        </div>
      )}
      {note && <p className="tool-note">{note}</p>}
    </div>
  );
}

const fmtGroup = (cls, list) => (cls === 'below' ? `${list[list.length - 1]} ms or less` : cls === 'above' ? `${list[0]} ms or more` : list.length === 1 ? `${list[0]} ms` : `${list[0]}–${list[list.length - 1]} ms`);
const CELL = { below: 'Below', typical: 'Typical', above: 'Above' };

function IsGoodGrid({ age, sex }) {
  const a = num(age, 18, 100);
  const band = a ? bandFor(a) : KORA[1];
  const [lo, hi] = rangeFor(statsFor(band, sex, 'sdnn'));
  const groups = { below: [], typical: [], above: [] };
  GRID_MS.forEach((ms) => groups[classify(ms, [lo, hi])].push(ms));
  const verb = { below: 'is below typical', typical: 'is typical', above: 'is above typical' };
  const parts = ['below', 'typical', 'above'].filter((c) => groups[c].length).map((c) => `${fmtGroup(c, groups[c])} ${verb[c]}`);
  const sentence = parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}` : parts[0];
  return (
    <>
      <p className="tool-lead">At {a ?? 35}, an Apple Watch SDNN of {sentence} — the typical range for {band.ages}, {sexNote(sex)}, is about {lo}–{hi} ms.</p>
      <p>Each cell compares one value with the resting ECG range for that age group (Voss et al. 2015). It follows the age and sex set in the checker above.</p>
      <div className="tool-table hrv-table"><table>
        <caption className="sr-only">Is a given SDNN below, within or above the typical range (mean ± 1 SD) for each age group, {sexNote(sex)}</caption>
        <thead><tr><th scope="col">Age</th>{GRID_MS.map((ms) => <th scope="col" key={ms}>{ms}<span className="hrv-unit"> ms</span></th>)}</tr></thead>
        <tbody>{KORA.map((b) => {
          const range = rangeFor(statsFor(b, sex, 'sdnn'));
          return (
            <tr key={b.ages} className={b === band ? 'is-you' : undefined}>
              <th scope="row">{b.ages}</th>
              {GRID_MS.map((ms) => { const c = classify(ms, range); return <td key={ms} className={`hrv-cell is-${c}`}>{CELL[c]}</td>; })}
            </tr>
          );
        })}</tbody>
      </table></div>
      <div className="hrv-legend hrv-grid-legend">
        <span><i className="hrv-key-below" />Below: under the average minus 1 SD</span>
        <span><i className="hrv-key-typical" />Typical: within average ± 1 SD, where most people fall</span>
        <span><i className="hrv-key-above" />Above: over the average plus 1 SD</span>
      </div>
      <p className="tool-small">Above typical isn’t automatically better, and below typical isn’t a diagnosis. Apple Watch reads about 8 ms lower than a chest strap on average, so treat this as a rough guide and compare mostly with your own baseline.</p>
    </>
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
  const [age, setAge] = useState('35');
  const [sex, setSex] = useState('any');
  return (
    <div className="mcp-page tool-page">
      <header className="connect-intro connect-wrap">
        <p className="connect-eyebrow">GUIDE · HEART RATE VARIABILITY</p>
        <h1 className="font-display font-extrabold tool-h1">What is a good HRV on Apple Watch?</h1>
        <div className="ag-answer"><p>There is no validated “normal HRV” chart for Apple Watch. The HRV in Health is <strong>SDNN</strong> (Series 12 and Ultra 4 add an overnight Recovery HRV), and in resting ECG studies healthy adults aged 25–34 average about <strong>50 ms</strong>, falling to about <strong>31 ms</strong> at 55–64 — with wide ranges. A good HRV is one that is stable or rising against <strong>your own 30-day average</strong>.</p></div>
        <p className="tool-reviewed">Last reviewed {REVIEWED} · Sources below · Not medical advice</p>
      </header>

      <section className="connect-wrap connect-section" aria-label="HRV tools">
        <div className="hrv-stack"><HrvChecker age={age} setAge={setAge} sex={sex} setSex={setSex} /><BaselineChecker /></div>
      </section>

      <section className="connect-wrap connect-section tool-prose" aria-labelledby="is-good">
        <h2 id="is-good">Is 20, 30, 40 or 100 ms a good HRV?</h2>
        <IsGoodGrid age={age} sex={sex} />
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

        <h2 id="norms">Normal HRV by age and gender</h2>
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

        <h2 id="raise">How to raise your HRV</h2>
        <p className="tool-lead">Regular aerobic exercise, enough regular sleep, less alcohol and slow breathing are the best-supported ways to raise HRV — and a lasting change takes weeks to months, not days.</p>
        <ul>
          <li><strong>Aerobic training:</strong> in a meta-analysis of 16 randomised trials in healthy adults, exercise training raised resting RMSSD and SDNN compared with no training (Amekran 2024). Mostly easy, conversational-pace sessions are a sustainable way to train often — find your range with the <Link to="/zone-2-calculator">Zone 2 calculator</Link>.</li>
          <li><strong>Sleep, at regular times:</strong> in a meta-analysis of 11 randomised trials, sleep deprivation lowered RMSSD (Zhang 2025), and in 557 students tracked with Fitbit, going to bed 30 minutes or more later than usual raised heart rate during sleep (Faust 2020). Direct evidence that a fixed schedule itself raises HRV is still limited, but a steady routine also makes your readings comparable.</li>
          <li><strong>Alcohol:</strong> in 4,098 Finnish employees, alcohol lowered overnight HRV and recovery in a dose-dependent way — even low doses had a measurable effect (Pietilä 2018).</li>
          <li><strong>Slow breathing, about six breaths per minute:</strong> this is the “resonance” rate used in HRV biofeedback, where heart-rate swings are largest (Lehrer &amp; Gevirtz 2014). A meta-analysis of 223 studies found slow breathing raised vagally mediated HRV during a session, right after it, and after multi-session programmes (Laborde 2022). On Apple Watch, set Settings → Mindfulness → Breath Rate to 6 for Breathe sessions. Readings taken during or right after slow breathing are higher than passive ones, so keep the same routine if you compare days.</li>
          <li><strong>Body weight:</strong> in a systematic review, losing excess weight through diet and exercise tended to raise vagal markers such as RMSSD, though the evidence is of low quality and the pooled change in SDNN was not significant (Costa 2019).</li>
          <li><strong>Illness:</strong> infection lowers HRV — in health-care workers wearing Apple Watch, SDNN patterns changed in the week before a COVID-19 diagnosis (Hirten 2021). Rest and let it come back rather than chasing the number.</li>
          <li><strong>How long it takes:</strong> the exercise trials lasted from 4 weeks to 8 months, about 10 weeks on average. Alcohol, a short night or a cold can lower HRV within a night or a few days. Judge progress by your 30-day average.</li>
        </ul>

        <h2 id="consistent">How to get a consistent reading</h2>
        <p className="tool-lead">Do a one-minute Breathe session at the same time every morning, sitting still, and look at the weekly trend instead of single numbers.</p>

        <h2 id="doctor">When should I talk to a doctor?</h2>
        <p className="tool-lead">If your HRV stays well below your normal for more than a week without an obvious reason, or comes with symptoms such as chest pain, dizziness or palpitations.</p>
        <p>Apple Watch HRV is a wellness metric, not a diagnosis, and it can be distorted by irregular heart rhythms such as AFib.</p>

        <div className="tool-cta">
          <p><strong>P.R.O.</strong> reads your HRV, resting heart rate and sleep from Apple Health — from Apple Watch or any Garmin, WHOOP, Oura or other device that syncs there — and shows how today compares with your own norm — and its AI coach can take it into account when you ask about training.</p>
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
