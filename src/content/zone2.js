// Zone 2 heart rate calculator — formulas, data and copy.
// HRmax: 220−age (classic), Tanaka 2001 (208 − 0.7×age), Gulati 2010 for women
// (206 − 0.88×age). Zone 2 as 60–70% of HRmax (Polar; P.R.O. app default with 220−age),
// heart rate reserve (Karvonen) 60–70%, MAF 180−age ceiling (165 under 16, Maffetone).
// Apple Support: zones are a percentage of max HR, personalised; zones 2–4 editable.
// Lab reference: Meixner 2025 — VT1 81% and FatMax 72% of measured HRmax in 50 cyclists.
// Reviewed October 27, 2026.

export const REVIEWED = 'October 27, 2026';

export const hrmax = {
  classic: (age) => 220 - age,
  tanaka: (age) => 208 - 0.7 * age,
  gulati: (age) => 206 - 0.88 * age,
};

const r = Math.round;
export const pctRange = (max, lo, hi) => [r(max * lo), r(max * hi)];
export const hrrRange = (max, rest, lo, hi) => [r(rest + (max - rest) * lo), r(rest + (max - rest) * hi)];

// Every method for the comparison chart. knownMax overrides formulas when given.
export function methods({ age, sex, rest, knownMax }) {
  const list = [];
  const maxClassic = knownMax ?? hrmax.classic(age);
  const maxTanaka = knownMax ?? hrmax.tanaka(age);
  const maf = age < 16 ? 165 : 180 - age;
  list.push({ id: 'pct-classic', name: knownMax ? '60–70% of your max HR' : '60–70% of max (220 − age)', note: knownMax ? 'Your known max heart rate.' : 'The classic formula. P.R.O. and many watches use it by default.', range: pctRange(maxClassic, 0.6, 0.7) });
  if (!knownMax) list.push({ id: 'pct-tanaka', name: '60–70% of max (Tanaka)', note: '208 − 0.7 × age, from a 351-study meta-analysis. More accurate for older adults.', range: pctRange(maxTanaka, 0.6, 0.7) });
  if (!knownMax && sex === 'f') list.push({ id: 'pct-gulati', name: '60–70% of max (Gulati, women)', note: '206 − 0.88 × age, from 5,437 women.', range: pctRange(hrmax.gulati(age), 0.6, 0.7) });
  if (rest) list.push({ id: 'hrr', family: 'reserve', name: 'Heart rate reserve (Karvonen) 60–70%', note: `Resting HR + 60–70% of (max − resting), with a max of ${Math.round(maxClassic)} bpm. Many sports watches use it.`, range: hrrRange(maxClassic, rest, 0.6, 0.7) });
  list.push({ id: 'maf', family: 'reserve', name: age < 16 ? 'MAF (165 under 16)' : 'MAF (180 − age)', note: 'Phil Maffetone’s aerobic ceiling: keep easy runs at or below it. The 10 bpm range below it comes from his earlier books.', range: [maf - 10, maf] });
  return list;
}

export const ZONES = [
  { z: 1, lo: 0.5, hi: 0.6, name: 'Recovery', feel: 'Very easy; you could chat for hours.' },
  { z: 2, lo: 0.6, hi: 0.7, name: 'Aerobic base', feel: 'Easy; full sentences, and for many people nose breathing.' },
  { z: 3, lo: 0.7, hi: 0.8, name: 'Aerobic', feel: 'Moderate; a few sentences at a time.' },
  { z: 4, lo: 0.8, hi: 0.9, name: 'Threshold', feel: 'Hard; only short phrases.' },
  { z: 5, lo: 0.9, hi: 1.0, name: 'Maximum', feel: 'All-out; no talking.' },
];

export const BY_AGE = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

