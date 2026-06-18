import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TuyoTriple({ headline, items }) {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="border-b border-white/5 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {headline && (
          <h2
            className={`mb-14 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white transition duration-700 sm:text-4xl lg:text-5xl ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {headline}
          </h2>
        )}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`transition duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-display text-xl font-bold text-white sm:text-2xl">{item.title}</p>
              <p className="mt-3 text-base leading-relaxed text-gray-500">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
