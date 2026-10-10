import { faq } from './content/faq.js';
import { mcpFaq } from './content/mcpFaq.js';
import { connectionSteps } from './content/mcpGuides.js';
import { supportFaq } from './content/support.js';
import { compareFaq } from './content/compare.js';
const SITE = 'https://proapp.uk';
const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export function structuredData(route, store = {}) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#org`,
      name: 'P.R.O.',
      alternateName: ['PRO app', 'P.R.O. — Performance · Records · Optimisation'],
      url: `${SITE}/`,
      logo: `${SITE}/favicon.png`,
      ...(store.seller && { legalName: store.seller }),
      sameAs: [APP_STORE],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'P.R.O.',
      inLanguage: 'en',
      publisher: { '@id': `${SITE}/#org` },
    },
    {
      '@type': 'MobileApplication',
      '@id': `${SITE}/#app`,
      name: 'P.R.O.',
      alternateName: 'P.R.O. AI Coach for Apple Health',
      description:
        'iOS sport statistics app with an AI coach: syncs with Apple Health and Apple Watch, builds widget dashboards, analyses training history across 50+ sports and answers training questions with your real data. Connects to ChatGPT and Claude via MCP.',
      applicationCategory: 'HealthApplication',
      operatingSystem: store.operatingSystem ?? 'iOS 18.5 or later',
      ...(store.softwareVersion && { softwareVersion: store.softwareVersion }),
      ...(store.datePublished && { datePublished: store.datePublished }),
      ...(store.dateModified && { dateModified: store.dateModified }),
      ...(store.screenshot?.length && { screenshot: store.screenshot }),
      url: `${SITE}/`,
      installUrl: APP_STORE,
      downloadUrl: APP_STORE,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#org` },
    },
  ];
  if (route.faq) {
    const items = { mcp: mcpFaq, support: supportFaq, compare: compareFaq }[route.faq] ?? faq;
    graph.push({
      '@type': 'FAQPage',
      mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }
  if (route.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'P.R.O.', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: route.title.split(' — ')[0], item: `${SITE}${route.path}` },
      ],
    });
  }
  if (route.path === '/mcp-connect') {
    graph.push({
      '@type': 'HowTo', '@id': `${SITE}/mcp-connect#howto`,
      name: 'How to connect P.R.O. to your AI assistant',
      description: 'Install P.R.O. on iPhone, sign in and allow Apple Health access. On a computer, get the connection code in P.R.O. on iPhone: Settings → MCP Connect → Get connection code.',
      step: connectionSteps.map((step, i) => ({
        '@type': 'HowToStep', position: i + 1, name: step.title, text: step.text,
        url: `${SITE}/mcp-connect#connect-step-${i + 1}`,
      })),
    });
  }
  graph.push({
    '@type': 'WebPage', '@id': `${SITE}${route.path}#webpage`, url: `${SITE}${route.path}`,
    name: route.title, description: route.description, inLanguage: 'en',
    isPartOf: { '@id': `${SITE}/#website` },
    ...(route.path === '/mcp-connect' && { about: { '@id': `${SITE}/#app` }, mainEntity: { '@id': `${SITE}/mcp-connect#howto` } }),
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
