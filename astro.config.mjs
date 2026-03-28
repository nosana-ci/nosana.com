// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';

import { redirects } from './src/redirects';

export default defineConfig({
  site: 'https://nosana.com',
  redirects,

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  server: {
    host: true,
  },

  image: {
    formats: ['webp'],
    quality: 80,
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

    AstroPWA({
      mode: 'production',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt'],
      workbox: {
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff,woff2,json}'],
        manifestTransforms: [
          async (entries) => {
            const manifest = entries.filter((entry) => entry.size <= 10 * 1024 * 1024);
            return { manifest, warnings: [] };
          }
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
              },
            },
          },
          {
            urlPattern: /^https:\/\/dashboard\.k8s\.prd\.nos\.ci\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60, // 1 Hour
              },
            },
          },
        ],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});