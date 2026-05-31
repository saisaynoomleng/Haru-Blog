import { defineArrayMember, defineField, defineType } from 'sanity';

export const imageWithAltType = defineType({
  name: 'imageWithAlt',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});

export const blockContentType = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({ type: 'block' }),
    defineArrayMember({ title: 'Image', type: 'imageWithAlt' }),
  ],
});

export const socialLinkType = defineType({
  name: 'socialLink',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      description: 'Social Media Platform',
      options: {
        list: [
          { title: 'Twitter X', value: 'twitter' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Git Hub', value: 'github' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      description: 'Full URL to the socail media platform profile',
      validation: (rule) => rule.required(),
    }),
  ],
});

export const seoType = defineType({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
      description: 'Title to display while sharing on internet',
    }),
    defineField({
      name: 'metaDescription',
      type: 'string',
      description: 'Description to display while sharing on internet',
    }),
    defineField({
      name: 'ogImage',
      type: 'imageWithAlt',
      description: 'Image to display while sharing on internet',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      description:
        'Let Search Engine to index the page that could imporve SEO, RECOMMENDED to set to false for admin pages and sensitive data page',
      initialValue: false,
    }),
  ],
});

export const faqType = defineType({
  name: 'faq',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'FAQ Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
      title: 'FAQ description',
    }),
  ],
});
