import { z } from 'astro:content';

export const caseStudyHomepageSchema = () => z.object({
  badge: z.object({
    title: z.string(),
  }),
  heading: z.string(),
  description: z.string(),
});
