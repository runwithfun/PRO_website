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
          Free on the App Store: an AI coach that knows your training, adaptive training plans, sleep score and a ChatGPT &amp; Claude connector — all from your Apple Health data.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={APP_STORE}
            target="_blank"
            rel="noopener"
            className="inline-block text-center rounded-full bg-brand-pink px-8 py-3.5 font-semibold text-white pro-glow"
          >
            App Store
          </a>
          <a
            href="mailto:mail@proapp.uk"
            className="pro-chip rounded-full px-8 py-3.5 font-semibold"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
