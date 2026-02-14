import { z, type SchemaContext } from 'astro:content';

export const gpuWorkloadsSchema = ({ image }: SchemaContext) =>
  z.object({
    heroSection: z.object({
      badge: z
        .object({
          title: z.string(),
          icon: image(),
        })
        .optional(),

      heading: z.string(),
      description: z.string(),

      cta1: z
        .object({
          title: z.string(),
          url: z.string(),
          icon: image().optional(),
        })
        .optional(),

      cta2: z
        .object({
          title: z.string(),
          url: z.string(),
          icon: image().optional(),
        })
        .optional(),
    }),
  });
