// Recorded interfaces, October 8–10, 2026, supplemented by official setup docs.
export const MCP_URL = 'https://mcp.proapp.uk';
export const connectionSteps = [
  { title: 'Copy the address.', text: 'Copy https://mcp.proapp.uk — the address for every supported assistant.' },
  { title: 'Add a custom connector.', text: 'In your assistant’s settings, add a custom MCP connector. Paste the address and select OAuth if asked.' },
  { title: 'Get P.R.O. and copy your code.', text: 'Install P.R.O. on iPhone, sign in and choose your Apple Health permissions. Open Settings → MCP Connect, tap Get connection code, then tap the code to copy.' },
  { title: 'Paste the code. Connect.', text: 'Return to the authorization page. Paste or type the code, then select Connect. Choose what to share in P.R.O.' },
  { title: 'Start a conversation.', text: 'With P.R.O. enabled, ask your assistant about your workouts, sleep or progress.' },
];
export const guides = [
  {
    id: 'chatgpt', name: 'ChatGPT', platform: 'Set up on the web · use on iPhone too',
    intro: 'Add P.R.O. on chatgpt.com first. The ChatGPT iPhone app cannot add a custom MCP server; your connection works there after web setup.',
    verified: 'Recorded on ChatGPT Pro · October 8, 2026',
    helpUrl: 'https://developers.openai.com/plugins/deploy/connect-chatgpt',
    steps: [
      { title: 'Open Plugins in ChatGPT settings.', text: 'On chatgpt.com, open Settings → Plugins.', link: 'https://chatgpt.com/#settings/Connectors', linkText: 'Open ChatGPT settings ↗' },
      { title: 'Select Browse directory.', text: 'The Customize → Plugins directory opens.' },
      { title: 'Select Add.', text: 'The menu is in the top-right corner of the directory.' },
      { title: 'Select Add custom MCP server.' },
      { title: 'Enter PRO in Name.', text: 'The description and icon are optional.' },
      { title: 'Enter https://mcp.proapp.uk in Server URL.', text: 'Keep Server URL as the connection type.' },
      { title: 'Keep OAuth as Authentication.', text: 'Leave Advanced OAuth settings unchanged.' },
      { title: 'Select I understand and want to continue.', text: 'Read the custom MCP server notice first.' },
      { title: 'Select Create as a plugin.', text: 'The Connect PRO authorization prompt opens.' },
      { title: 'Select Continue to PRO ↗.', text: 'The P.R.O. authorization page opens. Complete the access steps below.', pairing: true },
      { title: 'Check that PRO appears under Installed.', text: 'Your ChatGPT account is connected. You can now use P.R.O. on the web and in the iPhone app.' },
    ],
  },
  {
    id: 'claude', name: 'Claude', platform: 'iPhone · custom connector',
    intro: 'In Claude, open Settings → Connectors. Add P.R.O. as a custom connector and approve access on your iPhone.',
    verified: 'Recorded on Claude for iPhone · October 10, 2026',
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
    verified: 'iPhone connection tested October 10, 2026 · Web setup follows Grok’s official guide',
    helpUrl: 'https://docs.x.ai/grok/connectors',
    steps: [
      { title: 'Open grok.com/connectors.', link: 'https://grok.com/connectors', linkText: 'Open Grok connectors ↗' },
      { title: 'Select New Connector.' },
      { title: 'Select Custom.' },
      { title: 'Enter https://mcp.proapp.uk as the server address.' },
      { title: 'Authorize P.R.O.', text: 'Complete the OAuth sign-in using the P.R.O. authorization steps.', pairing: true },
      { title: 'Choose what Grok can access.', text: 'Review the data switches in P.R.O., then tap Done.' },
    ],
  },
];
