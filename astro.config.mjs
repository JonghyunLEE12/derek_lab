import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://jonghyunlee12.github.io',
  base: '/derek_lab',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
