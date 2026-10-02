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
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://proapp.uk';
const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';


const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const { render, faq, ROUTES } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href);
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

function jsonLd(route) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#org`,
      name: 'P.R.O.',
      alternateName: ['PRO app', 'P.R.O. — Performance · Records · Optimisation'],
      url: `${SITE}/`,
      logo: `${SITE}/favicon.png`,
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
      operatingSystem: 'iOS 18.5 or later',
      url: `${SITE}/`,
      installUrl: APP_STORE,
      downloadUrl: APP_STORE,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#org` },
    },
  ];
  if (route.faq) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
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
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);
  if (!html.includes('rel="canonical"')) throw new Error('index.html: не нашёл <title> + description');
  fs.writeFileSync(path.join(DIST, route.file), html);
  console.log(`${route.path} → ${route.file} (${(html.length / 1024).toFixed(0)} КБ)`);
}

// sitemap.xml — только из реальных маршрутов, чтобы не было адресов с 404.
// lastmod — время последнего коммита, который трогал исходники страницы
// (дату сборки Google считает недостоверной). В CI нужен fetch-depth: 0.
function lastmod(route) {
  const paths = route.sources ?? ['src', 'index.html'];
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], { cwd: ROOT, encoding: 'utf8' }).trim();
    if (d) return d;
  } catch {}
  return new Date().toISOString();
}
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map(
    (r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${lastmod(r)}</lastmod></url>`,
  ).join('\n')}\n</urlset>\n`,
);

fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
