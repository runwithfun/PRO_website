import React from 'react';
import ModernCTA from '../components/ModernCTA';
import MetricTicker from '../components/MetricTicker';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoFaq from '../components/TuyoFaq';
import FaqCoachTips from '../components/FaqCoachTips';
import FaqLockerRoom from '../components/FaqLockerRoom';

const TICKER = [
  'EASY DAYS EASY',
  'SLEEP IS TRAINING',
  'HYDRATE EARLY',
  'POLARISE YOUR WEEK',
  'WARM UP PROPERLY',
  'REST DAYS COUNT',
  'ONE LEVER AT A TIME',
  'LISTEN TO YOUR BODY',
  'BAD JOKES INCLUDED',
  '65+ FEATURES',
];

const faq = [
  {
    q: 'What is P.R.O. 2.0?',
    a: 'A major update focused on the Coach Assistant — structured chat with tables, Mermaid diagrams, and answers from your real training data. It is in active development.',
  },
  {
    q: 'Is the app available now?',
    a: 'Yes. The current version is on the App Store with 65+ features. v2.0 will ship as an update when ready.',
  },
  {
    q: 'How does the AI coach use my data?',
    a: 'It reads your Apple Health workout history to personalise analysis, plans, and recovery advice. Health data stays on your device.',
  },
  {
    q: 'What devices are supported?',
    a: 'iOS (iPhone & iPad) with Apple Watch integration. Android is planned.',
  },
  {
    q: 'Can I ask the coach for training advice?',
    a: 'Absolutely — recovery, pacing, weekly load, nutrition context, and block planning. Answers are grounded in your actual workout history, not generic blog posts.',
  },
  {
    q: 'How do I get support?',
    a: 'Email P.R.O.devel001@gmail.com — we typically respond within 24 hours.',
  },
];

export default function FAQ() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow="Help & humour"
        lines={['Questions.', 'Answers.']}
        accentIndex={1}
        description="Everything about P.R.O. — plus free coaching tips and locker-room material for your rest days."
      />

      <MetricTicker items={TICKER} />

      <TuyoFaq title="The serious stuff" items={faq} />

      <FaqCoachTips />

      <FaqLockerRoom />

      <ModernCTA />
    </div>
  );
}
