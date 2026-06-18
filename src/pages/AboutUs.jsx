import React from 'react';
import ModernCTA from '../components/ModernCTA';
import MetricTicker from '../components/MetricTicker';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoTriple from '../components/TuyoTriple';
import TuyoSpecSheet from '../components/TuyoSpecSheet';
import TuyoStatement from '../components/TuyoStatement';
import { useReveal } from '../hooks/useReveal';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

const TICKER = [
  '39.8 KM THIS WEEK',
  '5 RUNNING SESSIONS',
  'HEART RATE ZONES',
  '12H 19M TRAINING',
  'PERSONAL RECORDS',
  'APPLE HEALTH SYNC',
  '50+ SPORTS',
  'WIDGET DASHBOARD',
  'STREAK TRACKER',
  'GOALS & RINGS',
];

const SPECS = [
  { label: 'Data source', value: 'Apple Health & Apple Watch', note: 'Workouts, HR, sleep, steps — synced on device.' },
  { label: 'Sports tracked', value: '50+ activities', note: 'Running, cycling, strength, swimming, and more.' },
  { label: 'Dashboard', value: 'Widget-rich grid', note: 'Rings, stats, streaks, and coach entry — all in one dense view.' },
  { label: 'AI coach', value: 'Tables, diagrams, plans', note: 'Answers grounded in your real training history.' },
  { label: 'Analytics', value: 'Monthly & sport splits', note: 'Volume trends, HR zones, and personal records.' },
  { label: 'Privacy', value: 'On-device first', note: 'Your health data stays under your control.' },
];

function VideoShowcase() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-10 max-w-2xl transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">See it in motion</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Built for athletes who care about the details.
          </h2>
        </div>
        <div
          className={`relative transition duration-700 delay-100 ${visible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'}`}
        >
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-brand-pink/30 via-transparent to-brand-pink/10 blur-xl" aria-hidden />
          <video
            className="relative w-full rounded-3xl border border-white/10 shadow-2xl"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={`${import.meta.env.BASE_URL}app_gallery.mov`} type="video/quicktime" />
          </video>
        </div>
      </div>
    </section>
  );
}

function TrainingPlanBlock() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="border-y border-white/5 bg-[#050505] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className={`transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">Live today</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Plans that adapt when you do.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-500">
            Custom training plans built from your history and goals — adjusting daily as load, recovery,
            and performance shift. Not a static PDF. A living plan inside the app.
          </p>
          <button
            type="button"
            onClick={() => window.open(APP_STORE, '_blank')}
            className="mt-8 inline-flex rounded-full border border-brand-pink/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-pink/10"
          >
            Download on the App Store
          </button>
        </div>
        <div className={`transition duration-700 delay-150 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <img
            src={`${import.meta.env.BASE_URL}training-plan-feature.png`}
            alt="Custom training plan in P.R.O."
            className="w-full rounded-3xl border border-white/10 shadow-2xl shadow-brand-pink/10"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow="About P.R.O."
        lines={['Training history', "isn't optional.", "It's everything."]}
        accentIndex={1}
        description="We build tools for athletes who want every session counted, every trend visible, and every decision backed by real data — not guesswork."
      >
        <p className="text-sm text-gray-600">Join athletes analysing every session with P.R.O.</p>
      </TuyoPageHero>

      <MetricTicker items={TICKER} />

      <TuyoTriple
        headline="Log once. See everything."
        items={[
          {
            title: 'Every rep logged.',
            body: 'Apple Health and Apple Watch feed your dashboard automatically — distance, HR, sleep, and load in one place.',
          },
          {
            title: 'See the pattern.',
            body: 'Widget-dense views turn months of workouts into trends you can act on, not spreadsheets you ignore.',
          },
          {
            title: 'Ask your coach.',
            body: 'The Coach Assistant reads your history and answers with tables, diagrams, and plans tailored to you.',
          },
        ]}
      />

      <VideoShowcase />
      <TuyoSpecSheet title="What P.R.O. is built on" specs={SPECS} />
      <TrainingPlanBlock />

      <TuyoStatement
        lines={['ANALYSE', 'EVERY', 'SESSION']}
        accentIndex={1}
        cta={
          <button
            type="button"
            onClick={() => window.open(APP_STORE, '_blank')}
            className="rounded-full bg-brand-pink px-8 py-4 font-semibold text-white pro-glow transition hover:scale-105"
          >
            Get P.R.O.
          </button>
        }
      />

      <ModernCTA />
    </div>
  );
}
