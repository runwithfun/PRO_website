// "Connect <device> to ChatGPT" pages: /garmin-to-chatgpt, /whoop-to-chatgpt, /oura-to-chatgpt.
// The sync tables come from deviceGuides.js; this file adds what P.R.O. reads, setup steps,
// first questions, fixes and FAQ. Official-integration facts were checked on November 26, 2026:
// OpenAI Help (ChatGPT Health reads Garmin, WHOOP and Oura through Apple Health or Health
// Connect, US only) — https://help.openai.com/en/articles/20001036
// Garmin Connect+ / Active Intelligence — Garmin newsroom; Garmin Personal API — developer.garmin.com
// WHOOP Coach built on GPT-4 inside the WHOOP app — https://openai.com/index/whoop/
// Oura partner integrations list no AI assistants (updated November 24, 2026); Oura Advisor is in-app.
import { deviceGuides } from './deviceGuides.js';

export const CHATGPT_PLUGIN = 'https://chatgpt.com/plugins/plugin_asdk_app_6ad22f791530819196ed668dfdbf6909';
export const DEVICE_CHAT_CHECKED = '2026-11-26';
const OPENAI_HEALTH = ['OpenAI Help: Health in ChatGPT', 'https://help.openai.com/en/articles/20001036'];

// Apple Health types the P.R.O. connector reads (get_daily_metrics, get_workouts, get_profile,
// fetch_health_data). Anything else a device writes stays out of reach of the assistant.
const PRO_READS = /^(workouts?|steps?|walking \+ running distance|distance|flights climbed|active energy|heart rate|resting heart rate|hrv|sleep|weight \/ body composition|water)$/i;

// One row per data type: can ChatGPT answer from it through P.R.O.?
export function chatRows(guide) {
  const app = guide.app || guide.name;
  return guide.syncs.filter((s) => s.ok !== undefined).map((s) => {
    if (s.ok === false) return { type: s.type, ok: false, note: s.note ?? `${app} doesn’t write it to Apple Health.` };
    if (!PRO_READS.test(s.type)) return { type: s.type, ok: false, note: 'Reaches Apple Health, but P.R.O. doesn’t read this type.' };
    return { type: s.type, ok: s.ok, note: s.note };
  });
}

// Shared setup; step 1 is the device's own Apple Health switch. Used by the page and the HowTo.
export function chatSteps(entry) {
  const g = guideOf(entry);
  return [
    { title: `Send ${g.name} data to Apple Health`, text: entry.healthStep },
    { title: 'Install P.R.O. and allow Apple Health', text: `Install the free P.R.O. app on your iPhone, sign in and allow access to Apple Health. P.R.O. syncs what ${g.app || g.name} writes there.` },
    { title: 'Add P.R.O. to ChatGPT', text: 'Open the P.R.O. plugin in ChatGPT, select Install plugin, then Connect P.R.O. On your iPhone, open P.R.O. → Settings → MCP Connect → Get connection code, and enter the code to connect.' },
    { title: 'Ask your first question', text: `Start a chat with P.R.O. enabled and ask about your ${g.name} workouts, sleep or steps.` },
  ];
}

export const guideOf = (entry) => deviceGuides.find((g) => g.id === entry.device);

