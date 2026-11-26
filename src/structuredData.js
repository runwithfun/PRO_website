import { faq } from './content/faq.js';
import { mcpFaq } from './content/mcpFaq.js';
import { connectionSteps } from './content/mcpGuides.js';
import { assistantGuides } from './content/assistantGuides.js';
import { supportFaq } from './content/support.js';
import { compareFaq } from './content/compare.js';
import { hrvFaq } from './content/hrv.js';
import { zone2Faq } from './content/zone2.js';
import { readinessFaq } from './content/readiness.js';
import { outsideUsFaq } from './content/outsideUs.js';
import { ahmFaq } from './content/appleHealthMcp.js';
import { bestMcpFaq } from './content/bestMcpServers.js';
import { mcpDemo } from './content/mcpDemo.js';
import { deviceGuides } from './content/deviceGuides.js';
import { deviceChats, chatSteps, guideOf } from './content/deviceChatgpt.js';
import { HUB_PATH, hubFaq } from './content/appleHealthSync.js';
import { whoopAlternativeFaq, runnaAlternativeFaq, athlyticAlternativeFaq, alternatives } from './content/alternatives.js';
import { changelog } from './content/changelog.js';
import { analyzeFaq } from './content/analyzeAppleHealth.js';
import { CHATGPT_PLUGIN } from './content/deviceChatgpt.js';
import { PUBLISHED, DEVICE_GUIDES_PUBLISHED, isoDate } from './content/pageDates.js';
import { CHECKED as AG_CHECKED } from './content/assistantGuides.js';
import { CHECKED as OUTSIDE_CHECKED } from './content/outsideUs.js';
import { AHM_CHECKED } from './content/appleHealthMcp.js';
import { REVIEWED as HRV_REVIEWED } from './content/hrv.js';
import { REVIEWED as ZONE2_REVIEWED } from './content/zone2.js';
import { REVIEWED as READINESS_REVIEWED } from './content/readiness.js';
import { CHECKED as ALT_CHECKED } from './content/alternatives.js';
const SITE = 'https://proapp.uk';
const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
// Official P.R.O. listings elsewhere, so search engines tie them to this site.
const SAME_AS = [APP_STORE, CHATGPT_PLUGIN, 'https://github.com/runwithfun/pro-mcp', 'https://cursor.directory/plugins/pro-apple-health'];

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
      sameAs: SAME_AS,
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
      alternateName: ['P.R.O. AI Coach for Apple Health', 'P.R.O. app', 'P.R.O. Apple Health MCP'],
      sameAs: SAME_AS,
      description:
        'iOS sport statistics app with an AI coach: syncs with Apple Health and any device that writes to it, builds widget dashboards, analyses training history across 50+ sports and answers training questions with your real data. Connects to ChatGPT and Claude via MCP.',
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
  const ag = route.assistant && assistantGuides.find((g) => g.id === route.assistant);
  if (ag) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: ag.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
    graph.push({
      '@type': 'HowTo', '@id': `${SITE}${route.path}#howto`,
      name: `How to connect Apple Health to ${ag.name}`,
      description: ag.answer.join(' '),
      totalTime: 'PT2M',
      tool: [{ '@type': 'HowToTool', name: 'P.R.O. app for iPhone' }, { '@type': 'HowToTool', name: ag.name }],
      step: ag.guide.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text ?? s.title })),
    });
  }
  const dg = route.device && deviceGuides.find((g) => g.id === route.device);
  if (dg) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: dg.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
    graph.push({
      '@type': 'HowTo', '@id': `${SITE}${route.path}#howto`,
      name: `How to sync ${dg.name} with Apple Health`,
      description: dg.answer.join(' '),
      tool: [...(dg.app ? [{ '@type': 'HowToTool', name: `${dg.app} app for iPhone` }] : []), { '@type': 'HowToTool', name: 'Health app on iPhone' }],
      step: dg.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text, url: `${SITE}${route.path}#step-${i + 1}` })),
    });
  }
  const dc = route.deviceChat && deviceChats.find((c) => c.id === route.deviceChat);
  const dcGuide = dc && guideOf(dc);
  if (dc) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: dc.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
    graph.push({
      '@type': 'HowTo', '@id': `${SITE}${route.path}#howto`,
      name: `How to connect ${dcGuide.name} to ChatGPT`,
      description: dc.answer[0],
      tool: [{ '@type': 'HowToTool', name: `${dcGuide.app || dcGuide.name} app for iPhone` }, { '@type': 'HowToTool', name: 'P.R.O. app for iPhone' }, { '@type': 'HowToTool', name: 'ChatGPT' }],
      step: chatSteps(dc).map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text, url: `${SITE}${route.path}#step-${i + 1}` })),
    });
  }
  if (route.path === HUB_PATH) {
    graph.push({
      '@type': 'ItemList', '@id': `${SITE}${HUB_PATH}#devices`,
      name: 'How to sync fitness trackers with Apple Health',
      numberOfItems: deviceGuides.length,
      itemListElement: deviceGuides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: `How to sync ${g.name} with Apple Health`, url: `${SITE}${g.path}` })),
    });
  }
  const alt = alternatives.find((a) => a.path === route.path);
  if (alt?.list) {
    graph.push({
      '@type': 'ItemList', '@id': `${SITE}${route.path}#apps`, name: alt.list.title,
      numberOfItems: alt.list.rows.length,
      itemListElement: alt.list.rows.map(([name, , , , , url], i) => ({ '@type': 'ListItem', position: i + 1, name, url })),
    });
  }
  if (route.faq) {
    const items = { appleHealthSync: hubFaq, mcp: mcpFaq, support: supportFaq, compare: compareFaq, hrv: hrvFaq, zone2: zone2Faq, readiness: readinessFaq, outsideUs: outsideUsFaq, appleHealthMcp: ahmFaq, bestMcp: bestMcpFaq, whoopAlternative: whoopAlternativeFaq, runnaAlternative: runnaAlternativeFaq, athlyticAlternative: athlyticAlternativeFaq, analyze: analyzeFaq }[route.faq] ?? faq;
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
      itemListElement: dg || route.path === HUB_PATH
        ? [
            { '@type': 'ListItem', position: 1, name: 'P.R.O.', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Apple Health sync', item: `${SITE}${HUB_PATH}` },
            ...(dg ? [{ '@type': 'ListItem', position: 3, name: dg.name, item: `${SITE}${route.path}` }] : []),
          ]
        : dc
        ? [
            { '@type': 'ListItem', position: 1, name: 'P.R.O.', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: `${dcGuide.name} and Apple Health`, item: `${SITE}${dcGuide.path}` },
            { '@type': 'ListItem', position: 3, name: `${dcGuide.name} to ChatGPT`, item: `${SITE}${route.path}` },
          ]
        : ag
        ? [
            { '@type': 'ListItem', position: 1, name: 'P.R.O.', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Connect AI assistants', item: `${SITE}/mcp-connect` },
            { '@type': 'ListItem', position: 3, name: ag.name, item: `${SITE}${route.path}` },
          ]
        : [
            { '@type': 'ListItem', position: 1, name: 'P.R.O.', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: route.title.split(' — ')[0], item: `${SITE}${route.path}` },
          ],
    });
  }
  if (route.path === '/mcp-connect') {
    graph.push({
      '@type': 'VideoObject', '@id': `${SITE}/mcp-connect#demo-video`,
      name: mcpDemo.title, description: mcpDemo.description,
      thumbnailUrl: `${SITE}${mcpDemo.poster}`, contentUrl: `${SITE}${mcpDemo.video}`,
      url: `${SITE}/mcp-connect#demo`, uploadDate: mcpDemo.uploadDate,
      duration: mcpDemo.duration, inLanguage: 'en',
      isPartOf: { '@id': `${SITE}/mcp-connect#webpage` },
      about: { '@id': `${SITE}/#app` }, publisher: { '@id': `${SITE}/#org` },
    });
    graph.push({
      '@type': 'HowTo', '@id': `${SITE}/mcp-connect#howto`,
      name: 'How to connect P.R.O. to your AI assistant',
      description: 'Copy the MCP address and add a custom connector. Install P.R.O. on iPhone, sign in and get a code in Settings → MCP Connect → Get connection code. Paste the code to connect, choose access and start a conversation.',
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
    datePublished: PUBLISHED[route.path] ?? (dg ? DEVICE_GUIDES_PUBLISHED : undefined),
    // dateModified equals the "Checked" date shown on the page.
    ...(ag?.builtIn && { dateModified: isoDate(ag.builtIn.checked || AG_CHECKED) }),
    ...(ag && !ag.builtIn && ag.checked && { dateModified: isoDate(ag.checked) }),
    ...(route.path === '/apple-health-ai-outside-us' && { dateModified: isoDate(OUTSIDE_CHECKED) }),
    ...(route.path === '/apple-health-mcp' && { dateModified: isoDate(AHM_CHECKED) }),
    ...(route.path === '/what-is-a-good-hrv' && { dateModified: isoDate(HRV_REVIEWED) }),
    ...(route.path === '/zone-2-calculator' && { dateModified: isoDate(ZONE2_REVIEWED) }),
    ...(route.path === '/apple-watch-readiness-score' && { dateModified: isoDate(READINESS_REVIEWED) }),
    ...(alternatives.some((a) => a.path === route.path) && { dateModified: isoDate(ALT_CHECKED) }),
    ...(route.path === '/what-is-a-good-hrv' && { author: { '@id': `${SITE}/#org` } }),
    ...(route.path === '/mcp-connect' && { about: { '@id': `${SITE}/#app` }, mainEntity: { '@id': `${SITE}/mcp-connect#howto` }, hasPart: { '@id': `${SITE}/mcp-connect#demo-video` } }),
    ...(ag && { about: { '@id': `${SITE}/#app` }, mainEntity: { '@id': `${SITE}${route.path}#howto` } }),
    ...(dg && { mainEntity: { '@id': `${SITE}${route.path}#howto` }, dateModified: dg.checked }),
    ...(dc && { about: { '@id': `${SITE}/#app` }, mainEntity: { '@id': `${SITE}${route.path}#howto` } }),
    ...(route.path === HUB_PATH && { mainEntity: { '@id': `${SITE}${HUB_PATH}#devices` } }),
    ...(route.dateModified && { dateModified: route.dateModified }),
    ...(route.path === '/changelog' && { about: { '@id': `${SITE}/#app` }, dateModified: [changelog[0].date, PUBLISHED['/changelog']].sort().at(-1) }),
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
