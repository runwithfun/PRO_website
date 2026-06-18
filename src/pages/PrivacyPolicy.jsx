import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { privacyPolicyMarkdown } from '../content/privacyPolicy';

const mdComponents = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-12 border-t border-white/8 pt-10 font-display text-xl font-bold text-white first:mt-0 first:border-0 first:pt-0 sm:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 font-display text-lg font-bold text-white">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 text-base leading-relaxed text-gray-400">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-200">{children}</strong>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-5 text-gray-400">{children}</ul>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  hr: () => <hr className="my-10 border-brand-pink/20" />,
  a: ({ href, children }) => (
    <a href={href} className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="coach-md-table-wrap mb-6 overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
};

export default function PrivacyPolicy() {
  return (
    <div className="pro-page min-h-screen">
      <section className="border-b border-white/5 bg-black pt-28 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Legal</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">P.R.O. App — Version 2.0</p>
          <p className="mt-1 text-sm text-gray-600">Last updated: June 2026</p>
          <p className="mt-6 text-base leading-relaxed text-gray-500">
            How HAOTONG TECHNOLOGY CO. LIMITED processes your data in the P.R.O. app and on this website.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <article className="coach-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {privacyPolicyMarkdown}
          </ReactMarkdown>
        </article>

        <div className="mt-12 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
          <p className="text-sm font-semibold text-white">Questions about privacy?</p>
          <p className="mt-2 text-sm text-gray-500">
            Contact{' '}
            <a
              href="mailto:P.R.O.devel001@gmail.com"
              className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink"
            >
              P.R.O.devel001@gmail.com
            </a>
            . We respond within 30 days.
          </p>
        </div>
      </section>
    </div>
  );
}
