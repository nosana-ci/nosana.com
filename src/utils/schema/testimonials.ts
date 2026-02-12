import { z, type SchemaContext } from 'astro:content';

export const testimonialsSchema = ({ image }: SchemaContext) => z.object({
  type: z.enum(['card', 'grid']),
  name: z.string().optional(),
  username: z.string().optional(),
  logo: image().optional(),
  message: z.string().optional(),
  rating: z.number().optional(),
  icon: image().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});
