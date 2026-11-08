// "Best Apple Health MCP servers" page — comparison, picks, FAQ and sources.
// Every competitor fact comes from that product's own site or App Store listing, checked
// on November 8, 2026 and linked in bestMcpSources. Write "Not mentioned" when a vendor says
// nothing; never use one competitor's description of another. Re-check prices every quarter.
// P.R.O. facts mirror appleHealthMcp.js, mcpTools.js and assistantGuides.js.
import { MCP_URL } from './mcpGuides.js';

export const BEST_MCP_CHECKED = 'November 8, 2026';

// P.R.O. goes first so it is visible before the table scrolls.
export const bestMcpColumns = ['P.R.O.', 'telo', 'Somvia', 'Marrow', 'Health Auto Export', 'athletedata'];
export const bestMcpColumnNotes = [
  MCP_URL.replace('https://', ''),
  'telo.health/mcp',
  'somvia.app/mcp',
  'connect.marrowhealthapp.com/mcp',
  'Server on your iPhone',
  'mcp.athletedata.health/mcp',
];

export const bestMcpRows = [
  ['Type', 'Hosted.', 'Hosted.', 'Hosted.', 'Hosted Cloud MCP, plus free local and self-run options.', 'Runs on your iPhone, on your local network.', 'Hosted.'],
  ['Cost of MCP access', 'Free. No paid plan, trial or card for the connector.', 'Free for your last 7 days. Pro, $49 a year, opens your whole history.', 'Needs Somvia Pro: $4.99 a month, $29.99 a year or a lifetime purchase.', 'Cloud MCP needs Marrow Pro: $4.99 a month, $34.99 a year or $59.99 once, with a 7-day trial.', 'Needs Premium: $1.99 a month, $6.99 a year or $24.99 lifetime, with a 7-day trial.', '€9 a month or €69 a year after a 7-day trial.'],
  ['Computer needed', 'No.', 'No.', 'No.', 'No, for Cloud MCP.', 'Yes. Clients run on a Mac or another device on the same network as the phone.', 'No.'],
  ['Sign-in', 'OAuth 2.1 with a one-time code from P.R.O.', 'OAuth.', 'Sign in with Apple, or a Somvia access token.', 'OAuth with a six-character code.', 'Bearer token.', 'OAuth or a keyed URL.'],
  ['Assistants the vendor lists', 'ChatGPT, Claude, Claude Code, Codex, Cursor, Grok, Perplexity and Gemini, all tested by us. Manus connection confirmed.', 'Claude, ChatGPT, Gemini, Grok, Le Chat, Cursor, Claude Code and Codex.', 'Claude, ChatGPT and Codex with sign-in; Grok and others with a token.', 'Claude, ChatGPT, Gemini, Grok, Perplexity, Le Chat, Claude Code, Codex and Cursor.', 'Claude Code, Codex, Cursor and VS Code.', 'Claude, ChatGPT, Codex, Cursor, Lovable and Perplexity.'],
  ['Where the data comes from', 'Apple Health, so anything that writes there: Apple Watch, Garmin, WHOOP, Oura and more.', 'Apple Health.', 'Apple Health.', 'Apple Health, plus Hevy and Intervals.icu directly.', 'Apple Health.', '39 apps, including Garmin, WHOOP and Oura through their own APIs.'],
  ['Interactive cards in the chat', 'Yes, in ChatGPT, Claude and Gemini: workouts, sleep and training plans.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.'],
];

