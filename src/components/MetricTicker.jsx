import React from 'react';

export default function MetricTicker({ items, className = '' }) {
  const track = [...items, ...items];

  return (
    <div className={`ticker-mask overflow-hidden border-y border-white/8 bg-black py-5 ${className}`}>
      <div className="ticker-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="ticker-item font-display text-sm font-bold tracking-[0.18em] text-white/90 sm:text-base">
            {item}
            <span className="mx-6 text-brand-pink" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
