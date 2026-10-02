// Markdown-контент сайта → готовый HTML на этапе сборки.
//
// Раньше политика конфиденциальности рендерилась в браузере через
// react-markdown + remark-gfm (~150 КБ JS в общем бандле ради одной страницы).
// Теперь HTML собирается здесь, а стили элементов — в .privacy-md (index.css).
// Результат: src/generated/privacy.js (в .gitignore), запуск перед dev и build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { privacyPolicyMarkdown } from '../src/content/privacyPolicy.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'generated', 'privacy.js');

const marked = new Marked({ gfm: true });

// Широкие таблицы прокручиваются внутри обёртки, а не ломают страницу.
const html = marked
  .parse(privacyPolicyMarkdown)
  .replace(/<table>/g, '<div class="coach-md-table-wrap"><table>')
  .replace(/<\/table>/g, '</table></div>');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `// Сгенерировано scripts/gen-content.mjs — не править руками.\nexport default ${JSON.stringify(html)};\n`);
console.log(`privacy: ${(html.length / 1024).toFixed(0)} КБ HTML`);
