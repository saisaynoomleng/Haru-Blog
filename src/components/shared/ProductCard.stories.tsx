import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductCard } from './ProductCard';
import { expect, within } from 'storybook/test';

const mockMembership = {
  name: 'Insider Access',
  slug: 'insider-access',
  price: 25,
  isFeatured: true,
  body: 'This membership grants access to all articles on the blog, along with additional perks like early access to content, personalized style guides, and member-only newsletters.',
  features: [
    'everything from the elite access',
    'Full Article Access',
    'early content preview',
    'exclusive style guides',
  ],
  imageAlt: 'Article cover',
  imageUrl:
    'https://cdn.sanity.io/images/u19h5dbs/production/a4d451919b063b8b06afc99e03444fbf79f0d391-736x1040.jpg',
};

const meta: Meta<typeof ProductCard> = {
  title: 'Components/Shared/ProductCard',
  tags: ['autodocs'],
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },

  args: {
    name: mockMembership.name,
    slug: mockMembership.slug,
    price: mockMembership.price,
    media: {
      imageAlt: mockMembership.imageAlt,
      imageUrl: mockMembership.imageUrl,
    },
    body: mockMembership.body,
    features: mockMembership.features,
    isFeatured: mockMembership.isFeatured,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Membership Name',
    },

    slug: {
      control: 'text',
      description:
        'Membership slug is used as the reference to subscribe a specific membership',
    },

    price: {
      control: 'number',
      description: 'Membership Subscription per month price',
    },

    body: {
      control: 'text',
      description: 'Membership Summary text',
    },

    features: {
      control: 'object',
      description: 'Membership Feautres',
      table: {
        type: {
          summary: `string[];`,
          detail: `Array of strings describing each feature`,
        },
      },
    },

    isFeatured: {
      control: 'boolean',
      description:
        'Featured Membership Product card will have different border color',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = canvas.getByRole('heading');
    const link = canvas.getByRole('link');
    const price = canvas.getByTestId('price');
    const body = canvas.getByTestId('body');
    const features = canvas.getAllByRole('listitem');

    await expect(name).toBeInTheDocument();
    await expect(name).toHaveTextContent('Insider Access');
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('insider-access'),
    );
    await expect(price).toBeInTheDocument();
    await expect(price).toHaveTextContent('25');
    await expect(body).toBeInTheDocument();
    await expect(features).toHaveLength(4);
  },
};

export const NotFeatured: Story = {
  args: {
    isFeatured: false,
  },
};
