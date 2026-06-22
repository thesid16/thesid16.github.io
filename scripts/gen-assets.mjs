/**
 * Generates raster assets from inline SVG:
 *   - public/og.png            (1200x630 social card)
 *   - public/apple-touch-icon.png (180x180)
 *   - public/favicon-32.png    (32x32 PNG fallback)
 *
 * Run with: npm run gen:assets
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const NAVY = '#003366';
const NAVY_DEEP = '#001226';
const CORAL = '#ef5630';

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#013a72"/>
      <stop offset="1" stop-color="${NAVY_DEEP}"/>
    </linearGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="rgba(255,255,255,0.06)"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="0" y="0" width="14" height="630" fill="${CORAL}"/>

  <!-- chip motif, top-right -->
  <g transform="translate(910 70) scale(11)" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6" rx="1" stroke="${CORAL}" stroke-opacity="0.5"/>
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2"/>
  </g>

  <text x="80" y="175" fill="${CORAL}" font-family="Menlo, 'Courier New', monospace" font-size="26" font-weight="700" style="letter-spacing:5px">UNDERGRADUATE RESEARCHER &#183; AI HARDWARE</text>

  <text x="78" y="300" fill="#ffffff" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="104" font-weight="700" style="letter-spacing:-2px">Siddharth Patel</text>

  <text x="80" y="372" fill="rgba(255,255,255,0.86)" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="36">Computer architecture &#183; VLSI &#183; AI accelerators</text>
  <text x="80" y="424" fill="rgba(255,255,255,0.86)" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="36">Compute-in-memory &#183; efficient, deterministic ML</text>

  <text x="80" y="560" fill="${CORAL}" font-family="Menlo, 'Courier New', monospace" font-size="30" font-weight="700">thesid16.github.io</text>
  <text x="1120" y="560" text-anchor="end" fill="rgba(255,255,255,0.55)" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="26">Shiv Nadar Institution of Eminence</text>
</svg>`;

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24">
  <rect width="24" height="24" rx="5" fill="${NAVY}"/>
  <g transform="translate(3 3) scale(0.75)">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#ffffff" stroke-width="1.8"/>
    <rect x="9" y="9" width="6" height="6" rx="1" fill="${CORAL}"/>
    <g stroke="#ffffff" stroke-width="1.8" stroke-linecap="round">
      <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2"/>
    </g>
  </g>
</svg>`;

async function run() {
  await sharp(Buffer.from(ogSvg)).png().toFile(join(pub, 'og.png'));
  await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toFile(join(pub, 'apple-touch-icon.png'));
  await sharp(Buffer.from(iconSvg))
    .resize(32, 32)
    .png()
    .toFile(join(pub, 'favicon-32.png'));
  console.log('✓ Generated og.png, apple-touch-icon.png, favicon-32.png');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
