import React from 'react';

const shots = [
  'IMG_0872-9e87f036-fbbc-40a2-b519-0dd713d695bb.png',
  'IMG_0874-964f27b0-aae7-47de-950d-451c3e85e5e8.png',
  'IMG_0885.PNG',
  'IMG_0875-c056c5ee-fd98-4179-846a-b5157ee3729f.png',
  'IMG_0886.PNG',
  'IMG_0876-b9b74f71-ab6f-4529-9f9d-b4e77e1f7414.png',
  'IMG_0877-6c6ff12b-09af-4de3-af28-5df7c647a23b.png',
  'IMG_0884.PNG',
];

function MarqueeTrack({ reverse = false }) {
  const items = [...shots, ...shots];

  return (
    <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
      {items.map((src, i) => (
        <div key={`${src}-${i}`} className="marquee-item">
          <img
            src={`${import.meta.env.BASE_URL}screenshots/${src}`}
            alt="P.R.O. app screenshot"
            className="h-64 w-auto rounded-2xl border border-white/10 object-cover shadow-2xl transition duration-500 hover:scale-[1.03] hover:border-brand-pink/40"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default function ScreenshotMarquee() {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      <div className="accent-orb accent-orb-pink -left-32 top-10 h-72 w-72" aria-hidden />
      <div className="accent-orb accent-orb-soft right-0 bottom-0 h-96 w-96" aria-hidden />

      <div className="relative z-10 mx-auto mb-12 max-w-3xl px-4 text-center">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Your training,
          <span className="block text-brand-pink">visualised</span>
        </h2>
        <p className="mt-4 text-gray-500">
          Real screens from P.R.O. — dashboards, coach chat, analytics, and widgets in the wild.
        </p>
      </div>

      <div className="marquee-mask space-y-6">
        <MarqueeTrack />
        <MarqueeTrack reverse />
      </div>
    </section>
  );
}
