import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TuyoFaq({ title, items }) {
  const [open, setOpen] = useState(0);
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="border-t border-white/5 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {title && (
          <h2
            className={`mb-10 font-display text-2xl font-bold text-white transition duration-700 sm:text-3xl ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {title}
          </h2>
        )}
        <div className="divide-y divide-white/8 rounded-3xl border border-white/8">
          {items.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="font-display text-base font-semibold text-white sm:text-lg">{item.q}</span>
                <span className="shrink-0 text-xl leading-none text-brand-pink">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500 sm:px-6 sm:pb-6">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
