import React from 'react';
import ModernHero from '../components/ModernHero';
import ScreenshotMarquee from '../components/ScreenshotMarquee';
import MetricPillars from '../components/MetricPillars';
import ChatShowcase from '../components/ChatShowcase';
import AccentStatement from '../components/AccentStatement';
import HistoryShowcase from '../components/HistoryShowcase';
import ModernAppShowcase from '../components/ModernAppShowcase';
import ModernCTA from '../components/ModernCTA';

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
      <ModernCTA />
    </>
  );
}
