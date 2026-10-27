// "Apple Health MCP server" page — copy, comparison, client setup and FAQ.
// Apple facts: HealthKit "Protecting user privacy" ("The user's device stores all HealthKit data
//   locally"), "About the HealthKit framework" (macOS 13+ and iPadOS 16 have no HealthKit store),
//   Apple Health privacy (iCloud Health data end-to-end encrypted with 2FA on iOS 12+).
// Other servers: each project's own README or help pages, checked October 27, 2026.
// Clients: Claude Help 11175166, code.claude.com/docs/en/mcp, learn.chatgpt.com/docs/extend/mcp,
//   cursor.com/docs/context/mcp, checked October 27, 2026.
// P.R.O. facts mirror mcpFaq.js, mcpTools.js, assistantGuides.js and Privacy Policy Part C.
import { MCP_URL } from './mcpGuides.js';

export const AHM_CHECKED = 'October 27, 2026';

// Columns: export-file servers, Health Auto Export, companion app + local server, P.R.O. (last, highlighted).
export const ahmColumns = ['Export-file servers', 'Health Auto Export server', 'Companion app + local server', 'P.R.O. (hosted)'];
export const ahmColumnNotes = [
  'e.g. the-momentum/apple-health-mcp-server, davidmosiah/apple-health-mcp',
  'Health Auto Export iOS app, HealthyApps/health-auto-export-mcp-server',
  'e.g. MetricBridge (healthexport.dev)',
  MCP_URL,
];
export const ahmCompare = [
  ['How data gets there', 'You export everything from the Health app (export.zip / export.xml) and copy it to your computer.', 'The Health Auto Export app on your iPhone runs the MCP server itself.', 'An iOS app writes JSON to iCloud Drive, a synced folder, your network or a webhook; a local server reads it.', 'The P.R.O. iPhone app syncs the Apple Health categories you allow to the P.R.O. server.'],
  ['Freshness', 'A snapshot: data is as fresh as your last export.', 'Live while the app is open; the server stops when the app goes to the background.', 'Scheduled exports of new data after a full first backfill.', 'Updated whenever P.R.O. syncs — open the app for the newest workouts. Assistants can also request a fresh sync.'],
  ['Where the server runs', 'Locally, over stdio (Docker, uv or Node.js).', 'On the iPhone, on your Wi-Fi: http://<phone IP>:9000/mcp with a bearer token.', 'Locally, over stdio (Node.js).', 'Hosted remote server: Streamable HTTP, OAuth 2.1 sign-in.'],
  ['Needs a computer or terminal', 'Yes.', 'Yes, on the same Wi-Fi as the phone; Node.js for some clients.', 'Yes.', 'No. Setup works in a browser or the assistant’s app; Codex, Claude Code and Cursor are desktop tools.'],
  ['Phone assistants (ChatGPT, Claude, Grok apps)', 'No — the server runs on your computer.', 'No — the server is reachable only on your local network.', 'No — the server runs on your computer.', 'Yes. Set up once, then use it in the ChatGPT, Claude or Grok iPhone app.'],
  ['Clients in their docs', 'Claude Desktop, Cursor, ChatGPT Desktop and other local MCP clients.', 'Claude Code, Claude Desktop (via mcp-remote), Cursor, VS Code, Codex CLI.', 'Claude Desktop, Claude Code, Cursor, VS Code and more.', 'ChatGPT, Claude, Codex, Grok, Perplexity and Gemini tested; Claude Code and Cursor per their docs.'],
  ['Cost', 'Free, open source (MIT).', 'App free; the MCP server needs Premium ($1.99/month, $6.99/year or $24.99 lifetime in the US App Store).', 'App $24.99 one-time; the MCP server is free (MIT).', 'Connector included in P.R.O., which is free to download. Your assistant’s plan must allow custom connectors.'],
  ['Privacy model', 'Local: the export stays on your machine.', 'Local: “Your data stays on your device”, per its help pages.', 'Local: the server makes no network requests, per its docs.', 'Cloud: permitted data goes iPhone → P.R.O. server → your assistant, only when it asks. Not sold, not used for ads or model training by P.R.O.'],
];

