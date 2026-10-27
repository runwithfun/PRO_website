// One page per assistant: /apple-health-chatgpt, /apple-health-claude, /apple-health-grok.
// Steps reuse the recorded guides in mcpGuides.js; screenshots live in media/mcp/<id>/.
// Facts about built-in integrations were checked on October 13, 2026, and re-checked on
// October 27, 2026 for ChatGPT, Claude, Codex and Gemini:
// ChatGPT Health — https://openai.com/index/introducing-chatgpt-health/ (early access from
//   January 7, 2026 outside the EEA, Switzerland and the UK; launch to US users on July 23, 2026)
//   and https://help.openai.com/en/articles/20001036 (US only; Free, Go, Plus and Pro; web and iOS).
// Claude Apple Health — https://support.claude.com/en/articles/11869619 (beta, US, Pro and Max,
//   native iOS charts); custom connectors — https://support.claude.com/en/articles/11175166
//   (Free, Pro, Max, Team and Enterprise; Free is limited to one custom connector).
// Codex — https://learn.chatgpt.com/docs/extend/mcp and https://help.openai.com/en/articles/20001275.
// Google Health Coach — https://support.google.com/googlehealth/answer/16961408 (needs a Fitbit or
//   Pixel Watch and Google Health Premium).
import { guides, MCP_URL } from './mcpGuides.js';

const guide = (id) => guides.find((g) => g.id === id);

export const CHECKED = 'October 13, 2026';
const RECHECKED = 'October 27, 2026';

