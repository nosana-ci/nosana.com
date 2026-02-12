import { z, type SchemaContext } from "astro:content";

export const testimonialsSchema = ({ image }: SchemaContext) =>
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("slider"),
      title: z.string(),
      description: z.string(),
    }),
    z.object({
      type: z.literal("grid"),
      icon: image(),
      title: z.string(),
      description: z.string(),
    }),
    z.object({
      type: z.literal("stack"),
      order: z.number(),
      name: z.string(),
      username: z.string(),
      logo: image(),
      message: z.string(),
      rating: z.number(),
    }),
  ]);
