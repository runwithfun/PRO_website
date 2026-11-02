import React from 'react';
import ModernHero from '../components/ModernHero';
import ScreenshotMarquee from '../components/ScreenshotMarquee';
import MetricPillars from '../components/MetricPillars';
import ChatShowcase from '../components/ChatShowcase';
import AccentStatement from '../components/AccentStatement';
import HistoryShowcase from '../components/HistoryShowcase';
import ModernAppShowcase from '../components/ModernAppShowcase';
import ModernCTA from '../components/ModernCTA';
import FreeTools from '../components/FreeTools';

// Homepage copy changes need the owner's approval, so this page keeps its own wording.
const HOME_CTA = 'Free on the App Store: an AI coach that knows your training, adaptive training plans, sleep score and a ChatGPT & Claude connector — all from your Apple Health data.';

export default function Home() {
  return (
    <>
      <ModernHero />
      <ScreenshotMarquee />
      <MetricPillars />
      <ChatShowcase />
      <AccentStatement />
      <HistoryShowcase />
      <ModernAppShowcase />
      <FreeTools connectorLabel="AI connector" />
      <ModernCTA copy={HOME_CTA} />
    </>
  );
}
