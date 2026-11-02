// "Apple Watch Readiness score on older watches" — data and copy.
// Apple facts: Apple Support "Readiness" (128112), Apple Watch User Guide "Use the Readiness app",
// Apple Newsroom (Sept 9, 2026: Readiness, Recovery HRV, watchOS 27 models), Apple Support
// "Track your overnight vitals" (120142). Sleep Score models: Apple via AppleInsider (Sept 2025).
// Details: DC Rainmaker Series 12 review (inputs, 4-hour nights, RMSSD), Notebookcheck (older models).
// P.R.O. rules mirror SERVER services/agent/summaries.py (training_load → readiness).
// Reviewed October 27, 2026.

export const REVIEWED = 'October 27, 2026';

// The rules P.R.O. applies to the latest day against the average of the previous 28 days.
export const RULES = { hrvDropPct: 15, rhrRiseBpm: 5, sleepMinHours: 6, baselineDays: 28 };

// Apple's 0–10 bands (Apple Support 128112).
export const APPLE_BANDS = [
  ['Go For It', '8–10'],
  ['Ready', '5–7'],
  ['Pace Yourself', '2–4'],
  ['Recover', '0–1'],
];

export const readinessFaq = [
  {
    q: 'What is the Apple Watch Readiness score?',
    a: 'Readiness is a daily score from 0 to 10 on Apple Watch Series 12 and Ultra 4, introduced with watchOS 27 in September 2026. It combines recent activity and training load, overnight and daytime vitals such as HRV, and your sleep score, and comes with one of four recommendations: Recover (0–1), Pace Yourself (2–4), Ready (5–7) or Go For It (8–10). It updates during the day.',
  },
  {
    q: 'Which Apple Watch models have the Readiness score?',
    a: 'Only Apple Watch Series 12 and Apple Watch Ultra 4, for users aged 13 and older. Apple ties Readiness to the new heart sensors in these models, which measure HRV as often as every five minutes.',
  },
  {
    q: 'Can I get Readiness on Apple Watch Series 9, 10 or 11, Ultra 2 or 3, or SE?',
    a: 'No. Series 9, 10 and 11, Ultra 2 and 3 and SE 3 run watchOS 27 but do not get the Readiness app, Recovery HRV or daytime vitals. They still record HRV (SDNN), resting heart rate and sleep in Apple Health, so you can get a readiness read by comparing those with your own 4-week baseline — by hand or automatically in an app like P.R.O.',
  },
  {
    q: 'How do I get a readiness score on an older Apple Watch?',
    a: 'Compare your latest HRV and resting heart rate with your 28-day averages and check last night’s sleep. HRV 15% or more below average, resting heart rate 5 bpm or more above average, or less than 6 hours of sleep each count as one warning sign: none means ready, one means take it easier, two or more means recover. P.R.O. does this automatically from Apple Health: free through its MCP connector, in the app with Pro.',
  },
  {
    q: 'Why is my Apple Watch Readiness score not showing?',
    a: 'Readiness needs height, weight and age in the Fitness app, Activity, Sleep and Overnight Vitals set up, and at least seven nights of sleep with the watch on. DC Rainmaker reports each night needs at least 4 hours of sleep, and the baseline is per watch, so switching watches can mean waiting again. You also need to have slept with the watch last night.',
  },
  {
    q: 'What does Apple Readiness measure?',
    a: 'Activity (active calories, workout effort ratings and training load), vitals (overnight heart rate, respiratory rate, wrist temperature, HRV and blood oxygen, plus daytime heart rate) compared with your recent baseline, and your recent sleep score.',
  },
  {
    q: 'Is there a free readiness app for older Apple Watches?',
    a: 'Yes, through MCP. The free P.R.O. connector at https://mcp.proapp.uk gives ChatGPT, Claude and other assistants a daily readiness status — ready, caution or recover — with the reasons, from the HRV, resting heart rate and sleep in Apple Health. In the P.R.O. app the same status comes with Pro from $2.99/month, where the AI coach uses it to adjust your training plan.',
  },
  {
    q: 'Can ChatGPT or Claude tell me if I’m ready to train?',
    a: 'Yes, with the free P.R.O. MCP connector at https://mcp.proapp.uk. Add it as a custom connector in ChatGPT, Claude, Gemini, Grok, Perplexity, Codex, Claude Code or Cursor — we tested all of them — and ask “Am I ready to train today?”. The assistant reads your readiness status, HRV against your baseline, resting heart rate, sleep and training load from Apple Health and answers with your numbers. It works with any Apple Watch and the connector is completely free.',
  },
  {
    q: 'Does a readiness read work with Garmin, WHOOP or Oura data?',
    a: 'Yes, with whichever signals reach Apple Health. Garmin, WHOOP and Oura do not write HRV there; WHOOP writes resting heart rate, and Garmin and Oura write sleep. With an Apple Watch you get all three.',
  },
];

export const readinessSources = [
  ['Apple Support: Readiness on Apple Watch', 'https://support.apple.com/en-us/128112'],
  ['Apple Watch User Guide: Use the Readiness app', 'https://support.apple.com/guide/watch/readiness-flx4gnzby346/watchos'],
  ['Apple Newsroom: Apple advances health and fitness capabilities (Sept 9, 2026)', 'https://www.apple.com/newsroom/2026/09/apple-advances-health-and-fitness-capabilities-using-apple-intelligence/'],
  ['Apple Newsroom: Apple Watch Series 12 (Sept 2026)', 'https://www.apple.com/newsroom/2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/'],
  ['Apple Support: Track your overnight vitals with Apple Watch', 'https://support.apple.com/120142'],
  ['AppleInsider: How Sleep Score works on Apple Watch with watchOS 26', 'https://appleinsider.com/articles/25/09/12/how-sleep-score-works-on-apple-watch-with-watchos-26'],
  ['DC Rainmaker: Apple Watch Series 12 in-depth review (Oct 2026)', 'https://www.dcrainmaker.com/2026/10/apple-watch-series12-in-depth-review-worth-upgrade.html'],
  ['Notebookcheck: Older Apple Watch models miss out on Readiness (Sept 2026)', 'https://www.notebookcheck.net/Older-Apple-Watch-models-miss-out-on-Apple-s-biggest-new-health-feature.1396039.0.html'],
  ['Plews et al. 2013, Sports Medicine — HRV-guided training in athletes', 'https://doi.org/10.1007/s40279-013-0071-8'],
];
