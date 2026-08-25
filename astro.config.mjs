// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Custom integration to ensure sitemap.xml exists in the final output
function copySitemapIndex() {
  return {
    name: 'copy-sitemap-index',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const sitemapIndexPath = path.join(outDir, 'sitemap-index.xml');
        const sitemapPath = path.join(outDir, 'sitemap.xml');
        if (fs.existsSync(sitemapIndexPath)) {
          fs.copyFileSync(sitemapIndexPath, sitemapPath);
          console.log('✓ [copy-sitemap-index] Copied sitemap-index.xml to sitemap.xml successfully!');
        }
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://learnsapfree.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/500'),
      serialize: (item) => {
        // Boost priority for key pages
        if (item.url === 'https://learnsapfree.com/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (item.url.includes('/blog/') && !item.url.endsWith('/blog')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (item.url.endsWith('/blog')) {
          item.changefreq = 'daily';
          item.priority = 0.9;
        } else if (item.url.includes('/faq')) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.5;
        }
        return item;
      },
    }),
    copySitemapIndex()
  ],
});