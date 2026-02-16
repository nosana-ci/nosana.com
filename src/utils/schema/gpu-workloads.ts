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

    howItWorks: z.object({
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

    earningSection: z.object({
      heading: z.string(),
      description: z.string(),
    }),

    caseStudySection: z.object({
      badge: z.string(),
      badgeIcon: image(),
      quote: z.string(),
      authorName: z.string(),
      authorRole: z.string(),
      companyLogo: image(),
      companyName: z.string(),
      image: image(),
      ctaTitle: z.string(),
      ctaUrl: z.string(),
      stats: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      ),
    }),

    ctaSection: z.object({
      heading: z.string(),
      headingHighlight: z.string(),
      headingEnd: z.string(),
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

    highlightsSection: z.array(
      z.object({
        icon: image(),
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

    featuresSection: z.object({
      badge: z.string(),
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
  });
