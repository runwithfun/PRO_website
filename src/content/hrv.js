// "What is a good HRV on Apple Watch?" — data and copy.
// Norms: Voss et al. 2015 (KORA S4, 5-min resting ECG, n=1906), tables 5 and 7.
// Apple facts: HealthKit heartRateVariabilitySDNN docs, Apple white paper (Nov 2024),
// Apple Newsroom (Sept 2026, Recovery HRV), Apple Support "Monitor your heart rate" and
// "Readiness" (128112), DC Rainmaker Series 12 review (RMSSD, 5-minute sampling).
// Overnight RMSSD: Oura population figures (6M members, Jan–Aug 2026).
// Raising HRV: exercise RCT meta-analysis (Amekran 2024), slow breathing (Laborde 2022,
// Lehrer & Gevirtz 2014), sleep loss (Zhang 2025), bedtime shifts (Faust 2020), weight
// (Costa 2019), illness on Apple Watch (Hirten 2021), alcohol (Pietilä 2018).
// Reviewed October 27, 2026.

export const REVIEWED = 'October 27, 2026';

// SDNN and RMSSD, mean and SD in ms, by age band and sex.
export const KORA = [
  { ages: '25–34', from: 25, to: 34, f: { sdnn: [48.7, 19.0], rmssd: [42.9, 22.8] }, m: { sdnn: [50.0, 20.9], rmssd: [39.7, 19.9] } },
  { ages: '35–44', from: 35, to: 44, f: { sdnn: [45.4, 20.5], rmssd: [35.4, 18.5] }, m: { sdnn: [44.6, 16.8], rmssd: [32.0, 16.5] } },
  { ages: '45–54', from: 45, to: 54, f: { sdnn: [36.9, 13.8], rmssd: [26.3, 13.6] }, m: { sdnn: [36.8, 14.6], rmssd: [23.0, 10.9] } },
  { ages: '55–64', from: 55, to: 64, f: { sdnn: [30.6, 12.4], rmssd: [21.4, 11.9] }, m: { sdnn: [32.8, 14.7], rmssd: [19.9, 11.1] } },
  { ages: '65–74', from: 65, to: 74, f: { sdnn: [27.8, 11.8], rmssd: [19.1, 11.8] }, m: { sdnn: [29.6, 13.2], rmssd: [19.1, 10.7] } },
];

// Overnight RMSSD reference from Oura (all ages, ms).
export const OURA = { women: { mean: 39.1, median: 36 }, men: { mean: 42.8, median: 35 }, all: { mean: 41 } };

export const bandFor = (age) => KORA.find((b) => age >= b.from && age <= b.to) ?? (age < 25 ? KORA[0] : KORA[KORA.length - 1]);

// Mean and SD for one sex, or the plain average of women and men when sex is not set.
export const statsFor = (band, sex, metric) => {
  if (sex === 'f' || sex === 'm') return band[sex][metric];
  const [fm, fs] = band.f[metric];
  const [mm, ms] = band.m[metric];
  return [(fm + mm) / 2, (fs + ms) / 2];
};

// Typical range = mean ± 1 SD, rounded to whole ms.
export const rangeFor = ([mean, sd]) => [Math.max(1, Math.round(mean - sd)), Math.round(mean + sd)];
export const classify = (v, [lo, hi]) => (v < lo ? 'below' : v > hi ? 'above' : 'typical');

// Normal CDF via the Abramowitz–Stegun 7.1.26 erf approximation (error < 1.5e-7).
const normCdf = (z) => {
  const t = 1 / (1 + (0.3275911 * Math.abs(z)) / Math.SQRT2);
  const erf = 1 - t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-(z * z) / 2);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
};

// Approximate percentile of v, assuming a log-normal distribution with the study's mean and SD.
// HRV is right-skewed, so log-normal fits better than normal; it is still only an estimate.
export const approxPercentile = (v, [mean, sd]) => {
  const s2 = Math.log(1 + (sd / mean) ** 2);
  const mu = Math.log(mean) - s2 / 2;
  return 100 * normCdf((Math.log(v) - mu) / Math.sqrt(s2));
};

// Values shown in the "Is X ms a good HRV?" grid (SDNN, ms).
export const GRID_MS = [20, 30, 40, 50, 60, 70, 100];

