// "Best Apple Health MCP servers" page — comparison, picks, FAQ and sources.
// Every competitor fact comes from that product's own site, GitHub or App Store listing,
// re-checked on November 26, 2026 and linked per vendor in bestMcpVendors. Write
// "Not mentioned" when a vendor says nothing; never use one competitor's description of
// another, and drop a fact that can't be confirmed. Re-check prices every quarter.
// P.R.O. facts mirror appleHealthMcp.js, mcpTools.js and the live tools/list (19 tools).
import { MCP_URL } from './mcpGuides.js';

export const BEST_MCP_CHECKED = 'November 26, 2026';
export const BEST_MCP_CHECKED_ISO = '2026-11-26';

// One entry per column. P.R.O. goes first so it is visible before the table scrolls.
// sources: the vendor's own pages behind its column, shown in the "Checked" row.
export const bestMcpVendors = [
  { name: 'P.R.O.', note: MCP_URL.replace('https://', ''), checked: BEST_MCP_CHECKED_ISO, sources: [['Our server page', '/apple-health-mcp']] },
  { name: 'telo', note: 'telo.health/mcp', checked: BEST_MCP_CHECKED_ISO, sources: [['Pricing', 'https://telo.health/'], ['MCP page', 'https://telo.health/apple-health-mcp'], ['App Store', 'https://apps.apple.com/us/app/telo-ai-health-context/id6814259086']] },
  { name: 'Wellness Project', note: 'wellnessproject.ai/api/mcp', checked: BEST_MCP_CHECKED_ISO, sources: [['Pricing', 'https://wellnessproject.ai/pricing'], ['MCP page', 'https://wellnessproject.ai/integrations/apple-health-mcp'], ['GitHub', 'https://github.com/turnnoblindeye/wellness-project-mcp'], ['App Store', 'https://apps.apple.com/us/app/wellness-project-fitness-ai/id6762530108']] },
  { name: 'Marrow', note: 'connect.marrowhealthapp.com/mcp', checked: BEST_MCP_CHECKED_ISO, sources: [['Connect and pricing', 'https://marrowhealthapp.com/connect'], ['Tools', 'https://marrowhealthapp.com/mcp/tools.json'], ['App Store', 'https://apps.apple.com/us/app/marrow-health-export-ai/id6800819435']] },
  { name: 'Somvia', note: 'somvia.app/mcp', checked: BEST_MCP_CHECKED_ISO, sources: [['Home page', 'https://somvia.app/'], ['MCP page', 'https://somvia.app/apple-health-mcp'], ['App Store', 'https://apps.apple.com/us/app/somvia-training-load-mcp/id6786936154']] },
  { name: 'Health Auto Export', note: 'Server on your iPhone', checked: BEST_MCP_CHECKED_ISO, sources: [['Server help', 'https://help.healthyapps.dev/en/health-auto-export/automations/server-connection/'], ['MCP post', 'https://www.healthyapps.dev/blog/apple-health-mcp-server-ai-tools/'], ['App Store', 'https://apps.apple.com/us/app/health-auto-export-json-csv/id1115567069']] },
  { name: 'athletedata', note: 'mcp.athletedata.health/mcp', checked: BEST_MCP_CHECKED_ISO, sources: [['Pricing', 'https://www.athletedata.health/pricing'], ['MCP guide', 'https://www.athletedata.health/guides/apple-health-mcp-server']] },
];

export const bestMcpColumns = bestMcpVendors.map((v) => v.name);

export const bestMcpRows = [
  ['Hosted or local', 'Hosted. Your iPhone syncs to P.R.O. and assistants connect over the internet.', 'Hosted.', 'Hosted.', 'Both. Cloud MCP is hosted; Local MCP runs on your network and Server MCP on a server you run.', 'Hosted.', 'Local. The server runs on your iPhone, or on a Mac with Sync to Mac, and clients join over your network.', 'Hosted.'],
  ['Cost of MCP access', 'Free. All 19 tools, with no paid plan, trial or card for the connector.', 'Free for your last 7 days. Pro, $7.99 a month or $49 a year, opens your whole synced history.', 'Free for 3 analyses a day, counted across the app and the connector. Pro is $9.99 a month, or $99.99 a year on the App Store.', 'Local and Server MCP are free, up to 3 active connections. Cloud MCP needs Marrow Pro: $4.99 a month, $34.99 a year or $59.99 once. Cloud is on for the first 3 days of every new install.', 'Needs Somvia Pro: $4.99 a month, $29.99 a year or $99 lifetime on the App Store.', 'Needs Premium: $1.99 a month, $6.99 a year or $24.99 lifetime, after a 7-day trial of all Premium features.', 'MCP-only plan, €9 a month after a 7-day trial. Coaching, €33.90 a month, includes MCP too.'],
  ['Computer needed', 'No.', 'No.', 'No.', 'No, for Cloud MCP.', 'No.', 'Yes. Clients run on a computer on the same network, with the app open on screen.', 'No.'],
  ['Sign-in', 'OAuth 2.1 with a one-time code from the P.R.O. iPhone app.', 'OAuth with your telo account.', 'OAuth 2.1 with your Wellness Project account.', 'Cloud: a six-character code you approve on the phone, no account. Local and Server: a bearer token.', 'OAuth with Sign in with Apple, or an access token from the app.', 'Bearer token.', 'OAuth, or an API key in a header.'],
  ['Assistants the vendor lists', 'ChatGPT, Claude, Claude Code, Codex, Cursor, Grok, Perplexity and Gemini, all tested by us. Manus connection confirmed.', 'ChatGPT, Claude, Gemini, Grok, Le Chat, Cursor, Claude Code and Codex.', 'Claude, ChatGPT, Gemini, Grok, Perplexity, Le Chat, Claude Code and Cline. ChatGPT through developer mode, depending on plan.', 'Claude, ChatGPT, Gemini, Grok, Perplexity, Le Chat, Claude Code, Codex CLI and Cursor.', 'Claude, ChatGPT, Codex, Grok, OpenClaw, Hermes and Muse.', 'Claude Code, Codex, Cursor and VS Code; Claude Desktop through a Node.js bridge.', 'Claude, ChatGPT, Cursor, Perplexity, Gemini and Lovable.'],
  ['Where the data comes from', 'Apple Health, so anything that writes there: Apple Watch, Garmin, WHOOP, Oura and more.', 'Apple Health.', 'Apple Health or Health Connect, plus direct links to Oura, Fitbit, Withings, Polar and others.', 'Apple Health, plus Polar, Concept2 and Wahoo signed in directly.', 'Apple Health.', 'Apple Health.', '41 apps, with Garmin, WHOOP and Oura through their own APIs. Apple Health through its iPhone app.'],
  ['What the assistant can do', 'Read a daily brief, personal baselines and records, data status, daily metrics by day, week or month, workouts, training load and readiness, and your training plan. Propose plan changes you accept in the app, and save coach notes if you allow it.', 'Read your synced Apple Health. Log meals and water to Apple Health on request, pin charts to telo’s home screen and send structured workouts to Apple Watch.', '85 public tools, including logging workouts and meals.', '13 read tools, including a daily brief and baselines. 12 write tools for meals, water, workouts, strength sets and more, once you allow AI writes.', 'Read Somvia’s training-load and recovery scores and your synced data.', 'Query supported health metrics and workouts.', 'Read activities and health data from your connected apps.'],
  ['Interactive cards in the chat', 'Yes, in ChatGPT, Claude, Gemini and Cursor: workouts, sleep and training plans.', 'No. Charts you ask for appear on telo’s iPhone home screen.', 'Yes. 15 widgets in clients that support MCP Apps.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.'],
];

