import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Шрифты со своего домена (раньше — Google Fonts: отдельный DNS-запрос
// и блокирующий CSS). Вариативные woff2, браузер качает только нужные
// диапазоны символов; основные файлы заранее подгружаются через preload
// (scripts/prerender.mjs).
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource-variable/dm-sans/wght-italic.css'
import '@fontsource-variable/syne/wght.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Страницы из списка ROUTES (scripts/prerender.mjs) приходят уже отрисованными —
// их гидрируем. Остальное (dev-сервер) рисуем с нуля.
//
// Гидрацию запускаем после первой отрисовки: иначе браузер сначала выполняет
// длинную задачу гидрации и только потом показывает уже готовый HTML
// (на главной первая отрисовка сдвигалась на ~1 с).
function start() {
  if (root.hasChildNodes()) hydrateRoot(root, app)
  else createRoot(root).render(app)
}
requestAnimationFrame(() => setTimeout(start, 0))
