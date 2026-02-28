import { z, type SchemaContext } from "astro:content";

export const aboutPageSchema =
  ({ image }: SchemaContext) =>
    z.object({
      seoDescription: z.string().optional(),
      seoImage: z.string().optional(),
      noIndex: z.boolean().optional(),
      heroSection: z.object({
        badge: z.object({
          title: z.string(),
        }),
        heading: z.string(),
        heroImage: image(),
      }),
      innovationSection: z.object({
        heading: z.string(),
        description: z.string(),
        image: image(),
      }),
      aboutComputeSection: z.object({
        badge: z.object({
          title: z.string(),
        }),
        title: z.string(),
        description: z.string(),
        image: image(),
      }),
      visionSection: z.object({
        badge: z.object({
          title: z.string(),
        }),
        title: z.string(),
        description: z.string(),
        image: image(),
      }),
      teamSection: z.object({
        badge: z.object({
          title: z.string(),
        }),
        title: z.string(),
        members: z.array(
          z.object({
            image: image(),
            name: z.string(),
            role: z.string(),
            bio: z.string(),
            button_1: z
              .object({
                text: z.string(),
                url: z.string(),
              })
              .optional(),
            button_2: z
              .object({
                text: z.string(),
                url: z.string(),
              })
              .optional(),
          }),
        ),
      }),
      careersSection: z.object({
        badge: z.object({
          title: z.string(),
        }),
        title: z.string(),
        description: z.string(),
        button: z
          .object({
            text: z.string(),
            url: z.string(),
            icon: image(),
          })
          .optional(),
        remoteSection: z.object({
          badge: z.object({
            title: z.string(),
          }),
          description: z.string(),
          image: image(),
        }),
      }),
      newsletterSection: z.object({
        heading: z.string(),
        description: z.string(),
        image: image(),
      }),
    });