import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_API_READ_TOKEN: z.string().startsWith('sk'),
    SANITY_API_WRITE_TOKEN: z.string().startsWith('sk'),
  },
  experimental__runtimeEnv: process.env,
});
