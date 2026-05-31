import { defineQuery } from 'next-sanity';

export const HERO_BLOG_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)]
|order(isFeatured desc){
  name,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  "slug": slug.current,
  "author": author->name,
  "category": category->name,
  excerpt,
 }`);

export const FEATURED_BRANDS_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  featuredBrand[]{
    name,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    _key
  }
}`);

export const OUR_STORY_QUERY = defineQuery(`*[_type == 'ourStory'
 && defined(slug.current)]
  |order(year){
  year,
  "slug": slug.current,
  body,
  name
 }`);

export const MEMBER_ACCESS_FEATURES_QUERY =
  defineQuery(`*[_type == 'siteSetting'][0]{
  memberAccessFeatures[]{
    title,
    body,
    "image": {
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
}`);

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

export const HEADER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  navigation[]{
    _type,
    label,
    "isButton": select(_type == 'navLink' => isButton == true),
    "href": select(_type == 'navLink' => href),
    "dropdownItems": select(_type == 'navDropdown' => dropdownItems[]{
      label,
      href,
      "isButton": isButton == true
    })
  },
  "logoUrl": primaryLogo.asset->url,
  "logoAlt": primaryLogo.alt,
  socialLinks[]
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
  && defined(slug.current)
  && (!defined($category)) 
  || (category->name match $category)
 ]|order(publishedAt desc){
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "author": author->name,
    "category": category->name,
    excerpt,
}`);

export const BLOG_QUERY =
  defineQuery(`*[_type == 'blog' && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  author->{
    name,
    "slug": slug.current
  },
  "category": category->name,
  excerpt,
  minRead,
  publishedAt,
  body,
  "relatedBlogs": *[_type == 'blog'
                    && defined(slug.current)
                    && _id != ^._id
                    && category._ref == ^.category._ref]
                  | order(publishedAt desc){
                      name,
                      "slug": slug.current,
                      "imageUrl": image.asset->url,
                      "imageAlt": image.alt,
                      "author": author->name,
                      "category": category->name,
                      excerpt,
                    }
}`);

export const UTILITY_PAGE_QUERY = defineQuery(`*[_type == 'utilityPage'
 && slug.current == $slug][0]{
  name,
  body,
  "seo": {
    "title": coalesce(seo.metaTitle, ""),
    "description": coalesce(seo.metaDescription),
    "noIndex" : seo.noIndex == true
  }
 }`);

export const UTILITY_PAGES_QUERY = defineQuery(`*[_type == 'utilityPage'
  && defined(slug.current)]{
    "slug": slug.current
  }`);

export const MAP_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "lat": contactInfo.latitude,
  "long": contactInfo.longitude,
  contactInfo{
    address1,
    city,
    country,
    email,
    phone,
    state,
    zip
  }
}`);

export const REVIEWS_QUERY = defineQuery(`*[_type == 'review']
|order(reviewedAt desc){
  title,
  username,
  role,
  rating,
  body,
  reviewedAt,
  _id
}`);
