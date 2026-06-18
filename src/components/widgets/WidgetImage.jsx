import React from 'react';

export default function WidgetImage({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`widget-card w-full rounded-3xl ${className}`}
    />
  );
}
