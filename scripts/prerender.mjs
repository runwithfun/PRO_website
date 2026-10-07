// Пререндер: каждый маршрут собирается в отдельный HTML с готовой разметкой.
//
// Раньше GitHub Pages отдавал любые адреса, кроме главной, через 404.html
// (статус 404), а в самом HTML был пустой <div id="root">. Поисковики и
// ИИ-краулеры (GPTBot, ClaudeBot, PerplexityBot JS не выполняют) видели пустой
// сайт. Теперь /features отдаётся из features.html со статусом 200 и текстом
// страницы прямо в HTML; в браузере React его гидрирует.
//
// Запуск после двух сборок (см. npm run build):
//   vite build                                   → dist/ (клиент)
//   vite build --ssr src/entry-server.jsx        → dist-ssr/ (рендер на Node)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://proapp.uk';
const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';


const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const { render, faq, mcpFaq, supportFaq, compareFaq, ROUTES } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href);
// Preload основных шрифтов (латиница): DM Sans — текст, Syne — заголовки.
// Имена файлов с хэшем Vite, поэтому ищем их в dist/assets.
const fontPreloads = fs
  .readdirSync(path.join(DIST, 'assets'))
  .filter((f) => /^(dm-sans|syne)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');
// CSS встраиваем в каждую страницу: без отдельного блокирующего запроса
// первая отрисовка на мобильной сети наступает на один круг раньше.
let template = fs
  .readFileSync(path.join(DIST, 'index.html'), 'utf8')
  .replace('</head>', `  ${fontPreloads}\n  </head>`);
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (m, href) => {
  const css = fs.readFileSync(path.join(DIST, href)).toString();
  return `<style>${css}</style>`;
});
if (!template.includes('<style>')) throw new Error('prerender: не нашёл <link rel="stylesheet"> для встраивания CSS');

// Факты о приложении берём из App Store при сборке, чтобы разметка не
// расходилась со стором (версия, даты, продавец, скриншоты). Без сети —
// разметка без этих полей.
async function appStoreFacts() {
  try {
    const res = await fetch('https://itunes.apple.com/lookup?id=6749865568&country=us', {
      signal: AbortSignal.timeout(8000),
    });
    const app = (await res.json()).results?.[0];
    if (!app) return {};
    return {
      softwareVersion: app.version,
      datePublished: app.releaseDate?.slice(0, 10),
      dateModified: app.currentVersionReleaseDate?.slice(0, 10),
      operatingSystem: app.minimumOsVersion ? `iOS ${app.minimumOsVersion} or later` : undefined,
      screenshot: app.screenshotUrls?.slice(0, 4),
      seller: app.sellerName,
    };
  } catch {
    return {};
  }
}
const store = await appStoreFacts();
console.log(`App Store: версия ${store.softwareVersion ?? '—'}, продавец ${store.seller ?? '—'}`);

function jsonLd(route) {
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
  if (route.path === '/apple-health-chatgpt-claude') {
    graph.push({
      '@type': 'HowTo',
      name: 'Connect Apple Health to Claude with the P.R.O. MCP connector',
      totalTime: 'PT2M',
      tool: [{ '@type': 'HowToTool', name: 'P.R.O. app for iPhone' }],
      step: [
        'In the P.R.O. app, open Settings → MCP Connect → Connect an assistant and tap Get connection code.',
        'In Claude, open Settings → Connectors → Add custom connector and paste https://mcp.proapp.uk.',
        'On the P.R.O. authorization page, type the connection code from the app.',
        'Ask Claude about your workouts, sleep and goals.',
      ].map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

function head(route) {
  const url = `${SITE}${route.path}`;
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    '<meta name="apple-itunes-app" content="app-id=6749865568" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="P.R.O." />',
    '<meta property="og:locale" content="en_GB" />',
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/og.jpg" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="650" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    jsonLd(route),
  ].join('\n    ');
}

for (const route of ROUTES) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>\s*<meta name="description"[^>]*>/, head(route))
    .replace('<div id="root"></div>', `<div id="root">${await render(route.path)}</div>`);
  if (!html.includes('rel="canonical"')) throw new Error('index.html: не нашёл <title> + description');
  fs.writeFileSync(path.join(DIST, route.file), html);
  console.log(`${route.path} → ${route.file} (${(html.length / 1024).toFixed(0)} КБ)`);
}

// sitemap.xml — только из реальных маршрутов, чтобы не было адресов с 404.
//
// lastmod меняется, только когда реально изменился текст страницы: сравниваем
// текст <main> (+ title/description) новой сборки с тем, что сейчас на сайте.
// Шапка и футер общие для всех страниц — их правка не повод отмечать
// обновлёнными все страницы разом.
// Совпал — оставляем прежний lastmod из живого sitemap, нет — ставим текущее
// время. Если сайт недоступен (локальная сборка без сети) — дата последнего
// коммита по исходникам страницы. Дату сборки Google считает недостоверной.
const textHash = (html) =>
  crypto
    .createHash('sha256')
    .update(
      [
        html.match(/<title>[\s\S]*?<\/title>/)?.[0] ?? '',
        html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '',
        html.match(/<main[\s>][\s\S]*<\/main>/)?.[0] ?? html,
      ]
        .join(' ')
        .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        // Cloudflare на живом сайте подменяет e-mail на «[email protected]» — не считаем это изменением.
        .replace(/\[email&#160;protected\]|\[email protected\]|[\w.+-]+@[\w-]+\.[\w.]+/g, 'EMAIL')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .digest('hex');

async function fetchText(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

// Все даты в sitemap — в UTC, в одном формате.
const utc = (d) => d.toISOString().replace(/\.\d{3}Z$/, '+00:00');

function gitDate(route) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...(route.sources ?? ['src', 'index.html'])], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    if (d) return utc(new Date(d));
  } catch {}
  return utc(new Date());
}

const liveSitemap = await fetchText(`${SITE}/sitemap.xml`);
const liveLastmod = new Map(
  [...(liveSitemap ?? '').matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]),
);
const now = utc(new Date());
const entries = [];
for (const route of ROUTES) {
  const url = `${SITE}${route.path}`;
  const live = await fetchText(url);
  let mod;
  if (live && liveLastmod.has(url)) {
    const fresh = fs.readFileSync(path.join(DIST, route.file), 'utf8');
    mod = textHash(live) === textHash(fresh) ? utc(new Date(liveLastmod.get(url))) : now;
  } else if (liveSitemap) {
    // Сайт доступен, а страницы в sitemap ещё нет — она новая, публикуется сейчас.
    mod = now;
  } else {
    mod = gitDate(route);
  }
  entries.push(`  <url><loc>${url}</loc><lastmod>${mod}</lastmod></url>`);
  console.log(`sitemap ${route.path}: ${mod}`);
}
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`,
);

fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
