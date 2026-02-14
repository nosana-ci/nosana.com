import { z, type SchemaContext } from "astro:content";

export const nosanaTokenSchema = ({ image }: SchemaContext) =>
  z.object({
    heroSection: z.object({
      badge: z.object({
        text: z.string(),
        icon: image(),
      }),
      title: z.string(),
      description: z.string(),
      button_1: z.object({
        text: z.string(),
        icon: image(),
      }),
      button_2: z.object({
        text: z.string(),
        icon: image(),
      }),
      image_1: image(),
      image_2: image(),
    }),
    nosToken: z.object({
      badge: z.string(),
      title: z.string(),
      description: z.string(),
      features: z.array(
        z.object({
          image: image(),
          tab: z.object({
            icon: image(),
            text: z.string(),
          }),
          title: z.string(),
          description: z.string(),
          button: z
            .object({
              text: z.string(),
              icon: image(),
            })
            .optional(),
        }),
      ),
    }),
    community: z.object({
      badge: z.string(),
      title: z.string(),
    }),
    stakingCalculator: z.object({
      badge: z.string(),
      title: z.string(),
      description: z.string(),
      link: z.string(),
    }),
    exchange: z.object({
      badge: z.string(),
      heading: z.string(),
      description: z.string(),
      images: z.array(image()),
    }),
  });