export const bestMcpPicks = [
  { name: 'P.R.O.', text: 'if you want the whole connector for free with nothing to run. Add one address, confirm with a code, and ask from your phone, the web or desktop tools. You get a daily brief, baselines, personal records, training load and your plan in the conversation, interactive cards in ChatGPT, Claude, Gemini and Cursor, and per-category data switches.', to: '/apple-health-mcp' },
  { name: 'telo', text: 'if your questions are about the past week, which its free tier covers, or you’re happy to pay $7.99 a month or $49 a year for full history.' },
  { name: 'Wellness Project', text: 'if you want an assistant that also logs meals and workouts, and pulls from Oura, Fitbit or Withings directly. Three analyses a day are free; Pro removes the cap.' },
  { name: 'Marrow', text: 'if you’d like to run the server yourself: Local MCP and Server MCP are free, and Cloud MCP comes with Pro.' },
  { name: 'Somvia', text: 'if training-load scores are what you’re after and you already use Sign in with Apple everywhere.' },
  { name: 'Health Auto Export', text: 'if you work from a computer and want clients to reach the phone directly over your own network, while the app stays open.' },
  { name: 'athletedata', text: 'if you’d rather pull from dozens of fitness apps through their own APIs than from Apple Health.' },
];

export const bestMcpFaq = [
  { q: 'What is the best Apple Health MCP server?', a: 'It depends on what you want to pay and run. For a free hosted server with nothing to install, P.R.O. at ' + MCP_URL + ' gives all 19 connector tools at no cost and works in ChatGPT, Claude, Gemini, Grok, Perplexity, Cursor and Codex. We make P.R.O., so the table on this page links each competitor fact to that vendor’s own pages.' },
  { q: 'Is there a free Apple Health MCP server?', a: 'Yes. The P.R.O. connector is free with no paid plan or trial. telo has a free tier limited to your last 7 days, Wellness Project allows 3 analyses a day for free, and Marrow’s Local and Server options are free if you run them on your own network or server. Open-source servers that read an Apple Health export file are free too.' },
  { q: 'What is the difference between a hosted and a local Apple Health MCP server?', a: 'A hosted server runs on the vendor’s computers, so any assistant can reach it over the internet, including ChatGPT and Claude on your phone. A local server runs on your iPhone, Mac or your own server; your data stays closer to home, but the assistant has to be on the same network, and some local servers stop when the app leaves the screen.' },
  { q: 'Do I need a Mac to use an Apple Health MCP server?', a: 'Not with a hosted server such as P.R.O., telo, Wellness Project, Somvia, Marrow Cloud or athletedata: you add an address in your assistant. Health Auto Export serves data from the iPhone on your local network, so its clients run on a computer on that network.' },
  { q: 'Which Apple Health MCP server works with ChatGPT and Claude on iPhone?', a: 'A hosted one, because the assistant connects over the internet and there is no local server to reach. We tested P.R.O. in ChatGPT, Claude and Grok on iPhone, and the same connection works on the web and on desktop.' },
  { q: 'Does an Apple Health MCP server work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. athletedata connects to Garmin, WHOOP and Oura through their own APIs, and Wellness Project links to Oura directly.' },
  { q: 'Are these prices up to date?', a: 'We checked them on ' + BEST_MCP_CHECKED + ' on each vendor’s site, GitHub or App Store listing, linked in the table. Vendors change prices and run promotions, so confirm on their page before you buy. telo, for example, was running a Black Friday offer on its first year that day.' },
];
