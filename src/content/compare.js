// Сравнение AI-коучей для Apple Health. Каждый факт проверен 2026-10-03 по
// официальным источникам (App Store, сайты и справка разработчиков) — ссылки
// в `sources`. Цены — US App Store / сайт разработчика на дату проверки.
// Обновлять раз в квартал: дата проверки показывается на странице.

export const CHECKED = '3 October 2026';

export const ROWS = [
  ['price', 'Price'],
  ['hardware', 'Hardware'],
  ['platforms', 'Platforms'],
  ['coach', 'AI coach chat with your data'],
  ['plans', 'Training plans'],
  ['readiness', 'Readiness / recovery score'],
  ['sleep', 'Sleep analysis'],
  ['mcp', 'Works with ChatGPT / Claude (MCP)'],
];

export const APPS = [
  {
    id: 'pro',
    name: 'P.R.O.',
    price: 'Free; optional Pro from $2.99/mo',
    hardware: 'None — Apple Watch optional, via Apple Health',
    platforms: 'iPhone, iPad (iOS 18.5+)',
    coach: 'Yes — chat with tables & charts, choice of AI model',
    plans: 'Yes — adaptive plans + home-screen widget',
    readiness: 'Daily readiness guidance in the plan',
    sleep: 'Yes — sleep score',
    mcp: 'Yes — official connector (mcp.proapp.uk)',
    url: 'https://apps.apple.com/us/app/p-r-o/id6749865568',
  },
  {
    id: 'athlytic',
    name: 'Athlytic',
    price: '$4.99/mo or $29.99/yr',
    hardware: 'Apple Watch for most features',
    platforms: 'iPhone, iPad, Apple Watch',
    coach: 'Partial — “Ask Athlytic” on-device Q&A',
    plans: 'Partial — daily workout suggestions',
    readiness: 'Yes — Recovery score',
    sleep: 'Yes',
    mcp: 'No',
    url: 'https://apps.apple.com/us/app/athlytic-fitness-recovery/id1543571755',
  },
  {
    id: 'bevel',
    name: 'Bevel',
    price: '$14.99/mo or $99.99/yr + AI credit packs',
    hardware: 'None — Apple Watch, Oura, Garmin, Amazfit',
    platforms: 'iPhone, Apple Watch',
    coach: 'Yes — Bevel Intelligence chat',
    plans: 'Yes — strength plans',
    readiness: 'Yes — Recovery score',
    sleep: 'Yes — sleep score, smart alarm',
    mcp: 'No (requested by users, under review)',
    url: 'https://apps.apple.com/us/app/bevel-ai-health-coach/id6456176249',
  },
  {
    id: 'whoop',
    name: 'WHOOP Coach',
    price: 'Membership from $199/yr (band included)',
    hardware: 'WHOOP band required',
    platforms: 'iOS, Android, web',
    coach: 'Yes — WHOOP Coach (built with OpenAI)',
    plans: 'Yes — via WHOOP Coach',
    readiness: 'Yes — Recovery 1–99%',
    sleep: 'Yes — Sleep Performance',
    mcp: 'No official connector',
    url: 'https://apps.apple.com/us/app/whoop/id933944389',
  },
  {
    id: 'gentler',
    name: 'Gentler Streak',
    price: 'Free; Premium $8.99/mo or $39.99/yr',
    hardware: 'Built around Apple Watch',
    platforms: 'iPhone, iPad, Apple Watch',
    coach: 'No chat (Siri questions, on-device)',
    plans: 'Partial — daily suggestions',
    readiness: 'Yes — daily readiness',
    sleep: 'Yes',
    mcp: 'No',
    url: 'https://apps.apple.com/us/app/gentler-streak-workout-tracker/id1576857102',
  },
  {
    id: 'google',
    name: 'Google Health Coach',
    price: 'Premium $9.99/mo or $99/yr',
    hardware: 'Coach needs Fitbit or Pixel Watch',
    platforms: 'iOS, Android',
    coach: 'Yes — Gemini coach (Fitbit/Pixel Watch only)',
    plans: 'Yes — weekly plans',
    readiness: 'Yes — Readiness (Premium)',
    sleep: 'Yes',
    mcp: 'No',
    url: 'https://apps.apple.com/us/app/google-health-fitbit/id462638897',
  },
  {
    id: 'runna',
    name: 'Runna',
    price: '$19.99/mo or $119.99/yr',
    hardware: 'None — many watches supported',
    platforms: 'iOS, Android',
    coach: 'Partial — AI post-run insights, not a chat',
    plans: 'Yes — running plans 5K to ultra',
    readiness: '—',
    sleep: '—',
    mcp: 'No (Strava’s connector covers Strava data)',
    url: 'https://apps.apple.com/us/app/runna-running-plans-coach/id1594204443',
  },
];

export const SOURCES = [
  ['P.R.O. — App Store', 'https://apps.apple.com/us/app/p-r-o/id6749865568'],
  ['Athlytic — App Store', 'https://apps.apple.com/us/app/athlytic-fitness-recovery/id1543571755'],
  ['Bevel — App Store', 'https://apps.apple.com/us/app/bevel-ai-health-coach/id6456176249'],
  ['Bevel — website', 'https://bevel.health/'],
  ['WHOOP — App Store', 'https://apps.apple.com/us/app/whoop/id933944389'],
  ['WHOOP — membership pricing', 'https://support.whoop.com/s/article/Membership-Pricing?language=en_US'],
  ['Gentler Streak — App Store', 'https://apps.apple.com/us/app/gentler-streak-workout-tracker/id1576857102'],
  ['Google Health Coach — Google blog', 'https://blog.google/products-and-platforms/products/google-health/google-health-coach/'],
  ['Google Health Coach — device support', 'https://support.google.com/googlehealth/answer/16961408?hl=en'],
  ['Runna — App Store', 'https://apps.apple.com/us/app/runna-running-plans-coach/id1594204443'],
  ['Runna — website', 'https://www.runna.com/'],
];

export const compareFaq = [
  {
    q: 'What is the best AI coach app for Apple Watch?',
    a: 'It depends on what you need: P.R.O. if you want to chat with your Apple Health data, get adaptive training plans and connect ChatGPT or Claude for free; Athlytic for an on-device recovery score; WHOOP if you prefer a dedicated band; Runna for structured running plans.',
  },
  {
    q: 'Is P.R.O. a good Athlytic alternative?',
    a: 'Yes, if you want an AI coach you can chat with and adaptive training plans. Athlytic is stronger as a pure recovery-score app with fully on-device processing; P.R.O. adds a chat coach, training plans and a ChatGPT/Claude connector, and is free to start.',
  },
  {
    q: 'Is P.R.O. a good Bevel alternative?',
    a: 'Yes for Apple Health users who want a cheaper AI coach: P.R.O. is free with Pro from $2.99/month, while Bevel Pro is $14.99/month. Bevel supports more wearables (Oura, Garmin, Amazfit) and has strength-training plans.',
  },
  {
    q: 'Which fitness apps work with ChatGPT or Claude?',
    a: 'P.R.O. has an official MCP connector (mcp.proapp.uk) that lets ChatGPT, Claude and other assistants read your Apple Health workouts, sleep and heart rate with your permission. As of October 2026 we found no official connector for Athlytic, Bevel, WHOOP, Gentler Streak or Google Health Coach.',
  },
];
