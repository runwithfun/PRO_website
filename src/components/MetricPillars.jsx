import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const pillars = [
  {
    id: 'volume',
    label: 'Volume',
    headline: 'Track how hard you push',
    description:
      'One view of weekly distance, duration, and sport mix — see load build across your training block.',
    metric: '39.8',
    unit: 'km this week',
    pct: 78,
    color: 'from-blue-500 to-cyan-400',
    ring: '#38bdf8',
    image: 'IMG_0872-9e87f036-fbbc-40a2-b519-0dd713d695bb.png',
  },
  {
    id: 'recovery',
    label: 'Recovery',
    headline: 'Know when to push or rest',
    description:
      'Resting HR, sleep, and readiness signals — so you know if today is a hard session or an easy day.',
    metric: '82',
    unit: 'recovery score',
    pct: 82,
    color: 'from-emerald-500 to-green-400',
    ring: '#34d399',
    image: 'IMG_0876-b9b74f71-ab6f-4529-9f9d-b4e77e1f7414.png',
  },
  {
    id: 'progress',
    label: 'Progress',
    headline: 'See the trend, not just today',
    description:
      'Month-over-month charts, personal records, and streaks — your full training history in motion.',
    metric: '+18%',
    unit: '12-week volume',
    pct: 65,
    color: 'from-brand-pink to-brand-pink-soft',
    ring: '#d42d78',
    image: 'IMG_0884.PNG',
  },
];

function Ring({ pct, color }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

export default function MetricPillars() {
  const [active, setActive] = useState('volume');
  const { ref, visible } = useReveal();
  const pillar = pillars.find((p) => p.id === active) || pillars[0];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#050505] py-24">
      <div className="accent-orb accent-orb-pink right-1/4 -top-20 h-[28rem] w-[28rem] opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Start the day with clarity</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white lg:text-5xl">
            Turn your body&apos;s signals into
            <span className="block text-gray-500">actionable metrics</span>
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {pillars.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active === p.id
                  ? 'bg-brand-pink text-white pro-glow scale-105'
                  : 'border border-white/10 text-gray-400 hover:border-brand-pink/40 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          className={`mt-14 grid items-center gap-12 lg:grid-cols-2 transition duration-700 delay-100 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="relative flex justify-center lg:justify-end">
            <div className={`absolute -inset-4 rounded-full bg-gradient-to-br ${pillar.color} opacity-20 blur-3xl`} />
            <img
              key={pillar.image}
              src={`${import.meta.env.BASE_URL}screenshots/${pillar.image}`}
              alt={pillar.headline}
              className="relative z-10 max-h-[520px] w-auto rounded-[2rem] border border-white/10 shadow-2xl animate-fade-in"
            />
          </div>

          <div className="max-w-lg">
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center">
                <Ring pct={pillar.pct} color={pillar.ring} />
                <div className="absolute text-center">
                  <p className="font-display text-2xl font-extrabold text-white">{pillar.metric}</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">{pillar.unit}</p>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white lg:text-3xl">{pillar.headline}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-pink">{pillar.label}</p>
              </div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">{pillar.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
