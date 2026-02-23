import { z, type SchemaContext } from 'astro:content';

export const supportSchema = ({ image }: SchemaContext) => z.object({
  seoDescription: z.string().optional(),
  seoImage: z.string().optional(),
  noIndex: z.boolean().optional(),
  heading: z.string(),
  description: z.string(),
  discord: z.object({
    image: image(),
    card1: z.object({
      title: z.string(),
      description: z.string(),
      icon: image(),
      button: z.object({
        title: z.string(),
        url: z.string(),
        icon: image(),
      }),
    }),
    card2: z.object({
      title: z.string(),
      description: z.string(),
      icon: image(),
      button: z.object({
        title: z.string(),
        url: z.string(),
        icon: image(),
      }),
    }),
  }),
  github: z.object({
    text: z.string(),
    url: z.string(),
    image: image(),
    icon: image(),
  }),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});
