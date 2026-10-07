// Шаблон юридических страниц (/privacy, /terms): шапка, текст из markdown
// (готовый HTML из scripts/gen-content.mjs, стили — .privacy-md в index.css)
// и блок с контактом.
export default function LegalPage({ title, updated, intro, html, contactTitle }) {
  return (
    <div className="pro-page min-h-screen">
      <section className="border-b border-white/5 bg-black pt-28 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Legal</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-1 text-sm text-gray-600">Last updated: {updated}</p>
          <p className="mt-6 text-base leading-relaxed text-gray-500">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <article className="coach-md privacy-md" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-12 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
          <p className="text-sm font-semibold text-white">{contactTitle}</p>
          <p className="mt-2 text-sm text-gray-500">
            Contact{' '}
            <a
              href="mailto:mail@proapp.uk"
              className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink"
            >
              mail@proapp.uk
            </a>
            . We respond within 30 days.
          </p>
        </div>
      </section>
    </div>
  );
}
