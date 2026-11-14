// One page per assistant: /apple-health-chatgpt, /apple-health-claude, /apple-health-grok.
// Steps reuse the recorded guides in mcpGuides.js; screenshots live in media/mcp/<id>/.
// Facts about built-in integrations were checked on October 13, 2026, and re-checked on
// October 27, 2026 for ChatGPT, Claude, Codex and Gemini:
// ChatGPT Health — https://openai.com/index/introducing-chatgpt-health/ (early access from
//   January 7, 2026 outside the EEA, Switzerland and the UK; launch to US users on July 23, 2026)
//   and https://help.openai.com/en/articles/20001036 (US only; Free, Go, Plus and Pro; web and iOS).
// Claude Apple Health — https://support.claude.com/en/articles/11869619 (beta, US, Pro, Max and Ultra, checked November 8, 2026,
//   native iOS charts); custom connectors — https://support.claude.com/en/articles/11175166
//   (Free, Pro, Max, Ultra, Team and Enterprise; Free is limited to one custom connector).
// Codex — https://learn.chatgpt.com/docs/extend/mcp and https://help.openai.com/en/articles/20001275.
// Superhuman Go — https://coda.io/packs/build/latest/guides/blocks/mcp/ and
//   https://coda.io/packs/build/latest/tutorials/build/mcp/, checked November 7, 2026; not tested by us.
// Google Health Coach — https://support.google.com/googlehealth/answer/16961408 (needs a Fitbit or
//   Pixel Watch and Google Health Premium).
import { guides, MCP_URL } from './mcpGuides.js';

const guide = (id) => guides.find((g) => g.id === id);

export const CHECKED = 'October 13, 2026';
const RECHECKED = 'October 27, 2026';

// Every assistant P.R.O. has a tested setup page for, in one order for all pages.
const ASSISTANTS = ['ChatGPT', 'Claude', 'Grok', 'Codex', 'Cursor', 'Perplexity', 'Gemini', 'Manus'];
const listOf = (names) => (names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0]);
const alsoWorksIn = (self) => {
  const others = ASSISTANTS.filter((n) => n !== self);
  const gemini = others.includes('Gemini') ? ' (Gemini offers custom apps only in the US)' : '';
  return 'The same connection also works in ' + listOf(others) + gemini + '.';
};

const CHERRY_STEPS = [
  { title: 'Open Settings → MCP → MCP Servers in Cherry Studio.', text: 'The gear icon is at the bottom left of the window.' },
  { title: 'Select + Add → Quick Create.' },
  { title: 'Fill in the form and select Add.', text: 'Name: P.R.O. Type: Streamable HTTP (streamableHttp). URL: https://mcp.proapp.uk. Leave Headers empty: there’s no API key, P.R.O. registers Cherry Studio on its own.' },
  { title: 'Turn on the switch at the top right.', text: 'The status changes to Waiting for authorization and the P.R.O. authorization page opens in your browser. Cherry Studio waits for a few minutes, so have your iPhone ready.' },
  { title: 'Sign in to P.R.O.', text: 'The P.R.O. authorization page opens.', pairing: true },
  { title: 'Choose what Cherry Studio can access.', text: 'Review the data switches in P.R.O. and tap Done.' },
  { title: 'Check that the status says Connected.', text: 'The Tools tab now lists the P.R.O. tools.' },
  { title: 'Turn P.R.O. on for your assistant.', text: 'In Chat, click the assistant’s name at the top. Open MCP, set MCP Mode to Manual and switch P.R.O. on.' },
  { title: 'Choose a model that can call tools.', text: 'In Settings → Model Provider, pick a provider such as DeepSeek or Moonshot (Kimi), select Add API key, then choose its model at the top of the chat. The free built-in Qwen model can’t call tools, so it can’t read your data.' },
];
const CHERRY_SHOTS = {
  2: { src: 'mcp/cherry-studio/add-menu.jpg', alt: 'Cherry Studio MCP Servers page with the Add menu open and Quick Create at the top', caption: '+ Add → Quick Create.' },
  3: { src: 'mcp/cherry-studio/server-form.jpg', alt: 'Cherry Studio Quick Create form: Name P.R.O., Type Streamable HTTP, URL https://mcp.proapp.uk', caption: 'The filled-in form.' },
  4: { src: 'mcp/cherry-studio/waiting.jpg', alt: 'Cherry Studio server page showing Waiting for authorization with the switch on', caption: 'Waiting for authorization: finish the sign-in in your browser.' },
  5: { src: 'mcp/grok/pairing-page.jpg', alt: 'P.R.O. authorization page with Open P.R.O., a code field, Paste and Connect', caption: 'The P.R.O. page looks the same for every assistant.' },
  6: { src: 'mcp/grok/permissions.jpg', alt: 'P.R.O. screen with data switches for the connected assistant', caption: 'In P.R.O.: choose what the assistant can see, then Done.' },
  7: { src: 'mcp/cherry-studio/tools.jpg', alt: 'Cherry Studio showing P.R.O. Connected with the Tools tab listing get_profile, get_goals and get_training_plan', caption: 'Connected, with the P.R.O. tools listed.' },
  8: { src: 'mcp/cherry-studio/assistant-mcp.jpg', alt: 'Cherry Studio Edit Assistant dialog on the MCP tab: MCP Mode Manual, P.R.O. Connected and switched on', caption: 'Edit Assistant → MCP: P.R.O. on.' },
};
const CHERRY_VERIFIED = 'Connection and tool list tested in Cherry Studio 2.1.10, November 2026';
const CHERRY_HELP = 'https://docs.cherry-ai.com/';

