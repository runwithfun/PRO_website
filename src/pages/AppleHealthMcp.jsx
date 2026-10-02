import { Link } from 'react-router-dom';
import ModernCTA from '../components/ModernCTA';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoFaq from '../components/TuyoFaq';

// Гайд «Apple Health → ChatGPT / Claude через MCP». Факты сверены с кодом:
// FullApp/P.R.O./MCPConnectView.swift (экран, тексты, шаги, тумблер записи),
// SERVER/services/mcp/oauth.py (код привязки: 6 символов, 10 минут, одноразовый;
// OAuth 2.1 + PKCE) и SERVER/services/mcp/permissions.py (категории доступа).
// Структура под цитирование ИИ: H2 — вопрос, ответ в первом предложении.

const MCP_URL = 'https://mcp.proapp.uk';
const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

export const mcpFaq = [
  {
    q: 'Can ChatGPT or Claude read my Apple Health data?',
    a: 'Yes — through the free P.R.O. app, which connects your Apple Health and Apple Watch data to ChatGPT, Claude and other assistants that support custom MCP connectors. You add https://mcp.proapp.uk as a connector and confirm it with a one-time code from the app.',
  },
  {
    q: 'Is the P.R.O. MCP connector free?',
    a: 'Yes. P.R.O. is free on the App Store and the connector is part of the app. Custom connectors in ChatGPT currently require a paid ChatGPT plan with developer mode; check your assistant’s plan for connector support.',
  },
  {
    q: 'What data can the assistant see?',
    a: 'Only the categories you allow: profile, goals, daily metrics (steps, energy), workouts, GPS routes, sleep, heart rate and the coach’s memory. Each category can be switched off in the P.R.O. app at any time.',
  },
  {
    q: 'Can the assistant change anything in my account?',
    a: 'Only if you turn on “Let assistants write data” in the app. Then it can, for example, set a goal or save a fact to the coach’s memory. With the toggle off, access is read-only.',
  },
  {
    q: 'Do I share my password with ChatGPT or Claude?',
    a: 'No. The assistant signs in through OAuth: you type a six-character connection code from the P.R.O. app on the P.R.O. authorization page. The code works once and expires after 10 minutes.',
  },
  {
    q: 'Why is today’s data missing or a few hours old?',
    a: 'The assistant reads the data your iPhone has synced to P.R.O., so it can lag behind Apple Health by a few hours. Open the P.R.O. app to sync the latest workouts, sleep and metrics.',
  },
  {
    q: 'How do I disconnect an assistant?',
    a: 'Remove the P.R.O. connector in the assistant’s settings, or switch off the data categories in the P.R.O. app — a disabled category is not returned to any assistant.',
  },
];

function Step({ n, children }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-pink/50 font-display text-sm font-bold text-brand-pink">
        {n}
      </span>
      <span className="text-base leading-relaxed text-gray-400">{children}</span>
    </li>
  );
}

