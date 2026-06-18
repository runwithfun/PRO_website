import React from 'react';
import ChatShowcase from '../components/ChatShowcase';
import ModernCTA from '../components/ModernCTA';
import MetricTicker from '../components/MetricTicker';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoTriple from '../components/TuyoTriple';
import TuyoSpecSheet from '../components/TuyoSpecSheet';
import TuyoStatement from '../components/TuyoStatement';
import TuyoFaq from '../components/TuyoFaq';
import FeatureSpotlight from '../components/FeatureSpotlight';

const base = import.meta.env.BASE_URL;

const TICKER = [
  'WIDGET DASHBOARD',
  'COACH TABLES',
  'MERMAID DIAGRAMS',
  'HEART RATE ZONES',
  'MONTHLY SUMMARIES',
  'SPORT SPLITS',
  'PERSONAL RECORDS',
  'STREAK TRACKER',
  'TRAINING PLANS',
  '65+ CAPABILITIES',
];

const SPECS = [
  { label: 'Widget dashboard', value: 'Rings, stats, streaks, GURU', note: 'Dense widget grid — dozens of metrics in one view.' },
  { label: 'Coach assistant', value: 'Markdown · tables · diagrams', note: 'Structured answers from your real workout data.' },
  { label: 'History & analytics', value: 'Monthly reports & sport splits', note: 'Search workouts, filter by sport, track trends.' },
  { label: 'Workout tracking', value: '50+ sports · GPS routes', note: 'Import from Apple Health with full metric depth.' },
  { label: 'Goals & records', value: 'Targets & personal bests', note: 'Weekly and yearly distance goals with celebrations.' },
  { label: 'Integrations', value: 'Apple Health · Apple Watch', note: 'HealthKit sync keeps your dashboard live.' },
];

const SPOTLIGHTS = [
  {
    eyebrow: 'Dashboard',
    title: 'Your day, at a glance.',
    body: 'Activity rings, step analysis, heart-rate trends, and streak tracking — a dense widget grid packed with the metrics that matter.',
    points: ['Dozens of built-in widgets', 'Real-time Apple Health sync', 'Streaks, goals, and overview tiles'],
  },
  {
    eyebrow: 'Analytics',
    title: 'Depth when you need it.',
    body: 'Monthly summaries, sport distribution, HR zone breakdowns, and personal records — the full picture behind every session.',
    points: ['Monthly & yearly rollups', 'Sport mix and volume trends', 'Workout search and filters'],
  },
  {
    eyebrow: 'Stats',
    title: 'Every signal, visualised.',
    body: 'Duration, cadence, calories, elevation, and pace — rich charts and personal bests that make trends obvious at a glance.',
    points: ['Sport-specific metric charts', 'Personal records & bests', 'HR zones and pace trends'],
  },
];

const FAQ = [
  {
    q: 'How does the Coach Assistant use my data?',
    a: 'It reads your Apple Health workout history — distance, pace, heart rate, sleep — to personalise analysis, plans, and recovery advice. Health data stays on your device.',
  },
  {
    q: 'What makes the dashboard different?',
    a: 'P.R.O. uses a dense widget grid packed with rings, stats, streaks, goals, and coach entry in one view — closer to a sports watch face than a generic fitness feed.',
  },
  {
    q: 'Which sports and metrics are supported?',
    a: '50+ activities with GPS routes, HR zones, duration, distance, energy, and sport-specific fields. Data imports from Apple Health and Apple Watch.',
  },
  {
    q: 'Can I track goals and personal records?',
    a: 'Yes. Set weekly and yearly distance targets, watch progress rings fill, and get notified when you hit a new personal best across any dimension.',
  },
  {
    q: 'Is everything in the app available today?',
    a: '65+ features ship on the App Store now. The redesigned Coach Assistant with richer tables and diagrams is rolling out in the next major update.',
  },
];

export default function Features() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow="Features"
        lines={['65+ capabilities.', 'One app.', 'Zero noise.']}
        accentIndex={0}
        description="Widget dashboards, training history, and an AI coach that answers with your numbers — not generic advice."
      />

      <MetricTicker items={TICKER} />

      <TuyoTriple
        headline="Sync. Visualise. Decide."
        items={[
          {
            title: 'Widget dashboard.',
            body: 'Rings, steps, heart rate, streaks, and goals — dozens of widgets in one view, updated from Apple Health in real time.',
          },
          {
            title: 'Coach that reads your log.',
            body: 'Markdown answers with comparison tables and Mermaid diagrams — week analysis, nutrition, recovery, and planning.',
          },
          {
            title: 'History with depth.',
            body: 'Monthly summaries, sport splits, HR zones, and personal records across every session you have ever logged.',
          },
        ]}
      />

      <ChatShowcase />
      <TuyoSpecSheet title="Capability breakdown" specs={SPECS} />
      <FeatureSpotlight
        heroImage={`${base}screenshots/iphone-17-pro-silver-mockup-set-2.png`}
        heroAlt="P.R.O. on iPhone — dashboard, analytics, and stats screens"
        sections={SPOTLIGHTS}
      />
      <TuyoFaq title="Common questions" items={FAQ} />

      <TuyoStatement
        lines={['TRAIN', 'SMARTER', 'NOT HARDER']}
        accentIndex={1}
      />

      <ModernCTA />
    </div>
  );
}
