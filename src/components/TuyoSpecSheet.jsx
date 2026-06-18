import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TuyoSpecSheet({ title, specs }) {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="border-b border-white/5 bg-[#050505] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2
            className={`mb-12 font-display text-2xl font-bold text-white transition duration-700 sm:text-3xl ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {title}
          </h2>
        )}
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`bg-black p-6 transition duration-700 sm:p-8 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{spec.label}</p>
              <p className="mt-2 font-display text-lg font-bold leading-snug text-white sm:text-xl">{spec.value}</p>
              {spec.note && <p className="mt-2 text-sm text-gray-500">{spec.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
