import React from 'react';
import { useReveal } from '../hooks/useReveal';
import AppChatDemo from './AppChatDemo';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

const TRY_TIPS = [
  {
    step: '01',
    title: 'Tap a skill card',
    body: 'Start with Analyze, Recovery, or Plan — each opens a coach answer with tables and charts.',
  },
  {
    step: '02',
    title: 'Use the prompt chips',
    body: 'Switch topics from the bar at the bottom. Every chip loads a new structured reply.',
  },
  {
    step: '03',
    title: 'Tap table rows',
    body: 'In recovery and analyze views, tap any row to inspect that signal and see the focus update.',
  },
];

const APP_TIPS = [
  {
    step: '01',
    title: 'Built from your metrics',
    body: 'In P.R.O., every answer reads your Apple Health workouts, sleep, and heart-rate history — not sample data.',
  },
  {
    step: '02',
    title: 'Charts that react',
    body: 'Pie charts, comparison tables, and training diagrams update as your week changes.',
  },
  {
    step: '03',
    title: 'Your coach, your log',
    body: "Ask about overtraining, nutrition, or next week's block and get takeaways tied to your real load.",
  },
];

function TipCard({ step, title, body, align = 'left', visible, delay = 0 }) {
  return (
    <div
      className={`pro-surface rounded-2xl p-5 transition duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${align === 'right' ? 'lg:text-right' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-pink">{step}</p>
      <p className="mt-2 font-display text-base font-bold text-white">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{body}</p>
    </div>
  );
}

function TipColumn({ tips, align, visible, baseDelay = 0 }) {
  return (
    <div className={`flex flex-col gap-4 ${align === 'right' ? 'lg:items-end' : ''}`}>
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.22em] text-gray-600 transition duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${align === 'right' ? 'lg:text-right' : ''}`}
        style={{ transitionDelay: `${baseDelay}ms` }}
      >
        {align === 'left' ? 'Try the demo →' : '← In the app'}
      </p>
      {tips.map((tip, i) => (
        <TipCard
          key={tip.step}
          {...tip}
          align={align}
          visible={visible}
          delay={baseDelay + 80 + i * 100}
        />
      ))}
    </div>
  );
}

export default function ChatShowcase() {
  const { ref, visible } = useReveal();

  return (
    <section id="chat-demo" ref={ref} className="scroll-mt-28 relative overflow-hidden bg-black py-20 sm:py-28">
      <div className="accent-orb accent-orb-pink left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-30" aria-hidden />
      <div className="pro-grid absolute inset-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-12 text-center transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Coach Assistant</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Comprehensive answers,
            <span className="block text-gray-500">built from your data</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            This is a live preview — tap around the phone, then download P.R.O. to run the same coach on your
            real training metrics.
          </p>
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-6 xl:gap-10">
          <div className="hidden w-full max-w-[280px] lg:block lg:flex-1 lg:pt-8">
            <TipColumn tips={TRY_TIPS} align="left" visible={visible} baseDelay={150} />
          </div>

          <div className="w-[min(100%,340px)] shrink-0">
            <AppChatDemo />
          </div>

          <div className="hidden w-full max-w-[280px] lg:block lg:flex-1 lg:pt-8">
            <TipColumn tips={APP_TIPS} align="right" visible={visible} baseDelay={200} />
          </div>

          <div className="w-full lg:hidden">
            <div className="grid gap-4 sm:grid-cols-2">
              <TipColumn tips={TRY_TIPS} align="left" visible={visible} baseDelay={200} />
              <TipColumn tips={APP_TIPS} align="left" visible={visible} baseDelay={280} />
            </div>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col items-center gap-4 text-center transition duration-700 delay-300 sm:flex-row sm:justify-center ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="max-w-md text-sm text-gray-500">
            Sample data in the preview · your Apple Health history in the app
          </p>
          <button
            type="button"
            onClick={() => window.open(APP_STORE, '_blank')}
            className="shrink-0 rounded-full border border-brand-pink/50 bg-brand-pink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-pink-deep"
          >
            Try with your metrics
          </button>
        </div>
      </div>
    </section>
  );
}
