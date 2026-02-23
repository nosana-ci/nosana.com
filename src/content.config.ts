import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  navbarSchema,
  footerSchema,
  layoutSchema,
  homepageSchema,
  caseStudyHomepageSchema,
  testimonialsSchema,
  gpuProvidersSchema,
  gpuWorkloadsSchema,
  supportSchema,
  testimonialsHomepageSchema,
  blogsSchema,
  blogsHomepageSchema,
  eventsSchema,
  sessionsSchema,
  communityCallsSchema,
  grantsSchema,
} from './utils/schema';
import { aboutPageSchema } from './utils/schema/about-page';
import { nosanaTokenSchema } from './utils/schema/nosana-token';
import { brandAssetsSchema } from './utils/schema/brand-assets';

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

const caseStudyHomepageCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/case-study-homepage" }),
  schema: caseStudyHomepageSchema,
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "src/content/testimonials" }),
  schema: testimonialsSchema,
});

const gpuProvidersCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/gpu-providers" }),
  schema: gpuProvidersSchema,
});

const gpuWorkloadsCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/gpu-workloads" }),
  schema: gpuWorkloadsSchema,
});

const supportCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/support" }),
  schema: supportSchema,
});

const testimonialsHomepageCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/testimonials-homepage" }),
  schema: testimonialsHomepageSchema,
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/about" }),
  schema: aboutPageSchema,
});

const tokenCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/nosana-token" }),
  schema: nosanaTokenSchema,
});

const brandAssetsCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/brand-assets" }),
  schema: brandAssetsSchema,
});

const blogsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "src/content/blogs" }),
  schema: blogsSchema,
});

const blogsHomepageCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/blogs-homepage" }),
  schema: blogsHomepageSchema,
});

const eventsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "src/content/events" }),
  schema: eventsSchema,
});

const sessionsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "src/content/sessions" }),
  schema: sessionsSchema,
});

const communityCallsCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/community-calls" }),
  schema: communityCallsSchema,
});

const grantsCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/grants" }),
  schema: grantsSchema,
});

export const collections = {
  navbar: navbarCollection,
  homepage: homepageCollection,
  footer: footerCollection,
  layout: layoutCollection,
  support: supportCollection,
  caseStudyHomepage: caseStudyHomepageCollection,
  gpuProviders: gpuProvidersCollection,
  gpuWorkloads: gpuWorkloadsCollection,
  testimonials: testimonialsCollection,
  testimonialsHomepage: testimonialsHomepageCollection,
  about: aboutCollection,
  nosanaToken: tokenCollection,
  brandAssets: brandAssetsCollection,
  blogs: blogsCollection,
  blogsHomepage: blogsHomepageCollection,
  events: eventsCollection,
  sessions: sessionsCollection,
  communityCalls: communityCallsCollection,
  grants: grantsCollection,
};
