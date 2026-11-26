// "Analyze Apple Health data with AI" — five ways, compared.
// Built-in feature facts re-checked November 26, 2026 (see outsideUs.js sources).
// Open-source servers and apps: checked November 26, 2026 on each project's GitHub or App Store page
// (see bestMcpServers.js and alternatives.js).
import { MCP_URL } from './mcpGuides.js';

export const ANALYZE_CHECKED = 'November 26, 2026';

// [method, how it works, fresh data, outside the US, computer needed, cost, best for, link]
export const analyzeWays = [
  ['Connect your AI assistant (MCP)', 'Add an Apple Health MCP connector such as P.R.O. at ' + MCP_URL + ' to ChatGPT, Claude, Grok, Perplexity or Gemini. The assistant fetches exactly the data each question needs.', 'Yes, synced from your iPhone', 'Yes', 'No', 'P.R.O. is free', 'Ongoing questions in the assistant you already use, on your phone', '/apple-health-mcp'],
  ['Built-in health features', 'ChatGPT Health, Claude’s Apple Health beta or Perplexity Health read Apple Health from their own iPhone apps.', 'Yes', 'No, US only', 'No', 'Included in the plan (Claude needs Pro, Max or Ultra; Perplexity Pro or Max)', 'US users on a supported plan', '/apple-health-ai-outside-us'],
  ['Upload an export', 'Export all health data from the Health app, convert it to CSV if needed, and upload the file to a chat.', 'No, a snapshot of the day you exported', 'Yes', 'Easier with one', 'Free', 'A one-off look at old data', null],
  ['An iPhone app with its own AI', 'Apps such as P.R.O., Athlytic or Bevel read Apple Health and answer questions inside the app.', 'Yes', 'Yes', 'No', 'Free tiers; P.R.O. Pro from $2.99 a month', 'Daily scores and a coach in one app', '/athlytic-alternative'],
  ['A local or open-source server', 'Run an open-source Apple Health MCP server, such as neiltron or rinoshiyo, on your computer and connect Claude Desktop or a local model.', 'As fresh as your last export', 'Yes', 'Yes', 'Free (MIT licence)', 'Developers who want data on their own machine', '/best-apple-health-mcp-servers'],
];

export const analyzePrompts = [
  'Compare my sleep on training days and rest days over the last two months.',
  'Has my resting heart rate gone up this month, and what changed?',
  'Which weeks this year had my highest training load, and how did I sleep then?',
  'Show my running pace trend since the summer.',
  'Am I recovered enough for intervals today?',
  'What are my fastest 5K and 10K this year?',
];

export const analyzeFaq = [
  { q: 'Can ChatGPT analyze my Apple Health data?', a: 'Yes. In the US, ChatGPT Health reads Apple Health from the ChatGPT iPhone app. In any country, you can add the free P.R.O. MCP connector at ' + MCP_URL + ' and ChatGPT reads the categories you allow, or you can upload an export file for a one-off look.' },
  { q: 'Can Claude analyze Apple Health data?', a: 'Yes. Claude’s own Apple Health integration is a US-only beta on Pro, Max and Ultra. Custom connectors work on every plan, including Free with one connector, so you can add P.R.O. at ' + MCP_URL + ' from anywhere.' },
  { q: 'What is the easiest way to analyze Apple Health data with AI?', a: 'Connecting your assistant through MCP: add one address, confirm with a code from the P.R.O. app, and ask in plain words. There is no file to export and the data stays current.' },
  { q: 'Is it free?', a: 'The P.R.O. app and its MCP connector are free. Uploading an export and the open-source servers are free too. ChatGPT Health is included in ChatGPT plans in the US; Claude’s and Perplexity’s built-in features need paid plans.' },
  { q: 'How do I export Apple Health data?', a: 'In the Health app, tap your profile picture, then Export All Health Data. You get export.zip with an XML file inside. It can be large, so many people convert it to CSV with an app before uploading it to a chat.' },
  { q: 'Is my health data private?', a: 'With P.R.O., the assistant sees only the categories you switch on, and you can disconnect it any time in Settings → MCP Connect. P.R.O. does not sell the data, use it for advertising or train AI models on it. Once data reaches the assistant, its own privacy policy applies.' },
];
