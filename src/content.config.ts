import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const navbarCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/navbar" }),
  schema: ({ image }) => z.object({
    navLogo: z.object({
      url: z.string(),
      lightImage: image(),
      darkImage: image(),
      alt: z.string(),
    }),
    navItems: z.array(z.object({
      type: z.enum(['link', 'dropdown']),
      title: z.string(),
      url: z.string().optional(),
      target: z.string().optional(),
      icon: image(),
      subItems: z.object({
        sectionTitle: z.string().optional(),
        sectionSubtitle: z.string().optional(),
        items: z.array(z.object({
          title: z.string(),
          url: z.string(),
          description: z.string().optional(),
        })),
      }).optional(),
    })),
    navCTA: z.array(z.object({
      title: z.string(),
      url: z.string(),
      target: z.string().optional(),
      icon: image().optional(),
    })),
  }),
});

const homepageCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/homepage" }),
  schema: ({ image }) => z.object({
    badge: z.object({
      title: z.string(),
      icon: image(),
    }).optional(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    cta1: z.array(z.object({
      title: z.string(),
      url: z.string(),
      icon: image().optional(),
    })).optional(),
    cta2: z.array(z.object({
      title: z.string(),
      url: z.string(),
      icon: image().optional(),
    })).optional(),
  }),
});

export const collections = {
  'navbar': navbarCollection,
  'homepage': homepageCollection,
};
