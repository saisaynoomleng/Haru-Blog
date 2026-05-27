import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_API_READ_TOKEN: z.string().startsWith('sk'),
    SANITY_API_WRITE_TOKEN: z.string().startsWith('sk'),
    DATABASE_URL: z.string().startsWith('postgresql://'),
    CLERK_SECRET_KEY: z.string().startsWith('sk'),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string(),
    RESEND_API_KEY: z.string().startsWith('re'),
    RESEND_EMAIL_FROM: z
      .string()
      .min(1, 'Resend email from must has at least 1 charcter'),
  },
  experimental__runtimeEnv: process.env,
});
