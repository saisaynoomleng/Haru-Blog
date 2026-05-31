import { formatTitle } from '@/lib/formatter';
import { LuMilestone } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';

export const ourStoryType = defineType({
  name: 'ourStory',
  type: 'document',
  icon: LuMilestone,
  fields: [
    defineField({
      name: 'name',
      title: 'Yearly Milestone Slogan',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-story`,
      },
      validation: (rule) => rule.required(),
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      year: 'year',
    },
    prepare({ name, year }) {
      const nameFormatted = name ? formatTitle(name) : 'name not provided';

      return {
        title: nameFormatted,
        subtitle: `Year: ${year}`,
      };
    },
  },
});
