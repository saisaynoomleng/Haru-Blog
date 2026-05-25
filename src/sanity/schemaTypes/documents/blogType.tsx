import { GiNewspaper } from 'react-icons/gi';
import { defineField, defineType } from 'sanity';
import { BlogAuthorInput } from '../components/blogAuthorInput';
import { BlogCategoryInput } from '../components/blogCategoryInput';
import { BlogMinReadInput } from '../components/blogMinReadInput';
import { BlogDateInput } from '../components/blogDateInput';
import { formatDate, formatTitle } from '@/lib/formatter';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  icon: GiNewspaper,
  fieldsets: [
    {
      name: 'references',
      title: 'References',
      options: { collapsible: true, columns: 2 },
    },
  ],
  groups: [
    { name: 'details', title: 'Details' },
    {
      name: 'editorials',
      title: 'Editorials',
    },
    {
      name: 'references',
      title: 'References',
    },
  ],
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) =>
        rule.required().info(`Required to generate a page on the website`),
      group: 'details',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
      group: 'references',
      fieldset: 'references',
      components: {
        input: BlogAuthorInput,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
      components: {
        input: BlogCategoryInput,
      },
      group: 'references',
      fieldset: 'references',
    }),
    defineField({
      name: 'minRead',
      title: 'Reading Duration',
      type: 'number',
      validation: (rule) => rule.required(),
      group: 'details',
      components: {
        input: BlogMinReadInput,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
      components: {
        input: BlogDateInput,
      },
      group: 'details',
    }),
    defineField({
      name: 'image',
      title: 'Blog Cover Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'editorials',
    }),
    defineField({
      name: 'seo',
      title: 'Blog SEO',
      description: 'SEO is required for sharing the article on socail media',
      type: 'seo',
      validation: (rule) => rule.required(),
      group: 'editorials',
    }),
    defineField({
      name: 'body',
      title: 'Blog Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'excerpt',
      title: 'Blog Summary',
      description:
        'Short summary of the blog to display in the blog card on the website',
      type: 'text',
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Is this blog featured?',
      validation: (rule) => rule.required(),
      initialValue: false,
      group: 'details',
    }),
    defineField({
      name: 'isMemberOnly',
      type: 'boolean',
      title: 'Is this blog member only?',
      validation: (rule) => rule.required(),
      description: 'Is this blog can only be read by members?',
      group: 'details',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Featured',
      name: 'featuredDesc',
      by: [{ field: 'isFeatured', direction: 'desc' }],
    },
    {
      title: 'Published Date',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      publishedAt: 'publishedAt',
      image: 'image',
    },
    prepare({ name, publishedAt, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const date = publishedAt
        ? formatDate(publishedAt)
        : 'Published Date not specified';

      return {
        title: nameFormatted,
        subtitle: `Published On: ${date}`,
        media: image || GiNewspaper,
      };
    },
  },
});
