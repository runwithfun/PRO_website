import { assistantGuides } from './content/assistantGuides.js';
import { deviceGuides } from './content/deviceGuides.js';
import { HUB_PATH, hubTitle, hubDescription, guideDescription } from './content/appleHealthSync.js';
// Title и description каждой страницы. Используют и пререндер
// (scripts/prerender.mjs, через src/entry-server.jsx), и браузер — чтобы
// заголовок вкладки менялся при переходах внутри сайта.
// sources — исходники страницы для lastmod в sitemap (по умолчанию весь src).
export const ROUTES = [
  {
    path: '/',
    file: 'index.html',
    title: 'P.R.O. — AI Coach & Training Stats for Apple Watch',
    description:
      'P.R.O. turns Apple Health and Apple Watch data into widget dashboards, training history analytics and an AI coach that answers with your real numbers. Free on the App Store.',
  },
  {
    path: '/features',
    file: 'features.html',
    title: 'Features — P.R.O. AI Coach for Apple Health',
    description:
      '65+ features: widget dashboards, training history across 50+ sports, heart-rate zones, personal records, adaptive training plans and an AI coach grounded in your Apple Health data.',
  },
  {
    path: '/faq',
    file: 'faq.html',
    title: 'FAQ — P.R.O. AI Coach for Apple Health',
    description:
      'Answers about P.R.O.: how the AI coach uses your Apple Health data, supported devices, privacy, availability and support — plus free coaching tips.',
    faq: true,
    sources: ['src/pages/FAQ.jsx', 'src/content/faq.js', 'src/components/TuyoFaq.jsx', 'src/components/FaqCoachTips.jsx', 'src/components/FaqLockerRoom.jsx'],
  },
  {
    path: '/about',
    file: 'about.html',
    title: 'About P.R.O. — Training History Is Everything',
    description:
      'Why we build P.R.O.: tools for athletes who want every session counted, every trend visible and every decision backed by real data — not guesswork.',
  },
  {
    path: '/privacy',
    file: 'privacy.html',
    title: 'Privacy Policy — P.R.O.',
    description:
      'How P.R.O. handles your data: Apple Health access, the AI coach, the MCP connector for AI assistants, what is stored and shared, and your rights.',
    sources: ['src/pages/PrivacyPolicy.jsx', 'src/components/LegalPage.jsx', 'src/content/privacyPolicy.js'],
  },
  {
    path: '/terms',
    file: 'terms.html',
    title: 'Terms of Service — P.R.O.',
    description:
      'Terms for using the P.R.O. app, its AI coach and the MCP connector for AI assistants: subscriptions via the App Store, acceptable use, AI disclaimers and account deletion.',
    sources: ['src/pages/Terms.jsx', 'src/components/LegalPage.jsx', 'src/content/terms.js'],
  },
  {
    path: '/support',
    file: 'support.html',
    title: 'Support — P.R.O.',
    description:
      'Contact P.R.O. support at mail@proapp.uk, and fix common issues: connecting AI assistants, revoking access, missing data, account deletion and subscriptions.',
    faq: 'support',
    sources: ['src/pages/Support.jsx', 'src/content/support.js'],
  },
  {
    path: '/mcp-connect',
    file: 'mcp-connect.html',
    title: 'Connect Apple Health to Your AI Assistant via MCP — P.R.O.',
    description:
      'Connect P.R.O. to ChatGPT, Claude, Gemini, Perplexity, Codex or Grok. A clear setup guide for sharing Apple Health workouts, sleep and heart rate with your permission.',
    faq: 'mcp',
    image: '/mcp-guide/social.jpg',
    imageHeight: 630,
    imageAlt: 'P.R.O. connects Apple Health to ChatGPT, Claude, Gemini, Perplexity, Codex and Grok',
    sources: ['src/pages/AppleHealthMcp.jsx', 'src/pages/mcp-connect.css', 'src/components/mcp', 'scripts/generate-mcp-social.mjs', 'src/content/mcpGuides.js', 'src/content/mcpFaq.js', 'src/content/mcpTools.js', 'src/content/mcpDemo.js', 'public/demo', 'public/mcp-guide'],
  },
  ...assistantGuides.map((g) => ({
    path: g.path,
    file: `${g.path.slice(1)}.html`,
    title: g.title,
    description: g.description,
    assistant: g.id,
    sources: ['src/pages/AssistantGuide.jsx', 'src/pages/assistant-guide.css', 'src/content/assistantGuides.js', 'src/content/mcpGuides.js', `media/mcp/${g.id}`],
  })),
  {
    path: HUB_PATH,
    file: `${HUB_PATH.slice(1)}.html`,
    title: hubTitle,
    description: hubDescription,
    faq: 'appleHealthSync',
    sources: ['src/pages/AppleHealthSync.jsx', 'src/pages/device-guide.css', 'src/components/DeviceSync.jsx', 'src/content/appleHealthSync.js', 'src/content/deviceGuides.js'],
  },
  ...deviceGuides.map((g) => ({
    path: g.path,
    file: `${g.path.slice(1)}.html`,
    title: `How to Sync ${g.name} with Apple Health (${g.checked.slice(0, 4)}) — P.R.O.`,
    description: guideDescription(g),
    device: g.id,
    sources: ['src/pages/DeviceGuide.jsx', 'src/pages/device-guide.css', 'src/components/DeviceSync.jsx', 'src/content/appleHealthSync.js', 'src/content/deviceGuides.js'],
  })),
  {
    path: '/what-is-a-good-hrv',
    file: 'what-is-a-good-hrv.html',
    title: 'What Is a Good HRV on Apple Watch? HRV by Age Chart — P.R.O.',
    description:
      'What counts as a good HRV on Apple Watch: SDNN vs RMSSD, Recovery HRV, normal HRV by age and sex from ECG studies, and a free checker to compare your number with your age and your own baseline.',
    faq: 'hrv',
    sources: ['src/pages/GoodHrv.jsx', 'src/content/hrv.js', 'src/pages/tools.css'],
  },
  {
    path: '/zone-2-calculator',
    file: 'zone-2-calculator.html',
    title: 'Zone 2 Heart Rate Calculator — Apple Watch, Karvonen, MAF | P.R.O.',
    description:
      'Free Zone 2 heart rate calculator: compare 60–70% of max HR, Tanaka, Gulati for women, heart rate reserve (Karvonen) and MAF side by side, see Zone 2 by age, and set your zones on Apple Watch.',
    faq: 'zone2',
    sources: ['src/pages/Zone2Calculator.jsx', 'src/content/zone2.js', 'src/pages/tools.css'],
  },
  {
    path: '/apple-health-ai-outside-us',
    file: 'apple-health-ai-outside-us.html',
    title: 'ChatGPT Health & Claude Apple Health Outside the US: UK, EU, Canada — P.R.O.',
    description:
      'ChatGPT Health, Claude’s Apple Health beta, Perplexity Health and Copilot Health are US only as of October 2026. How to connect Apple Health to ChatGPT, Claude, Perplexity, Grok or Codex from the UK, EU, Canada, Australia or India.',
    faq: 'outsideUs',
    sources: ['src/pages/OutsideUs.jsx', 'src/content/outsideUs.js', 'src/pages/tools.css', 'src/pages/assistant-guide.css'],
  },
  {
    path: '/apple-health-mcp',
    file: 'apple-health-mcp.html',
    title: 'Apple Health MCP Server — Hosted HealthKit MCP for Claude, ChatGPT, Cursor & Codex | P.R.O.',
    description:
      'A hosted Apple Health MCP server at https://mcp.proapp.uk: the free P.R.O. iPhone app syncs HealthKit, you sign in with OAuth — no export.xml, Mac or terminal. Setup for Claude Desktop, ChatGPT, Cursor, Codex and Claude Code.',
    faq: 'appleHealthMcp',
    sources: ['src/pages/AppleHealthMcpServer.jsx', 'src/pages/apple-health-mcp.css', 'src/content/appleHealthMcp.js', 'src/content/mcpTools.js'],
  },
  {
    path: '/compare',
    file: 'compare.html',
    title: 'P.R.O. vs Athlytic, Bevel, WHOOP Coach & Runna — AI Coach Apps Compared',
    description:
      'Honest comparison of AI coach apps for Apple Watch: P.R.O., Athlytic, Bevel, WHOOP Coach, Gentler Streak, Google Health Coach, Runna, Apple Readiness and ChatGPT Health — price, hardware, AI chat, plans, recovery, ChatGPT/Claude support.',
    faq: 'compare',
    sources: ['src/pages/Compare.jsx', 'src/content/compare.js'],
  },
];

export const REDIRECTS = [{ from: '/apple-health-chatgpt-claude', to: '/mcp-connect' }];
