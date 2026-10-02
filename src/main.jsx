import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
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
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
