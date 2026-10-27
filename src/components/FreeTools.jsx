import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

// Widget-style cards linking to the free tools and the AI connector guide.
const ZONE_COLORS = ['#64748b', '#34d399', '#facc15', '#fb923c', '#ef4444'];

function HrvPreview() {
  return (
    <div aria-hidden className="mt-6">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="whitespace-nowrap font-display text-3xl font-extrabold text-white lg:text-4xl">45</span>
        <span className="text-sm text-gray-500">ms · SDNN</span>
      </div>
      <div className="relative mt-4 h-2 rounded-full bg-white/10">
        <span className="absolute inset-y-0 rounded-full bg-emerald-400/40" style={{ left: '26%', width: '38%' }} />
        <span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-emerald-400" style={{ left: '45%' }} />
      </div>
      <p className="mt-2 text-xs text-gray-500">Typical at 35–44: 26–64 ms</p>
    </div>
  );
}

function Zone2Preview() {
  return (
    <div aria-hidden className="mt-6">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="whitespace-nowrap font-display text-3xl font-extrabold text-white lg:text-4xl">111–130</span>
        <span className="text-sm text-gray-500">bpm at 35</span>
      </div>
      <div className="mt-4 flex h-2 gap-1">
        {ZONE_COLORS.map((c, i) => (
          <span key={c} className="flex-1 rounded-full" style={{ background: c, opacity: i === 1 ? 1 : 0.25 }} />
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">Zone 2 · 60–70% of max heart rate</p>
    </div>
  );
}

function AiPreview() {
  return (
    <div aria-hidden className="mt-6 space-y-2">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand-pink/80 px-3 py-2 text-xs text-white">How did I sleep before my best runs?</p>
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-xs text-gray-300">Your 5 fastest 10K runs came after 7h 40m+ of sleep…</p>
    </div>
  );
}

const TOOLS = [
  { to: '/what-is-a-good-hrv', eyebrow: 'HRV checker', title: 'Is your HRV normal for your age?', preview: <HrvPreview /> },
  { to: '/zone-2-calculator', eyebrow: 'Zone 2 calculator', title: 'Find your Zone 2 heart rate.', preview: <Zone2Preview /> },
  { to: '/mcp-connect', eyebrow: 'AI connector', title: 'Ask ChatGPT or Claude about your Apple Health.', preview: <AiPreview /> },
];

export default function FreeTools({ title = 'Check your numbers.' }) {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="border-t border-white/5 bg-black py-20 sm:py-24" aria-labelledby="free-tools-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">Free tools</p>
        <h2 id="free-tools-title" className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 sm:scroll-px-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {TOOLS.map(({ to, eyebrow, title: t, preview }, i) => (
            <Link
              key={to}
              to={to}
              className={`group flex w-[80%] shrink-0 snap-start flex-col rounded-3xl md:w-auto border border-white/10 bg-white/[0.03] p-6 transition duration-700 hover:border-brand-pink/50 hover:bg-white/[0.05] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">{eyebrow}</span>
              <span className="mt-2 font-display text-xl font-bold leading-snug text-white">{t}</span>
              {preview}
              <span className="mt-auto pt-6 text-sm font-semibold text-brand-pink">
                Open <span className="inline-block transition group-hover:translate-x-1" aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
