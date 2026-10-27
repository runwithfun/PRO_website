// Imports researched device guides (JSON arrays, schema below) into
// src/content/deviceGuides.js and refreshes the matching section of public/llms.txt.
//
//   node scripts/import-device-guides.mjs group1.json [group2.json ...] [--replace]
//
// Entries are merged by id into the existing deviceGuides.js (a later file wins);
// --replace starts from an empty list instead. Output order and key order are fixed,
// so re-importing the same data produces the same file.
//
// Entry: { id, name, path, app, method: native|third-party|partial, checked: YYYY-MM-DD,
//   answer: [..], requirements: [..], syncs: [{ type, ok: true|false|"partial", note? }],
//   steps: [{ title, text, menu?: [..], ui?: install|permissions|sync|toggle }], afterSetup,
//   duplicates, trouble: [{ q, a }], faq: [{ q, a }], sources: [[title, url]],
//   thirdParty?: [{ name, pricing (or price), url (or appStore), note? }] }
// thirdParty lists bridge apps and is shown as a neutral block only when present.
// steps[].menu is the tap path shown as chips; when it is missing it is derived from
// "A › B › C" or "A → B → C" in the step text, or from "tap A, then B" prose. steps[].ui picks a drawn screen for steps
// without a path; it is guessed from the text when missing.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/content/deviceGuides.js');
const LLMS = path.join(ROOT, 'public/llms.txt');
const SITE = 'https://proapp.uk';

// Display order on the hub and in "other devices"; unknown ids go last, alphabetically.
const ORDER = ['garmin', 'whoop', 'oura', 'polar', 'coros', 'suunto', 'fitbit', 'samsung', 'amazfit', 'xiaomi', 'huawei', 'withings', 'ultrahuman', 'wahoo', 'strava', 'zwift', 'peloton'];
const KEYS = ['id', 'name', 'path', 'app', 'method', 'checked', 'answer', 'requirements', 'syncs', 'steps', 'thirdParty', 'afterSetup', 'duplicates', 'trouble', 'faq', 'sources'];
const METHODS = ['native', 'third-party', 'partial'];
const UI = ['install', 'permissions', 'sync', 'toggle'];

const args = process.argv.slice(2);
const replace = args.includes('--replace');
const files = args.filter((a) => !a.startsWith('--'));
if (!files.length) {
  console.error('Usage: node scripts/import-device-guides.mjs <group.json> [...] [--replace]');
  process.exit(1);
}

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const isText = (v) => typeof v === 'string' && v.trim().length > 0;
const textList = (v) => Array.isArray(v) && v.length > 0 && v.every(isText);