export const bestMcpPicks = [
  { name: 'P.R.O.', text: 'if you want the whole connector for free with nothing to run. Add one address, confirm with a code, and ask from your phone, the web or desktop tools. You also get interactive cards in ChatGPT, Claude and Gemini, your training plan in the conversation and per-category data switches.', to: '/apple-health-mcp' },
  { name: 'telo', text: 'if your questions are about the past week, which its free tier covers, or you’re happy to pay $49 a year for full history.' },
  { name: 'Marrow', text: 'if you’d like to run the server yourself: its free Server MCP works around the clock on a small server of your own.' },
  { name: 'Somvia', text: 'if training-load scores are what you’re after and you already use Sign in with Apple everywhere.' },
  { name: 'Health Auto Export', text: 'if you work from a Mac and want clients to reach the phone directly over your own network, while the app stays open.' },
  { name: 'athletedata', text: 'if you’d rather pull from dozens of fitness apps through their own APIs than from Apple Health.' },
];

export const bestMcpFaq = [
  { q: 'What is the best Apple Health MCP server?', a: 'It depends on what you want to pay and run. For a free hosted server with nothing to install, P.R.O. at ' + MCP_URL + ' gives every connector tool at no cost and works in ChatGPT, Claude, Gemini, Grok, Perplexity, Cursor and Codex. We make P.R.O., so the table on this page links each competitor fact to that vendor’s own site.' },
  { q: 'Is there a free Apple Health MCP server?', a: 'Yes. The P.R.O. connector is free with no paid plan or trial. telo has a free tier limited to your last 7 days, and Marrow offers free Local and Server options that you run on your own network or server. Open-source servers that read an Apple Health export file are free too.' },
  { q: 'Do I need a Mac to use an Apple Health MCP server?', a: 'Not with a hosted server such as P.R.O., telo, Somvia, Marrow Cloud or athletedata: you add an address in your assistant. Health Auto Export serves data from the iPhone on your local network, so its clients run on a Mac or another device on that network.' },
  { q: 'Which Apple Health MCP server works with ChatGPT and Claude on iPhone?', a: 'A hosted one, because the assistant connects over the internet and there is no local server to reach. We tested P.R.O. in ChatGPT, Claude and Grok on iPhone, and the same connection works on the web and on desktop.' },
  { q: 'Does an Apple Health MCP server work with Garmin, WHOOP or Oura?', a: 'Yes, for whatever those devices write to Apple Health. P.R.O. reads Apple Health, so the device doesn’t matter. athletedata takes a different route and connects to Garmin, WHOOP and Oura through their own APIs.' },
  { q: 'Are these prices up to date?', a: 'We checked them on ' + BEST_MCP_CHECKED + ' on each vendor’s site or App Store listing. Vendors change prices and run promotions, so confirm on their page before you buy. Somvia, for example, was running a limited-time lifetime offer on that date.' },
];

export const bestMcpSources = [
  ['telo — home page and pricing', 'https://telo.health/'],
  ['telo — Apple Health MCP servers guide', 'https://telo.health/guides/apple-health-mcp-servers'],
  ['Somvia — home page', 'https://somvia.app/'],
  ['Somvia — Apple Health MCP', 'https://somvia.app/apple-health-mcp'],
  ['Somvia — App Store listing and prices', 'https://apps.apple.com/us/app/somvia-training-load-mcp/id6786936154'],
  ['Marrow — connect and pricing', 'https://marrowhealthapp.com/connect'],
  ['Marrow — home page', 'https://marrowhealthapp.com/'],
  ['Marrow — App Store listing', 'https://apps.apple.com/us/app/marrow-health-export-ai/id6800819435'],
  ['Health Auto Export — server connection', 'https://help.healthyapps.dev/en/health-auto-export/automations/server-connection/'],
  ['Health Auto Export — MCP server post', 'https://www.healthyapps.dev/blog/apple-health-mcp-server-ai-tools/'],
  ['Health Auto Export — App Store listing and prices', 'https://apps.apple.com/us/app/health-auto-export-json-csv/id1115567069'],
  ['athletedata — Apple Health MCP server guide', 'https://www.athletedata.health/guides/apple-health-mcp-server'],
  ['athletedata — pricing', 'https://www.athletedata.health/pricing'],
  ['athletedata — best fitness MCP servers', 'https://www.athletedata.health/guides/best-fitness-mcp-servers'],
];
