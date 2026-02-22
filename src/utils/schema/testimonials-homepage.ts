import { z, type SchemaContext } from 'astro:content';

export const testimonialsHomepageSchema = ({ image }: SchemaContext) => z.object({
  badge: z.object({
    title: z.string(),
  }),
  heading: z.string(),
  description: z.string(),
  features: z.array(
    z.object({
      icon: image(),
      title: z.string(),
    })
  ),
  caseStudySection: z.object({
    badge: z.object({
      title: z.string(),
      icon: image(),
    }),
    heading: z.string(),
    description: z.string(),
  })
});
