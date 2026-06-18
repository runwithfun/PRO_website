import React from 'react';
import VersionBadge from './VersionBadge';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export default function SectionCTA({
  badge,
  title,
  titleAccent,
  description,
  showVersionNote = true,
}) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink via-brand-pink-deep to-[#6b1540]" />
      <div className="pro-grid-light absolute inset-0 opacity-30" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">{badge}</p>
        )}
        <h2 className="font-display text-3xl font-extrabold text-white lg:text-5xl">
          {title}
          {titleAccent && (
            <span className="mt-1 block bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          )}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{description}</p>
        {showVersionNote && (
          <div className="mt-8 flex justify-center">
            <VersionBadge size="lg" className="!border-white/30 !bg-white/95 !text-amber-900" />
          </div>
        )}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => window.open(APP_STORE, '_blank')}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-brand-pink shadow-large transition hover:scale-105 hover:bg-gray-50"
          >
            Download current version
          </button>
          <a
            href="mailto:P.R.O.devel001@gmail.com"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Get v2.0 updates
          </a>
        </div>
      </div>
    </section>
  );
}
