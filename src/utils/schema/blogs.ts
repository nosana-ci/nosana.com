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
      author: z.string().optional(),
      role: z.string().optional(),
      createdAt: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      focus: z.string().default('AI-Powered Art Generation'),
      impact: z.string().default('Unlocking decentralized creativity with on-demand GPU power'),
    }),
  ]);
