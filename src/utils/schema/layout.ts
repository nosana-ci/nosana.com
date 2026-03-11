import { z, type SchemaContext } from 'astro:content';

export const layoutSchema = ({ image }: SchemaContext) => z.object({
  newsletter: z.object({
    heading: z.string(),
    description: z.string(),
    image: image(),
    formUrl: z.string(),
  }),

  socialBannerMarquee: z.object({
    items: z.array(
      z.object({
        image: image(),
        value: z.string(),
        label: z.string(),
      })
    ),
  }),

  socials: z.object({
    title: z.string(),
    links: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        icon: image(),
      })
    ),
  }),

  brands: z.array(
    z.object({
      name: z.string(),
      logo: image(),
    })
  ).optional()

});
