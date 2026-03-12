// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import { redirects } from './src/redirects';

export default defineConfig({
  site: 'https://nosana.com',
  redirects,

  server: {
    host: true,
  },

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url.endsWith('.com/')) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }

        else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }

        else if (item.url.includes('/case-study/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }

        else if (
          item.url.includes('/gpu-providers/') ||
          item.url.includes('/gpu-workloads/') ||
          item.url.includes('/nosana-token/')
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }

        else if (
          item.url.includes('/blogs/') ||
          item.url.includes('/case-studies/') ||
          item.url.includes('/events/')
        ) {
          item.priority = 0.6;
          item.changefreq = 'daily';
        }

        return item;
      },
    }),

    react(),
  ],

  build: {
    inlineStylesheets: "auto",
  },

  vite: {
    build: {
      assetsInlineLimit: 16000,
    },
    plugins: [tailwindcss()]
  }
});