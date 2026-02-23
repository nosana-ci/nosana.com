import { z, type SchemaContext } from "astro:content";

export const brandAssetsSchema = ({ image }: SchemaContext) =>
  z.object({
    seoDescription: z.string().optional(),
    seoImage: z.string().optional(),
    noIndex: z.boolean().optional(),
    heroSection: z.object({
      badge: z.string(),
      heading: z.string(),
      description: z.string(),
      downloadUrl: z.string(),
    }),
    logoSection: z.object({
      heading: z.string(),
      description: z.string(),
      downloadUrl: z.string(),
    }),
    typographySection: z.object({
      heading: z.string(),
      description: z.string(),
      typefaces: z.array(
        z.object({
          name: z.string(),
          weights: z.array(z.string()),
        }),
      ),
    }),
    colorsSection: z.object({
      heading: z.string(),
      description: z.string(),
      brandColors: z.array(
        z.object({
          name: z.string(),
          hex: z.string(),
          textDark: z.boolean().optional(),
        }),
      ),
      neutralColors: z.array(
        z.object({
          name: z.string(),
          hex: z.string(),
          textDark: z.boolean().optional(),
        }),
      ),
    }),
  });
