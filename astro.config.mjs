// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User/organization GitHub Pages site -> served at the domain root.
// If you ever rename this to a PROJECT repo, set `base: '/<repo-name>/'`.
export default defineConfig({
  site: 'https://thesid16.github.io',
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
