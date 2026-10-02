// Markdown-контент сайта → готовый HTML на этапе сборки.
//
// Раньше политика конфиденциальности рендерилась в браузере через
// react-markdown + remark-gfm (~150 КБ JS в общем бандле ради одной страницы).
// Теперь HTML собирается здесь, а стили элементов — в .privacy-md (index.css).
// Результат: src/generated/privacy.js (в .gitignore), запуск перед dev и build.

import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';
import { privacyPolicyMarkdown } from '../src/content/privacyPolicy.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'src', 'generated', 'privacy.js');

const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    // Широкие таблицы прокручиваются внутри обёртки, а не ломают страницу.
    table(token) {
      return `<div class="coach-md-table-wrap">${this.constructor.prototype.table.call(this, token)}</div>`;
    },
  },
});

const html = marked.parse(privacyPolicyMarkdown);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `// Сгенерировано scripts/gen-content.mjs — не править руками.\nexport default ${JSON.stringify(html)};\n`);
console.log(`privacy: ${(html.length / 1024).toFixed(0)} КБ HTML`);
