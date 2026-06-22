/**
 * Site-wide configuration and identity.
 * Edit this file to update your name, tagline, contact info, and profile links.
 * Nothing here touches layout — it's safe to change.
 */

export const site = {
  name: 'Siddharth Patel',
  /** Used in <title> and the browser tab. */
  shortName: 'Siddharth Patel',
  /** One-line identity (also the SEO meta description fallback). */
  tagline:
    'Undergraduate researcher in AI hardware — computer architecture, VLSI, and efficient, deterministic machine learning, from circuits to compilers.',
  /** Short meta description for search/social. Keep under ~160 chars. */
  description:
    'Siddharth Patel — undergraduate researcher in AI hardware: computer architecture, VLSI, compute-in-memory, and efficient, deterministic ML. Publications, projects, and CV.',
  location: 'Greater Noida, India',
  role: 'Undergraduate Researcher',
  affiliation:
    'B.Tech, Electrical & Computer Engineering · Shiv Nadar Institution of Eminence',
  affiliationShort: 'Shiv Nadar Institution of Eminence',
  affiliationUrl: 'https://snu.edu.in/',
  graduation: 'Expected May 2027',
  email: 'sp839@snu.edu.in',
  /** Canonical site URL — keep in sync with astro.config.mjs `site`. */
  url: 'https://thesid16.github.io',
  /** Path to the CV PDF inside /public. Drop your file at public/cv.pdf. */
  cvPath: '/cv.pdf',

  /** A short "what I'm doing right now" line for the hero status pill (no-JS default). */
  nowLine: 'designing an open-source GPU from first principles',

  /**
   * Phrases that cycle after "Currently" in the hero status pill (the animated
   * bit). Purely decorative — `nowLine` is always rendered first for no-JS / SEO.
   */
  heroRotators: [
    'designing an open-source GPU from first principles',
    'making large-model inference deterministic',
    'automating memory design with LLM agents',
    'chasing latency through the memory wall',
  ],
} as const;

export type ProfileLink = {
  label: string;
  href: string;
  /** Key into the icon set in src/components/Icon.astro */
  icon: 'email' | 'github' | 'linkedin' | 'scholar' | 'orcid';
  /** Shown verbatim where we display the handle/address. */
  handle: string;
};

export const profileLinks: ProfileLink[] = [
  {
    label: 'Email',
    href: 'mailto:sp839@snu.edu.in',
    icon: 'email',
    handle: 'sp839@snu.edu.in',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/thesid16',
    icon: 'github',
    handle: '@thesid16',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sidd16/',
    icon: 'linkedin',
    handle: 'in/sidd16',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=_lfAVjMAAAAJ',
    icon: 'scholar',
    handle: 'Scholar profile',
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0009-0009-5384-0341',
    icon: 'orcid',
    handle: '0009-0009-5384-0341',
  },
];

/** About section — written in light HTML so key phrases can be emphasized. */
export const about: string[] = [
  `I'm a third-year Electrical &amp; Computer Engineering student at
   <a href="https://snu.edu.in/" target="_blank" rel="noopener">Shiv Nadar Institution of Eminence</a>,
   working at the intersection of <strong>hardware and AI — in both directions</strong>.
   On the <em>hardware-for-AI</em> side, my research spans AI accelerators, compute-in-memory,
   and making large-model inference efficient, adaptive, and deterministic. On the
   <em>AI-for-hardware</em> side, I work at <strong>STMicroelectronics</strong> building
   AI-driven automation for memory design — LLM-assisted RTL generation, fine-tuned domain
   models, and an agent that drives the design flow.`,
  `Right now I'm designing an <strong>open-source GPU microarchitecture</strong> from first
   principles as my undergraduate thesis. I'm applying to graduate programs to go deeper on
   the architecture and systems that will run the next generation of AI.`,
  `If any of this overlaps with your group's work, I'd love to talk — my inbox is always open.`,
];

/** Research interest chips. */
export const researchInterests: string[] = [
  'Computer architecture & AI hardware accelerators',
  'Digital VLSI & SoC design',
  'Memory systems & compute-in-memory',
  'Efficient & adaptive AI inference and training',
  'Hardware–software co-design',
];
