import { env } from '@/lib/env/client';

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-22';

export const dataset = assertValue(
  env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const projectId = assertValue(
  env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
