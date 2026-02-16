import { z, type SchemaContext } from 'astro:content';

export const blogsSchema = ({ image }: SchemaContext) =>
  z.discriminatedUnion('category', [
    z.object({
      category: z.literal('blog'),
      title: z.string(),
      description: z.string(),
      thumbnail: image(),
      createdAt: z.coerce.date(),
      tags: z.array(z.string()).optional(),
    }),
    z.object({
      category: z.literal('case-study'),
      title: z.string(),
      description: z.string(),
      logo: image().optional(),
      thumbnail: image(),
      createdAt: z.coerce.date(),
      tags: z.array(z.string()).optional(),
    }),
    z.object({
      category: z.literal('event'),
      title: z.string(),
      description: z.string(),
      thumbnail: image(),
      createdAt: z.coerce.date(),
      url: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  ]);
