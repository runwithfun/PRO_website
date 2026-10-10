import { Link } from 'react-router-dom';
import ModernCTA from '../components/ModernCTA';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoFaq from '../components/TuyoFaq';
import { APPS, CHECKED, ROWS, SOURCES, compareFaq } from '../content/compare';

// Честное сравнение AI-коучей для Apple Health: где конкурент сильнее — так и
// пишем (ИИ охотнее цитирует сбалансированные сравнения, а нечестное
// сравнение бьёт по доверию). Данные — src/content/compare.js, с источниками.

export default function Compare() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow={`Comparison · checked ${CHECKED}`}
        lines={['AI coach apps', 'for Apple Watch,', 'compared.']}
        accentIndex={1}
        description="P.R.O. vs Athlytic, Bevel, WHOOP Coach, Gentler Streak, Google Health Coach and Runna: price, hardware, AI coach, training plans, recovery scores and ChatGPT/Claude support — with sources."
      />

      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="privacy-md">
          <h2>Which AI coach app should you choose?</h2>
          <p>
            Choose <strong>P.R.O.</strong> if you want to chat with an AI coach about your Apple Health and Apple Watch
            data, get adaptive training plans and connect ChatGPT or Claude — it is free to start, with Pro from
            $2.99/month. Choose <strong>Athlytic</strong> for a focused recovery score processed on your device,{' '}
            <strong>WHOOP</strong> if you want a dedicated 24/7 band, <strong>Bevel</strong> if you also wear Oura or
            Garmin, <strong>Gentler Streak</strong> for a gentle, fully on-device approach and <strong>Runna</strong> for
            structured running plans. Google Health Coach requires a Fitbit or Pixel Watch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">Feature comparison</h2>
        <div className="overflow-x-auto rounded-3xl border border-white/10" tabIndex={0} aria-label="Comparison table, scrolls horizontally">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <caption className="sr-only">AI coach apps for Apple Watch compared, checked {CHECKED}</caption>
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="sticky left-0 bg-black px-4 py-4 font-semibold text-gray-500">
                  Feature
                </th>
                {APPS.map((a) => (
                  <th
                    key={a.id}
                    scope="col"
                    className={`px-4 py-4 font-display font-bold ${a.id === 'pro' ? 'text-brand-pink' : 'text-white'}`}
                  >
                    {a.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([key, label]) => (
                <tr key={key} className="border-b border-white/5 align-top last:border-0">
                  <th scope="row" className="sticky left-0 bg-black px-4 py-4 font-semibold text-gray-300">
                    {label}
                  </th>
                  {APPS.map((a) => (
                    <td key={a.id} className={`px-4 py-4 leading-relaxed ${a.id === 'pro' ? 'text-gray-200' : 'text-gray-500'}`}>
                      {a[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Prices are US App Store or developer prices on {CHECKED} and may differ by region. Sources are listed below.
        </p>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div className="privacy-md">
          <h2>P.R.O. vs Athlytic</h2>
          <p>
            P.R.O. is the better fit if you want to talk to an AI coach and follow a training plan; Athlytic is the
            better fit if you only want a recovery score and prefer everything processed on your iPhone. Athlytic’s
            “Ask Athlytic” answers questions with on-device Apple Intelligence and needs an Apple Watch for most features.
            P.R.O. adds a full chat coach with tables and charts, adaptive plans and a ChatGPT/Claude connector.
          </p>

          <h2>P.R.O. vs Bevel</h2>
          <p>
            Both have an AI coach that answers from your data; P.R.O. costs less (Pro from $2.99/month vs Bevel Pro at
            $14.99/month) and connects to ChatGPT and Claude. Bevel supports more wearables — Oura, Garmin and Amazfit
            as well as Apple Watch — and has strength-training plans with a large exercise library.
          </p>

          <h2>P.R.O. vs WHOOP Coach</h2>
          <p>
            WHOOP Coach needs the WHOOP band and a membership from $199/year; P.R.O. works with the Apple Watch you
            already have through Apple Health. WHOOP gives you a dedicated 24/7 sensor, and its coach is built with
            OpenAI; P.R.O. lets you choose the AI model and use ChatGPT or Claude directly.
          </p>

          <h2>P.R.O. vs Gentler Streak</h2>
          <p>
            Gentler Streak focuses on gentle, sustainable activity and keeps all data on your device without accounts;
            it has no chat coach. P.R.O. is for people who want deeper analytics, an AI coach and training plans.
          </p>

          <h2>P.R.O. vs Google Health Coach</h2>
          <p>
            Google Health Coach, built with Gemini, works only with a Fitbit or Pixel Watch, so Apple Watch owners
            cannot use it. P.R.O. is built for Apple Health and Apple Watch.
          </p>

          <h2>P.R.O. vs Runna</h2>
          <p>
            Runna is a running-plan app with adaptive plans from 5K to ultra; its AI gives post-run insights rather than
            a chat. P.R.O. covers 50+ sports, sleep and heart rate, and lets you ask questions about any of it.
          </p>

          <h2>Which apps work with ChatGPT or Claude?</h2>
          <p>
            As of {CHECKED}, P.R.O. is the only app in this comparison with an official connector for ChatGPT and
            Claude. See <Link to="/mcp-connect">how to connect Apple Health to ChatGPT and Claude</Link>.
          </p>

          <h2>Sources</h2>
          <ul>
            {SOURCES.map(([label, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener nofollow">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <TuyoFaq title="Comparison FAQ" items={compareFaq} />
      <ModernCTA />
    </div>
  );
}
