import React from 'react';
import { useReveal } from '../hooks/useReveal';

const COLUMN_ALIGN = ['left', 'center', 'right'];

export default function FeatureSpotlight({ heroImage, heroAlt, sections }) {
  const { ref, visible } = useReveal(0.08);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 bg-black py-12 sm:py-16"
    >
      <div
        className="accent-orb accent-orb-pink pointer-events-none absolute left-1/2 top-[8%] h-[32rem] w-[40rem] -translate-x-1/2 opacity-25 lg:h-[36rem] lg:w-[48rem]"
        aria-hidden
      />

      <div
        className={`relative z-10 mb-10 transition duration-700 sm:mb-12 lg:mb-14 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="relative left-1/2 w-[calc(100vw-1rem)] max-w-[120rem] -translate-x-1/2 px-1 sm:w-[calc(100vw-2rem)] sm:px-2 lg:px-3">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-8 bg-brand-pink/10 blur-3xl lg:-inset-12"
              aria-hidden
            />
            <img
              src={heroImage}
              alt={heroAlt}
              className="relative mx-auto block h-auto w-full drop-shadow-[0_32px_80px_rgba(212,45,120,0.22)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-10">
          {sections.map((section, index) => {
            const align = COLUMN_ALIGN[index] ?? 'left';
            const alignClass =
              align === 'center'
                ? 'md:text-center md:items-center'
                : align === 'right'
                  ? 'md:text-right md:items-end'
                  : 'md:text-left md:items-start';

            return (
              <div
                key={section.title}
                className={`flex flex-col transition duration-700 ${alignClass} ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">{section.eyebrow}</p>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">{section.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-gray-500">{section.body}</p>
                {section.points && (
                  <ul
                    className={`mt-6 space-y-2.5 ${
                      align === 'center'
                        ? 'md:mx-auto'
                        : align === 'right'
                          ? 'md:ml-auto'
                          : ''
                    }`}
                  >
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className={`flex gap-3 text-sm text-gray-400 ${
                          align === 'right' ? 'md:flex-row-reverse md:text-right' : ''
                        } ${align === 'center' ? 'md:justify-center' : ''}`}
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
