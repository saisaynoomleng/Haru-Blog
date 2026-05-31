import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';
import { env } from '@/lib/env/server';
import { reviews } from '@/lib/reviews';
import 'dotenv/config';

const token = env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error('Missing Sanity Write Token');
}

export const client = createClient({
  projectId,
  token,
  dataset,
  apiVersion,
  useCdn: false,
});

async function seedReviews() {
  for (const review of reviews) {
    await client.createIfNotExists({
      _type: 'review',
      _id: `review-${review.username}`,
      ...review,
    });
    console.log(`Seeding review data for ${review.username}`);
  }
  console.log(`Done seeding reviews`);
}

seedReviews().catch(console.error);
