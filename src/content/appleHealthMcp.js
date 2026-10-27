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
  ['Setup', 'Export everything from the Health app (export.zip / export.xml), copy it to a computer, run the server.', 'Install the app, buy Premium, run the server on the phone and point a client at its local IP.', 'Install the app, set up exports to a folder, run a local Node.js server.', 'Add one address in your assistant and confirm with a code from P.R.O. About two minutes.'],
  ['Fresh data', 'A snapshot as old as your last export.', 'Only while the app is open on the same Wi-Fi.', 'Scheduled exports after a full first backfill.', 'Kept in sync by P.R.O.; the assistant can ask for a fresh sync at any time.'],
  ['Computer or terminal', 'Required.', 'Required, on the same Wi-Fi as the phone.', 'Required.', 'Not needed. Works from a browser or the assistant’s app.'],
  ['Assistants on your phone', 'No.', 'No — local network only.', 'No.', 'Yes — ChatGPT, Claude and Grok on iPhone, plus web and desktop.'],
  ['Works with', 'Local MCP clients.', 'Local MCP clients.', 'Local MCP clients.', 'ChatGPT, Claude, Claude Code, Codex, Cursor, Grok, Perplexity and Gemini — all tested by us.'],
  ['You choose what’s shared', 'The whole export.', 'Whatever the app exports.', 'Whatever you export.', 'Per category — switch off workouts, sleep, heart rate and more in one tap; revoke any assistant in P.R.O.'],
  ['Beyond raw data', 'Exported records.', 'Exported records.', 'Exported records.', 'Workout summaries, splits, heart-rate zones, training plan, coach notes and interactive P.R.O. cards in ChatGPT, Claude and Gemini.'],
  ['Cost', 'Free, open source.', 'Premium required ($1.99/month, $6.99/year or $24.99 lifetime, US App Store).', '$24.99 one-time app.', 'Free. The connector is included in P.R.O. at no cost.'],
];

export const ahmClients = [
  {
    id: 'chatgpt', name: 'ChatGPT', status: 'tested', guide: '/apple-health-chatgpt',
    steps: ['On chatgpt.com: Settings → Plugins → Browse directory → Add → Add custom MCP server.', 'Name PRO, Server URL ' + MCP_URL + ', Authentication OAuth.', 'Create as a plugin → Continue to PRO, then enter the code from P.R.O. It then works in the ChatGPT iPhone app too.'],
  },
  {
    id: 'claude', name: 'Claude and Claude Desktop', icon: 'Claude', status: 'tested', guide: '/apple-health-claude',
    steps: ['In the Claude app, claude.ai or Claude Desktop, open Connectors (Customize → Connectors in Claude Help; Settings → Connectors in the iPhone app we recorded).', 'Add custom connector → name P.R.O., URL ' + MCP_URL + ' → Continue.', 'Sign in on the P.R.O. page with the code from your iPhone.'],
    note: 'Custom connectors work on every Claude plan, including Free (one connector).',
  },
  {
    id: 'codex', name: 'Codex', status: 'tested', guide: '/apple-health-codex',
    steps: ['ChatGPT desktop app: Settings → MCP servers → Add server → Streamable HTTP → URL ' + MCP_URL + ' → Save → Authenticate.', 'Or with the Codex CLI:'],
    code: 'codex mcp add pro --url ' + MCP_URL + '\ncodex mcp login pro',
  },
  {
    id: 'claude-code', name: 'Claude Code', icon: 'Claude', status: 'tested', vendor: 'Anthropic', helpUrl: 'https://code.claude.com/docs/en/mcp',
    steps: ['Add the server (add --scope user to use it in every project):'],
    code: 'claude mcp add --transport http pro ' + MCP_URL,
    after: 'Then run /mcp inside Claude Code and choose to authenticate. The browser opens the P.R.O. sign-in page; enter the code from your iPhone.',
  },
  {
    id: 'cursor', name: 'Cursor', status: 'tested', vendor: 'Cursor', helpUrl: 'https://cursor.com/docs/context/mcp',
    steps: ['Add P.R.O. to ~/.cursor/mcp.json (all projects) or .cursor/mcp.json (one project):'],
    code: '{\n  "mcpServers": {\n    "pro": { "url": "' + MCP_URL + '" }\n  }\n}',
    after: 'Cursor signs in with OAuth on its own — no client ID or API key. Complete the P.R.O. sign-in when Cursor asks.',
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
  { q: 'Do I need a Mac or a terminal?', a: 'No. You need an iPhone with P.R.O.; you add ' + MCP_URL + ' in a browser or in the assistant’s app and sign in with a code. If you work in Codex, Claude Code or Cursor on a computer, they connect to the same address.' },
  { q: 'Does it work with Claude Desktop, Cursor and Claude Code?', a: 'Yes. P.R.O. is a remote MCP server over Streamable HTTP with OAuth, and we have tested it in Claude, Claude Code and Cursor. In Claude Desktop you add it as a custom connector, the same way as in the Claude app.' },
  { q: 'Does it work outside the US?', a: 'Yes. The P.R.O. connector is not limited to the US. Your assistant’s own rules still apply: Gemini offers custom apps only in the US, while ChatGPT, Claude, Codex, Grok and Perplexity can add the connector in other countries if your plan allows custom connectors.' },
  { q: 'Is it free?', a: 'Yes. The P.R.O. connector is free, and P.R.O. is free to download. Your assistant’s plan must allow custom MCP connections — Claude’s Free plan, for example, allows one custom connector.' },
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
