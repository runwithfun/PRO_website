import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export default function ModernNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHomeHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/faq', label: 'FAQ' },
    { path: '/privacy', label: 'Privacy' },
  ];

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          onHomeHero
            ? 'border-pink-400/25 bg-white/55 shadow-lg shadow-pink-900/10 backdrop-blur-xl'
            : scrolled
              ? 'border-white/10 bg-black/85 shadow-2xl shadow-black/40 backdrop-blur-xl'
              : 'border-white/10 bg-black/70 shadow-xl backdrop-blur-xl'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pink">
            <span className="font-display text-sm font-bold text-white">P</span>
          </div>
          <span
            className={`font-display text-lg font-extrabold ${onHomeHero ? 'text-pink-900' : 'text-white'}`}
          >
            P.R.O.
          </span>
        </NavLink>

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-pink text-white'
                    : onHomeHero
                      ? 'text-pink-800/80 hover:bg-pink-100/60 hover:text-pink-900'
                      : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={APP_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              onHomeHero
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'border border-brand-pink/50 text-white hover:bg-brand-pink/15'
            }`}
          >
            Download
          </a>
        </div>

        <button
          type="button"
          className={`lg:hidden ${onHomeHero ? 'text-pink-900' : 'text-gray-300'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-black/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-300"
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
