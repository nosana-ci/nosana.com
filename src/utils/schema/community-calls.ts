import { z } from 'astro:content';

export const communityCallsSchema = () =>
  z.object({
    title: z.string(),
    description: z.string(),
    nextCallDate: z.string(),
    lastUpdated: z.coerce.date(),
    calls: z.array(
      z.object({
        meeting: z.string(),
        time: z.string(),
        recordingUrl: z.string(),
      }),
    ),
  });
