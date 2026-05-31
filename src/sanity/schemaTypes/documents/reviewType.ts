import { formatDate, formatTitle } from '@/lib/formatter';
import { TiMessages } from 'react-icons/ti';
import { defineField, defineType } from 'sanity';

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  icon: TiMessages,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Reviewer name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Reviewer Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'body',
      title: 'Review Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Review Date',
      type: 'date',
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Spam', value: 'spam' },
          { title: 'Reviewed', value: 'reviewed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      reviewedAt: 'reviewedAt',
      rating: 'rating',
    },
    prepare({ title, reviewedAt, rating }) {
      const titleFormatted = title
        ? formatTitle(title)
        : 'Review Title not provided';
      const date = reviewedAt
        ? formatDate(reviewedAt)
        : 'Review date not specified';

      return {
        title: titleFormatted,
        subtitle: `Rating: ${rating} | Date: ${date}`,
        media: TiMessages,
      };
    },
  },
});
