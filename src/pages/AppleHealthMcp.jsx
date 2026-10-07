import { Link } from 'react-router-dom';
import ModernCTA from '../components/ModernCTA';
import TuyoPageHero from '../components/TuyoPageHero';
import TuyoFaq from '../components/TuyoFaq';
import { mcpFaq } from '../content/mcpFaq';

// Гайд «Apple Health → ChatGPT / Claude / Perplexity через MCP» — он же публичная
// документация коннектора для каталогов (Claude Connectors Directory, ChatGPT,
// Perplexity). Факты сверены с кодом:
// FullApp/P.R.O./MCPConnectView.swift и SettingsView.swift (Settings → MCP Connect,
// тексты, шаги, тумблер записи), AgentPermissionsView.swift (категории),
// SERVER/services/mcp/oauth.py (код привязки: 6 символов, 10 минут, одноразовый;
// OAuth 2.1 + PKCE + DCR), SERVER/services/mcp/server.py (список тулов, запись —
// только remember_fact), SERVER/services/agent/fetch.py (кэш детальных данных 48 ч).
// Структура под цитирование ИИ: H2 — вопрос, ответ в первом предложении.

const MCP_URL = 'https://mcp.proapp.uk';
const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';
const SUPPORT_EMAIL = 'mail@proapp.uk';


const TOOLS = [
  { name: 'get_profile', title: 'Profile', what: 'Name, sex, age, height and weight.', access: 'Read' },
  { name: 'get_goals', title: 'Goals and progress', what: 'Goals set in the app with targets and progress.', access: 'Read' },
  {
    name: 'get_daily_metrics',
    title: 'Daily health metrics',
    what: 'Steps, active energy, distance, exercise minutes, flights, resting and average heart rate, HRV, sleep hours and sleep score, per day.',
    access: 'Read',
  },
  {
    name: 'get_workouts',
    title: 'Workouts',
    what: 'Workout summaries: type, date, duration, distance, energy, heart rate, pace, cadence, power, source app.',
    access: 'Read',
  },
  { name: 'get_streak', title: 'Activity streak', what: 'Current and longest run of active days.', access: 'Read' },
  {
    name: 'get_training_plan',
    title: 'Training plan',
    what: 'The active plan, upcoming sessions and the plan’s change history.',
    access: 'Read',
  },
  { name: 'recall', title: 'Saved coach notes', what: 'Notes you or the P.R.O. coach saved.', access: 'Read' },
  {
    name: 'fetch_health_data',
    title: 'Detailed health data',
    what: 'On request, for one day or one workout: heart-rate series, sleep stages, workout splits, workout GPS route. Uploaded by the phone, cached for 48 hours.',
    access: 'Read',
  },
  {
    name: 'show_widget',
    title: 'Show a P.R.O. widget',
    what: 'Renders P.R.O. cards (today, sleep, heart, workouts, streak, goals…) inline in assistants that support MCP Apps.',
    access: 'Read',
  },
  {
    name: 'remember_fact',
    title: 'Save a coach note',
    what: 'Saves one durable note (an injury, equipment, a decision). Works only if writing is enabled in the app.',
    access: 'Write (opt-in)',
  },
  {
    name: 'request_sync',
    title: 'Request a fresh sync',
    what: 'Asks the P.R.O. app to upload new Apple Health data the next time you open it.',
    access: 'Sync request',
  },
];

