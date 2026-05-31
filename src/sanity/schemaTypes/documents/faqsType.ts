import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { defineField, defineType } from 'sanity';

export const faqsType = defineType({
  name: 'faqs',
  title: 'FAQs',
  type: 'document',
  icon: AiOutlineQuestionCircle,
  fields: [
    defineField({
      name: 'name',
      title: 'FAQs Main Type Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-faqs`,
      },
      validation: (rule) => rule.required(),
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{ type: 'faq' }],
      validation: (rule) => rule.required(),
    }),
  ],
});
