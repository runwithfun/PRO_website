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
      'Connect P.R.O. to ChatGPT, Claude, Codex or Grok. A clear setup guide for sharing Apple Health workouts, sleep and heart rate with your permission.',
    faq: 'mcp',
    image: '/mcp-guide/social.jpg',
    imageHeight: 630,
    imageAlt: 'P.R.O. connects Apple Health to ChatGPT, Claude, Codex and Grok',
    sources: ['src/pages/AppleHealthMcp.jsx', 'src/pages/mcp-connect.css', 'src/components/mcp', 'scripts/generate-mcp-social.mjs', 'src/content/mcpGuides.js', 'src/content/mcpFaq.js', 'src/content/mcpTools.js', 'public/mcp-guide'],
  },
  {
    path: '/compare',
    file: 'compare.html',
    title: 'P.R.O. vs Athlytic, Bevel, WHOOP Coach & Runna — AI Coach Apps Compared',
    description:
      'Honest comparison of AI coach apps for Apple Watch: P.R.O., Athlytic, Bevel, WHOOP Coach, Gentler Streak, Google Health Coach and Runna — price, hardware, AI chat, training plans, recovery scores, ChatGPT/Claude support.',
    faq: 'compare',
    sources: ['src/pages/Compare.jsx', 'src/content/compare.js'],
  },
];

export const REDIRECTS = [{ from: '/apple-health-chatgpt-claude', to: '/mcp-connect' }];
