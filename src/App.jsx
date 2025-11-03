import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import FAQ from './pages/FAQ';
import BetaSignup from './pages/BetaSignup';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs';
import ModernNav from './components/ModernNav';
import ModernFooter from './components/ModernFooter';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white font-sans">
        <ModernNav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/beta" element={<BetaSignup />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <ModernFooter />
      </div>
    </HashRouter>
  );
}
