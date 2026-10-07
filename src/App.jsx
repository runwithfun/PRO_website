import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ROUTES } from './seo';
import Home from './pages/Home';
import Features from './pages/Features';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs';
import AppleHealthMcp from './pages/AppleHealthMcp';
import Compare from './pages/Compare';
import Terms from './pages/Terms';
import Support from './pages/Support';
import ModernNav from './components/ModernNav';
import ModernFooter from './components/ModernFooter';
import ScrollToTop from './components/ScrollToTop';

// При переходах внутри сайта меняем заголовок вкладки; при первой загрузке
// он уже стоит в пререндеренном HTML.
function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const route = ROUTES.find((r) => r.path === pathname);
    if (route) document.title = route.title;
  }, [pathname]);
  return null;
}

// Разметка и маршруты без роутера: в браузере их оборачивает BrowserRouter,
// при пререндере (src/entry-server.jsx) — StaticRouter.
export function AppShell() {
  return (
    <>
      <ScrollToTop />
      <DocumentTitle />
      <div className="min-h-screen bg-black font-sans text-white">
        <ModernNav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/apple-health-chatgpt-claude" element={<AppleHealthMcp />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
        <ModernFooter />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
