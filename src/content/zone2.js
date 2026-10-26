// Zone 2 heart rate calculator — formulas, data and copy.
// HRmax: 220−age (classic), Tanaka 2001 (208 − 0.7×age), Gulati 2010 for women
// (206 − 0.88×age). Zone 2 as 60–70% of HRmax (Polar; P.R.O. app default with 220−age),
// heart rate reserve (Karvonen) 60–70%, MAF 180−age minus 10 to 180−age.
// Apple Support: zones are based on max HR, five zones, zones 2–4 editable.
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
  list.push({ id: 'pct-classic', name: knownMax ? '60–70% of your max HR' : '60–70% of max (220 − age)', note: knownMax ? 'Your known max heart rate.' : 'The classic formula. P.R.O. and many watches use it by default.', range: pctRange(maxClassic, 0.6, 0.7) });
  if (!knownMax) list.push({ id: 'pct-tanaka', name: '60–70% of max (Tanaka)', note: '208 − 0.7 × age, from a 351-study meta-analysis. More accurate for older adults.', range: pctRange(maxTanaka, 0.6, 0.7) });
  if (!knownMax && sex === 'f') list.push({ id: 'pct-gulati', name: '60–70% of max (Gulati, women)', note: '206 − 0.88 × age, from 5,437 women.', range: pctRange(hrmax.gulati(age), 0.6, 0.7) });
  if (rest) list.push({ id: 'hrr', name: 'Heart rate reserve (Karvonen) 60–70%', note: 'Uses your resting heart rate, like many sports watches.', range: hrrRange(maxTanaka, rest, 0.6, 0.7) });
  list.push({ id: 'maf', name: 'MAF (180 − age)', note: 'Phil Maffetone’s aerobic ceiling; train at or up to 10 bpm below it.', range: [180 - age - 10, 180 - age] });
  return list;
}

export const ZONES = [
  { z: 1, lo: 0.5, hi: 0.6, name: 'Recovery', feel: 'Very easy; you could chat for hours.' },
  { z: 2, lo: 0.6, hi: 0.7, name: 'Aerobic base', feel: 'Easy; full sentences, breathing through your nose is possible.' },
  { z: 3, lo: 0.7, hi: 0.8, name: 'Aerobic', feel: 'Moderate; a few sentences at a time.' },
  { z: 4, lo: 0.8, hi: 0.9, name: 'Threshold', feel: 'Hard; only short phrases.' },
  { z: 5, lo: 0.9, hi: 1.0, name: 'Maximum', feel: 'All-out; no talking.' },
];

export const BY_AGE = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

export const zone2Faq = [
  { q: 'What is my Zone 2 heart rate?', a: 'For most people Zone 2 is 60–70% of maximum heart rate. With the classic 220 − age estimate that is about 111–130 bpm at 35, 108–126 bpm at 40 and 102–119 bpm at 50. If you know your resting heart rate, the heart rate reserve (Karvonen) method gives a personalised range that is usually higher.' },
  { q: 'How does Apple Watch calculate heart rate zones?', a: 'Apple Watch sets five heart rate zones automatically from your age and heart rate data in the Health app (a date of birth is required) and updates them over time. You can set zones 2, 3 and 4 manually in Settings → Workout → Heart Rate Zones on the watch, or in the Watch app on iPhone. Apple doesn’t publish the exact zone percentages.' },
  { q: 'Why do Zone 2 calculators give different numbers?', a: 'They use different formulas. Percent-of-max methods ignore your resting heart rate, the Karvonen method adds it, and MAF uses 180 minus your age. For the same 40-year-old the results can differ by 20–30 bpm, which is why a talk test or a lab test is the best check.' },
  { q: 'What is the Zone 2 heart rate for women?', a: 'The standard methods work for women too. The Gulati formula (206 − 0.88 × age), developed from 5,437 women, gives a slightly lower maximum heart rate and therefore a Zone 2 a few beats lower than 220 − age.' },
  { q: 'How much Zone 2 training per week?', a: 'The WHO recommends 150–300 minutes of moderate activity a week, and many coaches suggest about three hours of easy Zone 2 work spread over three to four sessions. A 2025 review found that Zone 2 is not uniquely better than higher intensities for fitness, so mixing in some harder sessions helps.' },
  { q: 'Is Zone 2 best for fat loss?', a: 'Not necessarily. Zone 2 burns a higher share of fat while you exercise, but total calories and consistency matter more for weight loss. It is a comfortable intensity you can do often, which is its main advantage.' },
  { q: 'What is the talk test?', a: 'If you can speak in full sentences but would rather not sing, you are around Zone 2. If you can only say a few words, you are above it. The talk test lines up well with the first ventilatory threshold in studies.' },
  { q: 'Is MAF the same as Zone 2?', a: 'Close but not identical. MAF (180 − age) sets an upper limit for easy aerobic training; for many people it lands near the top of Zone 2 by percent-of-max methods.' },
];

export const zone2Sources = [
  ['Apple Support: View heart rate zones on Apple Watch', 'https://support.apple.com/guide/watch/view-heart-rate-zones-apd897dccddf/watchos'],
  ['Tanaka et al. 2001, JACC — age-predicted maximal heart rate', 'https://doi.org/10.1016/s0735-1097(00)01054-8'],
  ['Gulati et al. 2010, Circulation — heart rate response to exercise in women', 'https://doi.org/10.1161/circulationaha.110.939249'],
  ['Polar: heart rate zones', 'https://www.polar.com/en/guide/heart-rate-zones'],
  ['WHO 2020 guidelines on physical activity', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7719906/'],
  ['Storoschuk et al. 2025, Sports Medicine — is Zone 2 optimal?', 'https://doi.org/10.1007/s40279-025-02261-y'],
  ['San-Millán & Brooks 2018, Sports Medicine — fat oxidation and lactate', 'https://doi.org/10.1007/s40279-017-0751-x'],
  ['Meixner et al. 2025 — Zone 2 markers vs fixed percentages', 'https://doi.org/10.1155/tsm2/2008291'],
];