export const hrvFaq = [
  {
    q: 'What is a good HRV on Apple Watch?',
    a: 'There is no validated "normal HRV" chart for Apple Watch. The HRV in Health is SDNN; in resting ECG studies, healthy adults aged 25–34 average about 50 ms SDNN and people aged 55–64 about 31 ms, with wide ranges. A good HRV is one that is stable or rising against your own 30-day average.',
  },
  {
    q: 'Does Apple Watch measure HRV as SDNN or RMSSD?',
    a: 'The classic HRV in Health is SDNN — the standard deviation of normal-to-normal beat intervals. WHOOP, Oura and Garmin show RMSSD, so their numbers are not directly comparable. On Series 12 and Ultra 4, Recovery HRV and the Vitals app use RMSSD, according to DC Rainmaker’s review.',
  },
  {
    q: 'What is Recovery HRV on Apple Watch?',
    a: 'Recovery HRV arrived with Apple Watch Series 12 and Ultra 4 (September 2026). Apple measures HRV up to 24 times more often than before; according to DC Rainmaker’s review it is now RMSSD, sampled every five minutes and averaged over your sleep, then compared with your personal baseline in the Vitals app and the Readiness score. Apple keeps a separate overall HRV for broader health trends.',
  },
  {
    q: 'Does my Apple Watch have Recovery HRV and Readiness?',
    a: 'Only Apple Watch Series 12 and Ultra 4 have Recovery HRV and the Readiness score. Older watches on watchOS 27 (Series 9 or later, SE 3, Ultra 2 or later) keep the classic SDNN reading in Health. Readiness needs at least seven nights of sleep tracked with the watch before it shows a score from 0 to 10.',
  },
  {
    q: 'Why is my Apple Watch HRV lower than my WHOOP or Oura HRV?',
    a: 'Different metric and different timing. Apple Watch measures SDNN in short readings while you are still, by default about every four hours, including during the day. WHOOP and Oura average RMSSD over your sleep, when HRV is highest. A study against a chest strap also found Apple Watch reads HRV about 8 ms lower on average. On Series 12 and Ultra 4, Recovery HRV is an overnight RMSSD value and is much closer to WHOOP and Oura.',
  },
  {
    q: 'Is 20 ms a bad HRV?',
    a: 'Not on its own. In resting ECG studies, 20 ms SDNN is below the typical range for adults under 55, but within it at 55–74, where the average is about 29–32 ms. Apple Watch also reads about 8 ms lower than a chest strap on average, and single readings vary a lot. If your 30-day average stays around 20 ms at a younger age, or has dropped there from a higher baseline, look at sleep, alcohol, fitness, illness and stress, and mention it to a doctor — a low number is not a diagnosis.',
  },
  {
    q: 'Is 30 ms a good HRV?',
    a: 'It depends on your age. 30 ms SDNN is around the average for people in their late 50s and 60s in resting ECG studies, and on the lower side for people in their 20s and 30s. On a watch, compare it with your own baseline rather than with other people.',
  },
  {
    q: 'Is 40 ms a good HRV?',
    a: '40 ms SDNN is close to the average for adults aged 35–44 in resting ECG studies and above average from 45 onwards. As an overnight RMSSD from WHOOP, Oura or Recovery HRV, 40 ms is about the average across Oura’s 6 million members. Either way, what matters is how it compares with your own baseline.',
  },
  {
    q: 'Is 50 ms a good HRV?',
    a: '50 ms SDNN is about the average for adults aged 25–34 in resting ECG studies and above average for older age groups. If it is in line with your own 30-day average, it is a normal value for you.',
  },
  {
    q: 'Is 100 ms a good HRV?',
    a: '100 ms SDNN is above the typical range at every age in resting ECG studies, where even 25–34-year-olds average about 50 ms. Values this high are more likely if you are young and aerobically fit. As an overnight RMSSD from WHOOP or Oura, 100 ms is also well above the Oura average of about 41 ms. One caveat: irregular beats, such as ectopic beats or AFib, can make HRV look much higher than it really is. If high readings come with an irregular pulse or palpitations, see a doctor.',
  },
  {
    q: 'What is a dangerously low HRV?',
    a: 'There is no danger threshold for a watch reading. The often-quoted “below 50 ms is unhealthy” comes from 24-hour Holter ECG recordings of SDNN, mostly in heart patients, and does not apply to a one-minute wrist reading. A sudden, lasting drop against your own baseline matters more — especially with symptoms like chest pain, dizziness or palpitations, when you should see a doctor.',
  },
  {
    q: 'Why is my HRV low or dropping?',
    a: 'Common reasons are short or poor sleep, alcohol, illness, hard training without enough recovery, stress and simply the time of day — HRV is usually lower in the evening than early in the morning. A drop of a few days is a signal to recover; a long unexplained drop is worth discussing with a doctor.',
  },
  {
    q: 'How can I increase my HRV?',
    a: 'The best-supported ways are regular aerobic exercise, enough sleep at regular times, less alcohol, slow breathing at about six breaths per minute, and losing excess weight. In randomised trials, exercise programmes of 4 weeks to 8 months raised resting HRV in healthy adults. Expect weeks to months for a lasting rise; alcohol, a short night or an illness can lower HRV within a night or a few days. Judge progress by your 30-day average, not single readings.',
  },
  {
    q: 'Is Apple Watch HRV accurate?',
    a: 'Good enough for trends, not for exact single values. In a 2024 study of 39 adults and 316 readings, Apple Watch Series 9 and Ultra 2 read HRV on average 8.3 ms lower than a Polar H10 chest strap, with an average error of about 20 ms (29%) per reading. Take readings the same way each day and look at the weekly or monthly average.',
  },
  {
    q: 'Do women have higher HRV than men?',
    a: 'Not in a simple way. In the KORA study of 1,906 adults, women and men had similar SDNN and RMSSD in every age decade, with no significant differences in these measures. A meta-analysis of 172 studies found women on average have lower SDNN but relatively more high-frequency (vagal) HRV. For your own number, age, fitness and how you measure matter far more than sex.',
  },
  {
    q: 'How do I get a consistent HRV reading on Apple Watch?',
    a: 'Take a one-minute Breathe session in the Mindfulness app at the same time each morning, sitting still. Apple Watch records an HRV sample after a Breathe session, and readings taken the same way every day are much easier to compare.',
  },
];

