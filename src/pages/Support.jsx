import { Link } from 'react-router-dom';
import { MCP_URL, SUPPORT_EMAIL, supportFaq } from '../content/support';

// Поддержка: контакт, ссылки на справку и юридические страницы, разбор частых
// проблем с коннектором (src/content/support.js). Нужна каталогам коннекторов
// (Claude, ChatGPT, Perplexity) как публичный адрес поддержки. Ответы видимы
// целиком (не аккордеон) и дублируются в FAQPage-разметке.

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

const LINKS = [
  { to: '/faq', label: 'FAQ', note: 'Product questions and coaching tips' },
  { to: '/mcp-connect', label: 'Connector guide', note: 'Set up ChatGPT, Claude, Codex or Grok' },
  { to: '/privacy', label: 'Privacy Policy', note: 'What we collect and share, and your rights' },
  { to: '/terms', label: 'Terms of Service', note: 'The rules for using P.R.O.' },
];

export default function Support() {
  return (
    <div className="pro-page min-h-screen">
      <section className="border-b border-white/5 bg-black pt-28 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Support</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            How can we help?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-500">
            Help with the P.R.O. app, your account and the P.R.O. connector for AI assistants.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-brand-pink/30 bg-brand-pink/[0.04] p-6">
          <p className="text-sm font-semibold text-white">Contact support</p>
          <p className="mt-2 text-sm text-gray-400">
            Email{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink"
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            — we typically respond within 24 hours. Tell us your iPhone model, iOS version and, for connector issues,
            which assistant you use.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-brand-pink/40"
            >
              <span className="font-display text-base font-semibold text-white">{l.label}</span>
              <span className="mt-1 block text-sm text-gray-500">{l.note}</span>
            </Link>
          ))}
        </div>

        <div className="privacy-md mt-12">
          <h2>Connector and account troubleshooting</h2>
          <p>
            The P.R.O. connector URL is{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-gray-200">{MCP_URL}</code>. Full setup steps for
            each assistant are in the <Link to="/mcp-connect">connector guide</Link>.
          </p>
          {supportFaq.map((item) => (
            <section key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </section>
          ))}
          <p>
            Still stuck? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. You can also leave a review or
            report a problem on the{' '}
            <a href={APP_STORE} target="_blank" rel="noopener">
              App Store page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
