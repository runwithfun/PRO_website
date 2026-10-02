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

export const faq = [
  {
    q: 'What is P.R.O.?',
    a: 'A free iOS app that turns your Apple Health and Apple Watch data into widget dashboards, training history analytics and an AI coach. The coach answers with tables, charts and plans built from your real workouts, heart rate and sleep.',
  },
  {
    q: 'Is P.R.O. free?',
    a: 'Yes. P.R.O. is free on the App Store with 65+ features. Some advanced features are part of the optional Premium subscription.',
  },
  {
    q: 'How does the AI coach use my data?',
    a: 'It reads your Apple Health workout history, heart rate and sleep to personalise analysis, training plans and recovery advice. You can choose which AI model answers.',
  },
  {
    q: 'Can I connect P.R.O. to ChatGPT or Claude?',
    a: 'Yes. In the app, open "Connect AI assistants", get a connection code and add https://mcp.proapp.uk as a custom connector. The assistant can then analyse your workouts and metrics; you decide which data categories it can see.',
  },
  {
    q: 'Does P.R.O. build training plans?',
    a: 'Yes. The coach builds a training plan from your recent load and recovery and adapts it as you train. A home-screen widget shows what is next.',
  },
  {
    q: 'What devices are supported?',
    a: 'iPhone and iPad with iOS 18.5 or later. Workouts, heart rate and sleep from Apple Watch come in through Apple Health. Android is planned.',
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
