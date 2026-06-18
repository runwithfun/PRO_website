import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TuyoStatement({ lines, accentIndex = 1, cta }) {
  const { ref, visible } = useReveal(0.15);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-black py-24"
    >
      <div className="relative z-10 px-4 text-center">
        {lines.map((line, i) => (
          <p
            key={line}
            className={`font-display font-extrabold leading-[0.88] tracking-tighter transition duration-700 ${
              i === accentIndex
                ? 'text-[clamp(3rem,14vw,8rem)] text-brand-pink'
                : 'text-[clamp(2.5rem,11vw,6.5rem)] text-white/12'
            } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {line}
          </p>
        ))}
        {cta && (
          <div
            className={`mt-12 transition duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {cta}
          </div>
        )}
      </div>
    </section>
  );
}
