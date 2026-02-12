import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  navbarSchema,
  footerSchema,
  layoutSchema,
  homepageSchema,
  caseStudySchema,
  testimonialsSchema,
  gpuProvidersSchema,
  supportSchema
} from './utils/schema';

const navbarCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/navbar" }),
  schema: navbarSchema,
});

const footerCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/footer" }),
  schema: footerSchema,
});

const layoutCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/layout" }),
  schema: layoutSchema,
});

const homepageCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/homepage" }),
  schema: homepageSchema,
});

const caseStudyCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/case-study-homepage" }),
  schema: caseStudySchema,
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "src/content/testimonials" }),
  schema: testimonialsSchema,
});

const gpuProvidersCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/gpu-providers" }),
  schema: gpuProvidersSchema,
});

const supportCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/support" }),
  schema: supportSchema,
});

export const collections = {
  navbar: navbarCollection,
  homepage: homepageCollection,
  footer: footerCollection,
  layout: layoutCollection,
  support: supportCollection,
  caseStudy: caseStudyCollection,
  gpuProviders: gpuProvidersCollection,
  testimonials: testimonialsCollection,
};