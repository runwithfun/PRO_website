import React from 'react';

export default function VersionBadge({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'px-2.5 py-1 text-[0.65rem]',
    md: 'px-3.5 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-brand-pink/50 bg-brand-pink/10 font-bold uppercase tracking-[0.12em] text-brand-pink-soft ${sizes[size]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
      v2.0 in development
    </span>
  );
}
