import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TuyoPageHero({ eyebrow, lines, accentIndex = 1, description, children }) {
  const { ref, visible } = useReveal(0.08);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/5 bg-black pt-28 pb-16 sm:min-h-[75vh] sm:pb-24"
    >
      <div className="accent-orb accent-orb-pink -right-24 top-20 h-80 w-80 opacity-40" aria-hidden />
      <div className="accent-orb accent-orb-soft -left-32 bottom-0 h-96 w-96 opacity-25" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p
            className={`mb-6 text-xs font-bold uppercase tracking-[0.22em] text-brand-pink transition duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {eyebrow}
          </p>
        )}
        <div className="max-w-5xl">
          {lines.map((line, i) => (
            <p
              key={line}
              className={`font-display font-extrabold leading-[0.92] tracking-tighter transition duration-700 ${
                i === accentIndex
                  ? 'text-[clamp(2.75rem,10vw,6.5rem)] text-brand-pink'
                  : 'text-[clamp(2.25rem,8vw,5rem)] text-white'
              } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {line}
            </p>
          ))}
        </div>
        {description && (
          <p
            className={`mt-8 max-w-2xl text-lg leading-relaxed text-gray-500 transition duration-700 sm:text-xl ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            {description}
          </p>
        )}
        {children && (
          <div
            className={`mt-10 transition duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '360ms' }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
