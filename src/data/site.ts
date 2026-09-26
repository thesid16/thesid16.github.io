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
  `I'm a final-year B.Tech student in Electrical &amp; Computer Engineering at
   <a href="https://snu.edu.in/" target="_blank" rel="noopener">Shiv Nadar Institution of Eminence</a>,
   working at the intersection of <strong>hardware and AI — in both directions</strong>.`,
  `On the <em>hardware-for-AI</em> side: accelerator architectures, memory systems, and making
   large-model inference efficient, adaptive and reproducible on real hardware. On the
   <em>AI-for-hardware</em> side, I spent summer 2026 at <strong>STMicroelectronics</strong>
   building automation for memory design — a generator that emits synthesis-ready ECC RTL, the
   verification harness that proves it correct, and a controlled study of what LLMs can and
   cannot contribute to RTL generation.`,
  `My undergraduate thesis is an <strong>open-source GPU microarchitecture</strong> designed from
   first principles — ISA, microarchitecture and synthesizable RTL, patent-unencumbered — because
   this field shouldn't stay locked behind a handful of proprietary architectures. The golden-model
   simulator came first, so the RTL can be checked against something known-correct rather than
   debugged in isolation.`,
  `I'm applying to PhD programmes for Fall 2027. I'd like to spend it on the architectures and
   memory systems that will run the next generation of models, and on the methodology question
   underneath my current work: how do you know a hardware result is real?`,
];

/** Honors & recognition. Add or edit entries freely — order is preserved. */
export type Honor = {
  title: string;
  org: string;
  detail: string;
};

export const honors: Honor[] = [
  {
    title: 'Student of the Year',
    org: 'Shiv Nadar Institution of Eminence',
    detail: 'University-wide recipient, Class of 2027.',
  },
  {
    title: 'Invited Peer Reviewer',
    org: 'IEEE ICNARI 2026',
    detail: 'IEEE International Conference on Next-Generation Adaptive Research & Innovations.',
  },
  {
    title: 'National Selection',
    org: 'Anveshana National Science Fair · 2025',
    detail: 'Selected from 20,000+ applicants nationwide.',
  },
  {
    title: 'Atal Incubation Centre Grant',
    org: 'Life Link health platform · 2024–25',
    detail: 'INR 100K grant with mentorship and incubation support.',
  },
  {
    title: "Dean's List",
    org: 'School of Engineering',
    detail: 'For academic standing — Fall 2023, Spring 2024, Fall 2025, and Spring 2026.',
  },
  {
    title: 'Top 10% of cohort',
    org: 'CGPA 8.75 / 10',
    detail: 'Consistent academic standing in Electrical & Computer Engineering.',
  },
];

/** Service & outreach — same shape as honors. The reviewer invitation appearing in both is intentional. */
export const service: Honor[] = [
  {
    title: 'Invited Peer Reviewer',
    org: 'IEEE ICNARI 2026',
    detail: 'IEEE International Conference on Next-Generation Adaptive Research & Innovations (ICNARI).',
  },
  {
    title: 'STEM Outreach',
    org: 'Anveshana National Science Fair · Pragati Maidan, Delhi · 2024–25',
    detail: 'Led workshops for 50+ school students and presented a secure-IoT prototype to 300+ attendees.',
  },
];

/** Photo + caption shown alongside the honors list. Drop the image in /public. */
export const recognition = {
  image: '/award.jpg',
  width: 1600,
  height: 1066,
  alt: "Siddharth Patel receiving the Dean's List award on stage from Dr. Suneet Tuli, Dean of Engineering",
  caption:
    "Receiving the Dean's List award from Dr. Suneet Tuli, Dean of Engineering.",
} as const;

/** Industry and teaching experience. Add or edit entries freely — order is preserved. */
export type ExperienceEntry = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Technology R&D (TRD) Intern',
    org: 'STMicroelectronics',
    location: 'Greater Noida, India',
    start: 'Jun 2026',
    end: 'Aug 2026',
    bullets: [
      'Automated ECC memory design: replaced a manual, multi-engineer, per-variant RTL flow with a Python generator producing synthesis-ready SEC/SECDED encoder/decoder RTL across 7+ configuration axes.',
      'Studied LLM-based RTL generation across 4 output representations and 7 training regimes; a ~10M-parameter from-scratch model reached 0.887 formal equivalence at ~1,600× less energy per correct design than a 32B fine-tune.',
      'Built a 6-stage verification harness (exhaustive fault injection, formal equivalence, synthesis) and a spec-driven UVM testbench for an APB slave that found and fixed 4 RTL bugs.',
    ],
  },
  {
    role: 'Teaching Assistant — Digital Electronics',
    org: 'Department of Electrical Engineering, Shiv Nadar Institution of Eminence',
    location: 'Greater Noida, India',
    start: 'Aug 2026',
    end: 'Present',
    bullets: [
      'Running digital-design labs for 60 students, and independently designing three FPGA experiments that teach Verilog through progressively harder RTL tasks rather than fill-in-the-blank exercises.',
    ],
  },
  {
    role: 'Curriculum Designer & Lab Instructor — Electronics & IoT',
    org: 'Department of Electrical Engineering, Shiv Nadar Institution of Eminence',
    location: 'Greater Noida, India',
    start: 'Jul 2025',
    end: 'May 2026',
    bullets: [
      'Built the first-year Electronics & IoT lab course: experiments, modules, learning objectives and assessments for 480+ students, taught 120+ directly, and led the build-out of a 20-station research lab from equipment procurement through setup.',
    ],
  },
  {
    role: 'Independent Consultant — Electronics Design',
    org: 'Electronics manufacturer (confidential)',
    location: 'Delhi NCR, India',
    start: 'Feb 2025',
    end: 'Jul 2025',
    bullets: [
      'Sole engineer on a full product redesign: re-architected 3- and 4-phase voltage stabilizers end to end (circuit, PCB, firmware, enclosure), cutting production cost by ~70% through modular reuse while keeping backward compatibility with legacy units.',
    ],
  },
];

/** Internship completion certificate, shown alongside the Experience entry. */
export const certificate = {
  pdfPath: '/st-certificate.pdf',
  image: '/st-certificate-1.jpg',
  width: 1224,
  height: 1584,
  alt: "STMicroelectronics internship completion certificate for Siddharth Patel",
  caption: 'Internship completion certificate — STMicroelectronics, Aug 14, 2026.',
} as const;

/** Research interest chips. */
export const researchInterests: string[] = [
  'Computer architecture & AI hardware accelerators',
  'Digital VLSI & SoC design',
  'Memory systems & compute-in-memory',
  'Efficient & adaptive AI inference and training',
  'Hardware–software co-design',
];
