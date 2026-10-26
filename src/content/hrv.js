// "What is a good HRV on Apple Watch?" — data and copy.
// Norms: Voss et al. 2015 (KORA S4, 5-min resting ECG, n=1906), tables 5 and 7.
// Apple facts: HealthKit heartRateVariabilitySDNN docs, Apple white paper (Nov 2024),
// Apple Newsroom (Sept 2026, Recovery HRV), Apple Support "Monitor your heart rate".
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

export const bandFor = (age) => KORA.find((b) => age >= b.from && age <= b.to) ?? (age < 25 ? KORA[0] : KORA[KORA.length - 1]);

export const hrvFaq = [
  {
    q: 'What is a good HRV on Apple Watch?',
    a: 'There is no validated "normal HRV" chart for Apple Watch. Apple Watch reports SDNN; in resting ECG studies, healthy adults aged 25–34 average about 50 ms SDNN and people aged 55–64 about 31 ms, with wide ranges. A good HRV is one that is stable or rising against your own 30-day average.',
  },
  {
    q: 'Does Apple Watch measure HRV as SDNN or RMSSD?',
    a: 'SDNN. HealthKit stores Apple Watch HRV as the standard deviation of normal-to-normal beat intervals (SDNN). WHOOP, Oura and Garmin show RMSSD, so their numbers are not directly comparable with Apple’s.',
  },
  {
    q: 'What is Recovery HRV on Apple Watch?',
    a: 'Recovery HRV arrived with Apple Watch Series 12 and Ultra 4 (September 2026). It is sampled while you are still and compared with your personal baseline to signal stress and recovery; Apple keeps a separate overall HRV for broader health trends. Apple has not said which formula Recovery HRV uses.',
  },
  {
    q: 'Why is my Apple Watch HRV lower than my WHOOP or Oura HRV?',
    a: 'Different metric and different timing. Apple Watch measures SDNN in short readings while you are still, by default about every four hours, including during the day. WHOOP and Oura average RMSSD over your sleep, when HRV is highest. A study against a chest strap also found Apple Watch reads HRV about 8 ms lower on average.',
  },
  {
    q: 'Is 30 ms a good HRV?',
    a: 'It depends on your age. 30 ms SDNN is around the average for people in their late 50s and 60s in resting ECG studies, and on the lower side for people in their 20s and 30s. On a watch, compare it with your own baseline rather than with other people.',
  },
  {
    q: 'Is 50 ms a good HRV?',
    a: '50 ms SDNN is about the average for adults aged 25–34 in resting ECG studies and above average for older age groups. If it is in line with your own 30-day average, it is a normal value for you.',
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
  ['Voss et al. 2015, PLoS ONE — short-term HRV reference values (KORA S4)', 'https://doi.org/10.1371/journal.pone.0118308'],
  ['Shaffer & Ginsberg 2017, Front Public Health — overview of HRV metrics and norms', 'https://www.frontiersin.org/articles/10.3389/fpubh.2017.00258/full'],
  ['O’Grady et al. 2024, Sensors — Apple Watch HRV vs chest strap', 'https://doi.org/10.3390/s24196220'],
  ['Natarajan et al. 2020, Lancet Digital Health — HRV in 8 million Fitbit users', 'https://doi.org/10.1016/s2589-7500(20)30246-6'],
  ['Pietilä et al. 2018, JMIR Mental Health — alcohol and overnight HRV', 'https://doi.org/10.2196/mental.9519'],
  ['Plews et al. 2013, Sports Medicine — HRV-guided training in athletes', 'https://doi.org/10.1007/s40279-013-0071-8'],
];
