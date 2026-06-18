import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CoachMarkdown({ content, className = '' }) {
  return (
    <div className={`coach-md ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 font-display text-2xl font-extrabold text-white sm:text-3xl">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 font-display text-xl font-bold text-white">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 font-display text-lg font-bold text-white">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-base leading-relaxed text-gray-300 last:mb-0">{children}</p>
          ),
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="text-gray-200">{children}</em>,
          ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-5 text-gray-300">{children}</ul>,
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-5 text-gray-300">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-2 border-brand-pink/60 bg-brand-pink/5 py-2 pl-4 text-gray-300">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-brand-pink/25" />,
          table: ({ children }) => (
            <div className="coach-md-table-wrap mb-6 overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="transition hover:bg-brand-pink/5">{children}</tr>,
          th: ({ children }) => <th>{children}</th>,
          td: ({ children }) => <td>{children}</td>,
          code: ({ className: cls, children }) => {
            const isBlock = cls?.includes('language-');
            if (isBlock) {
              return (
                <pre className="mb-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 text-sm text-gray-300">
                  <code>{children}</code>
                </pre>
              );
            }
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-brand-pink-soft">{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
