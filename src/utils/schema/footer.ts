import { z, type SchemaContext } from 'astro:content';

export const footerSchema = ({ image }: SchemaContext) => z.object({
  logo: image(),
  description: z.string(),
  navigation: z.object({
    product: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })),
    network: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })),
    grants: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })),
    learningCenter: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })),
    community: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })),
    resources: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })),
  }),
  copyright: z.string(),
  termsAndConditionsUrl: z.string(),
  privacyPolicyUrl: z.string(),
});
