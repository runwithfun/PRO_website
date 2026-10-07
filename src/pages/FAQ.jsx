import React from 'react';
import ModernCTA from '../components/ModernCTA';
import MetricTicker from '../components/MetricTicker';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoFaq from '../components/TuyoFaq';
import FaqCoachTips from '../components/FaqCoachTips';
import FaqLockerRoom from '../components/FaqLockerRoom';
import { faq } from '../content/faq';

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
