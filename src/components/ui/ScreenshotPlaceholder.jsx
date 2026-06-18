import React from 'react';

const aspectClasses = {
  phone: 'aspect-[9/19] max-w-[280px]',
  phoneLg: 'aspect-[9/19] max-w-[320px]',
  wide: 'aspect-video w-full',
  landscape: 'aspect-[16/10] w-full',
  square: 'aspect-square w-full',
};

export default function ScreenshotPlaceholder({
  label = 'Screenshot',
  hint = 'Replace with your app screenshot',
  aspect = 'phone',
  className = '',
  imageSrc = null,
  imageAlt = '',
}) {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={imageAlt || label}
        className={`rounded-2xl border border-gray-200/80 shadow-large object-cover ${aspectClasses[aspect] || aspectClasses.phone} ${className}`}
      />
    );
  }

  return (
    <div
      className={`pro-screenshot relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-pink/25 bg-gradient-to-br from-white via-pink-50/40 to-white p-6 text-center ${aspectClasses[aspect] || aspectClasses.phone} ${className}`}
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-pink/10 text-2xl">
        📱
      </div>
      <p className="font-display text-sm font-bold text-gray-900">{label}</p>
      <p className="mt-1 max-w-[200px] text-xs leading-relaxed text-gray-500">{hint}</p>
      <div className="absolute inset-3 rounded-xl border border-brand-pink/10 pointer-events-none" aria-hidden />
    </div>
  );
}
