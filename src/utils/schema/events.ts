import { z, type SchemaContext } from 'astro:content';

export const eventsSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: image(),
    createdAt: z.coerce.date(),
    url: z.string(),
    time: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });
