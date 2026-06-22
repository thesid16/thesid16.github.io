# thesid16.github.io

Academic personal website for **Siddharth Patel** — built with [Astro](https://astro.build/).
Fast, static, content-first, and deployed free to GitHub Pages.

🔗 **Live:** https://thesid16.github.io

---

## Quick start

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:4321
```

That's the only command you need to see the site locally.

| Command               | What it does                                              |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Local dev server with hot reload (http://localhost:4321) |
| `npm run build`       | Production build into `dist/`                             |
| `npm run preview`     | Serve the built `dist/` locally to sanity-check it       |
| `npm run gen:assets`  | Regenerate `og.png` + the PNG/Apple icons (needs change) |

---

## Where everything lives

```
src/
├── data/                 ← EDIT THESE — all content, no layout code
│   ├── site.ts           ← name, tagline, contact, profile links, About
│   ├── publications.ts   ← your papers
│   └── projects.ts       ← your projects
├── components/           ← presentation (you rarely need to touch these)
├── layouts/Base.astro    ← <head>, SEO/OG meta, fonts, theme bootstrap
├── pages/index.astro     ← the single page; orders the sections
├── scripts/app.ts        ← progressive-enhancement JS (theme, filters, etc.)
└── styles/global.css     ← the whole design system (colors via CSS variables)
public/                   ← static files served as-is
├── cv.pdf                ← ★ replace with your real CV (same filename)
├── favicon.svg, og.png   ← branding (regenerate with npm run gen:assets)
scripts/                  ← one-off asset generators
.github/workflows/        ← GitHub Pages deploy (CI)
```

**Content and layout are fully separated** — everything you'll routinely change
is plain data in `src/data/*.ts`.

---

## Common edits

### Add your CV

Drop your compiled PDF at **`public/cv.pdf`** (keep that exact name). The embedded
viewer and the *Download CV* button are already wired to it. A placeholder PDF
ships so the viewer isn't empty before you do this.

### Add a publication

Open `src/data/publications.ts` and add an entry to `publications`:

```ts
{
  id: 'patel2027newpaper',          // unique BibTeX key
  authors: [{ name: 'S. Patel', me: true }, { name: 'R. Singh' }],
  title: 'Your Paper Title.',
  venue: 'Where it appears',
  year: 2027,
  type: 'journal',                  // 'journal' | 'conference'
  status: 'under-review',           // 'published' | 'in-press' | 'under-review'
  doi: '10.1109/...',               // optional — adds a DOI link
  url: 'https://arxiv.org/abs/...', // optional — links the title
},
```

- `me: true` bolds your name in the list.
- The **Cite** button's BibTeX is generated automatically.
- The counts line ("N papers · M as first author") and the JSON-LD structured
  data update themselves.

### Add a project

Open `src/data/projects.ts` and add an entry to `projects`. Use
`featured: true` for the big flagship card and `links: [{ label, href: '' }]`
(empty `href`) to show a "coming soon" chip instead of a dead link.

### Change colors / fonts

All theming is CSS variables at the top of `src/styles/global.css` — edit the
`--accent`, `--primary`, etc. tokens in `:root` (light) and the dark blocks.

### Update the social card

The OG image text comes from `scripts/gen-assets.mjs`. After editing it:

```bash
npm run gen:assets
```

---

## Deploy to GitHub Pages

This repo is named `thesid16.github.io`, so it publishes to the root URL
`https://thesid16.github.io`. A GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.

**First-time setup:**

1. Create the repository on GitHub named **exactly** `thesid16.github.io`
   (must match your username for a user site):

   ```bash
   git remote add origin https://github.com/thesid16/thesid16.github.io.git
   git branch -M main
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

3. The workflow runs automatically. When it finishes (Actions tab), your site is
   live at https://thesid16.github.io. Every later `git push` redeploys it.

> Renaming to a **project** repo instead? Set `base: '/<repo-name>/'` in
> `astro.config.mjs` and update `site` accordingly.

---

## Notes

- Light/dark theme respects your OS setting and remembers your choice.
- The whole site works without JavaScript; JS only adds enhancements
  (theme toggle, publication filters, copy buttons, scroll-spy).
- Built for Lighthouse ≥ 95 across Performance, Accessibility, and SEO.