export const ahmClients = [
  {
    id: 'chatgpt', name: 'ChatGPT', status: 'tested', guide: '/apple-health-chatgpt',
    steps: ['On chatgpt.com: Settings → Plugins → Browse directory → Add → Add custom MCP server.', 'Name PRO, Server URL ' + MCP_URL + ', Authentication OAuth.', 'Create as a plugin → Continue to PRO, then enter the code from P.R.O. It then works in the ChatGPT iPhone app too.'],
  },
  {
    id: 'claude', name: 'Claude and Claude Desktop', icon: 'Claude', status: 'tested', guide: '/apple-health-claude',
    steps: ['In the Claude app, claude.ai or Claude Desktop, open Connectors (Customize → Connectors in Claude Help; Settings → Connectors in the iPhone app we recorded).', 'Add custom connector → name P.R.O., URL ' + MCP_URL + ' → Continue.', 'Sign in on the P.R.O. page with the code from your iPhone.'],
    note: 'Recorded in the Claude iPhone app. For Claude Desktop the path follows Claude Help; we haven’t recorded it separately. Custom connectors work on every Claude plan; Free is limited to one.',
  },
  {
    id: 'codex', name: 'Codex', status: 'tested', guide: '/apple-health-codex',
    steps: ['ChatGPT desktop app: Settings → MCP servers → Add server → Streamable HTTP → URL ' + MCP_URL + ' → Save → Authenticate.', 'Or with the Codex CLI:'],
    code: 'codex mcp add pro --url ' + MCP_URL + '\ncodex mcp login pro',
    note: 'We recorded the desktop app; the CLI commands follow OpenAI’s docs.',
  },
  {
    id: 'claude-code', name: 'Claude Code', icon: 'Claude', status: 'docs', vendor: 'Anthropic', helpUrl: 'https://code.claude.com/docs/en/mcp',
    steps: ['Add the server (add --scope user to use it in every project):'],
    code: 'claude mcp add --transport http pro ' + MCP_URL,
    after: 'Then run /mcp inside Claude Code and choose to authenticate. The browser opens the P.R.O. sign-in page; enter the code from your iPhone.',
  },
  {
    id: 'cursor', name: 'Cursor', status: 'docs', vendor: 'Cursor', helpUrl: 'https://cursor.com/docs/context/mcp',
    steps: ['Add P.R.O. to ~/.cursor/mcp.json (all projects) or .cursor/mcp.json (one project):'],
    code: '{\n  "mcpServers": {\n    "pro": { "url": "' + MCP_URL + '" }\n  }\n}',
    after: 'Cursor supports OAuth for remote servers and registers itself automatically, so no client ID is needed. Complete the P.R.O. sign-in when Cursor asks.',
  },
  {
    id: 'grok', name: 'Grok', status: 'tested', guide: '/apple-health-grok',
    steps: ['grok.com/connectors → New Connector → Custom, or in the iPhone app Connectors → Custom Connectors → Custom Connector → Connect.', 'Enter ' + MCP_URL + ' and complete the OAuth sign-in with the code from P.R.O.'],
  },
  {
    id: 'perplexity', name: 'Perplexity', status: 'tested', guide: '/apple-health-perplexity',
    steps: ['On perplexity.ai: Plugins → Add custom → Connector → Add MCP connector → Remote.', 'URL ' + MCP_URL + ', Authentication OAuth, Transport Streamable HTTP → Add, then click the P.R.O. card to sign in.'],
  },
  {
    id: 'gemini', name: 'Gemini', status: 'tested', guide: '/apple-health-gemini',
    steps: ['At gemini.google.com: Settings → Connected Apps → Add a custom app.', 'Enter ' + MCP_URL + ' → Next, then sign in with the code from P.R.O.'],
    note: 'Google offers custom apps only in the US, to adults with a personal Google account.',
  },
];

