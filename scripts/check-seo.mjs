// Check the static output crawlers receive, without executing the app.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ROUTES, REDIRECTS } from '../src/seo.js';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
for (const route of ROUTES) {
  const html = fs.readFileSync(path.join(dist, route.file), 'utf8');
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${route.path}: one h1`);
  assert.ok(html.includes(`<link rel="canonical" href="https://proapp.uk${route.path}"`), `${route.path}: canonical`);
  assert.ok(html.includes('<meta name="description" content="'), `${route.path}: description`);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json" data-seo-schema>([\s\S]*?)<\/script>/)?.[1])['@graph'];
  assert.equal(graph.find(n => n['@type'] === 'WebPage')?.url, `https://proapp.uk${route.path}`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(match[1]), `${route.path}: missing anchor ${match[1]}`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)"/g)) {
    const file = match[1];
    if (ROUTES.some(r => r.path === file) || REDIRECTS.some(r => r.from === file)) continue;
    assert.ok(fs.existsSync(path.join(dist, file)), `${route.path}: missing local asset ${file}`);
  }
  if (route.path === '/mcp-connect') {
    const howto = graph.find(n => n['@type'] === 'HowTo');
    assert.equal(howto.step.length, 5);
    for (const step of howto.step) assert.ok(html.includes(step.text), `Missing visible instruction: ${step.name}`);
    const faq = graph.find(n => n['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 10);
    for (const question of faq.mainEntity) {
      const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
      assert.ok(html.includes(escape(question.name)), `Missing visible FAQ: ${question.name}`);
      assert.ok(html.includes(escape(question.acceptedAnswer.text)), `FAQ differs from visible answer: ${question.name}`);
    }
    for (const match of html.matchAll(/<img[^>]*src="([^"]+)"/g)) {
      assert.ok(/^\/(chat-logos\/|mcp-guide\/pro-icon-256\.png)/.test(match[1]), `Unexpected photo on connector page: ${match[1]}`);
    }
    const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
    assert.ok(sitemap.includes('https://proapp.uk/mcp-connect</loc>'));
    assert.ok(!sitemap.includes('/apple-health-chatgpt-claude'));
  }
}
for (const redirect of REDIRECTS) {
  const html = fs.readFileSync(path.join(dist, `${redirect.from.slice(1)}.html`), 'utf8');
  assert.ok(html.includes(`https://proapp.uk${redirect.to}`));
  assert.ok(html.includes('location.search + location.hash'));
}
for (const file of ['.well-known/apple-app-site-association', 'apple-app-site-association', '404.html']) {
  assert.deepEqual(fs.readFileSync(path.join(root, 'public', file)), fs.readFileSync(path.join(dist, file)), `${file}: copied unchanged`);
}
console.log(`SEO checks passed: ${ROUTES.length} static pages, metadata, schema, links, connector content, redirect and protected files.`);
