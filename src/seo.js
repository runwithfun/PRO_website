import { assistantGuides } from './content/assistantGuides.js';
import { deviceGuides } from './content/deviceGuides.js';
import { HUB_PATH, hubTitle, hubDescription, guideDescription, deviceTitle } from './content/appleHealthSync.js';
import { alternatives } from './content/alternatives.js';
// Title и description каждой страницы. Используют и пререндер
// (scripts/prerender.mjs, через src/entry-server.jsx), и браузер — чтобы
// заголовок вкладки менялся при переходах внутри сайта.
// sources — исходники страницы для lastmod в sitemap (по умолчанию весь src).
export const ROUTES = [
  {
    path: '/',
    file: 'index.html',
    title: 'P.R.O. — AI Coach & Training Stats for Apple Health',
    description:
      'P.R.O. turns Apple Health data from Apple Watch, Garmin, WHOOP or any device into dashboards, training analytics and an AI coach. Free on the App Store.',
  },
  {
    path: '/features',
    file: 'features.html',
    title: 'Features — P.R.O. AI Coach for Apple Health',
    description:
      '65+ features: a free MCP connector for ChatGPT and Claude, widget dashboards, 50+ sports, training plans and an AI coach built on your Apple Health data.',
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
      'Terms for the P.R.O. app, its AI coach and the MCP connector: App Store subscriptions, acceptable use, AI disclaimers and account deletion.',
    sources: ['src/pages/Terms.jsx', 'src/components/LegalPage.jsx', 'src/content/terms.js'],
  },
  {
    path: '/support',
    file: 'support.html',
    title: 'Support — P.R.O.',
    description:
      'Contact P.R.O. support at mail@proapp.uk and fix common issues: connecting AI assistants, revoking access, missing data, account deletion, subscriptions.',
    faq: 'support',
    sources: ['src/pages/Support.jsx', 'src/content/support.js'],
  },
  {
    path: '/mcp-connect',
    file: 'mcp-connect.html',
    title: 'Connect Apple Health to Your AI Assistant via MCP — P.R.O.',
    description:
      'Connect Apple Health to ChatGPT, Claude, Gemini, Perplexity, Codex, Grok or Manus with the free P.R.O. MCP connector. Five steps, about two minutes.',
    faq: 'mcp',
    image: '/mcp-guide/social.jpg',
    imageHeight: 630,
    imageAlt: 'P.R.O. connects Apple Health to ChatGPT, Claude, Gemini, Perplexity, Codex, Grok and Manus',
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
    title: deviceTitle(g),
    description: guideDescription(g),
    device: g.id,
    sources: ['src/pages/DeviceGuide.jsx', 'src/pages/device-guide.css', 'src/components/DeviceSync.jsx', 'src/content/appleHealthSync.js', 'src/content/deviceGuides.js'],
  })),
  {
    path: '/what-is-a-good-hrv',
    file: 'what-is-a-good-hrv.html',
    title: 'What Is a Good HRV on Apple Watch? HRV by Age Chart — P.R.O.',
    description:
      'What counts as a good HRV on Apple Watch: SDNN vs RMSSD, normal HRV by age and sex from ECG studies, and a free checker for your age and baseline.',
    faq: 'hrv',
    sources: ['src/pages/GoodHrv.jsx', 'src/content/hrv.js', 'src/pages/tools.css'],
  },
  {
    path: '/zone-2-calculator',
    file: 'zone-2-calculator.html',
    title: 'Zone 2 Heart Rate Calculator: Karvonen, MAF — P.R.O.',
    description:
      'Free Zone 2 calculator: compare 60–70% of max HR, Tanaka, Gulati, Karvonen and MAF side by side, see Zone 2 by age and set your zones on Apple Watch.',
    faq: 'zone2',
    sources: ['src/pages/Zone2Calculator.jsx', 'src/content/zone2.js', 'src/pages/tools.css'],
  },
  {
    path: '/apple-watch-readiness-score',
    file: 'apple-watch-readiness-score.html',
    title: 'Apple Watch Readiness Score on Older Watches — P.R.O.',
    description:
      'Apple’s Readiness is only on Series 12 and Ultra 4. Get a free readiness read on older watches in ChatGPT or Claude via MCP, or in the app with Pro.',
    faq: 'readiness',
    sources: ['src/pages/AppleWatchReadiness.jsx', 'src/content/readiness.js', 'src/pages/tools.css'],
  },
  {
    path: '/apple-health-ai-outside-us',
    file: 'apple-health-ai-outside-us.html',
    title: 'ChatGPT Health in Europe? Connect Apple Health Anyway',
    description:
      'ChatGPT Health and Claude’s Apple Health are US only. Connect Apple Health from the UK, EU, Canada or India with the free P.R.O. MCP connector.',
    faq: 'outsideUs',
    sources: ['src/pages/OutsideUs.jsx', 'src/content/outsideUs.js', 'src/pages/tools.css', 'src/pages/assistant-guide.css'],
  },
  {
    path: '/apple-health-mcp',
    file: 'apple-health-mcp.html',
    title: 'Apple Health MCP Server, Hosted and Free. No Export Needed',
    description:
      'Add https://mcp.proapp.uk to ChatGPT, Claude, Claude Code, Codex, Cursor, Grok, Perplexity or Gemini. OAuth sign-in, no export.xml. Free with P.R.O.',
    faq: 'appleHealthMcp',
    sources: ['src/pages/AppleHealthMcpServer.jsx', 'src/pages/apple-health-mcp.css', 'src/content/appleHealthMcp.js', 'src/content/mcpTools.js'],
  },
  ...alternatives.map((a) => ({
    path: a.path,
    file: `${a.path.slice(1)}.html`,
    title: a.title,
    description: a.description,
    faq: a.faqKey,
    sources: ['src/pages/Alternative.jsx', 'src/pages/alternatives.css', 'src/content/alternatives.js'],
  })),
  {
    path: '/compare',
    file: 'compare.html',
    title: 'P.R.O. vs Athlytic, Bevel, WHOOP & Runna: AI Coach Apps',
    description:
      'Compare AI coach apps on MCP, price, hardware, plans and recovery: P.R.O. vs Athlytic, Bevel, WHOOP, Gentler Streak, Runna and ChatGPT Health.',
    faq: 'compare',
    sources: ['src/pages/Compare.jsx', 'src/content/compare.js'],
  },
];

export const REDIRECTS = [{ from: '/apple-health-chatgpt-claude', to: '/mcp-connect' }];
