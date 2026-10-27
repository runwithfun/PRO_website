// Zone 2 heart rate calculator — formulas, data and copy.
// HRmax: 220−age (classic), Tanaka 2001 (208 − 0.7×age), Gulati 2010 for women
// (206 − 0.88×age). Zone 2 as 60–70% of HRmax (Polar; P.R.O. app default with 220−age),
// heart rate reserve (Karvonen) 60–70%, MAF 180−age ceiling (165 at 16 and under, plus
// Maffetone's −10/−5/0/+5 adjustments). HRR zones apply the same 50–100% bands to the reserve.
// Apple Support: zones are a percentage of max HR, personalised; zones 2–4 editable.
// Lab reference: Meixner 2025 — VT1 81% and FatMax 72% of measured HRmax in 50 cyclists.
// FAQ additions: CDC/ACSM (walking), WHO (bouts, 65+), Sitko 2025 and Seiler 2010 (zone models),
// Carey 2009 and Roecker 2003 (cycling vs running), Gillinov 2017 (wrist HR accuracy), AHA (beta-blockers).
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
// MAF: 165 at 16 and under (no adjustment); otherwise 180 − age + adjustment.
export const mafCeiling = (age, adj = 0) => (age <= 16 ? 165 : 180 - age + adj);

// Maffetone's 180-formula categories (philmaffetone.com/180-formula).
export const MAF_ADJUST = [
  { v: -10, label: '−10 · major illness, surgery or regular medication' },
  { v: -5, label: '−5 · injured, regressing, often ill, inconsistent' },
  { v: 0, label: '0 · training consistently, up to 2 years' },
  { v: 5, label: '+5 · 2+ years, progressing, no injuries' },
];

export function methods({ age, sex, rest, knownMax, mafAdj = 0 }) {
  const list = [];
  const maxClassic = knownMax ?? hrmax.classic(age);
  const maxTanaka = knownMax ?? hrmax.tanaka(age);
  const maf = mafCeiling(age, mafAdj);
  const mafName = age <= 16 ? 'MAF (165 at 16 and under)' : `MAF (180 − age${mafAdj ? ` ${mafAdj > 0 ? '+' : '−'} ${Math.abs(mafAdj)}` : ''})`;
  list.push({ id: 'pct-classic', name: knownMax ? '60–70% of your max HR' : '60–70% of max (220 − age)', note: knownMax ? 'Your known max heart rate.' : 'The classic formula. P.R.O. and many watches use it by default.', range: pctRange(maxClassic, 0.6, 0.7) });
  if (!knownMax) list.push({ id: 'pct-tanaka', name: '60–70% of max (Tanaka)', note: '208 − 0.7 × age, from a 351-study meta-analysis. More accurate for older adults.', range: pctRange(maxTanaka, 0.6, 0.7) });
  if (!knownMax && sex === 'f') list.push({ id: 'pct-gulati', name: '60–70% of max (Gulati, women)', note: '206 − 0.88 × age, from 5,437 women.', range: pctRange(hrmax.gulati(age), 0.6, 0.7) });
  if (rest) list.push({ id: 'hrr', family: 'reserve', name: 'Heart rate reserve (Karvonen) 60–70%', note: `Resting HR + 60–70% of (max − resting), with a max of ${Math.round(maxClassic)} bpm. Many sports watches use it.`, range: hrrRange(maxClassic, rest, 0.6, 0.7) });
  list.push({ id: 'maf', family: 'reserve', name: mafName, note: 'Phil Maffetone’s aerobic ceiling: keep easy runs at or below it. The 10 bpm range below it comes from his earlier books.', range: [maf - 10, maf] });
  return list;
}

export const ZONES = [
  { z: 1, lo: 0.5, hi: 0.6, name: 'Recovery', feel: 'Very easy; you could chat for hours.' },
  { z: 2, lo: 0.6, hi: 0.7, name: 'Aerobic base', feel: 'Easy; full sentences, and for many people nose breathing.' },
  { z: 3, lo: 0.7, hi: 0.8, name: 'Aerobic', feel: 'Moderate; a few sentences at a time.' },
  { z: 4, lo: 0.8, hi: 0.9, name: 'Threshold', feel: 'Hard; only short phrases.' },
  { z: 5, lo: 0.9, hi: 1.0, name: 'Maximum', feel: 'All-out; no talking.' },
];

