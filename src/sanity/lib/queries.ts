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

export const FAQs_QUERY = defineQuery(`*[_type == 'faqs'
 && defined(slug.current)]
|order(_createdAt desc){
  name,
  "slug": slug.current,
  faqs[]{
    title,
    body
  }
 }`);

export const FOOTER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  footerDescription,
  footerColumns[]{
    title,
    links[]{
      label,
      href
    }
  },
  contactInfo,
  "logoUrl": secondaryLogo.asset->url,
  "logoAlt": secondaryLogo.alt,
  socialLinks[]{
    platform,
    url
  }
}`);
