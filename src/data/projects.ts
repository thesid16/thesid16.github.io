/**
 * Projects.
 * To add a project: copy an entry and fill the fields.
 *   - `featured: true` gives it the larger flagship card.
 *   - `badge`: small status pill (e.g. "Flagship · In progress").
 *   - `metrics`: optional short, punchy result line.
 *   - `links`: array of { label, href }. Use href:'' for a not-yet-public link
 *     and it renders as a disabled "coming soon" chip instead of a dead link.
 */

export type ProjectLink = { label: string; href: string };

export type Project = {
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  metrics?: string;
  links?: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Open-Source GPU Microarchitecture',
    badge: 'Flagship · In progress',
    featured: true,
    description:
      'A fully open, patent-unencumbered GPU built from first principles — microarchitecture, ISA, and synthesizable RTL. Existing GPU designs are locked behind AMD/NVIDIA IP; this is an attempt to build a credible, teachable alternative in the open. This is my undergraduate thesis.',
    tags: ['Computer Architecture', 'ISA Design', 'SystemVerilog RTL', 'GPU'],
    links: [{ label: 'Repo — coming soon', href: '' }],
  },
  {
    title: 'RMAI — Runtime Adaptive Inference',
    description:
      'A framework that jointly tunes per-layer sparsity and quantization to live device state (thermal, power, load) on resource-constrained edge hardware — trading accuracy for efficiency only when conditions demand it.',
    metrics: '↓ 14.8% latency · ↓ 15.4% energy · 38× better thermal robustness',
    tags: ['Edge AI', 'Quantization', 'Dynamic Sparsity', 'Energy-Aware'],
    links: [{ label: 'Paper (under review)', href: '' }],
  },
  {
    title: 'Bitwise-Reproducible Reduction',
    description:
      'A compiler/fabric ABI that guarantees bit-identical reduction results across heterogeneous GPU cluster reshapes — so a run is reproducible even when the cluster topology underneath it changes.',
    tags: ['Compilers', 'Distributed GPU', 'Numerics', 'ABI Design'],
    links: [{ label: 'Paper (under review)', href: '' }],
  },
  {
    title: 'AI-Driven Memory Design Automation',
    badge: '@ STMicroelectronics',
    description:
      'LLM-assisted RTL generation, fine-tuned domain models, and a from-scratch agent that automates the end-to-end memory design workflow — including ECC-protected subsystems (SEC / SECDED).',
    tags: ['LLM Agents', 'RTL Generation', 'Fine-tuning', 'ECC / SECDED'],
  },
];
