import React from 'react';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export default function ModernCTA() {
  return (
    <section className="relative overflow-hidden border-t border-brand-pink/20 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/10 to-black" aria-hidden />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">Get started</p>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-white lg:text-5xl">
          Train smarter with P.R.O.
        </h2>
        <p className="mt-4 text-gray-400">
          Download the live app today. Version 2.0 — redesigned coach, richer visualisations — is in active development.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.open(APP_STORE, '_blank')}
            className="rounded-full bg-brand-pink px-8 py-3.5 font-semibold text-white pro-glow"
          >
            App Store
          </button>
          <a
            href="mailto:P.R.O.devel001@gmail.com"
            className="pro-chip rounded-full px-8 py-3.5 font-semibold"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
