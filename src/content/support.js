// Поддержка: частые проблемы с коннектором и аккаунтом. Показываются на
// /support целиком и уходят в FAQPage-разметку (scripts/prerender.mjs).

export const MCP_URL = 'https://mcp.proapp.uk';
export const SUPPORT_EMAIL = 'mail@proapp.uk';

export const supportFaq = [
  {
    q: 'How do I connect P.R.O. to an AI assistant?',
    a: `In ChatGPT, Claude, Codex or Grok, add a custom MCP connection with the URL ${MCP_URL}. On the P.R.O. authorization page on iPhone, tap Open P.R.O., return and tap Paste, then Connect. On a computer, get a code in P.R.O. on your iPhone and enter it on the computer. The code works once and expires after 10 minutes.`,
  },
  {
    q: 'The connection code does not work.',
    a: 'Each code is valid for 10 minutes and can be used only once. Tap Get a new code in the app and type it straight away, without spaces. Make sure you are signed in to the same P.R.O. account on your iPhone.',
  },
  {
    q: 'How do I disconnect an assistant or revoke its access?',
    a: 'Open Settings → MCP Connect in P.R.O. Under Connected, tap × beside the assistant and confirm Disconnect. This revokes access immediately; removing the connector only inside the assistant does not. To hide individual categories, open Data the assistant can read on the MCP Connect screen.',
  },
  {
    q: 'Why is today’s data missing or a few hours old?',
    a: 'The assistant reads the data your iPhone has synced to P.R.O., not Apple Health directly. Open the P.R.O. app to sync the latest workouts, sleep and metrics, then ask again. Detailed data such as a full-day heart-rate series or a workout GPS route is uploaded only after you open the app, so the first answer may say the data was requested. Sleep stages and the heart-rate curve and splits of recent workouts arrive with the regular sync.',
  },
  {
    q: 'The assistant says a data category is turned off.',
    a: 'That category is switched off in P.R.O. To share it, open Settings → MCP Connect → Data the assistant can read and enable the category.',
  },
  {
    q: 'The assistant cannot save a coach note.',
    a: 'Writing is off by default. Turn on Allow saving coach notes in Settings → MCP Connect if you want assistants to save notes. Assistants cannot delete data, make payments or send messages.',
  },
  {
    q: 'How do I delete my account and data?',
    a: 'In the app, open Settings → Delete Account. This deletes your data on our servers, including connector tokens and cached uploads, and revokes all connector access. It does not cancel an App Store subscription.',
  },
  {
    q: 'How do I cancel a subscription or get a refund?',
    a: 'Subscriptions are billed by Apple. Manage or cancel them in your iPhone Settings → your name → Subscriptions. Refunds are handled by Apple at reportaproblem.apple.com.',
  },
];
