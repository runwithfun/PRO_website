// "X alternative" landing pages (/whoop-alternative, /runna-alternative).
// Competitor facts checked 2026-10-27 against official pages (WHOOP membership and
// support, Runna pricing and support, Garmin, Strava and Nike help, App Store);
// links are in `sources`. Keep consistent with src/content/compare.js and the
// WHOOP entry in src/content/deviceGuides.js. Re-check prices every quarter.

export const CHECKED = '27 October 2026';

export const ASSISTANTS_TESTED = 'ChatGPT, Claude, Claude Code, Codex, Cursor, Grok, Perplexity and Gemini';

const MCP_ROW = 'Use your data in ChatGPT, Claude, Gemini, Grok, Perplexity (MCP)';
const PRO_MCP = `Yes — free MCP connector at mcp.proapp.uk, tested in ${ASSISTANTS_TESTED}`;

export const alternatives = [
  {
    id: 'whoop',
    path: '/whoop-alternative',
    faqKey: 'whoopAlternative',
    title: 'WHOOP Alternative 2026: No Band or $199 Membership — P.R.O.',
    description: 'Skip the WHOOP band and $199–$359/yr membership: readiness, training load, sleep and an AI coach from Apple Health, plus a free MCP connector.',
    competitor: 'WHOOP',
    eyebrow: 'WHOOP ALTERNATIVE · PRICES CHECKED 27 OCTOBER 2026',
    h1: 'The WHOOP alternative that uses the watch you already have',
    answer: [
      'P.R.O. is a free iPhone app that turns what your Apple Watch, Garmin, Oura or other tracker already writes to Apple Health into a daily readiness status, training load, sleep score and an AI coach — no band and no WHOOP membership, which costs $199 to $359 a year. Its free MCP connector lets you ask ChatGPT, Claude, Gemini, Grok or Perplexity about your recovery and strain with your real numbers.',
      'WHOOP is still the pick if you want a screenless band worn 24/7; its Peak and Life tiers add Healthspan, ECG and blood pressure insights.',
    ],
    facts: [
      ['P.R.O.', 'Free; optional Pro from $2.99/mo or $29.99/yr'],
      ['WHOOP', '$199–$359 a year, band included, 12-month commitment'],
      ['Hardware', 'None — any device that writes to Apple Health'],
      ['MCP connector', 'Free, for ChatGPT, Claude, Gemini, Grok, Perplexity'],
    ],
    mcp: {
      title: 'Ask ChatGPT or Claude about your recovery and strain',
      lead: `Add P.R.O.’s MCP connector, https://mcp.proapp.uk, to your AI assistant and it can read the Apple Health data you allow: your readiness status, HRV and resting heart rate against your 28-day baseline, sleep, workouts and training load. The connector is completely free, and we have tested it in ${ASSISTANTS_TESTED}.`,
      prompt: 'Am I recovered enough for intervals today? Compare my HRV and resting heart rate with my 28-day baseline, check last night’s sleep and my training load this week, and tell me what to do.',
      more: ['How did I sleep this week compared to last week?', 'Which workouts pushed my training load up most this month?', 'Is my resting heart rate trending up?'],
      after: 'The assistant calls P.R.O., reads your numbers and answers with them. In ChatGPT, Claude and Gemini it can also show interactive P.R.O. cards for sleep, workouts and plans. You choose which data categories it sees and can revoke access in the app at any time.',
    },
    columns: ['P.R.O.', 'WHOOP', 'Athlytic', 'Bevel'],
    rows: [
      [MCP_ROW, PRO_MCP, 'No official connector; unofficial community servers use the WHOOP API', 'No', 'No'],
      ['Price (US)', 'Free; optional Pro from $2.99/mo or $29.99/yr', 'One $199/yr, Peak $239/yr, Life $359/yr; monthly ($25–$40) only after the first 12 months', '$4.99/mo or $29.99/yr, 7-day trial', 'Free app; Bevel Pro $14.99/mo or $99.99/yr'],
      ['Hardware', 'None — Apple Watch, Garmin, Oura, WHOOP, Polar, COROS or anything else that writes to Apple Health', 'WHOOP 5.0 (One, Peak) or WHOOP MG (Life), included', 'Apple Watch for most features', 'Apple Watch, Oura, Garmin, Amazfit'],
      ['Without a subscription', 'Free app', 'Stops collecting and analysing data when the membership ends', 'Subscription after the 7-day trial', 'Free tier'],
      ['Recovery / readiness', 'Daily status — ready, caution or recover — from HRV, resting heart rate and sleep against your 28-day baseline, with the reasons', 'Recovery score (%)', 'Recovery score (0–100%)', 'Recovery score'],
      ['Strain / training load', 'Training load from heart-rate zones, acute vs chronic load ratio (ACWR) and a daily target band', 'Strain (0–21)', 'Exertion (0–10) with a daily target', 'Strain score'],
      ['Sleep', 'Sleep score and stages', 'Sleep score', 'Sleep score and target', 'Sleep score, smart alarm'],
      ['AI coach chat', 'Yes — answers with tables and charts from your data; choice of AI model', 'WHOOP Coach (built with OpenAI)', 'Ask Athlytic, on-device Q&A', 'Bevel Intelligence'],
      ['Training plans', 'Adaptive AI plans for running, cycling and more that adjust to load and recovery; home-screen widget', 'Strength Trainer; guidance from WHOOP Coach', 'Daily workout suggestions', 'Strength plans'],
      ['Apple Health', 'Reads every device you sync into one history across 50+ sports', 'Writes workouts, sleep, resting heart rate, SpO2, respiratory rate and steps; not HRV', 'Reads Apple Watch data from Apple Health', 'Reads Apple Health'],
    ],
    cost: {
      title: 'What WHOOP costs over three years',
      lead: 'WHOOP sells 12-month memberships with the band included. New members can’t pick month-to-month billing; it is offered only after the first 12 months, at $25–$40 a month depending on the tier.',
      head: ['', '1 year', '3 years'],
      rows: [
        ['WHOOP One', '$199', '$597'],
        ['WHOOP Peak', '$239', '$717'],
        ['WHOOP Life', '$359', '$1,077'],
        ['P.R.O. free', '$0', '$0'],
        ['P.R.O. with Pro (yearly)', '$29.99', '$89.97'],
      ],
      note: 'If you already own an Apple Watch, Garmin or Oura, P.R.O. needs no extra hardware. WHOOP prices are US annual prices from WHOOP’s membership page; Pro is P.R.O.’s entry tier on the US App Store.',
    },
    picks: [
      ['P.R.O.', 'You already wear an Apple Watch, Garmin, Oura or another tracker that syncs to Apple Health and want readiness, training load, sleep and an AI coach in one app — and to ask ChatGPT or Claude about it through MCP. Free to start.'],
      ['WHOOP', 'You want a screenless band worn 24/7 and WHOOP’s own Recovery and Strain scores, or Healthspan, ECG and blood pressure insights on Peak and Life. Works on iPhone and Android.'],
      ['Athlytic', 'You only want WHOOP-style recovery and exertion scores from an Apple Watch.'],
      ['Bevel', 'You want nutrition and glucose logging alongside recovery and strain.'],
    ],
    steps: [
      {
        title: 'Get your data into Apple Health',
        text: 'Apple Watch writes HRV, resting heart rate, sleep and workouts automatically. Garmin, Oura, Polar, COROS and most other trackers sync through their own app. Already wearing WHOOP? It writes resting heart rate, sleep and workouts to Apple Health too — but not HRV.',
        links: [['/garmin-apple-health', 'Garmin'], ['/oura-apple-health', 'Oura'], ['/whoop-apple-health', 'WHOOP'], ['/apple-health-sync', 'All devices']],
      },
      {
        title: 'Install P.R.O. and allow Apple Health access',
        text: 'It’s free. P.R.O. reads your past workouts, so training load and baselines start from the history you already have.',
      },
      {
        title: 'Check readiness and training load each morning',
        text: 'Ready, caution or recover, with the reasons, next to today’s load target. Add a training plan and it adapts to the same signals.',
        links: [['/apple-watch-readiness-score', 'How the readiness rules work']],
      },
      {
        title: 'Connect ChatGPT or Claude through MCP',
        text: 'Add https://mcp.proapp.uk as a custom connector and approve it with a code from the app. About two minutes.',
        links: [['/mcp-connect', 'Connection guide'], ['/apple-health-mcp', 'How the MCP server works']],
      },
      {
        title: 'Time the WHOOP cancellation',
        text: 'WHOOP memberships run for 12 months, so switch at your renewal date. WHOOP says your past data stays viewable in its app after the membership ends.',
      },
    ],
    faq: [
      {
        q: 'What is the best WHOOP alternative for Apple Watch?',
        a: 'If you already wear an Apple Watch, an app that reads its HRV, resting heart rate and sleep from Apple Health gives you WHOOP-style recovery without a band. P.R.O. is free and adds training load, an AI coach, adaptive training plans and a free MCP connector for ChatGPT and Claude. Athlytic ($29.99/yr) focuses on recovery and exertion scores; Bevel adds nutrition logging.',
      },
      {
        q: 'Is there a free WHOOP alternative?',
        a: 'Yes. P.R.O. is free on the App Store and works with the data your Apple Watch, Garmin, Oura or other tracker writes to Apple Health; Pro from $2.99/month is optional. Its MCP connector for ChatGPT, Claude, Gemini, Grok and Perplexity is completely free.',
      },
      {
        q: 'How much does WHOOP cost in 2026?',
        a: 'As of 27 October 2026, WHOOP One is $199 a year, Peak $239 a year and Life $359 a year in the US, with the band included. Month-to-month billing ($25, $30 and $40) is offered only to members who have completed a 12-month commitment.',
      },
      {
        q: 'Can you use WHOOP without a subscription?',
        a: 'No. WHOOP says that once your membership ends it no longer collects, uploads or analyses your biometric data; you can still view past data. Unofficial third-party apps that read the band directly exist; they are not WHOOP products.',
      },
      {
        q: 'WHOOP vs Apple Watch: which is better for recovery?',
        a: 'Both measure the signals recovery is built on — HRV, resting heart rate and sleep. WHOOP is a screenless band with its own Recovery score and a membership; Apple Watch is a smartwatch you may already own. Apple’s built-in Readiness score needs a Series 12 or Ultra 4; on any Apple Watch, P.R.O. gives a daily readiness status from your HRV, resting heart rate and sleep against your 28-day baseline.',
      },
      {
        q: 'Athlytic vs WHOOP: what is the difference?',
        a: 'Athlytic is an iPhone app ($4.99/month or $29.99/year) that calculates recovery, exertion and sleep scores from Apple Watch data; WHOOP is a band with a $199–$359 yearly membership. P.R.O. is a free alternative to both that adds an AI coach, adaptive training plans and an MCP connector for ChatGPT and Claude.',
      },
      {
        q: 'Can ChatGPT or Claude read my recovery data?',
        a: `Yes, through MCP. Add P.R.O.’s free connector, https://mcp.proapp.uk, to ChatGPT, Claude, Gemini, Grok or Perplexity and ask “Am I recovered enough to train hard today?” — the assistant reads your readiness status, HRV, resting heart rate, sleep and training load from Apple Health. We have tested it in ${ASSISTANTS_TESTED}. As of 27 October 2026 WHOOP has no official MCP connector.`,
      },
      {
        q: 'Does WHOOP data work in P.R.O.?',
        a: 'Yes, whatever WHOOP writes to Apple Health: workouts, sleep, resting heart rate, respiratory rate, blood oxygen and steps. WHOOP does not export HRV to Apple Health, so P.R.O.’s readiness uses your resting heart rate and sleep unless another device, such as an Apple Watch, adds HRV.',
      },
    ],
    sources: [
      ['WHOOP — membership tiers and prices', 'https://www.whoop.com/us/en/membership/'],
      ['WHOOP Support — Membership Pricing', 'https://support.whoop.com/s/article/Membership-Pricing'],
      ['WHOOP Support — Canceling Your Membership', 'https://support.whoop.com/s/article/Canceling-Your-Membership'],
      ['WHOOP Support — Apple Health Integration', 'https://support.whoop.com/s/article/Apple-Health-Integration'],
      ['Athlytic — website', 'https://www.athlyticapp.com/'],
      ['Athlytic — App Store', 'https://apps.apple.com/us/app/athlytic-ai-fitness-coach/id1543571755'],
      ['Bevel — App Store', 'https://apps.apple.com/us/app/bevel-ai-health-coach/id6456176249'],
      ['Bevel — website', 'https://www.bevel.health/'],
      ['Apple Readiness — Apple Watch User Guide', 'https://support.apple.com/guide/watch/readiness-flx4gnzby346/watchos'],
      ['P.R.O. — App Store', 'https://apps.apple.com/us/app/p-r-o/id6749865568'],
    ],
  },
  {
    id: 'runna',
    path: '/runna-alternative',
    faqKey: 'runnaAlternative',
    title: 'Runna Alternative 2026: AI Running Plans From $2.99 — P.R.O.',
    description: 'Runna is $19.99/mo. P.R.O. builds adaptive running plans from your Apple Health runs from $2.99/mo, and ChatGPT or Claude can adjust them via MCP.',
    competitor: 'Runna',
    eyebrow: 'RUNNA ALTERNATIVE · PRICES CHECKED 27 OCTOBER 2026',
    h1: 'The Runna alternative that builds running plans from your real runs',
    answer: [
      'P.R.O. builds adaptive running plans — 5K, half marathon, return to running or any goal you describe — from the runs, heart rate and sleep in Apple Health, and adjusts them to your training load and recovery. Plans come with Pro from $2.99 a month or $29.99 a year; Runna costs $19.99 a month or $119.99 a year. With P.R.O.’s free MCP connector, ChatGPT or Claude can read your real runs and propose changes to your plan.',
      'It works with any watch that writes runs to Apple Health — Apple Watch, Garmin, COROS, Polar, Suunto and more — and covers 50+ sports, not only running.',
    ],
    facts: [
      ['P.R.O.', 'Free app; plans with Pro from $2.99/mo'],
      ['Runna', '$19.99/mo or $119.99/yr, 7-day trial'],
      ['Watches', 'Any that writes runs to Apple Health'],
      ['MCP connector', 'Free, for ChatGPT, Claude, Gemini, Grok, Perplexity'],
    ],
    mcp: {
      title: 'Have ChatGPT or Claude build and adjust your running plan from your real runs',
      lead: `Add P.R.O.’s MCP connector, https://mcp.proapp.uk, to your AI assistant and it can read your recent runs — distance, pace, heart rate and splits — along with sleep, readiness and training load, then propose a new plan or changes to your current one. The proposal waits in P.R.O. and changes nothing until you accept it. The connector is completely free, and we have tested it in ${ASSISTANTS_TESTED}.`,
      prompt: 'Look at my runs from the last 8 weeks and build me a 12-week half-marathon plan: four runs a week, long run on Sunday, goal under 1:55. Send it to P.R.O. as a proposal.',
      more: ['Am I on track for my half-marathon plan?', 'My legs are heavy — make this week easier and move the intervals.', 'What was my average pace on my last long run?'],
      after: 'The assistant reads your training history through P.R.O., writes the plan with your real paces and sends it as a pending proposal; you review and accept it in the app. In ChatGPT, Claude and Gemini it can show interactive P.R.O. plan and workout cards.',
    },
    columns: ['P.R.O.', 'Runna', 'Garmin Coach', 'Nike Run Club', 'Strava'],
    rows: [
      [MCP_ROW, `${PRO_MCP}; the assistant can propose plan changes`, 'No', 'No official connector', 'No', 'Official connector since June 2026 — subscribers only, Claude only at launch'],
      ['Price (US)', 'Free app; plans with Pro from $2.99/mo or $29.99/yr', '$19.99/mo or $119.99/yr, 7-day trial; Strava + Runna bundle $149.99/yr', 'Free; optional Garmin Connect+ $6.99/mo or $69.99/yr', 'Free', '$11.99/mo or $79.99/yr (US App Store)'],
      ['Watches', 'Any watch that writes runs to Apple Health: Apple Watch, Garmin, COROS, Polar, Suunto and more', 'Apple Watch, Garmin, COROS, Suunto, Amazfit; Fitbit activities via import', 'Garmin watches only', 'iPhone, Android, Apple Watch', 'Syncs from most watches'],
      ['Running plans', 'Adaptive AI plans: 5K Starter, Half Marathon Base, Return to Running, or any race or goal you describe', '5K to ultra, Couch to 5K, return to running, triathlon running, strength', 'Adaptive 5K, 10K and half marathon; marathon plans are not adaptive', 'Guided Runs; plan availability varies by region', 'No plans of its own (sells the Runna bundle)'],
      ['Adapts to', 'Your training load, HRV, resting heart rate and sleep from Apple Health', 'Your completed runs; pace targets update as you train', 'Your completed runs', '—', '—'],
      ['Beginner plans', '5K Starter (8 weeks, walk–run) and Return to Running', 'New to Running, Return to Running, Path to parkrun — in the subscription since June 2026', '5K plans from 6 weeks', 'Guided Runs', '—'],
      ['AI coach chat', 'Yes — ask about any run, week or plan; answers with tables and charts', 'AI post-run insights, not a chat', 'AI insights with Connect+', 'No', 'Athlete Intelligence summaries for subscribers'],
      ['Beyond running', '50+ sports, sleep score, readiness and training load in one history', 'Strength and conditioning', 'Garmin Connect covers other sports', 'Running only', 'Records many sports, social feed'],
    ],
    beginner: {
      title: 'Running plans for beginners',
      lead: 'P.R.O.’s 5K Starter takes eight weeks: walk–run intervals in the early weeks, one slightly longer easy run each week, rest days in between and a gentle 5K by week 8. Coming back after a break? Return to Running rebuilds volume gradually.',
      text: 'Because the plan reads Apple Health, it takes a short night or a jump in resting heart rate into account instead of pushing you through a hard session. To keep easy runs easy, find your Zone 2 heart rate first.',
      links: [['/zone-2-calculator', 'Zone 2 heart rate calculator'], ['/what-is-a-good-hrv', 'What is a good HRV?']],
    },
    picks: [
      ['P.R.O.', 'You want a plan that reacts to your recovery — HRV, resting heart rate and sleep — not only to your paces, you train more than running, and you want to ask ChatGPT or Claude about your runs through MCP. From $2.99 a month.'],
      ['Runna', 'You want pace-based workouts sent to your watch and a large library of race plans, on iPhone or Android.'],
      ['Garmin Coach', 'You own a Garmin and want free adaptive plans from 5K to half marathon.'],
      ['Nike Run Club', 'You want free audio Guided Runs.'],
      ['Strava', 'You want the social feed and segments; Strava sells Runna as a bundle.'],
    ],
    steps: [
      {
        title: 'Make sure your runs reach Apple Health',
        text: 'Apple Watch does it automatically. Garmin, COROS, Polar and Suunto sync runs through their own apps, and Strava can write workouts to Apple Health too.',
        links: [['/garmin-apple-health', 'Garmin'], ['/coros-apple-health', 'COROS'], ['/strava-apple-health', 'Strava'], ['/apple-health-sync', 'All devices']],
      },
      {
        title: 'Install P.R.O. and allow Apple Health access',
        text: 'The app is free and reads your past runs, so your plan starts from your current fitness, not from a questionnaire.',
      },
      {
        title: 'Pick a plan or describe your goal',
        text: 'Start with 5K Starter, Half Marathon Base or Return to Running, or tell the AI coach your race and date. Keep today’s session on your home screen with the plan widget, and record runs with your watch as usual.',
      },
      {
        title: 'Connect ChatGPT or Claude through MCP',
        text: 'Add https://mcp.proapp.uk as a custom connector and approve it with a code from the app. Then ask your assistant to review your week or adjust the plan.',
        links: [['/mcp-connect', 'Connection guide'], ['/apple-health-mcp', 'How the MCP server works']],
      },
      {
        title: 'Cancel Runna',
        text: 'If you subscribed through the App Store, cancel in Settings → your name → Subscriptions. The Strava + Runna bundle is managed in Strava.',
      },
    ],
    faq: [
      {
        q: 'What is the best Runna alternative?',
        a: 'For iPhone runners, P.R.O. builds adaptive running plans from your Apple Health data for $2.99 a month instead of Runna’s $19.99, adjusts them to your training load, HRV, resting heart rate and sleep, and lets ChatGPT or Claude propose plan changes through a free MCP connector. Garmin Coach is a free option if you own a Garmin; Nike Run Club offers free Guided Runs.',
      },
      {
        q: 'Is there a free alternative to Runna?',
        a: 'Garmin Coach is free with a Garmin watch and Nike Run Club’s Guided Runs are free. P.R.O. is a free app with plans from $2.99 a month, and its MCP connector is completely free: ChatGPT or Claude can read your real runs and write a plan from them.',
      },
      {
        q: 'How much does Runna cost in 2026?',
        a: 'As of 27 October 2026 Runna costs $19.99 a month or $119.99 a year in the US, with a 7-day free trial. Strava sells a Strava + Runna bundle for $149.99 a year.',
      },
      {
        q: 'Is Runna free?',
        a: 'No. Runna has a 7-day free trial and no free tier. Its beginner plans — New to Running, Return to Running and Path to parkrun — became part of the paid subscription on June 5, 2026.',
      },
      {
        q: 'Does Strava own Runna?',
        a: 'Yes. Strava announced it was acquiring Runna on April 17, 2025. The apps stay separate, and since July 2025 Strava has sold a Strava + Runna bundle.',
      },
      {
        q: 'Runna vs Garmin Coach: which is better?',
        a: 'Garmin Coach is free but needs a Garmin watch, and its adaptive plans cover 5K, 10K and half marathon. Runna costs $19.99 a month and goes from 5K to ultra on several watch brands. P.R.O. works with any watch that writes to Apple Health and adapts plans to recovery as well as to your runs.',
      },
      {
        q: 'Can ChatGPT or Claude make a running plan from my runs?',
        a: `Yes, through MCP. Add P.R.O.’s free connector, https://mcp.proapp.uk, to ChatGPT, Claude, Gemini, Grok or Perplexity and ask for a plan: the assistant reads your recent runs, paces, heart rate and recovery from Apple Health and can send the plan to P.R.O. as a proposal you accept in the app. We have tested it in ${ASSISTANTS_TESTED}.`,
      },
      {
        q: 'What is a good running plan for beginners?',
        a: 'Start with walk–run intervals three times a week and build slowly, keeping most runs easy, in Zone 2. P.R.O.’s 5K Starter does this over eight weeks and takes your sleep and resting heart rate into account.',
      },
    ],
    sources: [
      ['Runna — pricing', 'https://www.runna.com/pricing'],
      ['Runna — App Store', 'https://apps.apple.com/us/app/runna-running-plans-coach/id1594204443'],
      ['Runna Support — beginner plans in the subscription from June 5, 2026', 'https://support.runna.com/en/articles/15396688-new-to-running-return-to-running-and-path-to-parkrun-plans'],
      ['Runna Support — Strava + Runna bundle', 'https://support.runna.com/en/articles/11626438'],
      ['Runna Support — device guides', 'https://support.runna.com/en/collections/17889220'],
      ['Strava to acquire Runna — press release, April 17, 2025', 'https://dcrainmaker.com/2025/04/strava-acquires-runna-thoughts-forward.html'],
      ['Strava Support — Strava MCP connector', 'https://support.strava.com/en-us/articles/15401531-strava-mcp-connector'],
      ['Strava — App Store', 'https://apps.apple.com/us/app/strava-run-bike-walk/id426826309'],
      ['Garmin — adaptive training plans', 'https://www.garmin.com/en-GB/blog/which-adaptive-training-plan-is-right-for-you/'],
      ['Garmin — Connect+ announcement', 'https://www.garmin.com/en-US/newsroom/press-release/wearables-health/elevate-your-health-and-fitness-goals-with-garmin-connect/'],
      ['Nike Run Club — App Store', 'https://apps.apple.com/us/app/nike-run-club-running-coach/id387771637'],
      ['Nike Help — NRC plans', 'https://www.nike.com/help/a/nrc-plan'],
      ['P.R.O. — App Store', 'https://apps.apple.com/us/app/p-r-o/id6749865568'],
    ],
  },
];

export const whoopAlternativeFaq = alternatives[0].faq;
export const runnaAlternativeFaq = alternatives[1].faq;
