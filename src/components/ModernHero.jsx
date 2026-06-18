import React from 'react';

const asciiLogo = `
██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔═══██╗
██████╔╝██████╔╝██║   ██║
██╔═══╝ ██╔══██╗██║   ██║
██║     ██║  ██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
`;

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

function scrollToChat() {
  document.getElementById('chat-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ModernHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 pt-28 pb-20">
      <div className="accent-orb accent-orb-pink -right-20 top-32 h-80 w-80 opacity-50" aria-hidden />
      <div className="accent-orb accent-orb-soft -left-24 bottom-20 h-96 w-96 opacity-40" aria-hidden />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-pink-400/30 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <pre
          className="mb-8 select-none font-mono text-2xl leading-none text-pink-600 opacity-80 sm:text-3xl md:text-4xl lg:text-5xl"
          style={{ fontFamily: 'monospace' }}
        >
          {asciiLogo}
        </pre>

        <h1 className="animate-slide-up text-4xl font-bold leading-tight text-pink-900 sm:text-5xl lg:text-6xl xl:text-7xl">
          Your Ultimate
          <span className="block bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
            Sport Statistics App
          </span>
        </h1>

        <p
          className="mx-auto mb-10 mt-6 max-w-3xl text-xl leading-relaxed text-pink-800 sm:text-2xl animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          Training history analysis, widget-rich dashboards, and an AI coach with tables,
          diagrams, and answers from your real metrics.
        </p>

        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <button
            type="button"
            onClick={() => window.open(APP_STORE, '_blank')}
            className="inline-flex items-center justify-center rounded-full border-2 border-pink-500 bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Download for iOS
          </button>
          <button
            type="button"
            onClick={scrollToChat}
            className="inline-flex items-center justify-center rounded-full border-2 border-pink-600/40 bg-white/60 px-8 py-4 text-lg font-semibold text-pink-900 backdrop-blur-sm transition hover:bg-white/80"
          >
            See the coach ↓
          </button>
        </div>
      </div>
    </section>
  );
}
