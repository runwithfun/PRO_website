import { StrictMode } from 'react';
// react-dom/static в Node — CommonJS: именованный импорт не работает.
import ReactDOMStatic from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { AppShell } from './App.jsx';

export { faq } from './content/faq.js';
export { mcpFaq } from './content/mcpFaq.js';
export { supportFaq } from './content/support.js';
export { compareFaq } from './content/compare.js';
export { ROUTES, REDIRECTS } from './seo.js';
export { structuredData } from './structuredData.js';

// prerenderToNodeStream (а не renderToString) дожидается lazy-компонентов внутри
// Suspense — в HTML попадает полная разметка, включая демо-чат.
export async function render(url) {
  const { prelude } = await ReactDOMStatic.prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
