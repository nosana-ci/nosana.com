import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const navbarCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/navbar" }),
  schema: ({ image }) => z.object({
    navLogo: z.object({
      url: z.string(),
      lightImage: image(),
      darkImage: image(),
      alt: z.string(),
    }),
    navItems: z.array(z.object({
      type: z.enum(['link', 'dropdown']),
      title: z.string(),
      url: z.string().optional(),
      target: z.string().optional(),
      icon: image(),
      subItems: z.object({
        sectionTitle: z.string().optional(),
        sectionSubtitle: z.string().optional(),
        items: z.array(z.object({
          title: z.string(),
          url: z.string(),
          description: z.string().optional(),
        })),
      }).optional(),
    })),
    navCTA: z.array(z.object({
      title: z.string(),
      url: z.string(),
      target: z.string().optional(),
      icon: image().optional(),
    })),
  }),
});

const homepageCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/homepage" }),
  schema: ({ image }) =>
    z.object({
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

      brands: z.array(
        z.object({
          name: z.string(),
          logo: image(),
        })
      ).optional(),

      pathSection: z.object({
        badge: z.object({
          title: z.string(),
        }),
        heading: z.string(),
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
      }),

      rentGPU: z.object({
        badge: z.object({
          title: z.string(),
        }),
        heading: z.string(),
        description: z.string(),
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
        testimonial: z.array(
          z.object({
            name: z.string(),
            username: z.string(),
            logo: image(),
            message: z.string(),
            rating: z.number(),
          })
        ),
      }),

    }),
});

const gpuProvidersCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "src/content/gpu-providers" }),
  schema: ({ image }) =>
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

      // ecosystemSection: z.object({
      //   badge: z.object({
      //     title: z.string(),
      //   }),
      //   heading: z.string(),
      //   description: z.string(),
      //   stats: z.array(
      //     z.object({
      //       value: z.string(),
      //       label: z.string(),
      //     }),
      //   ),
      // }),

      // whyNosanaSection: z.object({
      //   badge: z.object({
      //     title: z.string(),
      //   }),
      //   heading: z.string(),
      //   description: z.string(),
      // }),

      // rentGPU: z.object({
      //   badge: z.object({
      //     title: z.string(),
      //   }),
      //   heading: z.string(),
      //   description: z.string(),
      // }),

      // banner: z.object({
      //   heading: z.string(),
      //   description: z.string(),
      //   cta: z.object({
      //     title: z.string(),
      //     url: z.string(),
      //     icon: image(),
      //   }),
      //   image: image(),
      // }),

      // production: z.object({
      //   badge: z.object({
      //     title: z.string(),
      //     icon: image(),
      //   }),
      //   heading: z.string(),
      //   description: z.string(),
      // }),

      // upcomingEventsMock: z.object({
      //   heading: z.string(),
      //   date: z.string(),
      //   time: z.string(),
      //   title: z.string(),
      //   description: z.string(),
      //   image: image(),
      //   button: z.object({
      //     title: z.string(),
      //     url: z.string(),
      //   }),
      // }),

      // latestBlogsMock: z.object({
      //   heading: z.string(),
      //   date: z.string(),
      //   time: z.string(),
      //   title: z.string(),
      //   description: z.string(),
      //   image: image(),
      //   button: z.object({
      //     title: z.string(),
      //     url: z.string(),
      //   }),
      // }),

      // testimonials: z.object({
      //   heading: z.string(),
      //   description: z.array(z.string()),
      // }),
    }),
});

export const collections = {
  navbar: navbarCollection,
  homepage: homepageCollection,
  gpuProviders: gpuProvidersCollection,
};