export const ahmFaq = [
  { q: 'Is there an official Apple Health MCP server?', a: 'No. As of October 27, 2026, Apple does not publish an MCP server for Apple Health or HealthKit, and its developer documentation describes none. Every Apple Health MCP server, including P.R.O., is made by a third party and gets the data either from an iPhone app or from a Health export file.' },
  { q: 'Why does an Apple Health MCP server need an iPhone app?', a: 'Apple says the device stores all HealthKit data locally, and a Mac has no HealthKit store at all. Apple documents no web API for Health data, and Health data synced to iCloud is end-to-end encrypted. So the data has to come from an app on the iPhone, or from an export you make in the Health app.' },
  { q: 'Do I need a Mac or a terminal?', a: 'Not for P.R.O. You need an iPhone with P.R.O.; you add ' + MCP_URL + ' in a browser or in the assistant’s app and sign in with a code. Export-file and local servers run on a computer. Codex, Claude Code and Cursor are desktop tools, but they use the same hosted address.' },
  { q: 'Does it work with Claude Desktop, Cursor and Claude Code?', a: 'The P.R.O. server is a remote MCP server over Streamable HTTP with OAuth, which all three support per their docs. We have tested Claude on iPhone; Claude Desktop uses the same custom connectors in Claude Help. Claude Code and Cursor setup follows Anthropic’s and Cursor’s docs and is not yet tested by us.' },
  { q: 'Does it work outside the US?', a: 'Yes. The P.R.O. connector is not limited to the US. Your assistant’s own rules still apply: Gemini offers custom apps only in the US, while ChatGPT, Claude, Codex, Grok and Perplexity can add the connector in other countries if your plan allows custom connectors.' },
  { q: 'Is it free?', a: 'The connector is included in P.R.O., which is free to download; some advanced app features are premium. Your assistant’s plan must allow custom MCP connections — Claude’s Free plan, for example, allows one custom connector.' },
  { q: 'Which data can the assistant see?', a: 'Only the categories you allow in P.R.O.: profile, goals, daily metrics, workouts, workout routes, sleep, heart rate and HRV, and coach memory. Switch any of them off in Settings → MCP Connect → Data the assistant can read; a switched-off category is not returned to any connected assistant.' },
  { q: 'Can the assistant change my Apple Health data?', a: 'No. P.R.O. never writes to Apple Health. An assistant can save a coach note only if you turn on Allow saving coach notes (off by default), suggest training-plan changes that wait for your acceptance in P.R.O., and request a fresh sync. It cannot delete data, make payments or send messages.' },
];

export const ahmSources = [
  ['Apple Developer: Protecting user privacy (HealthKit)', 'https://developer.apple.com/documentation/healthkit/protecting-user-privacy'],
  ['Apple Developer: About the HealthKit framework', 'https://developer.apple.com/documentation/healthkit/about-the-healthkit-framework'],
  ['Apple: Health app and privacy', 'https://www.apple.com/legal/privacy/data/en/health-app/'],
  ['the-momentum/apple-health-mcp-server (GitHub)', 'https://github.com/the-momentum/apple-health-mcp-server'],
  ['davidmosiah/apple-health-mcp (GitHub)', 'https://github.com/davidmosiah/apple-health-mcp'],
  ['Health Auto Export Help: MCP server connection', 'https://help.healthyapps.dev/en/health-auto-export/automations/server-connection'],
  ['HealthyApps/health-auto-export-mcp-server (GitHub)', 'https://github.com/HealthyApps/health-auto-export-mcp-server'],
  ['Health Auto Export on the App Store', 'https://apps.apple.com/us/app/health-auto-export-json-csv/id1115567069'],
  ['MetricBridge MCP server (healthexport.dev)', 'https://healthexport.dev/mcp/'],
  ['Claude Help: custom connectors using remote MCP', 'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp'],
  ['Claude Code docs: connect to MCP servers', 'https://code.claude.com/docs/en/mcp'],
  ['OpenAI: MCP in Codex', 'https://learn.chatgpt.com/docs/extend/mcp'],
  ['Cursor docs: Model Context Protocol', 'https://cursor.com/docs/context/mcp'],
];