// Strip verbs and filler around a tap path: "In Garmin Connect, tap More" → "More",
// "Integrations → Apple Health (top of the page)" → "Apple Health".
const LEAD = /^(?:.*,\s*)?(?:(?:then|and|in|on|from|open|tap|select|choose|go to|navigate to|head to)\s+)*(?:the\s+|your\s+)?/i;
function chip(segment, last, first) {
  let s = (last ? segment.split(/,|\s+(?:and|then|if)\s+|\s+—\s+/)[0] : first ? segment.replace(/^.*:\s+/, '') : segment).replace(/[“”"'‘’]/g, '').trim().replace(LEAD, '');
  s = s.replace(/^.*\b(?:tap|select|choose|go to)\s+(?:the\s+|your\s+)?/i, '').replace(/\s*\([^)]*\)?/g, '');
  s = s.replace(/[.,;:]+$/, '').trim();
  // A trailing instruction ("toggle categories on or off") is not a menu item.
  return last && !/^[A-Z0-9]/.test(s) ? '' : s;
}
function deriveMenu(text) {
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    let parts = sentence.split(/\s*(?:›|→|>)\s*/);
    // "A → B, or C → D" offers two paths: keep the first.
    const alt = parts.findIndex((p, i) => i > 0 && /,\s*or\s/i.test(p));
    if (alt > 0) parts = [...parts.slice(0, alt), parts[alt].split(/,\s*or\s/i)[0]];
    if (parts.length < 2) continue;
    const menu = parts.map((p, i) => chip(p, i === parts.length - 1, i === 0)).filter(Boolean);
    if (menu.length >= 2 && menu.every((m) => m.length <= 40)) return menu.filter((m, i) => m !== menu[i - 1]);
  }
  return undefined;
}
// Prose: "In Google Health, tap Connections at the top left, then Apps and services."
const STOP = /(?=\s+(?:at|in|on|from|then|if|or|again|for|until)\b|\s+and\s+(?:tap|open|select|choose|scroll|go|agree|follow|turn|make|allow|link|wait)\b|\s+to\s+[a-z]|\s*[,.;:(“”"]|$)/;
function deriveTaps(text) {
  const pattern = new RegExp(`(?:\\b(?:[Tt]ap|[Ss]elect|[Cc]hoose|[Oo]pen|[Gg]o to|[Ss]croll to)|,\\s*then)\\s+(?:the\\s+|your\\s+)?([A-Z0-9][^,.;:()“”"]*?)${STOP.source}`, 'g');
  const taps = [...text.matchAll(pattern)].map((m) => m[1].trim()).filter((m, i, all) => m.length <= 40 && m !== all[i - 1]);
  return taps.length ? taps : undefined;
}

// Picks the drawn screen for a step without a menu path: Apple's permission sheet, a switch
// or the sync flow (an App Store row for update/install steps is chosen before). Steps that match none get a generic screen with the title as the tap.
function guessUi(title, text) {
  if (/turn (?:on )?all|\btap allow\b|then (?:tap )?allow\b/i.test(text)) return 'permissions';
  if (/\bsync\b/i.test(title) || /\bsync now\b/i.test(text)) return 'sync';
  if (/\btoggle\b|\bswitch\b|\benable\b|\bturn on\b/i.test(`${title} ${text}`)) return 'toggle';
  return undefined;
}

function normalize(entry, where) {
  if (!entry || typeof entry !== 'object') return fail(where, 'not an object');
  const at = `${where} (${entry.id ?? '?'})`;
  if (!/^[a-z0-9-]+$/.test(entry.id ?? '')) fail(at, 'id must be a lowercase slug');
  if (!isText(entry.name)) fail(at, 'name is required');
  if (!/^\/[a-z0-9-]+$/.test(entry.path ?? '')) fail(at, 'path must look like /garmin-apple-health');
  if (typeof entry.app !== 'string') fail(at, 'app must be a string ("" if none)');
  if (!METHODS.includes(entry.method)) fail(at, `method must be one of ${METHODS.join(', ')}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.checked ?? '')) fail(at, 'checked must be YYYY-MM-DD');
  for (const key of ['answer', 'requirements']) if (!textList(entry[key])) fail(at, `${key} must be a non-empty list of strings`);
  for (const key of ['afterSetup', 'duplicates']) if (!isText(entry[key])) fail(at, `${key} is required`);
  if (!Array.isArray(entry.syncs) || !entry.syncs.length) fail(at, 'syncs must be a non-empty list');
  for (const s of entry.syncs ?? []) {
    if (!isText(s.type)) fail(at, 'syncs[].type is required');
    if (![true, false, 'partial'].includes(s.ok)) fail(at, `syncs "${s.type}": ok must be true, false or "partial"`);
  }
  if (!Array.isArray(entry.steps) || !entry.steps.length) fail(at, 'steps must be a non-empty list');
  for (const s of entry.steps ?? []) {
    if (!isText(s.title) || !isText(s.text)) fail(at, 'steps[] need title and text');
    if (s.menu !== undefined && !textList(s.menu)) fail(at, `step "${s.title}": menu must be a list of strings`);
    if (s.ui !== undefined && !UI.includes(s.ui)) fail(at, `step "${s.title}": ui must be one of ${UI.join(', ')}`);
  }
  for (const key of ['trouble', 'faq']) {
    if (!Array.isArray(entry[key]) || !entry[key].length || !entry[key].every((x) => isText(x?.q) && isText(x?.a))) fail(at, `${key} must be a non-empty list of { q, a }`);
  }
  if (!Array.isArray(entry.sources) || !entry.sources.length || !entry.sources.every((s) => Array.isArray(s) && isText(s[0]) && /^https:\/\//.test(s[1] ?? ''))) {
    fail(at, 'sources must be a non-empty list of [title, https URL]');
  }
  const bridges = entry.thirdParty === undefined ? undefined : (Array.isArray(entry.thirdParty) ? entry.thirdParty : [null]).map((t) => ({
    name: t?.name, pricing: t?.pricing ?? t?.price, url: t?.url ?? t?.appStore, ...(isText(t?.note) && { note: t.note }),
  }));
  for (const t of bridges ?? []) {
    if (!isText(t.name) || !isText(t.pricing) || !/^https:\/\//.test(t.url ?? '')) fail(at, 'thirdParty[] need name, pricing and an https url');
  }
  const unknown = Object.keys(entry).filter((k) => !KEYS.includes(k));
  if (unknown.length) console.warn(`${at}: ignoring unknown keys ${unknown.join(', ')}`);

  const out = {};
  for (const key of KEYS) out[key] = entry[key];
  out.syncs = (entry.syncs ?? []).map(({ type, ok, note }) => ({ type, ok, ...(isText(note) && { note }) }));
  out.steps = (entry.steps ?? []).map(({ title, text, menu, ui }) => {
    const install = !menu && !ui && (/^(?:update|install|download)\b/i.test(title ?? '') || /^(?:update|install|download)\b(?!.*\b(?:tap|then)\b)/i.test(text ?? '')) ? 'install' : undefined;
    const path = menu ?? (ui || install ? undefined : deriveMenu(text ?? ''));
    const kind = ui ?? install ?? (path ? undefined : guessUi(title ?? '', text ?? ''));
    const derived = path ?? (kind ? undefined : deriveTaps(text ?? ''));
    return { title, text, ...(derived && { menu: derived }), ...(kind && { ui: kind }) };
  });
  if (bridges?.length) out.thirdParty = bridges;
  else delete out.thirdParty;
  out.trouble = (entry.trouble ?? []).map(({ q, a }) => ({ q, a }));
  out.faq = (entry.faq ?? []).map(({ q, a }) => ({ q, a }));
  return out;
}

const byId = new Map();
if (!replace && fs.existsSync(OUT)) {
  const { deviceGuides } = await import(`${pathToFileURL(OUT).href}?t=${Date.now()}`);
  for (const g of deviceGuides) byId.set(g.id, g);
}
for (const file of files) {
  const entries = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
  if (!Array.isArray(entries)) {
    fail(file, 'expected a JSON array of entries');
    continue;
  }
  entries.forEach((entry, i) => {
    const g = normalize(entry, `${path.basename(file)}[${i}]`);
    if (g) byId.set(g.id, g);
  });
}
const paths = new Map();
for (const g of byId.values()) {
  if (paths.has(g.path)) fail(g.id, `path ${g.path} is also used by ${paths.get(g.path)}`);
  paths.set(g.path, g.id);
}
if (errors.length) {
  console.error(`Not imported, fix these first:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const rank = (id) => (ORDER.includes(id) ? ORDER.indexOf(id) : ORDER.length);
const guides = [...byId.values()].sort((a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id));

fs.writeFileSync(
  OUT,
  `// Generated by scripts/import-device-guides.mjs from researched JSON. Don't edit by hand:
// fix the JSON and re-import. One page per device at its path, listed on /apple-health-sync.
export const deviceGuides = ${JSON.stringify(guides, null, 2)};
`,
);

// llms.txt: one line per guide under its own heading, regenerated on every import.
const list = (names, joiner = 'and') => (names.length > 1 ? `${names.slice(0, -1).join(', ')} ${joiner} ${names.at(-1)}` : names[0] ?? '');
const short = (type) => type.replace(/\s*\/.*$/, '').toLowerCase().replace(/^hrv$/, 'HRV').replace(/^vo2 max$/, 'VO2 max');
const METHOD_TEXT = { native: 'native', 'third-party': 'needs a third-party bridge app', partial: 'partial native sync' };
const line = (g) => {
  const yes = g.syncs.filter((s) => s.ok === true).map((s) => short(s.type));
  const some = g.syncs.filter((s) => s.ok === 'partial').map((s) => short(s.type));
  const no = g.syncs.filter((s) => s.ok === false).map((s) => short(s.type));
  const parts = [`${METHOD_TEXT[g.method]}${g.app ? ` via ${g.app}` : ''}`];
  if (yes.length) parts.push(`syncs ${list(yes)}`);
  if (some.length) parts.push(`partly ${list(some)}`);
  if (no.length) parts.push(`not ${list(no, 'or')}`);
  return `- [How to sync ${g.name} with Apple Health](${SITE}${g.path}): ${parts.join('; ')}. Setup steps, double-counting fix, troubleshooting; checked ${g.checked}.`;
};
const section = [
  '## Apple Health sync guides',
  '',
  `- [Sync any fitness tracker with Apple Health](${SITE}/apple-health-sync): which devices write to Apple Health natively and which need a bridge app, a device × data type matrix (workouts, sleep, HRV, heart rate, steps), and how Health merges several sources. P.R.O. reads whatever these devices write to Apple Health.`,
  ...guides.map(line),
  '',
].join('\n');
let llms = fs.readFileSync(LLMS, 'utf8');
const existing = /## Apple Health sync guides\n[\s\S]*?(?=\n## |$)/;
if (existing.test(llms)) llms = llms.replace(existing, () => section.trimEnd() + '\n');
else llms = llms.replace('## App & legal', () => `${section}\n## App & legal`);
fs.writeFileSync(LLMS, llms);

console.log(`deviceGuides.js: ${guides.length} guides (${guides.map((g) => g.id).join(', ')}); llms.txt updated.`);
