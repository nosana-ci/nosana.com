import { z } from 'astro:content';

export const caseStudySchema = () => z.object({
  badge: z.object({
    title: z.string(),
  }),
  heading: z.string(),
  description: z.string(),
});
