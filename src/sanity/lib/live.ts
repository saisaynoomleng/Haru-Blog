// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { env } from '@/lib/env/server';

const token = env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('Missing Sanity Read Token');
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});
