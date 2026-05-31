import { CiTextAlignCenter } from 'react-icons/ci';
import { defineField, defineType } from 'sanity';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utility Page',
  icon: CiTextAlignCenter,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO details',
      type: 'seo',
    }),
  ],
});
