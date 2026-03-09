import { z, type SchemaContext } from 'astro:content';

export const sessionsSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: image(),
    publishedAt: z.coerce.date(),
    watchUrl: z.string(),
    watchOnWeb: z.string().optional(),
    watchOnYoutube: z.string().optional(),
    watchOnX: z.string().optional(),
    embedLink: z.string(),
  });