export const deviceChats = [
  {
    id: 'garmin-chatgpt',
    device: 'garmin',
    path: '/garmin-to-chatgpt',
    title: 'Connect Garmin to ChatGPT: Free via Apple Health — P.R.O.',
    description: 'Garmin has no ChatGPT app. Garmin Connect writes to Apple Health and ChatGPT reads it through the free P.R.O. plugin. What works and what doesn’t.',
    answer: [
      'Garmin has no ChatGPT app of its own. What works today: Garmin Connect writes your workouts, steps, heart rate and sleep to Apple Health, the free P.R.O. app syncs Apple Health, and the P.R.O. plugin in ChatGPT reads it. Setup takes about five minutes on an iPhone.',
      'ChatGPT can then answer about your Garmin runs, rides, sleep and daily activity. It can’t see HRV, resting heart rate, Body Battery or GPS routes, because Garmin Connect keeps them to itself.',
    ],
    healthStep: 'In Garmin Connect, open More → Settings → Connect Apps → Apple Health → Connect with Apple Health. Tap Turn On All, then Allow. Garmin Connect writes only while it is open on screen.',
    gapNote: 'Readiness and baselines in P.R.O. use HRV and resting heart rate. With Garmin alone they lean on sleep and training load, unless another source, such as an Apple Watch, writes those two types.',
    prompts: [
      'Show my runs from the last two weeks with distance and pace.',
      'How did I sleep this week compared with last week?',
      'How many steps did I average per day this month?',
      'Is my training load too high right now?',
    ],
    trouble: [
      { q: 'ChatGPT doesn’t see today’s Garmin workout', a: 'Open Garmin Connect and keep it on screen while the watch syncs; Garmin writes to Apple Health only in the foreground. Then open P.R.O. so it uploads, or ask ChatGPT to request a fresh sync.' },
      { q: 'HRV or resting heart rate is missing', a: 'Expected. Garmin Connect doesn’t write either type to Apple Health, so there is no setting to change. They stay in Garmin Connect.' },
      { q: 'Sleep has no stages', a: 'Update Garmin Connect. It shares deep, light, REM and awake stages from version 4.71. Sync the watch again with the app open.' },
      { q: 'A whole category is missing', a: 'In the Health app, open your profile → Apps → Connect and turn the category on. Then check P.R.O. → Settings → MCP Connect → Data the assistant can read.' },
      { q: 'Steps or calories look doubled', a: 'Two sources are being counted. In Health → Browse → Activity → Steps → Data Sources & Access, tap Edit and drag Connect to the top.' },
    ],
    official: {
      text: 'We found no ChatGPT app or MCP server from Garmin itself. Garmin’s own AI insights, Active Intelligence, come with the paid Garmin Connect+ plan inside the Garmin Connect app. Garmin also offers a Personal API key for your own data, but ChatGPT can’t use the key without a server in between, so the options you see elsewhere come from third parties. In the US, ChatGPT Health can read Garmin data through Apple Health as well.',
      sources: [
        ['Garmin newsroom: Garmin Connect+ and Active Intelligence', 'https://www.garmin.com/en-US/newsroom/press-release/wearables-health/elevate-your-health-and-fitness-goals-with-garmin-connect/'],
        ['Garmin Developers: Personal API FAQ', 'https://developer.garmin.com/gc-developer-program/personal/personal-faq/'],
        OPENAI_HEALTH,
      ],
    },
    faq: [
      { q: 'Can ChatGPT read my Garmin data?', a: 'Yes, through Apple Health. Garmin Connect writes workouts, steps, heart rate, sleep, weight and water to Apple Health, and the free P.R.O. plugin lets ChatGPT read them. HRV, resting heart rate, Body Battery and GPS routes stay in Garmin Connect.' },
      { q: 'Does Garmin have an official ChatGPT integration?', a: 'Not that we could find on November 26, 2026. Garmin’s AI insights live in the paid Garmin Connect+ plan inside its own app. Connections from Garmin to ChatGPT come from third parties, such as P.R.O. through Apple Health.' },
      { q: 'Can ChatGPT see my Body Battery, HRV Status or training readiness from Garmin?', a: 'No. Garmin keeps these scores in Garmin Connect and doesn’t write them to Apple Health, so no Apple Health connector can pass them on.' },
      { q: 'Is it free?', a: 'Yes. The P.R.O. app and its ChatGPT connector are free. You need a ChatGPT plan that offers plugins.' },
      { q: 'Does it work outside the US?', a: 'Yes, wherever ChatGPT offers plugins. ChatGPT’s built-in Health space is US only.' },
      { q: 'Do I need an Apple Watch?', a: 'No. You need an iPhone, because Apple Health lives there. Your Garmin watch is enough.' },
    ],
  },
  {
    id: 'whoop-chatgpt',
    device: 'whoop',
    path: '/whoop-to-chatgpt',
    title: 'Connect WHOOP to ChatGPT: Free via Apple Health — P.R.O.',
    description: 'WHOOP has no ChatGPT app. WHOOP writes workouts, sleep and resting heart rate to Apple Health; ChatGPT reads them via the free P.R.O. plugin.',
    answer: [
      'WHOOP has no ChatGPT connection of its own. What works today: the WHOOP app writes workouts, sleep, resting heart rate and steps to Apple Health, the free P.R.O. app syncs Apple Health, and the P.R.O. plugin in ChatGPT reads it. Setup takes about five minutes on an iPhone.',
      'ChatGPT can then answer about your WHOOP workouts, sleep time, resting heart rate and steps. It can’t see HRV, Recovery, Strain or sleep stages, because WHOOP keeps them in its own app.',
    ],
    healthStep: 'In the WHOOP app, open More → App Settings → Integrations → Apple Health and tap Connect. Tap Turn On All, then Allow.',
    gapNote: 'Readiness and baselines in P.R.O. use HRV. WHOOP doesn’t write it, so they lean on resting heart rate, sleep and training load, unless another source, such as an Apple Watch, writes HRV.',
    prompts: [
      'How did my resting heart rate change over the last month?',
      'Compare my sleep time this week with last week.',
      'Show my workouts from the last two weeks.',
      'How many steps did I average per day this month?',
    ],
    trouble: [
      { q: 'ChatGPT doesn’t see last night’s sleep', a: 'WHOOP writes sleep after it processes the night, not right away. Open the WHOOP app to force a sync, keep Background App Refresh on, then open P.R.O. so it uploads.' },
      { q: 'HRV is missing', a: 'Expected. WHOOP measures RMSSD and doesn’t export HRV to Apple Health, so there is no setting to change.' },
      { q: 'Steps are missing', a: 'Check that Steps is allowed under Health → profile → Apps → WHOOP. Steps need WHOOP 4.0, 5.0 or MG.' },
      { q: 'Workouts show up twice', a: 'If an Apple Watch already records your workouts, turn off WHOOP’s Workouts write permission under Health → profile → Apps → WHOOP.' },
      { q: 'A whole category is missing', a: 'Allow it under Health → profile → Apps → WHOOP, then check P.R.O. → Settings → MCP Connect → Data the assistant can read.' },
    ],
    official: {
      text: 'We found no ChatGPT app or MCP server from WHOOP itself. WHOOP Coach, the AI coach inside the WHOOP app, is built on OpenAI’s GPT-4, but it lives in the WHOOP app and doesn’t connect to your ChatGPT account. In the US, ChatGPT Health can read WHOOP data through Apple Health as well.',
      sources: [
        ['OpenAI: WHOOP customer story', 'https://openai.com/index/whoop/'],
        OPENAI_HEALTH,
      ],
    },
    faq: [
      { q: 'Can ChatGPT read my WHOOP data?', a: 'Yes, through Apple Health. WHOOP writes workouts, sleep sessions, resting heart rate, steps and active energy to Apple Health, and the free P.R.O. plugin lets ChatGPT read them. HRV, Recovery and Strain stay in the WHOOP app.' },
      { q: 'Does WHOOP have an official ChatGPT integration?', a: 'Not that we could find on November 26, 2026. WHOOP Coach inside the WHOOP app uses OpenAI’s models, but it isn’t a connection to your own ChatGPT account.' },
      { q: 'Can ChatGPT see my WHOOP Recovery and Strain scores?', a: 'No. They are WHOOP’s own scores with no matching Apple Health type. ChatGPT sees the resting heart rate, sleep and workouts behind them.' },
      { q: 'Is it free?', a: 'Yes. The P.R.O. app and its ChatGPT connector are free. You still need your WHOOP membership for the WHOOP app, and a ChatGPT plan that offers plugins.' },
      { q: 'Does it work outside the US?', a: 'Yes, wherever ChatGPT offers plugins. ChatGPT’s built-in Health space is US only.' },
      { q: 'Does ChatGPT get my all-day heart rate from WHOOP?', a: 'No. WHOOP writes heart rate only during activities and sleep, so ChatGPT sees those samples and your resting heart rate.' },
    ],
  },
  {
    id: 'oura-chatgpt',
    device: 'oura',
    path: '/oura-to-chatgpt',
    title: 'Connect Oura to ChatGPT: Free via Apple Health — P.R.O.',
    description: 'Oura has no ChatGPT app. The Oura app writes sleep stages, heart rate and workouts to Apple Health; ChatGPT reads them via the free P.R.O. plugin.',
    answer: [
      'Oura has no ChatGPT connection of its own. What works today: the Oura app writes sleep with stages, heart rate, steps and workouts to Apple Health, the free P.R.O. app syncs Apple Health, and the P.R.O. plugin in ChatGPT reads it. Setup takes about five minutes on an iPhone.',
      'ChatGPT can then answer about your Oura sleep stages, heart rate, steps and workouts with routes. It can’t see HRV, resting heart rate, temperature or Oura’s Readiness and Sleep scores, because Oura keeps them in its own app.',
    ],
    healthStep: 'In the Oura app, open the menu → Settings → Data sharing → Apple Health and turn on Connect to Health. Allow the categories, then tap Allow.',
    gapNote: 'Readiness and baselines in P.R.O. use HRV and resting heart rate. With Oura alone they lean on sleep and training load, unless another source, such as an Apple Watch, writes those two types.',
    prompts: [
      'How much deep and REM sleep did I get this week?',
      'Compare my sleep this week with last week.',
      'Show my last walk with the route.',
      'How many steps did I average per day this month?',
    ],
    trouble: [
      { q: 'Some nights are missing', a: 'Open the Oura app and the Health app at least once a day before midnight so the import runs. Background App Refresh on and Low Power Mode off help too. Then open P.R.O. so it uploads.' },
      { q: 'HRV or resting heart rate is missing', a: 'Expected. Oura doesn’t write HRV or resting heart rate to Apple Health, so there is no setting to change.' },
      { q: 'Oura stopped syncing', a: 'Gen3 and Ring 4 need an active Oura membership for the Apple Health link. Turn Oura’s sharing switches off and on again, then restart the iPhone.' },
      { q: 'Steps look doubled', a: 'Make Oura or your watch the top Steps source under Health → Browse → Activity → Steps → Data Sources & Access, or turn off Oura’s Steps write permission.' },
      { q: 'A whole category is missing', a: 'Allow it under Health → profile → Apps → Oura, then check P.R.O. → Settings → MCP Connect → Data the assistant can read.' },
    ],
    official: {
      text: 'We found no ChatGPT app or MCP server from Oura itself. Oura’s partner integrations list no AI assistants, and its own AI, Oura Advisor, lives inside the Oura app. In the US, ChatGPT Health can read Oura data through Apple Health as well.',
      sources: [
        ['Oura Help: Partner Integrations', 'https://support.ouraring.com/hc/en-us/articles/43395088071443-Partner-Integrations'],
        ['Oura Help: Oura Advisor', 'https://support.ouraring.com/hc/en-us/articles/39512345699219'],
        OPENAI_HEALTH,
      ],
    },
    faq: [
      { q: 'Can ChatGPT read my Oura data?', a: 'Yes, through Apple Health. The Oura app writes sleep with stages, heart rate, steps, active energy and workouts to Apple Health, and the free P.R.O. plugin lets ChatGPT read them. HRV, resting heart rate, temperature and Oura’s scores stay in the Oura app.' },
      { q: 'Does Oura have an official ChatGPT integration?', a: 'Not that we could find on November 26, 2026. Oura’s partner integrations list no AI assistants, and Oura Advisor works inside the Oura app.' },
      { q: 'Can ChatGPT see my Oura Readiness and Sleep scores?', a: 'No. Oura keeps its scores in its own app. ChatGPT sees the sleep stages, heart rate and activity behind them.' },
      { q: 'Is it free?', a: 'Yes. The P.R.O. app and its ChatGPT connector are free. Gen3 and Ring 4 need an Oura membership for the Apple Health link, and you need a ChatGPT plan that offers plugins.' },
      { q: 'Does it work outside the US?', a: 'Yes, wherever ChatGPT offers plugins. ChatGPT’s built-in Health space is US only.' },
      { q: 'Does ChatGPT see Oura sleep stages?', a: 'Yes. Oura writes sleep stages to Apple Health, so ChatGPT can answer about deep, REM and light sleep night by night.' },
    ],
  },
];