export const assistantGuides = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    path: '/apple-health-chatgpt',
    title: 'Connect Apple Health to ChatGPT, Also in Europe — P.R.O.',
    description:
      'ChatGPT Health is US only. Install the free P.R.O. plugin from the ChatGPT directory and ask about workouts, sleep and HRV. About 2 minutes, via MCP.',
    answer: [
      'Install the free P.R.O. plugin from the ChatGPT plugin directory and ChatGPT answers from your Apple Health workouts, sleep, heart rate and HRV, with training plans and interactive workout cards. It runs on the P.R.O. MCP server at ' + MCP_URL + '.',
      'It takes about two minutes, with a one-time code from your iPhone, and it works on the web and in the ChatGPT iPhone app. ChatGPT’s built-in Health space is US only.',
    ],
    cta: { href: 'https://chatgpt.com/plugins/plugin_asdk_app_6ad22f791530819196ed668dfdbf6909', label: 'Open P.R.O. in ChatGPT ↗' },
    builtIn: {
      name: 'ChatGPT Health',
      checked: RECHECKED,
      rows: [
        ['Where it works', 'United States only since the launch on July 23, 2026. The early-access beta that opened on January 7, 2026 excluded the EEA, Switzerland and the UK.', 'Outside the US too, wherever ChatGPT offers plugins.'],
        ['ChatGPT plans', 'Free, Go, Plus and Pro, on the web and in the iOS app. Connecting Apple Health needs the iPhone app.', 'Any plan with ChatGPT plugins.'],
        ['What ChatGPT reads', 'The Apple Health data you share in its Health space.', 'Workouts with routes and pace, sleep stages, heart rate and HRV, daily metrics, goals and your training plan.'],
        ['In the chat', 'Answers in any chat; the Health tab shows your data and trends, with interactive charts.', 'Text answers plus interactive P.R.O. cards for workouts, sleep, plans and training load.'],
        ['Other assistants', 'ChatGPT only.', alsoWorksIn('ChatGPT')],
      ],
    },
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'A ChatGPT account on a plan with plugins.',
    ],
    guide: guide('chatgpt'),
    recorded: 'November 2026',
    // Screenshot after step N (1-based).
    shots: {
      4: { src: 'mcp/chatgpt/authorize-plugin.jpg', alt: 'P.R.O. authorization page titled Connect ChatGPT to P.R.O., with a code field, Paste and Connect', caption: 'The P.R.O. page: get a code on your iPhone, enter it here, then Connect.' },
      5: { src: 'mcp/grok/permissions.jpg', alt: 'P.R.O. screen with data switches for the connected assistant', caption: 'In P.R.O.: choose what the assistant can see, then Done.' },
    },
    prompts: [
      'Show my latest run with its splits and route.',
      'Show my last night of sleep and the rest of my week.',
      'How did my training compare with last week?',
      'How did I sleep this week compared with last week?',
      'Show my last run with the route and pace by kilometre.',
      'Am I on track for my half-marathon plan?',
      'Is my training load too high right now?',
      'How did my resting heart rate and HRV change after long runs?',
    ],
    cards: [
      { src: 'mcp/chatgpt/card-workout.png', alt: 'P.R.O. workout card in ChatGPT: 8.92 km run with route map, heart rate chart and pace by kilometre', caption: '“Show my last run”' },
      { src: 'mcp/chatgpt/card-sleep.png', alt: 'P.R.O. sleep card in ChatGPT with sleep stages and score', caption: '“How did I sleep last night?”' },
      { src: 'mcp/chatgpt/card-plan.png', alt: 'P.R.O. training plan card in ChatGPT: half marathon in 10 weeks, 38% complete, next sessions', caption: '“Am I on track with my plan?”' },
    ],
    cardsNote: 'P.R.O. cards in ChatGPT’s dark theme, shown with P.R.O.’s demo account.',
    trouble: [
      ['I can’t find the plugin.', 'Use the direct link in step 1. If plugins aren’t available on your account, add it by hand: on chatgpt.com, Settings → Plugins → Browse directory → Add → Add custom MCP server, with https://mcp.proapp.uk and OAuth.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['ChatGPT answers without my numbers.', 'Make sure PRO is enabled for the chat, or ask “use P.R.O.” in your message. Open P.R.O. on your iPhone so the latest workouts sync.'],
    ],
    faq: [
      { q: 'Can ChatGPT read my Apple Health data?', a: 'Yes. In the US, ChatGPT Health can read Apple Health from the ChatGPT iPhone app. In other countries, or if you want training plans and interactive workout cards, install the free P.R.O. plugin from the ChatGPT plugin directory.' },
      { q: 'What is the difference between ChatGPT Health and P.R.O.?', a: 'ChatGPT Health is OpenAI’s built-in health space, available in the US. P.R.O. is a free iPhone app that syncs Apple Health and serves it to ChatGPT through an MCP connector: it works outside the US, adds interactive cards for workouts, sleep and training plans, and you choose which data categories ChatGPT can see. ' + alsoWorksIn('ChatGPT') },
      { q: 'Does ChatGPT Health work in the UK or the EU?', a: 'No. The early-access beta that opened on January 7, 2026 excluded the EEA, Switzerland and the UK, and since the launch on July 23, 2026 Health in ChatGPT is available only to users in the US (OpenAI Help, checked October 27, 2026). The P.R.O. connector works there as long as your ChatGPT plan can add custom MCP servers.', more: { to: '/apple-health-ai-outside-us', text: 'What works outside the US, assistant by assistant' } },
      { q: 'Does it work in the ChatGPT iPhone app?', a: 'Yes. Install P.R.O. once from the plugin link, in a browser or in Safari on iPhone, and the connection works in the ChatGPT iPhone app as well.' },
      { q: 'Is P.R.O. an official ChatGPT plugin?', a: 'P.R.O. is listed in the ChatGPT plugin directory after OpenAI’s review. You can open it directly from the link in step 1.' },
      { q: 'Which ChatGPT plan do I need?', a: 'One with ChatGPT plugins. The P.R.O. app and connector are free.' },
      { q: 'Is my health data used to train ChatGPT?', a: 'P.R.O. only answers the requests ChatGPT makes while you chat, for the categories you allow. Those answers become part of your ChatGPT conversation, so ChatGPT’s data controls apply — you can turn off “Improve the model for everyone” in ChatGPT settings.' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    path: '/apple-health-claude',
    title: 'Connect Apple Health to Claude in Any Country: Free MCP',
    description:
      'Outside the US or on the Free plan? Connect Apple Health workouts, sleep and HRV to Claude with the free P.R.O. MCP connector. No VPN. Setup in two minutes.',
    answer: [
      'Add the free P.R.O. MCP connector at ' + MCP_URL + ' and Claude answers from your real workouts, sleep, heart rate and HRV, with training plans and interactive workout cards, in any country.',
      'It takes about two minutes and works on every Claude plan, including Free. Claude’s own Apple Health integration is a beta for US Pro, Max and Ultra subscribers.',
    ],
    builtIn: {
      name: 'Claude’s Apple Health integration',
      checked: 'November 8, 2026',
      rows: [
        ['Status', 'Beta.', 'Available now.'],
        ['Where it works', 'United States only.', 'Wherever your Claude plan supports custom connectors.'],
        ['Claude plans', 'Pro, Max and Ultra.', 'Free, Pro, Max, Ultra, Team and Enterprise, per Claude Help. Free is limited to one custom connector.'],
        ['Apps', 'Claude iPhone app.', 'Claude on iPhone, claude.ai and Claude desktop.'],
        ['In the chat', 'Answers with native iOS charts — bar and line charts and progress indicators — from the health data you share.', 'Text answers plus interactive P.R.O. cards for workouts, sleep, plans and training load.'],
        ['Training plans and coach notes', 'Not part of the integration.', 'Your P.R.O. training plan; coach notes if you allow them.'],
        ['Other assistants', 'Claude only.', alsoWorksIn('Claude')],
      ],
    },
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'The Claude app. Custom connectors are on every Claude plan, including Free (one custom connector), per Claude Help.',
    ],
    guide: guide('claude'),
    recorded: 'October 10, 2026',
    shots: {
      3: { src: 'mcp/claude/add-custom-connector.png', alt: 'Claude iPhone app Add custom connector form with Name and MCP server URL fields', caption: 'Add custom connector: a name and the server URL.' },
      8: { src: 'mcp/claude/permissions.jpg', alt: 'P.R.O. screen saying Claude is connected, with switches for profile, goals, daily metrics, workouts, routes, sleep and heart rate', caption: 'In P.R.O.: choose what Claude can see, then Done.' },
    },
    prompts: [
      'Summarise my training week and compare it with last week.',
      'How did my sleep change on the nights after hard sessions?',
      'Build me an easier week based on my recent load.',
      'What was my average heart rate on my last five rides?',
      'Am I on track for my monthly distance goal?',
    ],
    cards: [
      { src: 'mcp/claude/card-workout.png', alt: 'P.R.O. workout card in Claude: run with route map, heart rate and pace by kilometre', caption: '“Show my last run”' },
      { src: 'mcp/claude/card-sleep.png', alt: 'P.R.O. sleep card in Claude with sleep stages', caption: '“How did I sleep?”' },
      { src: 'mcp/claude/card-plan.png', alt: 'P.R.O. training plan card in Claude with progress and next sessions', caption: '“What’s next in my plan?”' },
    ],
    cardsNote: 'P.R.O. cards in Claude’s dark theme, shown with P.R.O.’s demo account.',
    trouble: [
      ['I can’t find Connectors.', 'In the Claude app open Settings → Connectors. On a computer, the same screen is in Settings on claude.ai.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['Claude doesn’t use my data.', 'Check that P.R.O. is turned on for the chat in Claude’s tools menu, and open P.R.O. on your iPhone so the latest data syncs.'],
    ],
    faq: [
      { q: 'Can Claude read my Apple Health data?', a: 'Yes. Claude’s own Apple Health integration is a beta for US Pro, Max and Ultra users in the Claude iPhone app. In other countries, or for training plans and interactive workout cards, add the free P.R.O. app as a custom connector at https://mcp.proapp.uk.' },
      { q: 'Does Claude’s Apple Health integration work outside the US?', a: 'Not yet: Anthropic describes it as a beta for US users on Pro, Max and Ultra plans. The P.R.O. connector is not limited to the US.', more: { to: '/apple-health-ai-outside-us', text: 'What works outside the US, assistant by assistant' } },
      { q: 'Do I need Claude Pro?', a: 'No. Per Claude Help (checked November 8, 2026), custom connectors are available on Free, Pro, Max, Ultra, Team and Enterprise plans; Free users are limited to one custom connector. Claude’s own Apple Health beta needs Pro, Max or Ultra. The P.R.O. app and its connector are free.' },
      { q: 'Can Claude change my Apple Health data?', a: 'No. P.R.O. never writes to Apple Health. If you allow it, Claude can save short coach notes inside P.R.O.; that option is off by default.' },
      { q: 'How do I remove Claude’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Claude and confirm Disconnect. Removing the connector only inside Claude does not revoke its P.R.O. access.' },
    ],
  },
  {
    id: 'grok',
    name: 'Grok',
    path: '/apple-health-grok',
    title: 'How to Connect Apple Health to Grok — P.R.O.',
    description:
      'Connect Apple Health workouts, sleep, heart rate and HRV to Grok with the free P.R.O. MCP connector, on iPhone or the web. Setup with screenshots.',
    answer: [
      'The free P.R.O. MCP connector at ' + MCP_URL + ' brings your Apple Health workouts, sleep, heart rate and HRV into Grok, which has no built-in Apple Health integration.',
      'Set it up in the Grok iPhone app or at grok.com/connectors — it takes about two minutes.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'Grok on iPhone or grok.com in a browser.',
    ],
    guide: guide('grok'),
    recorded: 'October 10, 2026',
    shots: {
      3: { src: 'mcp/grok/custom-connector.jpg', alt: 'Grok iPhone app Connectors list with Custom Connector and a Connect button at the bottom', caption: 'On iPhone: Custom Connectors → Custom Connector → Connect.' },
      5: { src: 'mcp/grok/pairing-page.jpg', alt: 'P.R.O. authorization page: Connect Grok to P.R.O., with Open P.R.O., a code field, Paste and Connect', caption: 'The P.R.O. page: Open P.R.O. copies a code, then Paste and Connect.' },
      6: { src: 'mcp/grok/permissions.jpg', alt: 'P.R.O. screen saying Grok is connected, with data switches', caption: 'In P.R.O.: choose what Grok can see, then Done.' },
    },
    prompts: [
      'How many kilometres did I run this month?',
      'Compare my sleep on training days and rest days.',
      'What’s my next session in my training plan?',
      'Has my resting heart rate gone up this week?',
    ],
    cards: [],
    trouble: [
      ['I can’t find custom connectors on iPhone.', 'Open Connectors and scroll to the bottom: Custom Connectors → Custom Connector → Connect.'],
      ['I use Grok Bot, not grok.com.', 'Grok Bot has its own setup: see proapp.uk/apple-health-grok-bot.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. On iPhone, Open P.R.O. on the authorization page creates and copies a fresh one.'],
    ],
    faq: [
      { q: 'Does Grok work with Apple Health?', a: 'Not on its own — Grok has no built-in Apple Health integration. The free P.R.O. app connects Apple Health to Grok as a custom connector at https://mcp.proapp.uk.' },
      { q: 'Can I connect on the Grok iPhone app?', a: 'Yes. Open Connectors, scroll to Custom Connectors, tap Connect next to Custom Connector and enter https://mcp.proapp.uk. On the web, use grok.com/connectors → New Connector → Custom.' },
      { q: 'Will Grok show P.R.O. cards?', a: 'Grok answers from your data in text. Interactive P.R.O. cards are confirmed in ChatGPT, Claude, Gemini and Cursor.' },
      { q: 'What can Grok see?', a: 'Only the categories you allow in P.R.O.: profile, goals, daily metrics, workouts and routes, sleep, heart rate and HRV, and coach memory. You can change this any time in Settings → MCP Connect.' },
    ],
  },
  {
    id: 'grok-bot',
    name: 'Grok Bot',
    platform: 'Desktop · iPhone · Android',
    path: '/apple-health-grok-bot',
    title: 'How to Connect Apple Health to Grok Bot (MCP) — P.R.O.',
    description:
      'Give Grok Bot your Apple Health workouts, sleep, heart rate and HRV with the free P.R.O. MCP connector. No API key or client ID: one URL and a one-time code.',
    answer: [
      'The free P.R.O. MCP connector at ' + MCP_URL + ' brings your Apple Health workouts, sleep, heart rate, HRV, training load and training plan into Grok Bot.',
      'Ask Grok Bot to add it in a chat and authorize once with a one-time code from your iPhone. Then attach P.R.O. to any task and give the Bot a whole month of training to work through.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'Grok Bot on a computer or phone.',
    ],
    guide: {
      intro: 'Add P.R.O. as a custom connector under Connect apps, select Connect, then authorize with a one-time code from your iPhone.',
      verified: 'Tested by us, November 2026',
      helpUrl: 'https://docs.x.ai/grok-bot/computer-and-apps',
      steps: [
        { title: 'Open Connect apps and select Add a custom connector.', text: 'Scroll to the bottom of the app list: the button is under the last section.' },
        { title: 'Fill in the form and select Add plugin.', text: 'Name: P.R.O. Type: Remote HTTPS. Server URL: https://mcp.proapp.uk. Leave HTTP headers and Client ID empty: P.R.O. registers Grok Bot on its own.' },
        { title: 'Select Connect next to P.R.O.', text: 'P.R.O. appears under Installed in Manage plugins and skills. Connect opens the P.R.O. authorization page in your browser.' },
        { title: 'Sign in to P.R.O.', text: 'The page says Connect Cursor to P.R.O. That’s expected: Grok Bot connects through Cursor’s connector service.', pairing: true },
        { title: 'Choose what Grok Bot can access.', text: 'Review the data switches in P.R.O. and tap Done. P.R.O. lists the connection as Cursor.' },
        { title: 'Check that P.R.O. says Connected.', text: 'Back in Manage plugins and skills, P.R.O. shows 1 connector and Connected.' },
        { title: 'Type @ in the chat and choose P.R.O.', text: 'It’s listed as a connected plugin. Attaching it tells the Bot to use your data for this request.' },
        { title: 'Ask Grok Bot.', text: 'Try “Use P.R.O. to show my training summary for this week.” The Bot reads your workouts, recovery and plan from P.R.O. and answers with your numbers.' },
      ],
      note: 'On a phone you can also ask the Bot in a chat: “Can you connect my custom MCP?”, then send mcp.proapp.uk. It asks you to confirm and adds the connector, then you authorize it the same way.',
      noteShot: { src: 'mcp/grok-bot/chat-add.jpg', alt: 'Grok Bot iPhone chat: the Bot asks for the server URL, the user sends mcp.proapp.uk, confirms Add it, and the connector shows Added', caption: 'On iPhone: ask the Bot to add mcp.proapp.uk and confirm.' },
    },
    recorded: 'November 2026',
    shots: {
      1: { src: 'mcp/grok-bot/add-custom-connector.jpg', alt: 'Grok Bot Connect apps list scrolled to the bottom, with the Add a custom connector button', caption: 'Connect apps → Add a custom connector, at the very bottom.' },
      2: { src: 'mcp/grok-bot/connector-form.jpg', alt: 'Add a custom connector form: Name P.R.O., Type Remote HTTPS, Server URL https://mcp.proapp.uk, empty HTTP headers and Client ID, Add plugin button', caption: 'Only the name, Remote HTTPS and the address. Client ID stays empty.', narrow: true },
      3: { src: 'mcp/grok-bot/connect-button.jpg', alt: 'P.R.O. in Manage plugins and skills with 1 connector and a Connect button', caption: 'P.R.O. is installed; select Connect.' },
      4: { src: 'mcp/grok-bot/sign-in.jpg', alt: 'P.R.O. authorization page: Connect Cursor to P.R.O., a code field with Paste and a Connect button', caption: 'Enter the six-character code from P.R.O. and select Connect.' },
      6: { src: 'mcp/grok-bot/connected.jpg', alt: 'P.R.O. with 1 connector marked Connected in Grok Bot', caption: 'P.R.O. is connected.' },
      7: { src: 'mcp/grok-bot/attach.jpg', alt: 'Grok Bot @ menu with P.R.O. listed as a connected plugin', caption: 'Type @ and pick P.R.O.' },
      8: { src: 'mcp/grok-bot/answer.jpg', alt: 'Grok Bot answer pulling this week’s training from P.R.O.: two runs with distance, pace and heart rate, training load in the optimal range', caption: '“Use P.R.O. to show my training summary for this week”' },
    },
    prompts: [
      'Use P.R.O. to write a report on my last 30 days of training: load, recovery and what to change.',
      'Use P.R.O. to compare my sleep and HRV on the nights after hard workouts.',
      'Use P.R.O. to check whether I’m on track for my training plan this week.',
      'Use P.R.O. to find my best and worst training weeks this year and explain the difference.',
    ],
    cards: [],
    trouble: [
      ['The page says Unknown app or shows an error.', 'Grok Bot has a Client ID saved for P.R.O. Remove P.R.O., then add it again with only the address https://mcp.proapp.uk and an empty Client ID.'],
      ['The page says Connect Cursor to P.R.O.', 'That’s normal. Grok Bot connects through Cursor’s connector service, so P.R.O. shows Cursor and www.cursor.com.'],
      ['Nothing opens when I select Connect.', 'Check for a blocked pop-up and try again. If you added P.R.O. from a chat, select Reopen on the card or open Connect apps → Manage plugins and skills and select Connect.'],
      ['P.R.O. shows Needs auth or Disconnected.', 'Open Connect apps, open P.R.O. and select Authenticate. On a phone, the button says Authorize.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['Grok Bot answers without my data.', 'Type @ and attach P.R.O. to the task, and open P.R.O. on your iPhone so the latest data syncs.'],
    ],
    faq: [
      { q: 'Can Grok Bot read my Apple Health data?', a: 'Yes, through the free P.R.O. app. Ask Grok Bot to add https://mcp.proapp.uk as a custom MCP server and approve it with a code from P.R.O.' },
      { q: 'Do I need an API key or client ID?', a: 'No. Leave those fields empty. P.R.O. uses OAuth: Grok Bot registers itself and you approve the connection with a one-time code from your iPhone.' },
      { q: 'Why does the connection say Cursor?', a: 'Grok Bot keeps its app connections on Cursor’s connector service, so it reaches P.R.O. under the name Cursor. It’s still your Grok Bot, and it sees only what you allow.' },
      { q: 'Is this the same as Grok on grok.com?', a: 'No. Grok on the web and in the Grok iPhone app has its own connector setup: see proapp.uk/apple-health-grok.' },
      { q: 'What can Grok Bot see?', a: 'Only the categories you allow in P.R.O.: profile, goals, daily metrics, workouts and routes, sleep, heart rate and HRV, training load, your plan and coach memory. You can change this any time in Settings → MCP Connect.' },
      { q: 'Does it work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. See the sync guides at proapp.uk/apple-health-sync.' },
      { q: 'How do I remove Grok Bot’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Cursor and confirm Disconnect. To remove it from Grok Bot too, ask the Bot to remove P.R.O.' },
    ],
  },
  {
    id: 'codex',
    name: 'Codex',
    platform: 'ChatGPT desktop app · Codex',
    path: '/apple-health-codex',
    title: 'How to Connect Apple Health to Codex — P.R.O.',
    description:
      'Give Codex your Apple Health workouts, sleep, heart rate and HRV with the free P.R.O. MCP server, then analyse and chart them. Desktop app and CLI.',
    answer: [
      'Codex can’t open Apple Health on its own. Add the free P.R.O. app as an MCP server in the ChatGPT desktop app, and Codex can read your workouts, sleep, heart rate and HRV, then analyse them with code, build charts and export tables.',
      'Setup takes about two minutes. The server is saved in Codex’s own settings, which the Codex CLI and IDE extension share; regular ChatGPT chats have their own setup.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'The ChatGPT desktop app, where Codex is a view you pick from the app’s menu.',
      'A ChatGPT plan that includes Codex and custom MCP servers.',
    ],
    guide: {
      intro: 'In the ChatGPT desktop app, add P.R.O. as an MCP server in Settings, then sign in with a one-time code from your iPhone.',
      verified: 'Tested by us, October 2026',
      helpUrl: 'https://learn.chatgpt.com/docs/extend/mcp',
      note: 'OpenAI’s docs describe the same form as Settings → MCP servers → Add server: enter a name, choose Streamable HTTP, enter the URL, save, then select Restart and Authenticate. If your app shows MCP servers instead of Plugins, follow that path — the form and the address are the same.',
      cli: {
        intro: 'Prefer the terminal? With the Codex CLI, add the server and sign in. The desktop app, the CLI and the IDE extension share this configuration.',
        commands: ['codex mcp add pro --url ' + MCP_URL, 'codex mcp login pro'],
        after: 'The login command opens the P.R.O. sign-in page in your browser.',
      },
      steps: [
        { title: 'Open Settings in the ChatGPT app for Mac.', text: 'Click your avatar in the bottom-left corner and choose Settings, or press ⌘,.' },
        { title: 'Open Plugins under Integrations.', text: 'The page says “Manage plugins, skills, and MCPs”, with the tabs Plugins, Apps, MCPs and Skills.' },
        { title: 'Select Add, then Add MCP server.', text: 'Not Create plugin — that opens a chat with the Plugin Creator instead of a form.' },
        { title: 'Enter P.R.O. as the name and switch the type to Streamable HTTP.', text: 'The form starts on STDIO with a command and arguments; ignore those.' },
        { title: 'Enter https://mcp.proapp.uk as the URL and select Save.', text: 'Leave the bearer token and headers empty: P.R.O. signs you in with a one-time code instead. If the app offers Restart after saving, select it — OpenAI’s docs include that step.' },
        { title: 'Open the MCPs tab and select Authenticate next to P.R.O.', text: 'Your browser opens the P.R.O. sign-in page. It says “Connect Codex to your P.R.O. data”.', pairing: true },
        { title: 'Close the browser tab when it says Authentication complete.', text: 'Back in Settings → Plugins → MCPs, the Authenticate button is gone and P.R.O. is switched on.' },
        { title: 'Ask Codex.', text: 'In P.R.O. on your iPhone, Settings → MCP Connect now lists Codex under Connected.' },
      ],
    },
    recorded: 'October 8, 2026',
    shots: {
      2: { src: 'mcp/codex/plugins-page.png', alt: 'ChatGPT for Mac Settings with Plugins selected under Integrations and the Add button top right', caption: 'Settings → Integrations → Plugins.' },
      3: { src: 'mcp/codex/add-menu.png', alt: 'Add menu in ChatGPT for Mac Plugins with Add MCP server', caption: 'Add → Add MCP server.' },
      5: { src: 'mcp/codex/server-form.png', alt: 'Connect to a custom MCP form: name P.R.O., type Streamable HTTP, URL https://mcp.proapp.uk', caption: 'Name, Streamable HTTP and the P.R.O. address. Nothing else to fill in.' },
      6: { src: 'mcp/codex/authenticate.png', alt: 'P.R.O. server row in the MCPs tab with an Authenticate button', caption: 'P.R.O. in the MCPs list, waiting for Authenticate.' },
      7: { src: 'mcp/codex/sign-in.png', alt: 'P.R.O. sign-in page: Connect Codex to your P.R.O. data, with a pairing code field and Connect button', caption: 'Type the six-character code from P.R.O. and select Connect.' },
      8: { src: 'mcp/codex/app-connected.png', alt: 'P.R.O. MCP Connect screen on iPhone listing Codex under Connected', caption: 'In P.R.O., Codex appears under Connected.' },
    },
    prompts: [
      'Load my runs from the last six months and chart weekly distance and pace.',
      'Export my workouts to a CSV and summarise them by sport.',
      'Find weeks where my resting heart rate rose after hard sessions.',
      'Compare my sleep before and after I started evening runs.',
      'Write a script that flags days my HRV was well below my 30-day average.',
    ],
    cards: [],
    trouble: [
      ['A chat with the Plugin Creator opened.', 'You picked Create plugin in the Add menu. Close that chat and choose Add MCP server instead.'],
      ['P.R.O. doesn’t answer in a regular chat.', 'Servers added here belong to Codex. For regular ChatGPT chats, add P.R.O. on chatgpt.com — see the ChatGPT guide.'],
      ['P.R.O. is listed but Codex doesn’t see its tools.', 'Select Restart in the MCP settings, or quit and reopen the app, then check that P.R.O. no longer shows Authenticate.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
    ],
    faq: [
      { q: 'Can Codex read my Apple Health data?', a: 'Yes, through the free P.R.O. app: add https://mcp.proapp.uk as an MCP server in the ChatGPT app for Mac and confirm it with a one-time code from P.R.O. Codex then reads the workouts, sleep, heart rate and HRV you allow.' },
      { q: 'Does connecting Codex also connect regular ChatGPT chats?', a: 'No. MCP servers added in the desktop app’s settings belong to Codex and are shared with the Codex CLI and IDE extension. Regular ChatGPT chats use plugins added on chatgpt.com — see the ChatGPT guide.' },
      { q: 'Is Codex the same as ChatGPT Work?', a: 'No. According to OpenAI Help, ChatGPT has Chat and Work modes, and Codex is a separate view in the desktop app for coding and data work. P.R.O. connects to Codex through the setup on this page; regular ChatGPT chats use the setup on chatgpt.com.' },
      { q: 'Can I add P.R.O. from the Codex CLI?', a: 'Yes. Run codex mcp add pro --url https://mcp.proapp.uk, then codex mcp login pro to sign in with a one-time code. The CLI, the IDE extension and the desktop app share this configuration.' },
      { q: 'Why use Codex instead of a chat for health data?', a: 'Codex can write and run code on your data: build charts, export tables, compute rolling averages or check how one metric moves with another. A chat answers questions; Codex can do the analysis.' },
      { q: 'Which plan do I need?', a: 'A ChatGPT plan that includes Codex and lets you add MCP servers. P.R.O. and its connector are free.' },
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    platform: 'Desktop app · Agent chat',
    path: '/apple-health-cursor',
    title: 'How to Connect Apple Health to Cursor (MCP) — P.R.O.',
    description:
      'Bring Apple Health workouts, sleep, heart rate and HRV into Cursor with the free P.R.O. MCP server: one mcp.json entry, OAuth sign-in, cards in chat.',
    answer: [
      'Cursor has no Apple Health integration of its own. Add the free P.R.O. MCP server at ' + MCP_URL + ' to mcp.json, sign in with a one-time code from your iPhone, and Cursor’s agent can read your workouts, sleep, heart rate, HRV, training load and training plan.',
      'It takes about two minutes, needs no API key, and the agent can show interactive P.R.O. cards right in the chat.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'Cursor on your computer.',
    ],
    guide: {
      intro: 'Add P.R.O. to mcp.json from Customize → MCPs, switch it on, then authenticate with a one-time code from your iPhone.',
      verified: 'Tested by us in Cursor, November 2026',
      helpUrl: 'https://cursor.com/docs/context/mcp',
      steps: [
        { title: 'Open Customize in Cursor and select MCPs.', text: 'Customize is in the sidebar. With no servers yet, the MCPs view says Connect External Tools with MCP.' },
        { title: 'Select + New.', text: 'Cursor opens mcp.json for the current project. To use P.R.O. in every project, add the same lines to ~/.cursor/mcp.json instead.' },
        { title: 'Add P.R.O. and save the file.', text: 'Only the URL: no client ID, API key or headers. P.R.O. registers Cursor on its own.', code: '{\n  "mcpServers": {\n    "pro": { "url": "' + MCP_URL + '" }\n  }\n}' },
        { title: 'Switch P.R.O. on.', text: 'Back in Customize → MCPs, pro appears in the list. If it says Disabled, turn it on with its toggle.' },
        { title: 'Select Authenticate.', text: 'P.R.O. moves to Needs Attention with Needs authentication. Authenticate opens the P.R.O. sign-in page in your browser.' },
        { title: 'Sign in to P.R.O.', text: 'The page says Connect Cursor to P.R.O.', pairing: true },
        { title: 'Choose what Cursor can access.', text: 'Review the data switches in P.R.O. and tap Done.' },
        { title: 'Check that P.R.O. is connected.', text: 'Customize → MCPs shows pro with a green dot and 15 tools, 1 resource enabled.' },
        { title: 'Ask the agent.', text: 'In a chat, try “Use P.R.O. to show my training summary for this week.” The agent calls P.R.O. and shows the answer as interactive cards.' },
      ],
    },
    recorded: 'November 2026',
    shots: {
      1: { src: 'mcp/cursor/new-server.jpg', alt: 'Cursor Customize view with MCPs selected: Connect External Tools with MCP, with + New and Documentation buttons', caption: 'Customize → MCPs → + New.' },
      3: { src: 'mcp/cursor/mcp-json.jpg', alt: 'Cursor editor showing .cursor/mcp.json with an mcpServers entry named pro and the URL https://mcp.proapp.uk', caption: 'The whole mcp.json entry: a name and the P.R.O. address.' },
      4: { src: 'mcp/cursor/disabled.jpg', alt: 'Cursor MCPs list with the pro server marked Disabled', caption: 'pro is added; switch it on if it says Disabled.' },
      5: { src: 'mcp/cursor/authenticate.jpg', alt: 'Cursor MCPs list with pro under Needs Attention, Needs authentication, and an Authenticate button', caption: 'Needs authentication → Authenticate.' },
      6: { src: 'mcp/cursor/sign-in.jpg', alt: 'P.R.O. authorization page: Connect Cursor to P.R.O., a code field with Paste and a Connect button', caption: 'Enter the six-character code from P.R.O. and select Connect.' },
      8: { src: 'mcp/cursor/connected.jpg', alt: 'Cursor MCPs list with pro connected: 15 tools, 1 resource enabled', caption: 'Connected: 15 tools and the card resource.' },
    },
    prompts: [
      'Use P.R.O. to show my training summary for this week.',
      'Use P.R.O. to export my runs from the last three months to a CSV and chart weekly distance.',
      'Use P.R.O. to compare my sleep and HRV on the nights after hard sessions.',
      'Use P.R.O. to check whether I’m on track for my training plan.',
    ],
    cards: [
      { src: 'mcp/cursor/card-training-load.jpg', alt: 'P.R.O. training load card in Cursor’s agent chat: load ratio 0.99, Optimal, last 7 days, 4-week average, sessions, resting heart rate and sleep', caption: '“Use P.R.O. to show my training summary for this week”' },
    ],
    cardsNote: 'A P.R.O. card in Cursor’s agent chat, November 2026.',
    trouble: [
      ['P.R.O. says Disabled.', 'Open Customize → MCPs and turn it on with its toggle. Disabled servers don’t load or appear in chat.'],
      ['P.R.O. says Needs authentication.', 'Select Authenticate and sign in with a new code from P.R.O. Cursor asks again if the sign-in has expired.'],
      ['The agent doesn’t use P.R.O.', 'Mention P.R.O. in your request, start a new chat if needed, and check that pro shows 15 tools in Customize → MCPs.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
    ],
    faq: [
      { q: 'Can Cursor read my Apple Health data?', a: 'Yes, through the free P.R.O. app. Add https://mcp.proapp.uk to mcp.json and sign in with a code from P.R.O. Cursor’s agent then reads only the categories you allow.' },
      { q: 'Do I need an API key or client ID?', a: 'No. P.R.O. uses OAuth with a one-time code, so the mcp.json entry needs only the URL. Cursor registers itself.' },
      { q: 'Does Cursor show P.R.O. cards?', a: 'Yes. In our test, Cursor’s agent showed interactive P.R.O. training load and workout cards in the chat.' },
      { q: 'Should I use the project or the global mcp.json?', a: '.cursor/mcp.json in a project makes P.R.O. available in that project only. ~/.cursor/mcp.json makes it available in every project.' },
      { q: 'Does it work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. See the sync guides at proapp.uk/apple-health-sync.' },
      { q: 'How do I remove Cursor’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Cursor and confirm Disconnect. To remove it from Cursor too, delete the pro entry from mcp.json.' },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    platform: 'perplexity.ai · custom connector',
    path: '/apple-health-perplexity',
    title: 'How to Connect Apple Health to Perplexity — P.R.O.',
    description:
      'Connect Apple Health workouts, sleep, heart rate and HRV to Perplexity with the free P.R.O. MCP connector. Works outside the US. Step-by-step setup.',
    answer: [
      'Add the free P.R.O. MCP connector at ' + MCP_URL + ' as a custom remote connector, and Perplexity answers from your real workouts, sleep, heart rate and HRV, with your training plan, in any country.',
      'You add it once on perplexity.ai, sign in with a one-time code from your iPhone, and Perplexity draws its own charts from your data. Perplexity Health is for US Pro and Max subscribers.',
    ],
    builtIn: {
      name: 'Perplexity Health',
      checked: RECHECKED,
      rows: [
        ['Where it works', 'US, in a phased rollout.', 'Wherever your Perplexity plan can add custom connectors.'],
        ['Perplexity plans', 'Pro and Max.', 'Plans with custom connectors (Pro, Max, Enterprise).'],
        ['What Perplexity reads', 'Apple Health, plus medical records, lab results and some other wearables.', 'Workouts with routes and pace, sleep stages, heart rate and HRV, daily metrics, goals and your training plan.'],
        ['Training plans and coach notes', 'Not part of it.', 'Your P.R.O. training plan; coach notes if you allow them.'],
        ['Other assistants', 'Perplexity only.', alsoWorksIn('Perplexity')],
      ],
    },
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'perplexity.ai in a browser, on a plan that can add custom connectors (Pro or Max).',
    ],
    guide: {
      intro: 'On perplexity.ai, add P.R.O. as a custom remote connector, then open its card to sign in with a one-time code from your iPhone.',
      verified: 'Tested by us, October 2026',
      helpUrl: 'https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors',
      steps: [
        { title: 'Open Plugins in the Perplexity sidebar.', text: 'On older accounts the same place is Customize → Connectors.' },
        { title: 'Select Add custom → Connector → Add MCP connector.' },
        { title: 'Choose Remote.', text: 'Enter P.R.O. as the name and https://mcp.proapp.uk as the MCP Server URL.' },
        { title: 'Set Authentication to OAuth and Transport to Streamable HTTP.', text: 'Leave the client ID and secret empty — P.R.O. registers Perplexity on its own.' },
        { title: 'Tick the acknowledgement and select Add.', text: 'The P.R.O. card appears on the Plugins page.' },
        { title: 'Click the P.R.O. card to sign in.', text: 'The P.R.O. authorization page opens.', pairing: true },
        { title: 'Choose what Perplexity can access, then ask.', text: 'Review the data switches in P.R.O. and tap Done. Make sure P.R.O. is on for your question.' },
      ],
    },
    recorded: 'October 2026',
    shots: {},
    prompts: [
      'How did my sleep change on the nights after long runs?',
      'Chart my weekly running distance for the last three months.',
      'What’s my average heart rate on easy runs, and is it drifting?',
      'Am I on track for my training plan this week?',
      'Compare my HRV this month with last month.',
    ],
    cards: [],
    trouble: [
      ['I don’t see Plugins.', 'Use Customize → Connectors instead — Perplexity is still rolling out the new Plugins page.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['Perplexity answers from the web instead of my data.', 'Check that P.R.O. is enabled for the question, and open P.R.O. on your iPhone so the latest data syncs.'],
    ],
    faq: [
      { q: 'Can Perplexity read my Apple Health data?', a: 'Yes. In the US, Perplexity Health on Pro and Max can read Apple Health. Outside the US, or if you want your training plan in the conversation, connect the free P.R.O. app as a custom remote connector at https://mcp.proapp.uk.' },
      { q: 'What is the difference between Perplexity Health and P.R.O.?', a: 'Perplexity Health is Perplexity’s own health feature, launched in the US in March 2026. P.R.O. is a free iPhone app that serves your Apple Health data through an MCP connector: it works outside the US, includes your training plan and works in other assistants too.' },
      { q: 'Does Perplexity show P.R.O. cards?', a: 'Perplexity doesn’t display P.R.O.’s interactive cards. It answers in text and draws its own charts from the data P.R.O. returns. Interactive cards are confirmed in ChatGPT, Claude, Gemini and Cursor.' },
      { q: 'Which Perplexity plan do I need?', a: 'One that can add custom connectors — Pro, Max or Enterprise. The P.R.O. app and connector are free.' },
      { q: 'How do I remove Perplexity’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Perplexity and confirm Disconnect. You can also remove the connector on Perplexity’s Plugins page with the ⋮ menu.' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    platform: 'gemini.google.com · custom app',
    path: '/apple-health-gemini',
    title: 'How to Connect Apple Health to Gemini — P.R.O.',
    description:
      'Connect Apple Health workouts, sleep, heart rate and HRV to Gemini with the free P.R.O. MCP server and see them as interactive cards. Setup on the web.',
    answer: [
      'The free P.R.O. MCP server at ' + MCP_URL + ' brings your Apple Health workouts, sleep, heart rate and HRV into Gemini as a custom app, and Gemini shows them as interactive P.R.O. cards.',
      'You add it once at gemini.google.com and then use it in the Gemini app on iPhone too. Google currently offers custom apps in the US, for adults with a personal Google account.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'gemini.google.com on a computer, signed in with a personal Google account (not work or school).',
      'Google’s conditions for custom apps: 18 or older, in the US, Keep Activity turned on, English.',
    ],
    guide: {
      intro: 'At gemini.google.com, add P.R.O. under Settings → Connected Apps → Custom apps, then sign in with a one-time code from your iPhone.',
      verified: 'Tested by us, October 2026',
      helpUrl: 'https://support.google.com/gemini/answer/17209137?hl=en&co=GENIE.Platform%3DDesktop',
      steps: [
        { title: 'Open gemini.google.com on a computer.', text: 'Custom apps are added on the web; after that they work in the Gemini mobile app as well.' },
        { title: 'Open Settings, then Connected Apps.', text: 'Settings is at the bottom of the sidebar.' },
        { title: 'Under Custom apps, select Add a custom app.' },
        { title: 'Enter https://mcp.proapp.uk and select Next.', text: 'Leave Advanced features as they are — P.R.O. registers Gemini on its own.' },
        { title: 'Follow the prompts to the P.R.O. sign-in page.', text: 'The P.R.O. authorization page opens.', pairing: true },
        { title: 'Choose what Gemini can access.', text: 'Review the data switches in P.R.O., then tap Done.' },
        { title: 'Type @ in a Gemini prompt and pick P.R.O.', text: 'That makes sure Gemini uses your P.R.O. data for the answer.' },
      ],
    },
    recorded: 'October 2026',
    shots: {},
    prompts: [
      '@P.R.O. How did I sleep this week compared with last week?',
      '@P.R.O. Show my last run with the route and pace.',
      '@P.R.O. Am I on track for my half-marathon plan?',
      '@P.R.O. Is my training load too high right now?',
    ],
    cards: [],
    trouble: [
      ['I don’t see Custom apps.', 'Google offers them only in the US, to adults signed in with a personal Google account, with Keep Activity turned on and Gemini in English.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['Gemini doesn’t use my data.', 'Type @ and pick P.R.O. in the prompt, and open P.R.O. on your iPhone so the latest data syncs.'],
    ],
    faq: [
      { q: 'Can Gemini read my Apple Health data?', a: 'Not on its own — Gemini has no built-in Apple Health integration. The free P.R.O. app connects Apple Health to Gemini as a custom app at https://mcp.proapp.uk.' },
      { q: 'What about the Google Health app?', a: 'The Google Health app (formerly Fitbit) can import Apple Health on iPhone. Its Gemini-powered Google Health Coach lives in that app, not in the Gemini chat, and per Google Health Help (checked October 27, 2026) it needs a paired Fitbit or Pixel Watch and a Google Health Premium subscription; Google says support for other devices is coming. With P.R.O. you use the Apple Health data you already have, from any device, in the Gemini chat.' },
      { q: 'Can I connect P.R.O. in the Gemini iPhone app?', a: 'Add it once at gemini.google.com in a browser; after that it’s available in the Gemini app on iPhone too.' },
      { q: 'Is it available outside the US?', a: 'Google offers custom apps in Gemini only in the US, to adults with a personal Google account. In other countries P.R.O. works with ChatGPT, Claude, Grok, Codex and Perplexity.' },
      { q: 'How do I remove Gemini’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Gemini and confirm Disconnect. In Gemini, Settings → Connected Apps → More details → Disconnect or Remove app.' },
    ],
  },
  {
    id: 'manus',
    name: 'Manus',
    platform: 'manus.im · custom MCP',
    path: '/apple-health-manus',
    title: 'How to Connect Apple Health to Manus (MCP) — P.R.O.',
    description:
      'Give Manus your Apple Health workouts, sleep, heart rate and HRV with the free P.R.O. MCP connector. No API key: add one URL and sign in once.',
    answer: [
      'Manus has no built-in Apple Health integration. The free P.R.O. app connects your Apple Health data to Manus through an MCP server at ' + MCP_URL + ', so Manus can read your workouts, sleep, heart rate, HRV, training load and training plan.',
      'Add it once as a custom MCP on manus.im and sign in with a one-time code from your iPhone. Manus is an agent, so it suits longer jobs: give it a whole month of training and ask for a report.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'A Manus account, in a browser at manus.im.',
    ],
    guide: {
      intro: 'On manus.im, add P.R.O. as a custom MCP by URL, then turn it on in a task and sign in with a one-time code from your iPhone.',
      verified: 'Connection confirmed November 2026',
      helpUrl: 'https://manus.im/docs/integrations/connectors.md',
      steps: [
        { title: 'Open Settings → Connectors in Manus.', text: 'Select + Add connectors, open the Custom MCP tab, then + Add custom MCP → Direct configuration. Some accounts show Create → Add MCP by URL instead; it’s the same form.' },
        { title: 'Enter P.R.O. as the name and https://mcp.proapp.uk as the Server URL.', text: 'If Manus asks for a transport type, keep HTTP. Leave custom headers empty: there’s no API key, P.R.O. registers Manus on its own.' },
        { title: 'Select Save.' },
        { title: 'Start a task and turn P.R.O. on.', text: 'Use the connectors icon under the message box. Manus asks you to sign in when the connector is first used.' },
        { title: 'Sign in to P.R.O.', text: 'The P.R.O. authorization page opens.', pairing: true },
        { title: 'Choose what Manus can access, then ask.', text: 'Review the data switches in P.R.O. and tap Done. Name P.R.O. in your first request so Manus uses it.' },
      ],
    },
    recorded: 'November 2026',
    shots: {},
    prompts: [
      'Use P.R.O. to write a report on my last 30 days of training: load, recovery and what to change.',
      'Use P.R.O. to compare my sleep and HRV on the nights after hard workouts.',
      'Use P.R.O. to check whether I’m on track for my training plan this week.',
      'Use P.R.O. to find my best and worst training weeks this year and explain the difference.',
    ],
    cards: [],
    trouble: [
      ['I don’t see Custom MCP.', 'Look for Create → Add MCP by URL under Connectors: Manus shows one or the other depending on the account.'],
      ['Manus doesn’t ask me to sign in.', 'Turn P.R.O. on with the connectors icon under the message box and name it in your request. The sign-in page opens on the first use.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['Manus answers without my data.', 'Check that P.R.O. is on for this task, and open P.R.O. on your iPhone so the latest data syncs.'],
    ],
    faq: [
      { q: 'Can Manus read my Apple Health data?', a: 'Yes, through the free P.R.O. app. Add https://mcp.proapp.uk as a custom MCP in Manus and sign in with a code from P.R.O. Manus has no Apple Health connector of its own.' },
      { q: 'Do I need an API key or token?', a: 'No. Leave the header fields empty. P.R.O. uses OAuth: Manus registers itself and you approve the connection with a one-time code from your iPhone.' },
      { q: 'What can Manus do with my data?', a: 'It reads what you allow: profile, goals, daily metrics, workouts and routes, sleep, heart rate and HRV, training load and your plan. Because Manus is an agent, it can combine several of these in one task and write up the result.' },
      { q: 'Does Manus show P.R.O. cards?', a: 'Manus works from the data P.R.O. returns and answers in its own format. Interactive P.R.O. cards are confirmed in ChatGPT, Claude, Gemini and Cursor.' },
      { q: 'Does it work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. See the sync guides at proapp.uk/apple-health-sync.' },
      { q: 'How do I remove Manus’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Manus and confirm Disconnect. You can also remove the connector in Manus under Settings → Connectors.' },
    ],
  },
  {
    id: 'superhuman',
    name: 'Superhuman',
    platform: 'Superhuman Go · MCP connector',
    path: '/apple-health-superhuman',
    title: 'How to Connect Apple Health to Superhuman Go (MCP) — P.R.O.',
    description:
      'Bring Apple Health workouts, sleep, heart rate and HRV into Superhuman Go with the free P.R.O. MCP connector. Create it from one URL, then sign in once.',
    answer: [
      'Superhuman Go has no built-in Apple Health integration. The free P.R.O. app connects your Apple Health data to Go through an MCP server at ' + MCP_URL + ', so Go can read your workouts, sleep, heart rate, HRV, training load and training plan.',
      'In Superhuman, an MCP server becomes a connector. You create it once from the P.R.O. address in your Superhuman Docs workspace, then open it in Go and sign in with a one-time code from your iPhone.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'A Superhuman plan with Go connectors. Superhuman lists Pro or higher.',
      'Doc Maker access in your Superhuman Docs workspace, to create the connector.',
    ],
    guide: {
      intro: 'Create a P.R.O. connector from its address in Superhuman Docs, then open it in Go and sign in with a one-time code from your iPhone.',
      verified: 'Steps follow Superhuman’s connector documentation, checked November 7, 2026',
      helpUrl: 'https://coda.io/packs/build/latest/guides/blocks/mcp/',
      steps: [
        { title: 'Open the Packs page in Superhuman Docs.', text: 'At docs.superhuman.com, click your workspace name and choose Packs. If you belong to several workspaces, click the three dots next to the workspace instead.' },
        { title: 'Click Create an MCP Connector and enter https://mcp.proapp.uk.' },
        { title: 'Keep OAuth (Auto) and click Create Connector.', text: 'There’s no client ID, secret or API key to enter. P.R.O. registers the connector on its own.' },
        { title: 'In Go, open Connectors, select the connector you created and click Sign in.', text: 'Use go.superhuman.com or the Go side panel.' },
        { title: 'Sign in to P.R.O.', text: 'The P.R.O. authorization page opens.', pairing: true },
        { title: 'Choose what Go can access, then ask.', text: 'Review the data switches in P.R.O. and tap Done. Start a new chat in Go and ask about your training.' },
      ],
    },
    recorded: 'November 2026',
    shots: {},
    prompts: [
      'Use P.R.O. to summarize my training this week.',
      'Use P.R.O. to compare my sleep and HRV on the nights after hard workouts.',
      'Use P.R.O. to tell me whether I’m ready to train today.',
      'Use P.R.O. to draft a note to my coach about my last 30 days of training.',
    ],
    cards: [],
    trouble: [
      ['I don’t see Create an MCP Connector.', 'Creating a connector needs Doc Maker access in the Docs workspace. Ask a workspace admin to create it, or to give you that access.'],
      ['Go asks me to confirm before a P.R.O. tool runs.', 'Go asks before any tool that isn’t marked read-only, such as asking your iPhone for a fresh sync. Reading your data doesn’t need a confirmation.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['Go answers without my data.', 'Open P.R.O. on your iPhone so the latest data syncs, and name P.R.O. in your request.'],
    ],
    faq: [
      { q: 'Can Superhuman Go read my Apple Health data?', a: 'Yes, through the free P.R.O. app. Create a connector from https://mcp.proapp.uk in Superhuman Docs and sign in with a code from P.R.O. Go then reads only the categories you allow.' },
      { q: 'Do I need an API key or token?', a: 'No. Keep OAuth (Auto) when you create the connector. Superhuman registers itself with P.R.O., and you approve the connection with a one-time code from your iPhone.' },
      { q: 'Is Superhuman Docs the same as Coda?', a: 'Yes. Coda is now called Superhuman Docs, and Go connectors are built as Packs there. If your workspace still says Coda, the steps are the same.' },
      { q: 'Does it work in the desktop app and the browser extension?', a: 'Superhuman says connector tools work in every Go client, while interactive cards show only on go.superhuman.com. Elsewhere Go answers in its own format.' },
      { q: 'Does it work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. See the sync guides at proapp.uk/apple-health-sync.' },
      { q: 'How do I remove Go’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Superhuman and confirm Disconnect.' },
    ],
  },
  {
    id: 'cherry-studio',
    name: 'Cherry Studio',
    platform: 'Desktop app · DeepSeek, Kimi, GLM and more',
    path: '/apple-health-cherry-studio',
    title: 'How to Connect Apple Health to Cherry Studio (MCP) — P.R.O.',
    description:
      'Use Apple Health in Cherry Studio with the free P.R.O. MCP connector. No API key for P.R.O.: add one URL, sign in, then pick a model that calls tools.',
    answer: [
      'Cherry Studio has no built-in Apple Health integration. The free P.R.O. app connects your Apple Health data to it through an MCP server at ' + MCP_URL + ', with tools for your workouts, sleep, heart rate, HRV, training load and training plan.',
      'Add the server once, sign in with a one-time code from your iPhone, and switch it on for your assistant. We tested the connection and the tool list in Cherry Studio 2.1.10; to use the tools, pick a model that can call them, with your own API key.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'Cherry Studio on your computer.',
      'An API key for a model that can call tools, such as DeepSeek or Moonshot (Kimi).',
    ],
    guide: {
      intro: 'Add P.R.O. as a Streamable HTTP server in Cherry Studio, sign in with a one-time code from your iPhone, then switch it on for your assistant.',
      verified: CHERRY_VERIFIED,
      helpUrl: CHERRY_HELP,
      steps: CHERRY_STEPS,
    },
    recorded: 'November 2026',
    shots: CHERRY_SHOTS,
    prompts: [
      'Use P.R.O. to summarize my training this week.',
      'Use P.R.O. to compare my sleep and HRV on the nights after hard workouts.',
      'Use P.R.O. to tell me whether I’m ready to train today.',
      'Use P.R.O. to check whether I’m on track for my training plan.',
    ],
    cards: [],
    trouble: [
      ['Cherry Studio says the browser authorization wasn’t finished.', 'It stopped waiting before you signed in. Select Retry next to the server name and enter a new code from P.R.O. on the page that opens.'],
      ['The model asks me for my training details.', 'Check two things: P.R.O. is on under the assistant’s name → MCP, and the model can call tools. The free built-in Qwen model can’t.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
    ],
    faq: [
      { q: 'Can Cherry Studio read my Apple Health data?', a: 'Yes, through the free P.R.O. app. Add https://mcp.proapp.uk as a Streamable HTTP MCP server and sign in with a code from P.R.O. Cherry Studio then reads only the categories you allow.' },
      { q: 'Do I need an API key for P.R.O.?', a: 'No. P.R.O. uses OAuth with a one-time code, so leave Headers empty. You only need an API key for the model you chat with.' },
      { q: 'Which models work?', a: 'Models that can call tools. The free built-in Qwen model in Cherry Studio can’t, so add a provider such as DeepSeek or Moonshot (Kimi) with your own API key.' },
      { q: 'Does it work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. See the sync guides at proapp.uk/apple-health-sync.' },
      { q: 'How do I remove access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Cherry Studio and confirm Disconnect. You can also select Delete on the server page in Cherry Studio.' },
    ],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    platform: 'DeepSeek, Qwen, Kimi or GLM · through Cherry Studio',
    path: '/apple-health-deepseek',
    title: 'Apple Health to DeepSeek, Qwen or Kimi via MCP — P.R.O.',
    description:
      'Set up Apple Health for DeepSeek, Kimi, Qwen or GLM: the free P.R.O. MCP connector plus Cherry Studio and your model’s API key. Step-by-step guide.',
    answer: [
      'Connect DeepSeek, Kimi, Qwen or GLM to Apple Health through Cherry Studio and the free P.R.O. MCP connector at ' + MCP_URL + ', using your own API key for the model.',
      'Cherry Studio connects to P.R.O. and offers its tools to the model you pick, for only the categories you allow: workouts, sleep, heart rate, HRV, training load and training plan. The chat apps themselves have no custom MCP connector option as of November 2026.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'Cherry Studio on your computer.',
      'An API key from DeepSeek, Moonshot (Kimi), BigModel (GLM), or a provider that hosts Qwen, such as SiliconFlow.',
    ],
    guide: {
      intro: 'Set up P.R.O. in Cherry Studio once. After that, you can switch between models without connecting again.',
      verified: CHERRY_VERIFIED,
      helpUrl: CHERRY_HELP,
      steps: CHERRY_STEPS,
    },
    recorded: 'November 2026',
    shots: CHERRY_SHOTS,
    prompts: [
      'Use P.R.O. to summarize my training this week.',
      'Use P.R.O. to find what changed in my sleep and resting heart rate this month.',
      'Use P.R.O. to tell me whether I’m ready to train today.',
      'Use P.R.O. to build a table of my workouts for the last 30 days.',
    ],
    cards: [],
    trouble: [
      ['The model asks me for my training details.', 'Check two things: P.R.O. is on under the assistant’s name → MCP, and you selected your provider’s model, not the free built-in Qwen.'],
      ['Cherry Studio says the browser authorization wasn’t finished.', 'It stopped waiting before you signed in. Select Retry next to the server name and enter a new code from P.R.O. on the page that opens.'],
    ],
    faq: [
      { q: 'Can DeepSeek read my Apple Health data?', a: 'Through Cherry Studio and the free P.R.O. app. The DeepSeek chat app has no custom connector option and the DeepSeek API doesn’t run MCP servers itself, so a desktop app connects to P.R.O. and offers its tools to the model.' },
      { q: 'Does this work with Qwen and Kimi?', a: 'The setup is the same. Add Moonshot for Kimi, or a provider that hosts Qwen such as SiliconFlow, then choose that model in the chat.' },
      { q: 'Does it work in the DeepSeek or Qwen phone app?', a: 'Those apps have no custom MCP connector option as of November 2026. Use Cherry Studio on your computer.' },
      { q: 'Where does my data go?', a: 'P.R.O. sends the categories you allow to Cherry Studio, and Cherry Studio sends what the model needs to the provider you chose. That provider’s privacy terms apply to those messages.' },
      { q: 'Is it free?', a: 'The P.R.O. app and connector are free. You pay your model provider for API usage according to its pricing.' },
    ],
  },
];

export const assistantGuideByPath = Object.fromEntries(assistantGuides.map((g) => [g.path, g]));