// Every assistant P.R.O. has a tested setup page for, in one order for all pages.
const ASSISTANTS = ['ChatGPT', 'Claude', 'Grok', 'Codex', 'Perplexity', 'Gemini'];
const listOf = (names) => (names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0]);
const alsoWorksIn = (self) => {
  const others = ASSISTANTS.filter((n) => n !== self);
  const gemini = others.includes('Gemini') ? ' (Gemini offers custom apps only in the US)' : '';
  return 'The same connection also works in ' + listOf(others) + gemini + '.';
};

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
      checked: RECHECKED,
      rows: [
        ['Where it works', 'United States only since the launch on July 23, 2026. The early-access beta that opened on January 7, 2026 excluded the EEA, Switzerland and the UK.', 'Wherever your ChatGPT plan can add custom MCP servers.'],
        ['ChatGPT plans', 'Free, Go, Plus and Pro, on the web and in the iOS app. Connecting Apple Health needs the iPhone app.', 'Plans that can add custom MCP servers. Recorded on Pro.'],
        ['What ChatGPT reads', 'The Apple Health data you share in its Health space.', 'Workouts with routes and pace, sleep stages, heart rate and HRV, daily metrics, goals and your training plan.'],
        ['In the chat', 'Answers in any chat; the Health tab shows your data and trends, with interactive charts.', 'Text answers plus interactive P.R.O. cards for workouts, sleep, plans and training load.'],
        ['Other assistants', 'ChatGPT only.', alsoWorksIn('ChatGPT')],
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
      { q: 'What is the difference between ChatGPT Health and P.R.O.?', a: 'ChatGPT Health is OpenAI’s built-in health space, available in the US. P.R.O. is a free iPhone app that syncs Apple Health and serves it to ChatGPT through an MCP connector: it works outside the US, adds interactive cards for workouts, sleep and training plans, and you choose which data categories ChatGPT can see. ' + alsoWorksIn('ChatGPT') },
      { q: 'Does ChatGPT Health work in the UK or the EU?', a: 'No. The early-access beta that opened on January 7, 2026 excluded the EEA, Switzerland and the UK, and since the launch on July 23, 2026 Health in ChatGPT is available only to users in the US (OpenAI Help, checked October 27, 2026). The P.R.O. connector works there as long as your ChatGPT plan can add custom MCP servers.' },
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
      checked: RECHECKED,
      rows: [
        ['Status', 'Beta.', 'Available now.'],
        ['Where it works', 'United States only.', 'Wherever your Claude plan supports custom connectors.'],
        ['Claude plans', 'Pro and Max.', 'Free, Pro, Max, Team and Enterprise, per Claude Help. Free is limited to one custom connector.'],
        ['Apps', 'Claude iPhone app.', 'Claude on iPhone (recorded), claude.ai and Claude desktop.'],
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
      { q: 'Can Claude read my Apple Health data?', a: 'Yes. Claude’s own Apple Health integration is a beta for US Pro and Max users in the Claude iPhone app. In other countries, or for training plans and interactive workout cards, add the free P.R.O. app as a custom connector at https://mcp.proapp.uk.' },
      { q: 'Does Claude’s Apple Health integration work outside the US?', a: 'Not yet: Anthropic describes it as a beta for US users on Pro and Max plans. The P.R.O. connector is not limited to the US.' },
      { q: 'Do I need Claude Pro?', a: 'No. Per Claude Help (checked October 27, 2026), custom connectors are available on Free, Pro, Max, Team and Enterprise plans; Free users are limited to one custom connector. Claude’s own Apple Health beta needs Pro or Max. The P.R.O. app and its connector are free.' },
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
      { q: 'Will Grok show P.R.O. cards?', a: 'Grok answers from your data in text. Interactive P.R.O. cards are confirmed in ChatGPT, Claude and Gemini.' },
      { q: 'What can Grok see?', a: 'Only the categories you allow in P.R.O.: profile, goals, daily metrics, workouts and routes, sleep, heart rate and HRV, and coach memory. You can change this any time in Settings → MCP Connect.' },
    ],
  },
  {
    id: 'codex',
    name: 'Codex',
    platform: 'ChatGPT desktop app · Codex',
    path: '/apple-health-codex',
    title: 'How to Connect Apple Health to Codex — P.R.O.',
    description:
      'Give Codex in the ChatGPT desktop app your Apple Health workouts, sleep, heart rate and HRV with the free P.R.O. MCP server, then let it analyse and chart them. Screenshots plus the Codex CLI command.',
    answer: [
      'Codex can’t open Apple Health on its own. Add the free P.R.O. app as an MCP server in the ChatGPT desktop app, and Codex can read your workouts, sleep, heart rate and HRV, then analyse them with code, build charts and export tables.',
      'Setup takes about two minutes. The server is saved in Codex’s own settings, which the Codex CLI and IDE extension share; regular ChatGPT chats have their own setup.',
    ],
    builtIn: null,
    before: [
      'P.R.O. on your iPhone, signed in, with Apple Health access allowed. It’s free.',
      'The ChatGPT desktop app. We recorded on a Mac, when Codex ran in the Work tab; OpenAI now describes Codex as a separate view you pick from the app’s menu.',
      'A ChatGPT plan that includes Codex and custom MCP servers. We recorded the steps on ChatGPT Pro.',
    ],
    guide: {
      intro: 'In the ChatGPT desktop app, add P.R.O. as an MCP server in Settings, then sign in with a one-time code from your iPhone.',
      verified: 'Recorded in ChatGPT for Mac · October 8, 2026',
      helpUrl: 'https://learn.chatgpt.com/docs/extend/mcp',
      note: 'OpenAI’s docs describe the same form as Settings → MCP servers → Add server: enter a name, choose Streamable HTTP, enter the URL, save, then select Restart and Authenticate. If your app shows MCP servers instead of Plugins, follow that path — the form and the address are the same.',
      cli: {
        intro: 'Prefer the terminal? With the Codex CLI, add the server and sign in. The desktop app, the CLI and the IDE extension share this configuration.',
        commands: ['codex mcp add pro --url ' + MCP_URL, 'codex mcp login pro'],
        after: 'The login command opens the P.R.O. sign-in page in your browser. We recorded the desktop app; the CLI commands follow OpenAI’s docs.',
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
      { q: 'Is Codex the same as ChatGPT Work?', a: 'No. According to OpenAI Help (checked October 27, 2026), ChatGPT now has Chat and Work modes, and Codex is a separate view in the desktop app for coding and data work. When we recorded this guide on October 8, 2026, the Mac app showed Chat and Work tabs, and Codex ran in the Work tab. We have tested P.R.O. in Codex; we have not yet verified it in ChatGPT Work.' },
      { q: 'Can I add P.R.O. from the Codex CLI?', a: 'Yes. Run codex mcp add pro --url https://mcp.proapp.uk, then codex mcp login pro to sign in with a one-time code. The CLI, the IDE extension and the desktop app share this configuration.' },
      { q: 'Why use Codex instead of a chat for health data?', a: 'Codex can write and run code on your data: build charts, export tables, compute rolling averages or check how one metric moves with another. A chat answers questions; Codex can do the analysis.' },
      { q: 'Which plan do I need?', a: 'A ChatGPT plan that includes Codex and lets you add MCP servers. We recorded the steps on ChatGPT Pro. P.R.O. and its connector are free.' },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    platform: 'perplexity.ai · custom connector',
    path: '/apple-health-perplexity',
    title: 'How to Connect Apple Health to Perplexity — P.R.O.',
    description:
      'Connect your Apple Health workouts, sleep, heart rate and HRV to Perplexity with the free P.R.O. custom connector. Works outside the US, unlike Perplexity Health. Step-by-step setup.',
    answer: [
      'There are two ways. In the US, Perplexity Health on Pro and Max can read Apple Health directly. Everywhere else — and if you want your training plan and the same data in other assistants — add the free P.R.O. app as a custom remote connector at ' + MCP_URL + '.',
      'You add it once on perplexity.ai, sign in with a one-time code from your iPhone, and Perplexity answers from your real workouts, sleep, heart rate and HRV — and draws its own charts from them.',
    ],
    builtIn: {
      name: 'Perplexity Health',
      rows: [
        ['Where it works', 'United States first.', 'Wherever your Perplexity plan can add custom connectors.'],
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
      verified: 'Connection tested October 2026 · Setup follows Perplexity’s official guide',
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
      { q: 'Does Perplexity show P.R.O. cards?', a: 'Perplexity doesn’t display P.R.O.’s interactive cards. It answers in text and draws its own charts from the data P.R.O. returns. Interactive cards are confirmed in ChatGPT, Claude and Gemini.' },
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
      'Gemini can’t read Apple Health on its own. Connect your workouts, sleep, heart rate and HRV to Gemini as a custom app with the free P.R.O. MCP server — setup on the web, use it on iPhone too.',
    answer: [
      'Gemini has no built-in Apple Health integration. The free P.R.O. app connects your Apple Health workouts, sleep, heart rate and HRV to Gemini as a custom app at ' + MCP_URL + ', and Gemini shows them as interactive P.R.O. cards.',
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
      verified: 'Connection tested October 2026 · Setup follows Google’s Gemini Apps Help',
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
      { q: 'What about the Google Health app?', a: 'The Google Health app (formerly Fitbit) can import Apple Health on iPhone. Its Gemini-powered Google Health Coach lives in that app, not in the Gemini chat, and per Google Health Help (checked October 27, 2026) it needs a paired Fitbit or Pixel Watch and a Google Health Premium subscription; Google says support for other devices is coming. With P.R.O. you use the Apple Watch data you already have in the Gemini chat.' },
      { q: 'Can I connect P.R.O. in the Gemini iPhone app?', a: 'Add it once at gemini.google.com in a browser; after that it’s available in the Gemini app on iPhone too.' },
      { q: 'Is it available outside the US?', a: 'Not yet: Google currently offers custom apps in Gemini only in the US, to adults with a personal Google account. P.R.O. works with ChatGPT, Claude, Grok, Codex and Perplexity in other countries.' },
      { q: 'How do I remove Gemini’s access?', a: 'In P.R.O., open Settings → MCP Connect, tap × next to Gemini and confirm Disconnect. In Gemini, Settings → Connected Apps → More details → Disconnect or Remove app.' },
    ],
  },
];

export const assistantGuideByPath = Object.fromEntries(assistantGuides.map((g) => [g.path, g]));
