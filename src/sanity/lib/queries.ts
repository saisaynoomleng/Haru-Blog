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

export const MEMBERSHIPS_QUERY = defineQuery(`*[_type == 'membership'
 && defined(slug.current)]
  | order(isFeatured desc){
    name,
    "slug": slug.current,
    pricePerMonth,
    desc,
    features[],
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    isFeatured
  }`);