export default function AppleHealthMcp() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow="Guide · MCP"
        lines={['Apple Health', 'in ChatGPT', '& Claude.']}
        accentIndex={1}
        description="Connect your Apple Health and Apple Watch data to ChatGPT, Claude and other AI assistants with the free P.R.O. app and its MCP connector — in about two minutes."
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <section className="privacy-md">
          <h2>Can ChatGPT or Claude read Apple Health data?</h2>
          <p>
            Yes. Neither assistant can open Apple Health on its own, but the free <strong>P.R.O.</strong> iOS app
            exposes your Apple Health and Apple Watch data through an MCP connector at{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-gray-200">{MCP_URL}</code>. Once connected, you can
            ask the assistant about your workouts, sleep, heart rate and goals in its own chat, and it answers from your
            real numbers instead of generic advice.
          </p>
          <p>
            MCP (Model Context Protocol) is the open standard that ChatGPT, Claude and other assistants use to plug in
            external tools and data. P.R.O. implements it with OAuth sign-in, so you never share a password.
          </p>

          <h2>What do you need?</h2>
          <ul>
            <li>
              An iPhone with iOS 18.5 or later and the free{' '}
              <a href={APP_STORE} target="_blank" rel="noopener">
                P.R.O. app from the App Store
              </a>
              , signed in.
            </li>
            <li>Workouts, sleep and heart rate in Apple Health — for example, recorded by an Apple Watch.</li>
            <li>
              An assistant that supports custom MCP connectors: Claude (Settings → Connectors) or ChatGPT on a plan with
              developer mode.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold text-white sm:text-2xl">How do you connect Claude?</h2>
          <ol className="space-y-4">
            <Step n={1}>
              In the P.R.O. app, open <strong className="text-gray-200">Connect AI assistants</strong> and tap{' '}
              <strong className="text-gray-200">Get connection code</strong>. You get a six-character code that works
              once and expires after 10 minutes.
            </Step>
            <Step n={2}>
              In Claude, open <strong className="text-gray-200">Settings → Connectors → Add custom connector</strong> and
              paste <code className="rounded bg-white/5 px-1.5 py-0.5 text-gray-200">{MCP_URL}</code>.
            </Step>
            <Step n={3}>
              The P.R.O. authorization page opens. Type the connection code from the app and confirm.
            </Step>
            <Step n={4}>Done — Claude now sees your workouts, sleep and goals. Ask it something like “How was my training week?”.</Step>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold text-white sm:text-2xl">How do you connect ChatGPT?</h2>
          <ol className="space-y-4">
            <Step n={1}>
              In ChatGPT settings, turn on <strong className="text-gray-200">developer mode</strong> for connectors
              (available on paid plans; menu names change between ChatGPT versions).
            </Step>
            <Step n={2}>
              Choose <strong className="text-gray-200">Add custom connector</strong>, enter the URL{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-gray-200">{MCP_URL}</code> and select OAuth
              authentication.
            </Step>
            <Step n={3}>
              Get a code in the P.R.O. app (<strong className="text-gray-200">Connect AI assistants → Get connection code</strong>)
              and type it on the P.R.O. authorization page that ChatGPT opens.
            </Step>
            <Step n={4}>Enable the P.R.O. connector in a chat and ask about your training, sleep or heart rate.</Step>
          </ol>
        </section>

        <section className="privacy-md mt-12">
          <h2>What can the assistant see and do?</h2>
          <p>
            The assistant can read only the categories you allow in the P.R.O. app: <strong>profile</strong>,{' '}
            <strong>goals</strong>, <strong>daily metrics</strong> (steps, active energy), <strong>workouts</strong>,{' '}
            <strong>GPS routes</strong>, <strong>sleep</strong>, <strong>heart rate</strong> and the coach’s{' '}
            <strong>memory</strong>. A disabled category is not returned to any assistant.
          </p>
          <p>
            Access is read-only by default. If you turn on <strong>Let assistants write data</strong>, the assistant can
            also set goals, save facts to the coach’s memory and rearrange the widgets on your P.R.O. dashboard.
          </p>

          <h2>What can you ask?</h2>
          <ul>
            <li>“Summarise my training this week and compare it with last week.”</li>
            <li>“How did my sleep change on the days after long runs?”</li>
            <li>“What was my average heart rate on my last five rides?”</li>
            <li>“Am I on track for my monthly distance goal?”</li>
            <li>“Build me a recovery week based on my recent load.”</li>
          </ul>

          <h2>Is it private?</h2>
          <p>
            You stay in control. The connection uses OAuth 2.1 with a one-time code, so the assistant never gets your
            password, and you can switch off any data category or remove the connector at any time. The assistant reads
            the data your iPhone syncs to P.R.O., which is why the newest workouts can appear a few hours later — open the
            app to sync. Details are in the <Link to="/privacy">privacy policy</Link>.
          </p>
        </section>
      </article>

      <TuyoFaq title="Questions about the connector" items={mcpFaq} />
      <ModernCTA />
    </div>
  );
}
