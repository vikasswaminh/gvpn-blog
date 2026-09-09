// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4322,
    host: true
  },
  site: SITE.url,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always'
  },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
  redirects: {
    '/blog/wireguard-nat-traversal-cgnat-firewalls-2026': {
      status: 301,
      destination: '/blog/wireguard-nat-traversal-behind-cgnat-2026/'
    }
  }
});
