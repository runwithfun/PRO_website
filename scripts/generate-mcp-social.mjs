// Vector-only sharing preview. Run after changing the connector page's visual identity.
import fs from 'node:fs/promises';
import sharp from 'sharp';

const icon = (file) => fs.readFile(new URL(`../public/${file}`, import.meta.url));
const pro = (await icon('mcp-guide/pro-icon-256.png')).toString('base64');
const openai = (await icon('chat-logos/openai.svg')).toString('base64');
const labels = ['Sleep', 'Last run', 'Training load', 'Activity streak', 'Training plan', 'Heart rate', 'Your route', 'Pace', 'Recovery', 'Your goal', 'HRV', 'This week'];
const values = ['7h 24m', '8.92 km', '1.0', '14 days', '38%', '164 bpm', '8.92 km', '5:26 /km', 'Ready', '38%', '+19%', '4 sessions'];

function project(x, y, z) {
  const tilt = -.65, roll = -.34;
  const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
  const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
  const xx = x * Math.cos(roll) - yy * Math.sin(roll);
  const yyy = x * Math.sin(roll) + yy * Math.cos(roll);
  const depth = 1050 / (1050 - zz);
  return [888 + xx * depth, 323 + yyy * depth];
}
const cards = labels.map((label, i) => {
  const angle = i * Math.PI / 6 + .15;
  const point = (u, v) => project(Math.sin(angle) * 215 + u * Math.cos(angle), v, Math.cos(angle) * 215 - u * Math.sin(angle));
  const a = point(-53, -53), b = point(53, -53), c = point(-53, 53);
  const matrix = [(b[0] - a[0]) / 106, (b[1] - a[1]) / 106, (c[0] - a[0]) / 106, (c[1] - a[1]) / 106, ...a].join(' ');
  const chart = [24, 39, 29, 46, 35, 42, 51].map((h, n) => `<rect x="${12 + n * 12}" y="${92 - h}" width="8" height="${h}" rx="2" fill="${i % 3 === 0 ? '#398cce' : i % 3 === 1 ? '#d95094' : '#48ad70'}"/>`).join('');
  return { z: Math.cos(angle), svg: `<g transform="matrix(${matrix})" opacity="${.3 + .7 * (Math.cos(angle) + 1) / 2}"><rect width="106" height="106" rx="13" fill="#1d1c23" stroke="#383039"/><text x="10" y="18" fill="#e6e2eb" font-size="8">${label}</text><text x="10" y="37" fill="#fff" font-size="16" font-weight="600">${values[i]}</text>${chart}</g>` };
}).sort((a, b) => a.z - b.z);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" font-family="Helvetica,Arial,sans-serif">
<rect width="1200" height="630" fill="#0b0b0e"/>
<text x="76" y="103" fill="#9d9ba7" font-size="11" letter-spacing="3">P.R.O. · MCP CONNECT</text>
<text x="70" y="232" fill="#f5f5f6" font-size="64" letter-spacing="-3">Your health.</text>
<text x="70" y="309" fill="#f5f5f6" font-size="64" letter-spacing="-3">Your favorite <tspan fill="#ed62a4" font-family="Georgia,serif" font-style="italic">AI.</tspan></text>
<text x="76" y="379" fill="#aaa6b4" font-size="17">Apple Health, in the conversation.</text>
<text x="76" y="416" fill="#aaa6b4" font-size="13">ChatGPT · Claude · Codex · Grok</text>
<text x="76" y="540" fill="#e7e2ed" font-size="14">proapp.uk/mcp-connect</text>
${cards.filter(c => c.z < 0).map(c => c.svg).join('')}
<image x="824" y="290" width="54" height="54" xlink:href="data:image/png;base64,${pro}"/>
<circle cx="892" cy="318" r="2" fill="#ed62a4"/><circle cx="901" cy="318" r="2" fill="#ed62a4"/>
<rect x="916" y="290" width="54" height="54" rx="13" fill="#eee"/>
<image x="927" y="301" width="32" height="32" xlink:href="data:image/svg+xml;base64,${openai}"/>
${cards.filter(c => c.z >= 0).map(c => c.svg).join('')}
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(new URL('../public/mcp-guide/social.jpg', import.meta.url).pathname);
