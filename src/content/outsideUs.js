// "Apple Health in AI assistants outside the US" — status table, FAQ and sources.
// Every availability fact below was checked on October 27, 2026 against the official page
// listed in outsideUsSources. P.R.O. facts come from assistantGuides.js, mcpFaq.js,
// public/llms.txt and the Privacy Policy. App Store storefronts were checked with Apple's
// lookup API (itunes.apple.com/lookup?id=6749865568&country=gb, de, fr, ie, nl, es, it, se,
// ch, ca, au, in) on the same day.

export const CHECKED = 'October 27, 2026';

// Countries where we confirmed the P.R.O. App Store listing on CHECKED.
export const STOREFRONTS = ['the UK', 'Ireland', 'Germany', 'France', 'the Netherlands', 'Spain', 'Italy', 'Sweden', 'Switzerland', 'Canada', 'Australia', 'India'];

// [assistant, built-in Apple Health feature, where it works, plans and apps, P.R.O. connector outside the US, guide path]
export const STATUS = [
  [
    'ChatGPT',
    'Health in ChatGPT reads Apple Health from the ChatGPT iPhone app.',
    'US only. Launched to US users on July 23, 2026. The early access that opened on January 7, 2026 excluded the EEA, Switzerland and the UK.',
    'Free, Go, Plus and Pro, on the web and iOS. Connecting Apple Health needs an iPhone.',
    'Yes. Add P.R.O. as a custom MCP server on chatgpt.com, on a plan that allows custom MCP servers. We recorded the setup on Pro.',
    '/apple-health-chatgpt',
  ],
  [
    'Claude',
    'Apple Health integration, in beta.',
    'US only.',
    'Pro and Max, in the Claude iPhone app.',
    'Yes. Custom connectors are on Free (one connector), Pro, Max, Team and Enterprise.',
    '/apple-health-claude',
  ],
  [
    'Perplexity',
    'Perplexity Health, launched in March 2026.',
    'US, in a phased rollout. Perplexity says more regions are coming, with no dates.',
    'Pro and Max, on iOS and the web. Apple Health needs an iPhone and is 18+.',
    'Yes, as a custom remote connector on plans with custom connectors.',
    '/apple-health-perplexity',
  ],
  [
    'Microsoft Copilot',
    'Copilot Health, in preview. It connects wearables, starting with Apple Health.',
    'US residents only, 18 and older.',
    'Microsoft 365 Personal, Family and Premium. On the web, in the Windows app and in Edge; Microsoft says the iOS app is coming.',
    'No. Microsoft’s help for consumer Copilot lists only built-in connections (OneDrive, Outlook.com, Google Drive and Gmail). We haven’t tested P.R.O. in Copilot.',
    null,
  ],
  [
    'Gemini',
    'None in the Gemini chat. Google Health Coach lives in the Google Health app and needs a Fitbit or Pixel Watch.',
    'Google Health Premium, which the coach needs, is offered in 37 countries, including the UK, Ireland, Germany, France, Canada, Australia and India.',
    'Google Health Premium, 18+.',
    'No. Gemini custom apps are US only, for adults with a personal Google account, in English.',
    '/apple-health-gemini',
  ],
  [
    'Grok',
    'None.',
    '—',
    '—',
    'Yes. xAI says connectors are available to all Grok users. Add P.R.O. on grok.com or in the Grok iPhone app.',
    '/apple-health-grok',
  ],
  [
    'Codex',
    'None.',
    '—',
    '—',
    'Yes. Add P.R.O. as an MCP server in the ChatGPT desktop app or the Codex CLI, on a plan that includes Codex.',
    '/apple-health-codex',
  ],
];

// Per-assistant notes for "How to do it from the UK, EU, Canada, Australia or India".
export const ROUTES_OUTSIDE = [
  { name: 'ChatGPT', path: '/apple-health-chatgpt', text: 'Set it up once on chatgpt.com — Safari on iPhone works — and it then appears in the ChatGPT iPhone app too. The iPhone app can’t add custom servers on its own.' },
  { name: 'Claude', path: '/apple-health-claude', text: 'Add a custom connector in the Claude app under Settings → Connectors. It works on the Free plan, which allows one custom connector.' },
  { name: 'Perplexity', path: '/apple-health-perplexity', text: 'Add a custom remote connector on perplexity.ai. Perplexity answers in text and draws its own charts.' },
  { name: 'Grok', path: '/apple-health-grok', text: 'Add a custom connector at grok.com/connectors or in the Grok iPhone app.' },
  { name: 'Codex', path: '/apple-health-codex', text: 'Add P.R.O. as an MCP server in the ChatGPT desktop app, or run codex mcp add pro --url https://mcp.proapp.uk.' },
];

