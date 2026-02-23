import { z, type SchemaContext } from 'astro:content';

export const gpuProvidersSchema = ({ image }: SchemaContext) =>
  z.object({
    seoDescription: z.string().optional(),
    seoImage: z.string().optional(),
    noIndex: z.boolean().optional(),
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

    getStarted: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
      cta1: z
        .object({
          title: z.string(),
          url: z.string(),
        })
        .optional(),
      cta2: z
        .object({
          title: z.string(),
          url: z.string(),
        })
        .optional(),
      steps: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: image(),
        }),
      ),
    }),

    testimonialsSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
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

    videoSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
    }),

    earningSection: z.object({
      heading: z.string(),
      description: z.string(),
    }),
  });
