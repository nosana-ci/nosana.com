import { z, type SchemaContext } from 'astro:content';

export const gpuProvidersSchema = ({ image }: SchemaContext) =>
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

    whyProvideSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
      features: z.array(
        z.object({
          icon: image(),
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),

    testimonialsSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      testimonials: z.array(
        z.object({
          quote: z.string(),
          author: z.string(),
        }),
      ),
    }),
    emailSection: z.object({
      heading: z.string(),
      description: z.string(),
      image: image(),
    }),

    hardwareRequirementsSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
      buttons: z.object({
        primary: z.object({
          title: z.string(),
          url: z.string(),
        }),
        secondary: z.object({
          title: z.string(),
          url: z.string(),
        }),
      }),
      requirements: z.array(
        z.object({
          icon: image(),
          title: z.string(),
          description: z.string(),
          link: z
            .object({
              title: z.string(),
              url: z.string(),
            })
            .optional(),
        }),
      ),
    }),
  });
