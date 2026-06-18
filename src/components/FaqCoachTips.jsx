import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const tips = [
  {
    tag: 'Recovery',
    title: 'Easy days should feel easy',
    body: 'If you cannot hold a full conversation, you are going too hard on a recovery run. Save the gas for key sessions.',
  },
  {
    tag: 'Load',
    title: 'Stack hard, protect easy',
    body: 'Most plateaus come from making every workout medium intensity. Polarise your week: clear hard days, honest easy days.',
  },
  {
    tag: 'Sleep',
    title: 'The cheapest performance supplement',
    body: 'Seven to nine hours of sleep beats any pre-workout. Adaptation happens when you are not sweating.',
  },
  {
    tag: 'Progress',
    title: 'Overload one lever at a time',
    body: 'Distance, pace, frequency, or duration — pick one variable to push per training block, not all four at once.',
  },
  {
    tag: 'Hydration',
    title: 'Drink before you are thirsty',
    body: 'Even mild dehydration can cut endurance output. Sip steadily through the day, not just mid-workout.',
  },
  {
    tag: 'Warm-up',
    title: 'Ten minutes saves ten weeks',
    body: 'Easy movement, dynamic drills, then build intensity. A proper warm-up is the best injury-prevention tool you own.',
  },
];

export default function FaqCoachTips() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal();
  const tip = tips[active];

  const shuffle = () => {
    setActive((prev) => {
      let next = Math.floor(Math.random() * tips.length);
      while (next === prev && tips.length > 1) next = Math.floor(Math.random() * tips.length);
      return next;
    });
  };

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-20 sm:py-28">
      <div className="accent-orb accent-orb-soft -left-32 top-1/3 h-80 w-80 opacity-30" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className={`transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Coach&apos;s corner</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Free advice.
            <span className="block text-gray-500">No subscription required.</span>
          </h2>
        </div>

        <div
          className={`pro-surface relative mt-10 overflow-hidden rounded-3xl p-6 sm:p-8 transition duration-700 delay-100 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-pink/10 blur-2xl" aria-hidden />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-block rounded-full border border-brand-pink/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-pink-soft">
                {tip.tag}
              </span>
              <h3 key={tip.title} className="mt-4 font-display text-2xl font-bold text-white animate-fade-in sm:text-3xl">
                {tip.title}
              </h3>
              <p key={tip.body} className="mt-3 text-base leading-relaxed text-gray-400 animate-fade-in">
                {tip.body}
              </p>
            </div>
            <button
              type="button"
              onClick={shuffle}
              className="pro-chip shrink-0 self-start rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Shuffle tip
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((t, i) => (
            <button
              key={t.title}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                active === i
                  ? 'border-brand-pink/50 bg-brand-pink/10'
                  : 'border-white/8 bg-white/[0.02] hover:border-brand-pink/30'
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-pink">{t.tag}</p>
              <p className="mt-1 font-display text-sm font-semibold text-white">{t.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
