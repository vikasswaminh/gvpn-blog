// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';

import fs from 'fs';
import path from 'path';

// Calculate which tags have < 3 posts so we can filter them from the sitemap
const contentDir = './src/content/blog';
const tagsCount = {};
try {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  files.forEach(f => {
    const content = fs.readFileSync(path.join(contentDir, f), 'utf-8');
    const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
    if(tagsMatch) {
      const t = tagsMatch[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      t.forEach(tag => {
        tagsCount[tag] = (tagsCount[tag] || 0) + 1;
      });
    }
  });
} catch (e) {
  console.warn("Could not read tags for sitemap filtering:", e);
}

const noindexTags = Object.keys(tagsCount).filter(tag => tagsCount[tag] < 3);

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4322,
    host: true
  },
  site: SITE.url,
  trailingSlash: 'ignore',
  integrations: [sitemap({
    filter: (page) => {
      try {
        const url = new URL(page);
        if (url.pathname.startsWith('/tags/')) {
          // split('/') yields ["", "tags", "the-tag", ""] or similar
          const tagSegment = decodeURIComponent(url.pathname.split('/')[2]);
          if (noindexTags.includes(tagSegment)) {
            return false;
          }
        }
        return true;
      } catch {
        return true;
      }
    }
  })],
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
