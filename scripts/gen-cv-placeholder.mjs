/**
 * Writes a minimal, valid one-page placeholder at public/cv.pdf so the embedded
 * viewer renders before you add your real CV. Replace public/cv.pdf with your
 * compiled CV (keep the same filename) — no code changes needed.
 *
 * Run with: node scripts/gen-cv-placeholder.mjs
 */
import { writeFileSync } from 'node:fs';

// ASCII only — byte offsets in the xref table must stay exact.
const stream = [
  'BT /F1 26 Tf 72 706 Td (Siddharth Patel) Tj ET',
  'BT /F1 13 Tf 72 678 Td (Curriculum Vitae - placeholder) Tj ET',
  'BT /F1 11 Tf 72 648 Td (Replace public/cv.pdf with your compiled CV PDF.) Tj ET',
].join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

writeFileSync(new URL('../public/cv.pdf', import.meta.url), pdf, 'latin1');
console.log('✓ Wrote placeholder public/cv.pdf');
