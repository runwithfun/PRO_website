// One page per assistant: /apple-health-chatgpt, /apple-health-claude, /apple-health-grok.
// Steps reuse the recorded guides in mcpGuides.js; screenshots live in media/mcp/<id>/.
// Facts about built-in integrations were checked on October 13, 2026:
// ChatGPT Health — Apple Health for US users from July 23, 2026; the EEA, Switzerland and the UK
//   were excluded at launch (OpenAI announcement as reported by MacRumors, Neowin).
// Claude Apple Health — https://support.claude.com/en/articles/11869619 (beta, US, Pro and Max, iOS app).
import { guides, MCP_URL } from './mcpGuides.js';

const guide = (id) => guides.find((g) => g.id === id);

export const CHECKED = 'October 13, 2026';

export const assistantGuides = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    path: '/apple-health-chatgpt',
    title: 'How to Connect Apple Health to ChatGPT — P.R.O.',
    description:
      'Bring your Apple Health workouts, sleep, heart rate and HRV into ChatGPT with the free P.R.O. connector. Works outside the US, unlike ChatGPT Health. Step-by-step with screenshots.',
    answer: [
      'There are two ways. In the US, ChatGPT’s built-in Health space can read Apple Health from the ChatGPT iPhone app. Everywhere else — and if you want training plans, interactive workout cards and the same data in other assistants — add the free P.R.O. app as a custom MCP connector at ' + MCP_URL + '.',
      'You set it up once on chatgpt.com, in about two minutes, and it then works in the ChatGPT iPhone app too.',
    ],
    builtIn: {
      name: 'ChatGPT Health',
      rows: [
        ['Where it works', 'United States only. At launch it excluded the EEA, Switzerland and the UK.', 'Wherever your ChatGPT plan can add custom MCP servers.'],
        ['ChatGPT plans', 'Free, Go, Plus and Pro, for users 18+.', 'Plans that can add custom MCP servers. Recorded on Pro.'],
        ['What ChatGPT reads', 'The Apple Health data you share in its Health space.', 'Workouts with routes and pace, sleep stages, heart rate and HRV, daily metrics, goals and your training plan.'],
        ['In the chat', 'Text answers.', 'Text answers plus interactive P.R.O. cards for workouts, sleep, plans and training load.'],
        ['Other assistants', 'ChatGPT only.', 'The same connection works in Claude, Grok and Codex.'],
      ],
    },
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'A browser with chatgpt.com — on a computer or in Safari on iPhone. The ChatGPT app itself can’t add custom servers.',
      'A ChatGPT plan that can add custom MCP servers. We recorded the steps on ChatGPT Pro.',
    ],
    guide: guide('chatgpt'),
    recorded: 'October 8, 2026',
    // Screenshot after step N (1-based).
    shots: {
      3: { src: 'mcp/chatgpt/add-custom-mcp-server.png', alt: 'ChatGPT Plugins page with the Add menu open and Add custom MCP server highlighted', caption: 'Add → Add custom MCP server, top right of the Plugins directory.' },
      7: { src: 'mcp/chatgpt/server-form.png', alt: 'ChatGPT Add custom MCP server form filled in: Name PRO, Server URL https://mcp.proapp.uk, Authentication OAuth', caption: 'The filled-in form: name PRO, server URL https://mcp.proapp.uk, OAuth.' },
      10: { src: 'mcp/chatgpt/connect-consent.png', alt: 'ChatGPT Connect PRO dialog with the Continue to PRO button', caption: 'ChatGPT’s own notice, then Continue to PRO.' },
      11: { src: 'mcp/chatgpt/installed.png', alt: 'ChatGPT Plugins sidebar showing PRO under Installed', caption: 'Done: PRO is listed under Installed.' },
    },
    prompts: [
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
      ['I can’t find Add custom MCP server.', 'It isn’t in Settings → Plugins itself. Select Browse directory there, then Add in the top-right corner of the directory. The ChatGPT iPhone app has no such option — use chatgpt.com.'],
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. Get a new one in P.R.O. → Settings → MCP Connect.'],
      ['ChatGPT answers without my numbers.', 'Make sure PRO is enabled for the chat, or ask “use P.R.O.” in your message. Open P.R.O. on your iPhone so the latest workouts sync.'],
    ],
    faq: [
      { q: 'Can ChatGPT read my Apple Health data?', a: 'Yes. In the US, ChatGPT Health can read Apple Health from the ChatGPT iPhone app. In other countries, or if you want training plans and interactive workout cards, connect the free P.R.O. app as a custom MCP connector at https://mcp.proapp.uk.' },
      { q: 'What is the difference between ChatGPT Health and P.R.O.?', a: 'ChatGPT Health is OpenAI’s built-in health space, available in the US. P.R.O. is a free iPhone app that syncs Apple Health and serves it to ChatGPT through an MCP connector: it works outside the US, adds interactive cards for workouts, sleep and training plans, and the same connection also works in Claude and Grok.' },
      { q: 'Does ChatGPT Health work in the UK or the EU?', a: 'At launch OpenAI excluded the EEA, Switzerland and the UK from ChatGPT Health. The P.R.O. connector works there as long as your ChatGPT plan can add custom MCP servers.' },
      { q: 'Can I set it up in the ChatGPT iPhone app?', a: 'Not directly: the iPhone app has no option to add a custom MCP server. Add P.R.O. once on chatgpt.com — Safari on iPhone works — and the connection then appears in the iPhone app as well.' },
      { q: 'Which ChatGPT plan do I need?', a: 'One that lets you add custom MCP servers in Settings → Plugins. We recorded the setup on ChatGPT Pro; other plans have not been verified. The P.R.O. app and connector are free.' },
      { q: 'Is my health data used to train ChatGPT?', a: 'P.R.O. only answers the requests ChatGPT makes while you chat, for the categories you allow. Those answers become part of your ChatGPT conversation, so ChatGPT’s data controls apply — you can turn off “Improve the model for everyone” in ChatGPT settings.' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    path: '/apple-health-claude',
    title: 'How to Connect Apple Health to Claude — P.R.O.',
    description:
      'Connect your Apple Health workouts, sleep, heart rate and HRV to Claude in any country with the free P.R.O. custom connector. Built-in vs P.R.O. compared, step-by-step with screenshots.',
    answer: [
      'Claude has its own Apple Health integration, but it’s a beta for US Pro and Max subscribers in the Claude iPhone app. Anywhere else, or if you want training plans and interactive workout cards, add the free P.R.O. app as a custom connector at ' + MCP_URL + '.',
      'It takes about two minutes, and Claude can then answer from your real workouts, sleep, heart rate and HRV.',
    ],
    builtIn: {
      name: 'Claude’s Apple Health integration',
      rows: [
        ['Status', 'Beta.', 'Available now.'],
        ['Where it works', 'United States only.', 'Wherever your Claude plan supports custom connectors.'],
        ['Claude plans', 'Pro and Max.', 'Plans with custom connectors.'],
        ['Apps', 'Claude iPhone app.', 'Claude on iPhone (recorded), claude.ai and Claude desktop.'],
        ['In the chat', 'Text answers from the health data you share.', 'Text answers plus interactive P.R.O. cards for workouts, sleep, plans and training load.'],
        ['Training plans and coach notes', 'Not part of the integration.', 'Your P.R.O. training plan; coach notes if you allow them.'],
      ],
    },
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'The Claude app with a plan that supports custom connectors.',
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
      { q: 'Can Claude read my Apple Health data?', a: 'Yes. Claude’s own Apple Health integration is a beta for US Pro and Max users in the Claude iPhone app. In other countries, or for training plans and interactive workout cards, add the free P.R.O. app as a custom connector at https://mcp.proapp.uk.' },
      { q: 'Does Claude’s Apple Health integration work outside the US?', a: 'Not yet: Anthropic describes it as a beta for US users on Pro and Max plans. The P.R.O. connector is not limited to the US.' },
      { q: 'Do I need Claude Pro?', a: 'You need a Claude plan that supports custom connectors. The P.R.O. app and its connector are free.' },
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
      'Grok has no built-in Apple Health integration. Connect your workouts, sleep, heart rate and HRV to Grok with the free P.R.O. custom connector — iPhone and web, step-by-step with screenshots.',
    answer: [
      'Grok has no built-in Apple Health integration. The free P.R.O. app connects your Apple Health workouts, sleep, heart rate and HRV to Grok as a custom connector at ' + MCP_URL + '.',
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
      ['The code is rejected.', 'Each code works once and expires after 10 minutes. On iPhone, Open P.R.O. on the authorization page creates and copies a fresh one.'],
    ],
    faq: [
      { q: 'Does Grok work with Apple Health?', a: 'Not on its own — Grok has no built-in Apple Health integration. The free P.R.O. app connects Apple Health to Grok as a custom connector at https://mcp.proapp.uk.' },
      { q: 'Can I connect on the Grok iPhone app?', a: 'Yes. Open Connectors, scroll to Custom Connectors, tap Connect next to Custom Connector and enter https://mcp.proapp.uk. On the web, use grok.com/connectors → New Connector → Custom.' },
      { q: 'Will Grok show P.R.O. cards?', a: 'Grok answers from your data in text. Interactive P.R.O. cards are confirmed in ChatGPT and Claude.' },
      { q: 'What can Grok see?', a: 'Only the categories you allow in P.R.O.: profile, goals, daily metrics, workouts and routes, sleep, heart rate and HRV, and coach memory. You can change this any time in Settings → MCP Connect.' },
    ],
  },
];

export const assistantGuideByPath = Object.fromEntries(assistantGuides.map((g) => [g.path, g]));
