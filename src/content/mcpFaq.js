// FAQ гайда /apple-health-chatgpt-claude: страница и разметка FAQPage в пререндере.
export const mcpFaq = [
  {
    q: 'Can ChatGPT or Claude read my Apple Health data?',
    a: 'Yes — through the free P.R.O. app, which connects your Apple Health and Apple Watch data to Claude, ChatGPT, Perplexity and other assistants that support custom MCP connectors. You add https://mcp.proapp.uk as a connector and confirm it with a one-time code from the app.',
  },
  {
    q: 'Is the P.R.O. MCP connector free?',
    a: 'Yes. P.R.O. is free on the App Store and the connector is part of the app. Custom connectors currently need a supported assistant plan: ChatGPT uses developer mode on paid plans, and Perplexity offers custom connectors on Pro and Max. Check your assistant’s plan for connector support.',
  },
  {
    q: 'What data can the assistant see?',
    a: 'Only the categories you allow: profile, goals, daily metrics, workouts, workout routes, sleep, heart rate and HRV, and coach memory. Each category can be switched off in the P.R.O. app at any time, and the assistant reads data only when you ask it something.',
  },
  {
    q: 'Can the assistant change anything in my account?',
    a: 'Only one thing, and only if you turn on “Let assistants write data” in the app: it can save a coach note. It can also ask your phone to sync fresh data. It cannot delete data, make payments or send messages.',
  },
  {
    q: 'Do I share my password with ChatGPT or Claude?',
    a: 'No. The assistant signs in through OAuth 2.1: you type a six-character connection code from the P.R.O. app on the P.R.O. authorization page. The code works once and expires after 10 minutes, and nothing is shared before you enter it.',
  },
  {
    q: 'Why is today’s data missing or a few hours old?',
    a: 'The assistant reads the data your iPhone has synced to P.R.O., so it can lag behind Apple Health by a few hours. Open the P.R.O. app to sync the latest workouts, sleep and metrics.',
  },
  {
    q: 'How do I disconnect an assistant?',
    a: 'In the P.R.O. app, open Settings → Connected assistants and tap Disconnect. The assistant loses access immediately. Removing the connector in the assistant’s own settings alone does not revoke access.',
  },
];
