import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './seo';
import { structuredData } from './structuredData';
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
    if (!route) return;
    document.title = route.title;
    const set = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) return;
      element.setAttribute(attribute, value);
    };
    set('meta[name="description"]', 'content', route.description);
    set('link[rel="canonical"]', 'href', `https://proapp.uk${route.path}`);
    set('meta[property="og:title"]', 'content', route.title);
    set('meta[property="og:description"]', 'content', route.description);
    set('meta[property="og:url"]', 'content', `https://proapp.uk${route.path}`);
    set('meta[property="og:image"]', 'content', `https://proapp.uk${route.image ?? '/og.jpg'}`);
    set('meta[property="og:image:height"]', 'content', String(route.imageHeight ?? 650));
    set('meta[property="og:image:alt"]', 'content', route.imageAlt ?? 'P.R.O. — AI coach and training stats for Apple Health');
    const schema = document.querySelector('script[data-seo-schema]');
    if (schema) {
      const previous = JSON.parse(schema.textContent)['@graph'];
      const app = previous.find(node => node['@type'] === 'MobileApplication') ?? {};
      const org = previous.find(node => node['@type'] === 'Organization') ?? {};
      schema.textContent = JSON.stringify(structuredData(route, { ...app, seller: org.legalName }));
    }
  }, [pathname]);
  return null;
}

function LegacyConnectorRedirect() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: '/mcp-connect', search, hash }} replace />;
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
            <Route path="/mcp-connect" element={<AppleHealthMcp />} />
            <Route path="/apple-health-chatgpt-claude" element={<LegacyConnectorRedirect />} />
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
