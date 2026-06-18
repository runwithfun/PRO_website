import React from 'react';
import {
  WidgetImage,
  heartRateImg,
  stepsImg,
  goalsImg,
  streakImg,
  overviewImg,
  calendarImg,
} from './widgets';

export default function HistoryShowcase() {
  return (
    <section className="relative border-y border-white/5 bg-[#050505] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">Training history</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white lg:text-4xl">
            Analyse every session. Visualise the full picture.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Sport splits, volume trends, heart-rate zones, and personal records — widget-dense dashboards
            that turn years of data into actionable insight.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <WidgetImage src={stepsImg} alt="Steps Analysis — weekly steps and bar chart" />
          <WidgetImage src={heartRateImg} alt="Heart Rate — daily vs resting chart" />
          <WidgetImage src={goalsImg} alt="Goals — activity rings and distance targets" />

          <WidgetImage src={overviewImg} alt="Overview — training load, duration, distance, energy, heart rate" />
          <WidgetImage src={streakImg} alt="Streak Tracker — current streak and last 7 days" />
          <WidgetImage src={calendarImg} alt="Training Calendar — monthly activity view" />
        </div>
      </div>
    </section>
  );
}