export const zone2Faq = [
  { q: 'What is my Zone 2 heart rate?', a: 'For most people Zone 2 is 60–70% of maximum heart rate. With the classic 220 − age estimate that is about 111–130 bpm at 35, 108–126 bpm at 40 and 102–119 bpm at 50. If you know your resting heart rate, the heart rate reserve (Karvonen) method gives a personalised range that is usually higher.' },
  { q: 'How does Apple Watch calculate heart rate zones?', a: 'Apple says its five heart rate zones are a percentage of your maximum heart rate, calculated automatically and personalised with your health data (a date of birth in the Health app is required). It doesn’t say how it estimates your maximum. You can set zones 2, 3 and 4 manually in Settings → Workout → Heart Rate Zones on the watch, or in the Apple Watch app on iPhone → My Watch → Workout → Heart Rate Zones.' },
  { q: 'Why do Zone 2 calculators give different numbers?', a: 'They use different formulas. Percent-of-max methods ignore your resting heart rate, the Karvonen method adds it, and MAF uses 180 minus your age. For the same 40-year-old the results can differ by 20–30 bpm, which is why a talk test or a lab test is the best check.' },
  { q: 'What is the Zone 2 heart rate for women?', a: 'The standard methods work for women too. The Gulati formula (206 − 0.88 × age), developed from 5,437 women, gives a slightly lower maximum heart rate and therefore a Zone 2 a few beats lower than 220 − age.' },
  { q: 'How much Zone 2 training per week?', a: 'The WHO recommends 150–300 minutes of moderate activity (or 75–150 minutes of vigorous activity) a week plus strength training on two days, and many coaches suggest about three hours of easy Zone 2 work spread over three to four sessions. A 2025 review found that Zone 2 is not uniquely better than higher intensities for fitness, so mixing in some harder sessions helps.' },
  { q: 'Is Zone 2 best for fat loss?', a: 'Not necessarily. Zone 2 burns a higher share of fat while you exercise, but total calories and consistency matter more for weight loss. It is a comfortable intensity you can do often, which is its main advantage.' },
  { q: 'What is the talk test?', a: 'If you can speak in full sentences but would rather not sing, you are around Zone 2. If you can only say a few words, you are above it. Reviews of talk-test studies find that comfortable speech is possible below the ventilatory threshold and not above it.' },
  { q: 'Is MAF the same as Zone 2?', a: 'Not exactly. MAF (180 − age) is an upper limit for easy aerobic training. For people under about 50 it lands well above 60–70% of max — at 35 it is 145 bpm versus 111–130 — and much closer to the heart rate reserve method and to lab-measured first thresholds in trained people.' },
  { q: 'Why does my Zone 2 feel so slow?', a: 'Because 60–70% of an estimated maximum is a conservative range. In a 2025 study of 50 trained cyclists, the first ventilatory threshold averaged 81% and maximal fat burning 72% of measured maximum heart rate, with large individual differences. If you are fit, the heart rate reserve method or a lab test will usually put your Zone 2 higher. Heat, caffeine and long sessions also push heart rate up at the same pace.' },
];

export const zone2Sources = [
  ['Apple Support: View heart rate zones on Apple Watch', 'https://support.apple.com/guide/watch/view-heart-rate-zones-apd897dccddf/watchos'],
  ['Tanaka et al. 2001, JACC — age-predicted maximal heart rate', 'https://doi.org/10.1016/s0735-1097(00)01054-8'],
  ['Gulati et al. 2010, Circulation — heart rate response to exercise in women', 'https://doi.org/10.1161/circulationaha.110.939249'],
  ['Polar: heart rate zones', 'https://www.polar.com/en/guide/heart-rate-zones'],
  ['WHO 2020 guidelines on physical activity', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7719906/'],
  ['Storoschuk et al. 2025, Sports Medicine — is Zone 2 optimal?', 'https://doi.org/10.1007/s40279-025-02261-y'],
  ['San-Millán & Brooks 2018, Sports Medicine — fat oxidation and lactate', 'https://doi.org/10.1007/s40279-017-0751-x'],
  ['Meixner et al. 2025, Transl Sports Med — Zone 2 markers vs fixed percentages', 'https://doi.org/10.1155/tsm2/2008291'],
  ['Maffetone: the 180 formula', 'https://philmaffetone.com/180-formula/'],
  ['Robergs & Landwehr 2002, JEPonline — the history and error of 220 − age (PDF)', 'https://www.asep.org/asep/asep/Robergs2.pdf'],
  ['Reed & Pipe 2014, Curr Opin Cardiol — the talk test', 'https://doi.org/10.1097/HCO.0000000000000097'],
];