export const outsideUsFaq = [
  {
    q: 'Is ChatGPT Health available in the UK?',
    a: 'No. OpenAI’s help page lists Health in ChatGPT for users in the US only (checked October 27, 2026), and the early access that opened in January 2026 excluded the UK, the EEA and Switzerland. In the UK you can still bring Apple Health into ChatGPT by adding the free P.R.O. app as a custom MCP server at https://mcp.proapp.uk.',
  },
  {
    q: 'Why is ChatGPT Health not available in my country?',
    a: 'OpenAI launched Health in ChatGPT to US users on July 23, 2026 and has not published a date for other countries. In January 2026 the early-access group was open outside the EEA, Switzerland and the UK, but since the launch OpenAI’s help page lists the US only. The P.R.O. connector is not limited to the US.',
  },
  {
    q: 'Can Claude read Apple Health outside the US?',
    a: 'Not through Claude’s own integration: Anthropic describes it as a beta for US users on Pro and Max. Custom connectors are a different feature, available on Free, Pro, Max, Team and Enterprise plans, so you can add P.R.O. at https://mcp.proapp.uk from the UK, the EU, Canada, Australia or India.',
  },
  {
    q: 'Is Perplexity Health available in the UK, Canada, Australia or India?',
    a: 'Not yet. Perplexity Health is for Pro and Max subscribers in the US, in a phased rollout; Perplexity says more regions are coming but gives no dates. Outside the US you can add P.R.O. as a custom remote connector on perplexity.ai.',
  },
  {
    q: 'Can I use Gemini with Apple Health in Europe?',
    a: 'Not with P.R.O. today. Gemini has no built-in Apple Health integration, and Google offers custom apps in Gemini only in the US, to adults with a personal Google account. Google Health Coach is offered in the UK and much of the EU, but it lives in the Google Health app and needs a Fitbit or Pixel Watch and Google Health Premium.',
  },
  {
    q: 'Can I use a VPN to get ChatGPT Health or Claude’s Apple Health feature?',
    a: 'We don’t recommend it. These providers decide availability by account and region, so a VPN may not unlock a feature, and getting around a regional restriction may breach the provider’s terms and put your account at risk. A custom connector is a supported feature in ChatGPT, Claude, Perplexity, Grok and Codex, so you can use P.R.O. from where you are.',
  },
  {
    q: 'Does P.R.O. work in the EU and the UK?',
    a: 'Yes. On October 27, 2026 the P.R.O. App Store listing was available in the UK, Ireland, Germany, France, the Netherlands, Spain, Italy, Sweden, Switzerland, Canada, Australia and India. The connector at https://mcp.proapp.uk has no country restriction of its own; your assistant’s plan needs to allow custom connectors, and Gemini custom apps are US only.',
  },
  {
    q: 'Where does my health data go, and what about GDPR?',
    a: 'P.R.O. syncs only the Apple Health categories you allow. When your assistant asks, the categories you permit are processed by the MCP operator, Dorokhov Daniil in Armenia, and returned to the assistant you connected, whose own privacy policy then applies. P.R.O. does not sell the data, use it for advertising or train AI models on it. EU and EEA users have GDPR rights (Articles 15–22) over data held by HAOTONG TECHNOLOGY (HK) CO., LIMITED; write to mail@proapp.uk.',
  },
];

export const outsideUsSources = [
  ['OpenAI Help — Health in ChatGPT (US only; Free, Go, Plus, Pro; web and iOS)', 'https://help.openai.com/en/articles/20001036'],
  ['OpenAI — Launching Health in ChatGPT, July 23, 2026', 'https://openai.com/index/health-in-chatgpt/'],
  ['OpenAI — Introducing ChatGPT Health, January 7, 2026 (early access outside the EEA, Switzerland and the UK)', 'https://openai.com/index/introducing-chatgpt-health/'],
  ['Claude Help — health integrations (beta, US only, Pro and Max)', 'https://support.claude.com/en/articles/11869619'],
  ['Claude Help — custom connectors using remote MCP (Free, Pro, Max, Team, Enterprise)', 'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp'],
  ['Perplexity Help — What is Perplexity Health? (Pro and Max in the US, phased rollout)', 'https://www.perplexity.ai/help-center/en/articles/14035438-what-is-perplexity-health'],
  ['Perplexity — Introducing Perplexity Health, March 19, 2026', 'https://www.perplexity.ai/hub/blog/introducing-perplexity-health'],
  ['Microsoft Support — About Copilot Health (preview, US residents 18+, Microsoft 365 Personal, Family, Premium)', 'https://support.microsoft.com/en-us/microsoft-copilot/copilot-health'],
  ['Microsoft Source — Copilot Health now in preview, May 29, 2026 (Spanish)', 'https://news.microsoft.com/source/latam/noticias-de-microsoft/copilot-health-ahora-en-vista-previa/'],
  ['Microsoft Support — Connecting Microsoft Copilot to other services', 'https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services'],
  ['Google Health Help — Google Health Coach (Fitbit or Pixel Watch, Google Health Premium, country list)', 'https://support.google.com/googlehealth/answer/16961408?hl=en'],
  ['Gemini Apps Help — custom apps (US, 18+, personal account, English)', 'https://support.google.com/gemini/answer/17209137?hl=en'],
  ['xAI Docs — Grok connectors (available to all Grok users)', 'https://docs.x.ai/grok/connectors'],
];
