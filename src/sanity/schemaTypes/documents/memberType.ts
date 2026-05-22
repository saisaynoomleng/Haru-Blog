import { formatTitle } from '@/lib/formatter';
import { FiUsers } from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

export const memberType = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  icon: FiUsers,
  fields: [
    defineField({
      name: 'name',
      title: 'Member Name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .info(`Member Name must have at least 1 character`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) =>
        rule.required().info(`Required to generate a page on the website`),
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'image',
      title: 'Member Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Member Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      image: 'image',
    },
    prepare({ name, role, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Member name not provided';
      const roleFormatted = role ? formatTitle(role) : 'Role not provided';

      return {
        title: nameFormatted,
        subtitle: `Position: ${roleFormatted}`,
        media: image || FiUsers,
      };
    },
  },
});
