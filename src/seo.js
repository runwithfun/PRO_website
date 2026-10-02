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
    sources: ['src/pages/FAQ.jsx', 'src/components/TuyoFaq.jsx', 'src/components/FaqCoachTips.jsx', 'src/components/FaqLockerRoom.jsx'],
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
      'How P.R.O. handles your data: Apple Health access, on-device processing, what is stored, and your rights.',
    sources: ['src/pages/PrivacyPolicy.jsx', 'src/content/privacyPolicy.js'],
  },
  {
    path: '/apple-health-chatgpt-claude',
    file: 'apple-health-chatgpt-claude.html',
    title: 'Connect Apple Health to ChatGPT & Claude (MCP) — P.R.O.',
    description:
      'Step-by-step: give ChatGPT, Claude and other AI assistants access to your Apple Health and Apple Watch workouts, sleep and heart rate with the free P.R.O. app and its MCP connector.',
    faq: 'mcp',
    sources: ['src/pages/AppleHealthMcp.jsx'],
  },
];
