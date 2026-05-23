import { TbUserDollar } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';
import { MembershipPriceInput } from '../components/membershipPriceInput';
import { formatCurrency, formatTitle } from '@/lib/formatter';

export const membershipType = defineType({
  name: 'membership',
  title: 'Membership',
  icon: TbUserDollar,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Membership Type',
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
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'image',
      title: 'Membership cover photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricePerMonth',
      title: 'Price/month',
      type: 'number',
      validation: (rule) => rule.required(),
      components: {
        input: MembershipPriceInput,
      },
    }),
    defineField({
      name: 'body',
      title: 'Membership Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      description:
        'Is this membership featured? It will be styled differently on the website. RECOMMEND TO HAVE ONLY ONE FEATURED MEMEBRSHIP TYPE',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'pricePerMonth',
      image: 'image',
    },
    prepare({ name, price, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const priceFormatted = price
        ? formatCurrency(price)
        : 'Price not specified';

      return {
        title: nameFormatted,
        subtitle: `Price: ${priceFormatted}/month`,
        media: image || TbUserDollar,
      };
    },
  },
});
