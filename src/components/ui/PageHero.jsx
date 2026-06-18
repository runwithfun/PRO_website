import React from 'react';
import SectionBadge from './SectionBadge';
import VersionBadge from './VersionBadge';

export default function PageHero({
  badge,
  title,
  titleAccent,
  description,
  showVersionBadge = false,
  children,
}) {
  return (
    <section className="pro-mesh-bg relative overflow-hidden pt-32 pb-16">
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {showVersionBadge && (
          <div className="mb-4 flex justify-center">
            <VersionBadge />
          </div>
        )}
        {badge && <SectionBadge className="mb-6">{badge}</SectionBadge>}
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl xl:text-6xl">
          {title}
          {titleAccent && (
            <span className="mt-1 block bg-gradient-to-r from-brand-pink to-brand-pink-deep bg-clip-text text-transparent">
              {titleAccent}
            </span>
          )}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
