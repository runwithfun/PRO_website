import React from 'react';
import { useReveal } from '../hooks/useReveal';

const words = ['PROGRESS', 'RECORDS', 'OPTIMISATION'];

export default function AccentStatement() {
  const { ref, visible } = useReveal(0.2);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div className="accent-orb accent-orb-pink inset-0" />
      </div>

      <div className="relative z-10 px-4 text-center">
        {words.map((word, i) => (
          <p
            key={word}
            className={`font-display font-extrabold leading-[0.9] tracking-tighter transition duration-700 ${
              i === 1 ? 'text-brand-pink text-[clamp(3.5rem,14vw,9rem)]' : 'text-white/10 text-[clamp(3rem,12vw,7.5rem)]'
            } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {word}
          </p>
        ))}
        <p
          className={`mx-auto mt-10 max-w-xl text-lg text-gray-400 transition duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Big, bold, digital — your training history deserves more than a spreadsheet.
        </p>
      </div>
    </section>
  );
}
