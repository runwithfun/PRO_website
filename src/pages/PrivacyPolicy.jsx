import privacyHtml from '../generated/privacy';

// Текст политики — готовый HTML из src/content/privacyPolicy.js (markdown),
// собранный при сборке scripts/gen-content.mjs; стили — .privacy-md в index.css.
export default function PrivacyPolicy() {
  return (
    <div className="pro-page min-h-screen">
      <section className="border-b border-white/5 bg-black pt-28 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Legal</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-1 text-sm text-gray-600">Last updated: June 2026</p>
          <p className="mt-6 text-base leading-relaxed text-gray-500">
            How HAOTONG TECHNOLOGY CO. LIMITED processes your data in the P.R.O. app and on this website.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <article className="coach-md privacy-md" dangerouslySetInnerHTML={{ __html: privacyHtml }} />

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
