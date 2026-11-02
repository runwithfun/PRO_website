import { Link } from 'react-router-dom';
import ModernCTA from '../components/ModernCTA';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoFaq from '../components/TuyoFaq';
import { APPS, CHECKED, ROWS, SOURCES, compareFaq } from '../content/compare';

// AI coach comparison built around P.R.O.'s strengths. Every claim stays accurate;
// competitor facts and sources live in src/content/compare.js.

export default function Compare() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow="Comparison"
        lines={['AI coach apps', 'compared on MCP,', 'price and plans.']}
        accentIndex={1}
        description="P.R.O. is the only coach app here with a free MCP connector for ChatGPT, Claude, Gemini, Grok and Perplexity, and it works with any device that writes to Apple Health. Compared with Athlytic, Bevel, WHOOP Coach, Gentler Streak, Google Health Coach, Runna, Apple’s Readiness and ChatGPT Health on price, hardware, plans and recovery, with sources."
      />

      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="privacy-md">
          <h2>Which AI coach app should you choose?</h2>
          <p>
            Choose <strong>P.R.O.</strong> if you want your Apple Health data in ChatGPT, Claude, Gemini, Grok or
            Perplexity through a free MCP connector, plus an AI coach you can chat with, on any device that writes to
            Apple Health. The app and connector are free; adaptive training plans come with Pro from $2.99/month.{' '}
            <strong>Athlytic</strong> suits a recovery score processed on your device, <strong>WHOOP</strong> a dedicated
            24/7 band and <strong>Runna</strong> running-only plans.
          </p>
          <p>
            Replacing one app? See our <Link to="/whoop-alternative">WHOOP alternative</Link> guide (WHOOP’s
            three-year cost and how to switch) and <Link to="/runna-alternative">Runna alternative</Link> guide
            (running plans from $2.99/month).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">Feature comparison</h2>
        <div className="overflow-x-auto rounded-3xl border border-white/10" tabIndex={0} aria-label="Comparison table, scrolls horizontally">
          <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
            <caption className="sr-only">AI coach apps compared, checked {CHECKED}</caption>
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
            P.R.O. lets you talk to an AI coach, follow a training plan and ask ChatGPT or Claude about your data through
            a free MCP connector, and it works with any device that writes to Apple Health. Athlytic focuses on a recovery
            score processed on your iPhone; “Ask Athlytic” answers with on-device Apple Intelligence and it needs an Apple
            Watch for most features.
          </p>

          <h2>P.R.O. vs Bevel</h2>
          <p>
            Both have an AI coach that answers from your data. P.R.O. costs less (Pro from $2.99/month vs Bevel Pro at
            $14.99/month), connects to ChatGPT and Claude through a free MCP connector and works with anything that writes
            to Apple Health, including Oura, Garmin, WHOOP, Polar and COROS. Bevel adds strength-training plans with a
            large exercise library.
          </p>

          <h2>P.R.O. vs WHOOP Coach</h2>
          <p>
            WHOOP Coach needs the WHOOP band and a membership from $199/year; P.R.O. works with the watch or ring you
            already have through Apple Health. WHOOP’s coach is built with OpenAI; P.R.O. lets you choose the AI model and
            use ChatGPT or Claude directly through its free MCP connector.
          </p>

          <h2>P.R.O. vs Gentler Streak</h2>
          <p>
            Gentler Streak focuses on gentle, sustainable activity and keeps all data on your device without accounts;
            it has no chat coach. P.R.O. is for people who want deeper analytics, an AI coach and training plans.
          </p>

          <h2>P.R.O. vs Google Health Coach</h2>
          <p>
            Google Health Coach, built with Gemini, runs in the Google Health app (formerly Fitbit). The Google Health
            app can import Apple Health, but as of {CHECKED} Google’s help says the coach needs a paired Fitbit or Pixel
            Watch and a Google Health Premium subscription; Google says support for other devices is coming. P.R.O. is
            built for Apple Health and any device that writes to it.
          </p>

          <h2>P.R.O. vs Runna</h2>
          <p>
            Runna is a running-plan app with adaptive plans from 5K to ultra; its AI gives post-run insights rather than
            a chat. P.R.O. covers 50+ sports, sleep and heart rate, and lets you ask questions about any of it.
          </p>

          <h2>P.R.O. vs Apple’s Readiness</h2>
          <p>
            Readiness is free and built into watchOS 27, but only on Apple Watch Series 12 and Ultra 4: a daily 0–10
            score from your recent activity, vitals and sleep, with a recommendation from Recover to Go For It. It has
            no chat or training plans. P.R.O. works with any Apple Watch that writes to Apple Health and adds an AI
            coach and adaptive plans. See{' '}
            <Link to="/apple-watch-readiness-score">how to get a readiness read on an older Apple Watch</Link>.
          </p>

          <h2>P.R.O. vs ChatGPT Health</h2>
          <p>
            ChatGPT Health connects Apple Health to ChatGPT directly and is included in ChatGPT Free, Go, Plus and Pro —
            but only in the US, since its launch on July 23, 2026, and only in ChatGPT. It can also use US medical
            records. P.R.O. works outside the US in ChatGPT, Claude, Grok, Perplexity and Codex (Gemini custom apps are US only), adds your
            training plan, and lets you choose which data categories the assistant sees.
          </p>

          <h2>Which apps work with ChatGPT or Claude?</h2>
          <p>
            As of {CHECKED}, ChatGPT Health reads Apple Health directly in the US, Claude has an Apple Health beta for
            US Pro and Max users, and independent MCP servers exist for some wearables. We found no official connector
            for the other coach apps compared here. P.R.O.’s free MCP connector works outside the US in ChatGPT, Claude, Grok,
            Perplexity and Codex (Gemini custom apps are US only), and you choose which data categories the assistant sees. See{' '}
            <Link to="/mcp-connect">how to connect Apple Health to your AI assistant</Link>.
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
