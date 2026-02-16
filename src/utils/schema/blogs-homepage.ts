import { z } from 'astro:content';

export const blogsHomepageSchema = () => z.object({
  filters: z.array(z.string()),
});
