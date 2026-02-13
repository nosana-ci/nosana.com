import { z, type SchemaContext } from 'astro:content';

export const navbarSchema = ({ image }: SchemaContext) => z.object({
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
        icon: image(),
        url: z.string(),
        target: z.string().optional(),
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
});
