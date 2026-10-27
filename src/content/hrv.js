// "What is a good HRV on Apple Watch?" — data and copy.
// Norms: Voss et al. 2015 (KORA S4, 5-min resting ECG, n=1906), tables 5 and 7.
// Apple facts: HealthKit heartRateVariabilitySDNN docs, Apple white paper (Nov 2024),
// Apple Newsroom (Sept 2026, Recovery HRV), Apple Support "Monitor your heart rate" and
// "Readiness" (128112), DC Rainmaker Series 12 review (RMSSD, 5-minute sampling).
// Overnight RMSSD: Oura population figures (6M members, Jan–Aug 2026).
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
    q: 'What is a dangerously low HRV?',
    a: 'There is no danger threshold for a watch reading. The often-quoted “below 50 ms is unhealthy” comes from 24-hour Holter ECG recordings of SDNN, mostly in heart patients, and does not apply to a one-minute wrist reading. A sudden, lasting drop against your own baseline matters more — especially with symptoms like chest pain, dizziness or palpitations, when you should see a doctor.',
  },
  {
    q: 'Why is my HRV low or dropping?',
    a: 'Common reasons are short or poor sleep, alcohol, illness, hard training without enough recovery, stress and simply the time of day — HRV is usually lower in the evening than early in the morning. A drop of a few days is a signal to recover; a long unexplained drop is worth discussing with a doctor.',
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
];
