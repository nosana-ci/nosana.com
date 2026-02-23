import { z, type SchemaContext } from "astro:content";

export const grantsSchema = ({ image }: SchemaContext) =>
  z.object({
    formUrl: z.string(),
    heroSection: z.object({
      badge: z.object({
        title: z.string(),
        icon: image(),
      }),
      title: z.string(),
      description: z.string(),
      cta1: z.object({
        title: z.string(),
        url: z.string(),
      }),
      cta2: z.object({
        title: z.string(),
        url: z.string(),
      }),
      animation: z.string(),
      bgImg: image(),
    }),
  });