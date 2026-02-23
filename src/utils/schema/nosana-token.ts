import { z, type SchemaContext } from "astro:content";

export const nosanaTokenSchema = ({ image }: SchemaContext) =>
  z.object({
    seoDescription: z.string().optional(),
    seoImage: z.string().optional(),
    noIndex: z.boolean().optional(),
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
          cta: z
            .object({
              title: z.string(),
              url: z.string(),
            })
            .optional(),
        }),
      ),
    }),
    community: z.object({
      badge: z.string(),
      title: z.string(),
      metrics: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
          subvalue: z.string().optional(),
          icon: image(),
        }),
      ),
    }),
    stakingCalculator: z.object({
      badge: z.string(),
      title: z.string(),
      description: z.string(),
      link: z.string(),
    }),
    guideSection: z.object({
      badge: z.string(),
      heading: z.string(),
      description: z.string(),
      exchanges: z.array(
        z.object({
          image: image(),
          url: z.string(),
          color: z.string().default("#182E91"),
        }),
      ),
    }),
  });
