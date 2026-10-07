// Markdown-контент сайта → готовый HTML на этапе сборки.
//
// Раньше политика конфиденциальности рендерилась в браузере через
// react-markdown + remark-gfm (~150 КБ JS в общем бандле ради одной страницы).
// Теперь HTML собирается здесь, а стили элементов — в .privacy-md (index.css).
// Результат: src/generated/<имя>.js (в .gitignore), запуск перед dev и build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { privacyPolicyMarkdown } from '../src/content/privacyPolicy.js';
import { termsMarkdown } from '../src/content/terms.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'src', 'generated');

const DOCS = {
  privacy: privacyPolicyMarkdown,
  terms: termsMarkdown,
};

const marked = new Marked({ gfm: true });

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const [name, markdown] of Object.entries(DOCS)) {
  // Широкие таблицы прокручиваются внутри обёртки, а не ломают страницу.
  const html = marked
    .parse(markdown)
    .replace(/<table>/g, '<div class="coach-md-table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
  fs.writeFileSync(
    path.join(OUT_DIR, `${name}.js`),
    `// Сгенерировано scripts/gen-content.mjs — не править руками.\nexport default ${JSON.stringify(html)};\n`,
  );
  console.log(`${name}: ${(html.length / 1024).toFixed(0)} КБ HTML`);
}
