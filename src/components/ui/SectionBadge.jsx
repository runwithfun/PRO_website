import React from 'react';

export default function SectionBadge({ children, dot = true, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-brand-pink/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-pink shadow-sm backdrop-blur-sm ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />}
      {children}
    </div>
  );
}
