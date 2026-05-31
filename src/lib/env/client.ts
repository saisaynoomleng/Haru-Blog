import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';
import 'dotenv/config';

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_SANITY_DATASET: z.enum(['production', 'development']),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z
      .string()
      .min(1, 'Sanity Project ID must have at least 1 characters'),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .min(1, 'Clerk publishable key must have at least 1 characters')
      .startsWith('pk'),
    NEXT_PUBLIC_URL: z.url(),
    NEXT_PUBLIC_MAPBOX_TOKEN: z.string().startsWith('pk'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
});
