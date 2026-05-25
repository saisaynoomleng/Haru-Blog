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

export const AUTHORS_QUERY = defineQuery(`*[_type == 'author'
 && defined(slug.current)]
 | order(name desc)
 {
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt, 
 }`);

export const AUTHOR_QUERY = defineQuery(`*[_type == 'author'
 && slug.current == $slug][0]
 {
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt, 
   body,
   socialLinks[],
   "blogs": *[_type == 'blog' 
              && defined(slug.current)
              && references(^._id)]
              |order(publishedAt desc){
                name,
                "slug": slug.current,
                "imageUrl": image.asset->url,
                "imageAlt": image.alt,
                "author": author->name,
                "cateogry": category->name,
                excerpt,
              }
 }`);

export const BLOGS_QUERY = defineQuery(`*[_type == 'blog' 
  && defined(slug.current)]
  |order(publishedAt desc){
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "author": author->name,
    "cateogry": category->name,
    excerpt,
}`);