export const hrvSources = [
  ['Apple Developer: heartRateVariabilitySDNN', 'https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/heartratevariabilitysdnn'],
  ['Apple: Using Apple Watch to measure heart rate, calorimetry and activity (Nov 2024, PDF)', 'https://www.apple.com/health/pdf/Heart_Rate_Calorimetry_Activity_on_Apple_Watch_November_2024.pdf'],
  ['Apple Newsroom: Apple Watch Series 12 (Sept 2026)', 'https://www.apple.com/newsroom/2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/'],
  ['Apple Support: Monitor your heart rate with Apple Watch', 'https://support.apple.com/en-us/120277'],
  ['Apple Support: Readiness on Apple Watch', 'https://support.apple.com/en-us/128112'],
  ['DC Rainmaker: Apple Watch Series 12 in-depth review (Oct 2026)', 'https://www.dcrainmaker.com/2026/10/apple-watch-series12-in-depth-review-worth-upgrade.html'],
  ['Oura: what is the average HRV (Sept 2026)', 'https://ouraring.com/blog/average-hrv/'],
  ['Voss et al. 2015, PLoS ONE — short-term HRV reference values (KORA S4)', 'https://doi.org/10.1371/journal.pone.0118308'],
  ['Shaffer & Ginsberg 2017, Front Public Health — overview of HRV metrics and norms', 'https://www.frontiersin.org/articles/10.3389/fpubh.2017.00258/full'],
  ['O’Grady et al. 2024, Sensors — Apple Watch HRV vs chest strap', 'https://doi.org/10.3390/s24196220'],
  ['Natarajan et al. 2020, Lancet Digital Health — HRV in 8 million Fitbit users', 'https://doi.org/10.1016/s2589-7500(20)30246-6'],
  ['Pietilä et al. 2018, JMIR Mental Health — alcohol and overnight HRV', 'https://doi.org/10.2196/mental.9519'],
  ['Plews et al. 2013, Sports Medicine — HRV-guided training in athletes', 'https://doi.org/10.1007/s40279-013-0071-8'],
  ['Koenig & Thayer 2016, Neuroscience & Biobehavioral Reviews — sex differences in HRV, meta-analysis', 'https://doi.org/10.1016/j.neubiorev.2016.03.007'],
  ['Amekran & El hangouche 2024, Cureus — exercise training and HRV in healthy adults, meta-analysis of RCTs', 'https://doi.org/10.7759/cureus.62465'],
  ['Laborde et al. 2022, Neuroscience & Biobehavioral Reviews — slow breathing and HRV, meta-analysis', 'https://doi.org/10.1016/j.neubiorev.2022.104711'],
  ['Lehrer & Gevirtz 2014, Frontiers in Psychology — HRV biofeedback and resonance breathing', 'https://doi.org/10.3389/fpsyg.2014.00756'],
  ['Zhang et al. 2025, Frontiers in Neurology — sleep deprivation and HRV, meta-analysis', 'https://doi.org/10.3389/fneur.2025.1556784'],
  ['Faust et al. 2020, npj Digital Medicine — bedtime shifts and sleeping heart rate', 'https://doi.org/10.1038/s41746-020-0250-6'],
  ['Costa et al. 2019, Clinical Nutrition — weight change and the autonomic nervous system', 'https://doi.org/10.1016/j.clnu.2018.01.006'],
  ['Hirten et al. 2021, JMIR — Apple Watch HRV before a COVID-19 diagnosis', 'https://doi.org/10.2196/26107'],
  ['Peltola 2012, Frontiers in Physiology — ectopic beats and artefacts in HRV analysis', 'https://doi.org/10.3389/fphys.2012.00148'],
  ['Apple Support: Start a Reflect or Breathe session on Apple Watch', 'https://support.apple.com/guide/watch/apd371dfe3d7/watchos'],
];
