import React from 'react';
import { Link } from 'react-router-dom';

const screens = [
  {
    src: 'IMG_0872-9e87f036-fbbc-40a2-b519-0dd713d695bb.png',
    label: 'Widget dashboard',
    tag: 'Live',
  },
  {
    src: 'IMG_0874-964f27b0-aae7-47de-950d-451c3e85e5e8.png',
    label: 'AI coach home',
    tag: 'v2.0',
    featured: true,
  },
  {
    src: 'IMG_0875-c056c5ee-fd98-4179-846a-b5157ee3729f.png',
    label: 'Structured chat',
    tag: 'v2.0',
  },
];

export default function ModernAppShowcase() {
  return (
    <section className="pro-section py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">Interface</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white lg:text-4xl">
            Screens from the real app
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {screens.map((s) => (
            <div key={s.label} className={`text-center ${s.featured ? 'md:-mt-4' : ''}`}>
              <div className="relative mx-auto max-w-[260px]">
                <img
                  src={`${import.meta.env.BASE_URL}screenshots/${s.src}`}
                  alt={s.label}
                  className={`w-full rounded-[1.75rem] border border-white/10 ${
                    s.featured ? 'pro-glow' : ''
                  }`}
                />
                <span
                  className={`absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold ${
                    s.tag === 'v2.0'
                      ? 'border border-brand-pink/50 bg-black text-brand-pink-soft'
                      : 'bg-brand-pink text-white'
                  }`}
                >
                  {s.tag}
                </span>
              </div>
              <p className="mt-6 font-display font-semibold text-white">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="pro-surface mt-16 rounded-3xl p-10 text-center">
          <h3 className="font-display text-xl font-bold text-white">65+ features · v2.0 expanding the stack</h3>
          <Link
            to="/features"
            className="mt-6 inline-block rounded-full border border-brand-pink/50 px-8 py-3 font-semibold text-white pro-chip"
          >
            Explore features
          </Link>
        </div>
      </div>
    </section>
  );
}
