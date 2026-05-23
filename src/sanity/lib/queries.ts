import { defineQuery } from 'next-sanity';

export const MEMBERS_QUERY = defineQuery(`*[_type == 'member'
 && defined(slug.current)]
| order(_createdAt desc){
  name,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  email,
  role
}`);
