/**
 * Publications.
 * To add a paper: copy an entry, fill the fields, and drop it in the right array.
 *   - `me: true` bolds that author in the rendered list.
 *   - `status`: 'published' | 'in-press' | 'under-review'
 *   - `url`: if set, the title links here. Use for arXiv / project pages.
 *   - `doi`: if set, a DOI link + the DOI string are shown.
 * BibTeX for the "Cite" button is generated automatically (see toBibTeX),
 * unless you provide a `bibtex` override.
 */

export type Author = { name: string; me?: boolean };

export type PubStatus = 'published' | 'in-press' | 'under-review';
export type PubType = 'journal' | 'conference';

export type Publication = {
  /** BibTeX citation key — must be unique. */
  id: string;
  authors: Author[];
  title: string;
  venue: string;
  year: number;
  type: PubType;
  status: PubStatus;
  url?: string;
  doi?: string;
  note?: string;
  bibtex?: string;
};

export const STATUS_META: Record<PubStatus, { label: string; order: number }> = {
  published: { label: 'Published', order: 0 },
  'in-press': { label: 'In press', order: 1 },
  'under-review': { label: 'Under review', order: 2 },
};

export const publications: Publication[] = [
  // ——— Journal Articles ———
  {
    id: 'patel2026llmaccel',
    authors: [{ name: 'S. Patel', me: true }, { name: 'R. Singh' }],
    title:
      'AI Hardware Accelerators for Large Language Models: Architectures and the Memory Wall.',
    venue: 'ACM Computing Surveys',
    year: 2026,
    type: 'journal',
    status: 'under-review',
    // url: 'https://arxiv.org/abs/TODO',
  },
  {
    id: 'patel2026bitwise',
    authors: [
      { name: 'S. Patel', me: true },
      { name: 'A. Awasthi' },
      { name: 'A. Chaurasia' },
      { name: 'R. Singh' },
    ],
    title:
      'Bitwise-Reproducible Reduction Across Cluster Reshape: A Compiler/Fabric ABI.',
    venue: 'IEEE Transactions on Parallel and Distributed Systems',
    year: 2026,
    type: 'journal',
    status: 'under-review',
    // url: 'https://arxiv.org/abs/TODO',
  },
  {
    id: 'patel2026rmai',
    authors: [{ name: 'S. Patel', me: true }, { name: 'R. Singh' }],
    title:
      'RMAI: Runtime Multi-Objective Adaptive Inference through Joint Dynamic Sparsity and Precision Scaling on Resource-Constrained IoT Edge Devices.',
    venue: 'IEEE Internet of Things Journal',
    year: 2026,
    type: 'journal',
    status: 'under-review',
    // url: 'https://arxiv.org/abs/TODO',
  },

  // ——— Conference Papers ———
  {
    id: 'patel2025rootoftrust',
    authors: [{ name: 'S. Patel', me: true }, { name: 'R. Singh' }],
    title: 'Hardware-Enabled Root of Trust for IoT Security.',
    venue:
      'Proc. IEEE Int. Conf. on Intelligent Systems and Embedded Design (ISED)',
    year: 2025,
    type: 'conference',
    status: 'published',
    doi: '10.1109/ISED67359.2025.11405039',
  },
  {
    id: 'rajeshwaran2026smartpower',
    authors: [
      { name: 'S. V. Rajeshwaran' },
      { name: 'O. Singh' },
      { name: 'S. Patel', me: true },
      { name: 'S. Singhal' },
      { name: 'R. Singh' },
    ],
    title:
      'Design and Implementation of a Smart Power Controller for Sensor Nodes.',
    venue: 'Proc. ICITSIF',
    year: 2026,
    type: 'conference',
    status: 'in-press',
  },
  {
    id: 'patel2026archaware',
    authors: [{ name: 'S. Patel', me: true }, { name: 'R. Singh' }],
    title:
      'Architecture-Aware Pruning and Quantisation for CPU-Only IoT Edge Inference.',
    venue: 'Proc. IEEE World Forum on the Internet of Things (WF-IoT)',
    year: 2026,
    type: 'conference',
    status: 'under-review',
    // url: 'https://arxiv.org/abs/TODO',
  },
];

/** Convenience derived counts for the "6 papers · 5 as first author" line. */
export const pubStats = {
  total: publications.length,
  firstAuthor: publications.filter((p) => p.authors[0]?.me).length,
};

/** Plain author string, e.g. "S. Patel, R. Singh". */
export function authorsPlain(pub: Publication): string {
  return pub.authors.map((a) => a.name).join(', ');
}

/** A resolved external link for a publication, if any. */
export function pubLink(pub: Publication): string | undefined {
  if (pub.url) return pub.url;
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  return undefined;
}

/** Generate a BibTeX entry for the "Cite" button. */
export function toBibTeX(pub: Publication): string {
  if (pub.bibtex) return pub.bibtex;
  const entryType = pub.type === 'journal' ? 'article' : 'inproceedings';
  const venueField = pub.type === 'journal' ? 'journal' : 'booktitle';
  const authorField = pub.authors.map((a) => a.name).join(' and ');
  const title = pub.title.replace(/\.$/, '');
  const lines = [
    `@${entryType}{${pub.id},`,
    `  author    = {${authorField}},`,
    `  title     = {${title}},`,
    `  ${venueField} = {${pub.venue}},`,
    `  year      = {${pub.year}},`,
  ];
  if (pub.doi) lines.push(`  doi       = {${pub.doi}},`);
  lines.push(`  note      = {${STATUS_META[pub.status].label}}`);
  lines.push('}');
  return lines.join('\n');
}
