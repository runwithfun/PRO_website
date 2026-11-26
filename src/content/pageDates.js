// First publication date of each page: the earliest commit that added its path to src/.
// Used as WebPage.datePublished. New pages: add the path with the day they go live.
export const PUBLISHED = {
  '/': '2025-07-12',
  '/features': '2025-07-12',
  '/faq': '2025-07-12',
  '/privacy': '2025-08-11',
  '/about': '2025-11-03',
  '/compare': '2026-10-03',
  '/terms': '2026-10-07',
  '/support': '2026-10-07',
  '/mcp-connect': '2026-10-10',
  '/apple-health-chatgpt': '2026-10-13',
  '/apple-health-claude': '2026-10-13',
  '/apple-health-grok': '2026-10-13',
  '/apple-health-codex': '2026-10-27',
  '/apple-health-perplexity': '2026-10-27',
  '/apple-health-gemini': '2026-10-27',
  '/apple-health-sync': '2026-10-27',
  '/what-is-a-good-hrv': '2026-10-27',
  '/zone-2-calculator': '2026-10-27',
  '/apple-watch-readiness-score': '2026-10-27',
  '/apple-health-ai-outside-us': '2026-10-27',
  '/apple-health-mcp': '2026-10-27',
  '/whoop-alternative': '2026-10-27',
  '/runna-alternative': '2026-10-27',
  '/apple-health-manus': '2026-11-02',
  '/apple-health-cherry-studio': '2026-11-02',
  '/apple-health-deepseek': '2026-11-02',
  '/apple-health-grok-bot': '2026-11-05',
  '/apple-health-superhuman': '2026-11-07',
  '/best-apple-health-mcp-servers': '2026-11-08',
  '/apple-health-cursor': '2026-11-14',
  '/garmin-to-chatgpt': '2026-11-26',
  '/whoop-to-chatgpt': '2026-11-26',
  '/oura-to-chatgpt': '2026-11-26',
  '/changelog': '2026-11-26',
  '/athlytic-alternative': '2026-11-26',
};
// Device guides (/garmin-apple-health and the rest) all went live together.
export const DEVICE_GUIDES_PUBLISHED = '2026-10-27';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// 'October 27, 2026' → '2026-10-27', so schema dates match the date shown on the page.
export function isoDate(text) {
  // Also accepts '27 October 2026'.
  const us = /^(\w+) (\d{1,2}), (\d{4})$/.exec(text ?? '');
  const uk = /^(\d{1,2}) (\w+) (\d{4})$/.exec(text ?? '');
  const [month, day, year] = us ? [us[1], us[2], us[3]] : uk ? [uk[2], uk[1], uk[3]] : [];
  if (!MONTHS.includes(month)) throw new Error(`isoDate: unexpected date "${text}"`);
  return `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
}
