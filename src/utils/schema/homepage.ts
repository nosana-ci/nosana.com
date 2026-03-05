import { z, type SchemaContext } from 'astro:content';

export const homepageSchema = ({ image }: SchemaContext) =>
  z.object({
    seoDescription: z.string().optional(),
    seoImage: z.string().optional(),
    noIndex: z.boolean().optional(),
    heroSection: z.object({
      badge: z.object({
        title: z.string(),
        icon: image(),
      }).optional(),

      heading: z.string(),
      description: z.string(),

      cta1: z.object({
        title: z.string(),
        url: z.string(),
        icon: image().optional(),
      }).optional(),

      cta2: z.object({
        title: z.string(),
        url: z.string(),
        icon: image().optional(),
      }).optional(),
    }),

    pathSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      path1: z.object({
        image: image(),
        safariImage: image().optional(),
        title: z.string(),
        description: z.string(),
        caption: z.string(),
        url: z.string(),
      }),
      path2: z.object({
        image: image(),
        safariImage: image().optional(),
        title: z.string(),
        description: z.string(),
        caption: z.string(),
        url: z.string(),
      }),
    }),

    ecosystemSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
      stats: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      ),
    }),

    whyNosanaSection: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
      features: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: image(),
        })
      ),
    }),

    rentGPU: z.object({
      badge: z.object({
        title: z.string(),
      }),
      heading: z.string(),
      description: z.string(),
      premium: z.array(z.object({
        gpu: z.string(),
        price: z.string(),
        availability: z.string(),
      })),
      community: z.array(z.object({
        gpu: z.string(),
        price: z.string(),
        availability: z.string(),
      })),
      others: z.array(z.object({
        gpu: z.string(),
        price: z.string(),
        availability: z.string(),
      })),
    }),

    banner: z.object({
      heading: z.string(),
      description: z.string(),
      cta: z.object({
        title: z.string(),
        url: z.string(),
        icon: image(),
      }),
      image: image(),
    }),

    production: z.object({
      badge: z.object({
        title: z.string(),
        icon: image(),
      }),
      heading: z.string(),
      description: z.string(),
    }),

    upcomingEventsMock: z.object({
      heading: z.string(),
      date: z.string(),
      time: z.string(),
      title: z.string(),
      description: z.string(),
      image: image(),
      button: z.object({
        title: z.string(),
        url: z.string(),
      }),
    }),

    latestBlogsMock: z.object({
      heading: z.string(),
      date: z.string(),
      time: z.string(),
      title: z.string(),
      description: z.string(),
      image: image(),
      button: z.object({
        title: z.string(),
        url: z.string(),
      }),
    }),

    testimonials: z.object({
      heading: z.string(),
      description: z.array(z.string()),
    }),

    ctaSection: z.object({
      heading: z.string(),
      description: z.string(),
      cta1: z.object({
        title: z.string(),
        url: z.string(),
      }),
      cta2: z.object({
        title: z.string(),
        url: z.string(),
      }),
    }),

  });
