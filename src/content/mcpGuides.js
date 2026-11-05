// Recorded interfaces, October 8–10, 2026, supplemented by official setup docs.
export const MCP_URL = 'https://mcp.proapp.uk';
export const connectionSteps = [
  { title: 'Copy the address.', text: 'Copy https://mcp.proapp.uk — the address for every supported assistant.' },
  { title: 'Add a custom connector.', text: 'In your assistant’s settings, add a custom MCP connector. Paste the address and select OAuth if asked. In ChatGPT, just install the P.R.O. plugin.' },
  { title: 'Get P.R.O. and copy your code.', text: 'Install P.R.O. on iPhone, sign in and choose your Apple Health permissions. Open Settings → MCP Connect, tap Get connection code, then tap the code to copy.' },
  { title: 'Paste the code. Connect.', text: 'Return to the authorization page. Paste or type the code, then select Connect. Choose what to share in P.R.O.' },
  { title: 'Start a conversation.', text: 'With P.R.O. enabled, ask your assistant about your workouts, sleep or progress.' },
];
export const guides = [
  {
    id: 'chatgpt', name: 'ChatGPT', platform: 'ChatGPT plugin directory · web and iPhone',
    intro: 'P.R.O. is in the ChatGPT plugin directory. Install it, approve access with a one-time code from your iPhone, and start asking.',
    verified: 'Install flow recorded from the ChatGPT plugin directory, November 2026',
    helpUrl: 'https://chatgpt.com/plugins/plugin_asdk_app_6ad22f791530819196ed668dfdbf6909',
    steps: [
      { title: 'Open the P.R.O. plugin in ChatGPT.', text: 'Sign in to ChatGPT if it asks.', link: 'https://chatgpt.com/plugins/plugin_asdk_app_6ad22f791530819196ed668dfdbf6909', linkText: 'Open P.R.O. in ChatGPT ↗' },
      { title: 'Select Install plugin.', text: 'It’s at the top right of the plugin page.' },
      { title: 'Select Connect P.R.O.', text: 'Read ChatGPT’s notice first. The P.R.O. authorization page opens.' },
      { title: 'Sign in to P.R.O.', text: 'The P.R.O. authorization page opens.', pairing: true },
      { title: 'Choose what ChatGPT can access.', text: 'Review the data switches in P.R.O. and tap Done.' },
      { title: 'Ask ChatGPT.', text: 'Your connection works on the web and in the ChatGPT iPhone app. Try “Show my latest run with its splits and route.”' },
    ],
    note: 'You can also add it by hand at https://mcp.proapp.uk: on chatgpt.com, Settings → Plugins → Browse directory → Add → Add custom MCP server, with OAuth.',
  },
  {
    id: 'claude', name: 'Claude', platform: 'iPhone · custom connector',
    intro: 'In Claude, open Settings → Connectors. Add P.R.O. as a custom connector and approve access on your iPhone.',
    verified: 'Tested by us, October 2026',
    helpUrl: 'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp',
    steps: [
      { title: 'Open Connectors in Claude settings.', text: 'The Connectors screen lists your available services.' },
      { title: 'Tap +.', text: 'The add menu appears in the top-right corner.' },
      { title: 'Tap Add custom connector.' },
      { title: 'Enter P.R.O. in Name.' },
      { title: 'Enter https://mcp.proapp.uk in MCP server URL.' },
      { title: 'Tap Continue.' },
      { title: 'Authorize P.R.O.', text: 'Follow Claude’s sign-in prompts to the P.R.O. authorization page.', pairing: true },
      { title: 'Choose what Claude can access.', text: 'In the P.R.O. confirmation, review the data switches, then tap Done.' },
    ],
  },
  {
    id: 'grok', name: 'Grok', platform: 'Web · iPhone',
    intro: 'Set up in a browser at grok.com/connectors. In the iPhone app, you can also use Connectors → Custom Connectors → Custom Connector → Connect.',
    verified: 'Tested by us, October 2026',
    helpUrl: 'https://docs.x.ai/grok/connectors',
    steps: [
      { title: 'Open grok.com/connectors.', link: 'https://grok.com/connectors', linkText: 'Open Grok connectors ↗' },
      { title: 'Select New Connector.' },
      { title: 'Select Custom.' },
      { title: 'Enter https://mcp.proapp.uk as the server address.' },
      { title: 'Authorize P.R.O.', text: 'Complete the OAuth sign-in using the P.R.O. authorization steps.', pairing: true },
      { title: 'Choose what Grok can access.', text: 'Review the data switches in P.R.O., then tap Done.' },
    ],
    note: 'Using Grok Bot? It has its own guide at proapp.uk/apple-health-grok-bot.',
  },
];