// Five zones as bpm ranges: percent of max, or the same bands of heart rate reserve.
export const zoneRanges = (model, max, rest) =>
  ZONES.map((z) => ({ ...z, range: model === 'hrr' && rest ? hrrRange(max, rest, z.lo, z.hi) : pctRange(max, z.lo, z.hi) }));

// Meixner 2025: FatMax ≈ 72% and VT1 ≈ 81% of measured HRmax in 50 trained cyclists.
export const LAB_BAND = [0.72, 0.81];

export const BY_AGE = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
export const BY_AGE_REST = 60;

export const zone2Faq = [
  { q: 'What is my Zone 2 heart rate?', a: 'For most people Zone 2 is 60–70% of maximum heart rate. With the classic 220 − age estimate that is about 111–130 bpm at 35, 108–126 bpm at 40 and 102–119 bpm at 50. If you know your resting heart rate, the heart rate reserve (Karvonen) method gives a personalised range that is usually higher.' },
  { q: 'How does Apple Watch calculate heart rate zones?', a: 'Apple says its five heart rate zones are a percentage of your maximum heart rate, calculated automatically and personalised with your health data (a date of birth in the Health app is required). It doesn’t say how it estimates your maximum. You can set zones 2, 3 and 4 manually in Settings → Workout → Heart Rate Zones on the watch, or in the Apple Watch app on iPhone → My Watch → Workout → Heart Rate Zones.' },
  { q: 'Why do Zone 2 calculators give different numbers?', a: 'They use different formulas. Percent-of-max methods ignore your resting heart rate, the Karvonen method adds it, and MAF uses 180 minus your age. For the same 40-year-old the results can differ by 20–30 bpm, which is why a talk test or a lab test is the best check.' },
  { q: 'What is the Zone 2 heart rate for women?', a: 'The standard methods work for women too. The Gulati formula (206 − 0.88 × age), developed from 5,437 women, gives a slightly lower maximum heart rate and therefore a Zone 2 a few beats lower than 220 − age.' },
  { q: 'How much Zone 2 training per week?', a: 'The WHO recommends 150–300 minutes of moderate activity (or 75–150 minutes of vigorous activity) a week plus strength training on two days, and many coaches suggest about three hours of easy Zone 2 work spread over three to four sessions. A 2025 review found that Zone 2 is not uniquely better than higher intensities for fitness, so mixing in some harder sessions helps.' },
  { q: 'Is Zone 2 best for fat loss?', a: 'Not necessarily. Zone 2 burns a higher share of fat while you exercise, but total calories and consistency matter more for weight loss. It is a comfortable intensity you can do often, which is its main advantage.' },
  { q: 'What is the talk test?', a: 'If you can speak in full sentences but would rather not sing, you are around Zone 2. If you can only say a few words, you are above it. Reviews of talk-test studies find that comfortable speech is possible below the ventilatory threshold and not above it.' },
  { q: 'Is MAF the same as Zone 2?', a: 'Not exactly. MAF (180 − age) is an upper limit for easy aerobic training. For people under about 50 it lands well above 60–70% of max — at 35 it is 145 bpm versus 111–130 — and much closer to the heart rate reserve method and to lab-measured first thresholds in trained people.' },
  { q: 'Is 140 bpm Zone 2?', a: 'It depends on your age and the method. By 60–70% of 220 − age, 140 bpm is Zone 2 only if you are 20 or younger; for most adults it is Zone 3 or higher. By heart rate reserve with a resting heart rate of 60, 140 bpm is Zone 2 at roughly 27–45 years old. By MAF, 140 bpm is the aerobic ceiling at 40 (180 − 40), so it is within MAF for anyone 40 or younger without adjustments.' },
  { q: 'Can walking be Zone 2?', a: 'Yes, for many people. The CDC counts brisk walking (about 2.5 mph or faster) as moderate-intensity activity, and the ACSM puts moderate intensity at 64–76% of maximum heart rate, which overlaps Zone 2. Beginners, older adults and people returning to exercise often reach Zone 2 walking briskly; fitter people usually need hills, an incline or very easy jogging.' },
  { q: 'How long should a Zone 2 session be?', a: 'There is no research-based minimum: the WHO 2020 guidelines dropped the old 10-minute rule, and every minute counts toward 150–300 minutes a week. In practice, 30–45 minutes suits beginners and 60–90 minutes is common for endurance athletes. In long sessions heart rate drifts upward at the same pace, so slow down to stay in range.' },
  { q: 'What is the difference between Zone 2 and Zone 3?', a: 'In the common five-zone model (the Polar and Garmin defaults), Zone 2 is 60–70% and Zone 3 is 70–80% of maximum heart rate: in Zone 2 you can talk in full sentences, in Zone 3 only a few sentences at a time. Sports scientists also use a three-zone model in which zone 1 is everything below the first threshold, so their “zone 2” is harder. A 2025 expert panel defined Zone 2 training as just below the first lactate or ventilatory threshold.' },
  { q: 'Is Zone 2 different for cycling and running?', a: 'Often slightly, and it varies a lot between people. In 16 triathletes, heart rate at the threshold averaged 154 bpm on a bike and 157 bpm on a treadmill, but the individual error between the two was about 12 bpm. In 371 athletes, threshold heart rates in cycling and running did not correlate. If you do both, set cycling zones from a cycling max or test.' },
  { q: 'Is Apple Watch accurate enough for Zone 2?', a: 'For steady running or cycling, usually yes. In a Cleveland Clinic study against ECG, the Apple Watch agreed well (concordance 0.92), second only to a Polar chest strap (0.996), and all wrist devices were least accurate on an elliptical with arm levers. Wear the watch snugly; for intervals, rowing or other arm-heavy exercise, pair a chest strap. That study tested an early Apple Watch model.' },
  { q: 'What is Zone 2 heart rate after 50 or 60?', a: 'At 50, 60–70% of 220 − age gives 102–119 bpm (104–121 by Tanaka); at 60, 96–112 bpm (100–116 by Tanaka). The Tanaka formula fits older adults better than 220 − age. Beta-blockers and some other medications lower heart rate, so ask your doctor for your zones if you take them. The WHO also advises adults over 65 to do balance and strength activities on three or more days a week.' },
  { q: 'What does a Zone 2 training week look like?', a: 'One example of about three hours: two 45-minute Zone 2 sessions on weekdays, one 75–90-minute long Zone 2 session at the weekend, one harder interval session, and strength training on two days. Adjust the volume to your current fitness and add time gradually.' },
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
  ['Apple Support: Create a custom workout on Apple Watch (workout alerts)', 'https://support.apple.com/guide/watch/create-a-custom-workout-apd66fcd5c5c/watchos'],
  ['Garmin manual: heart rate zones as % of max, % of heart rate reserve or % of lactate threshold', 'https://www8.garmin.com/manuals/webhelp/forerunner735/EN-US/GUID-2212F884-BA9A-499F-95CC-5847045CD3D8.html'],
  ['Garber et al. 2011, Med Sci Sports Exerc — ACSM position stand, exercise intensity classification', 'https://doi.org/10.1249/MSS.0b013e318213fefb'],
  ['CDC: measuring physical activity intensity (brisk walking is moderate)', 'https://www.cdc.gov/physical-activity-basics/measuring/index.html'],
  ['Sitko et al. 2025, IJSPP — what is “Zone 2 training”? Experts’ viewpoint', 'https://doi.org/10.1123/ijspp.2024-0303'],
  ['Seiler 2010, IJSPP — training intensity distribution in endurance athletes', 'https://doi.org/10.1123/ijspp.5.3.276'],
  ['Carey et al. 2009, J Strength Cond Res — running and cycling zones in triathletes', 'https://doi.org/10.1519/JSC.0b013e31818767e7'],
  ['Roecker et al. 2003, Int J Sports Med — heart rate transfer between running and cycling', 'https://doi.org/10.1055/s-2003-39087'],
  ['Gillinov et al. 2017, Med Sci Sports Exerc — accuracy of wearable heart rate monitors', 'https://doi.org/10.1249/MSS.0000000000001284'],
  ['American Heart Association: beta-blockers and exercise', 'https://www.heart.org/en/health-topics/consumer-healthcare/medication-information/how-do-beta-blocker-drugs-affect-exercise'],
];