const PROMPTS = [
  'Show my workouts from the last two weeks.',
  'How did I sleep this week compared to last week?',
  'Am I on track for my half-marathon plan?',
  'What was my average pace on my last run?',
  'Show my activity streak.',
  'How did my resting heart rate and HRV change on the days after long runs?',
  'Show the heart-rate curve and splits of yesterday’s run.',
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

function Code({ children }) {
  return <code className="rounded bg-white/5 px-1.5 py-0.5 text-gray-200">{children}</code>;
}

function B({ children }) {
  return <strong className="text-gray-200">{children}</strong>;
}

function StepsSection({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-display text-xl font-bold text-white sm:text-2xl">{title}</h2>
      <ol className="space-y-4">{children}</ol>
    </section>
  );
}

export default function AppleHealthMcp() {
  return (
    <div className="pro-page min-h-screen">
      <TuyoPageHero
        eyebrow="Guide · MCP"
        lines={['Apple Health', 'in ChatGPT', '& Claude.']}
        accentIndex={1}
        description="Connect your Apple Health and Apple Watch data to Claude, ChatGPT, Perplexity and other AI assistants with the free P.R.O. app and its MCP connector — in about two minutes."
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <section className="privacy-md">
          <h2>Can ChatGPT or Claude read Apple Health data?</h2>
          <p>
            Yes. Neither assistant can open Apple Health on its own, but the free <strong>P.R.O.</strong> iOS app
            exposes your Apple Health and Apple Watch data through an MCP connector at <Code>{MCP_URL}</Code>. Once
            connected, you can ask Claude, ChatGPT or Perplexity about your workouts, sleep, heart rate and goals in its
            own chat, and it answers from your real numbers instead of generic advice.
          </p>
          <p>
            MCP (Model Context Protocol) is the open standard that AI assistants use to plug in external tools and data.
            P.R.O. implements it with OAuth sign-in, so you never share a password.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-6" aria-labelledby="connector-details">
          <h2 id="connector-details" className="font-display text-lg font-bold text-white">
            Connector details
          </h2>
          <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[10rem_1fr]">
            <dt className="text-gray-500">Connector URL</dt>
            <dd className="text-gray-200">
              <Code>{MCP_URL}</Code>
            </dd>
            <dt className="text-gray-500">Authentication</dt>
            <dd className="text-gray-400">
              OAuth 2.1 with dynamic client registration, approved with a one-time six-character code from the P.R.O.
              app (valid 10 minutes, single use)
            </dd>
            <dt className="text-gray-500">Access</dt>
            <dd className="text-gray-400">
              Read-only by default; saving coach notes only if you enable writing. No deletion, payments or messaging.
            </dd>
            <dt className="text-gray-500">Works with</dt>
            <dd className="text-gray-400">Claude, ChatGPT (developer mode), Perplexity (Pro and Max) and other MCP clients</dd>
            <dt className="text-gray-500">Publisher</dt>
            <dd className="text-gray-400">HAOTONG TECHNOLOGY (HK) CO., LIMITED</dd>
            <dt className="text-gray-500">Support</dt>
            <dd className="text-gray-400">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink">
                {SUPPORT_EMAIL}
              </a>{' '}
              ·{' '}
              <Link to="/support" className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink">
                Support page
              </Link>
            </dd>
            <dt className="text-gray-500">Legal</dt>
            <dd className="text-gray-400">
              <Link to="/privacy" className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink">
                Privacy Policy
              </Link>{' '}
              ·{' '}
              <Link to="/terms" className="text-brand-pink-soft underline decoration-brand-pink/40 underline-offset-2 hover:text-brand-pink">
                Terms of Service
              </Link>
            </dd>
          </dl>
        </section>

        <section className="privacy-md mt-12">
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
              An assistant that supports custom MCP connectors: Claude, ChatGPT on a plan with developer mode, or
              Perplexity Pro or Max.
            </li>
          </ul>
        </section>

        <StepsSection title="How do you get a connection code?">
          <Step n={1}>
            In the P.R.O. app, open <B>Settings → MCP Connect → Connect an assistant</B>.
          </Step>
          <Step n={2}>
            Tap <B>Get connection code</B>. You get a six-character code that works once and expires after 10 minutes.
            Nothing is shared with any assistant until you type this code on the P.R.O. authorization page.
          </Step>
        </StepsSection>

        <StepsSection title="How do you connect Claude?">
          <Step n={1}>
            In Claude, open <B>Settings → Connectors → Add custom connector</B>.
          </Step>
          <Step n={2}>
            Name it <B>P.R.O.</B>, paste <Code>{MCP_URL}</Code> as the URL and tap <B>Add</B>, then <B>Connect</B>.
          </Step>
          <Step n={3}>The P.R.O. authorization page opens. Type the connection code from the app and confirm.</Step>
          <Step n={4}>
            Done — make sure P.R.O. is enabled in the chat’s tools menu and ask something like “How was my training
            week?”.
          </Step>
        </StepsSection>

        <StepsSection title="How do you connect ChatGPT?">
          <Step n={1}>
            In ChatGPT settings, turn on <B>developer mode</B> for apps and connectors (available on paid plans; menu
            names change between ChatGPT versions).
          </Step>
          <Step n={2}>
            Create a connector, name it <B>P.R.O.</B>, enter the URL <Code>{MCP_URL}</Code> and choose <B>OAuth</B>{' '}
            authentication.
          </Step>
          <Step n={3}>Type the connection code from the app on the P.R.O. authorization page that ChatGPT opens.</Step>
          <Step n={4}>Enable the P.R.O. connector in a chat (developer mode) and ask about your training, sleep or heart rate.</Step>
        </StepsSection>

        <StepsSection title="How do you connect Perplexity?">
          <Step n={1}>
            On Perplexity Pro or Max, open <B>Settings → Connectors</B> and add a <B>custom connector</B> (remote MCP
            server).
          </Step>
          <Step n={2}>
            Name it <B>P.R.O.</B>, enter <Code>{MCP_URL}</Code> as the server URL and choose <B>OAuth</B>{' '}
            authentication.
          </Step>
          <Step n={3}>Type the connection code from the app on the P.R.O. authorization page that opens.</Step>
          <Step n={4}>Turn on P.R.O. in the sources or connectors menu of a thread and ask your question.</Step>
        </StepsSection>

        <section className="privacy-md mt-12">
          <h2>What tools does the connector provide?</h2>
          <p>
            The assistant chooses a tool when your question needs it. Every tool respects the data categories you allow
            in the app.
          </p>
        </section>
        <div className="coach-md-table-wrap mb-6 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>What it returns or does</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {TOOLS.map((t) => (
                <tr key={t.name}>
                  <td>
                    <strong>{t.title}</strong>
                    <br />
                    <span className="font-mono text-xs text-gray-500">{t.name}</span>
                  </td>
                  <td>{t.what}</td>
                  <td>{t.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="privacy-md mt-12">
          <h2>What can you ask?</h2>
          <ul>
            {PROMPTS.map((p) => (
              <li key={p}>“{p}”</li>
            ))}
          </ul>

          <h2>How do permissions and revocation work?</h2>
          <ul>
            <li>
              <strong>Data categories.</strong> In <strong>Settings → MCP Connect → Advanced data settings</strong> you
              can switch off profile, goals, daily metrics, workouts, workout routes, sleep, heart rate and HRV, or coach
              memory. A switched-off category is not returned to any assistant, effective immediately.
            </li>
            <li>
              <strong>Read-only by default.</strong> The assistant can save coach notes only while{' '}
              <strong>Let assistants write data</strong> is on.
            </li>
            <li>
              <strong>On demand only.</strong> The assistant reads data only when you ask it something. Detailed data
              (heart-rate series, sleep stages, splits, GPS route) is uploaded by your phone only on request and expires
              after 48 hours.
            </li>
            <li>
              <strong>Disconnect.</strong> Remove the P.R.O. connector in the assistant’s settings. Deleting your P.R.O.
              account (<strong>Settings → Delete Account</strong>) revokes all connector access and deletes your data on
              our servers; you can also email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> to have every
              connector token revoked.
            </li>
          </ul>

          <h2>Is it private?</h2>
          <p>
            You stay in control. The connection uses OAuth 2.1 with a one-time code, so the assistant never gets your
            password. Data goes only to the assistant you connected and is then covered by that provider’s own privacy
            policy. P.R.O. does not sell your data, does not use health data for advertising or data mining, and does not
            use it to train AI models. The assistant reads the data your iPhone syncs to P.R.O., which is why the newest
            workouts can appear a few hours later — open the app to sync. Details are in Part C of the{' '}
            <Link to="/privacy">privacy policy</Link> and in the <Link to="/terms">terms of service</Link>.
          </p>
          <p>
            P.R.O. offers wellness and fitness information, not medical advice, and is not a medical device. Questions or
            problems? See <Link to="/support">support</Link>.
          </p>
        </section>
      </article>

      <TuyoFaq title="Questions about the connector" items={mcpFaq} />
      <ModernCTA />
    </div>
  );
}
