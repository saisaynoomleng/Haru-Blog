import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './Hero';
import { expect, within } from 'storybook/test';

const mockBlog = {
  author: 'Laura Tarafa',
  category: 'Shopping',
  excerpt:
    'Just days away, Memorial Day weekend is creeping up fast, which means many of our favorite brands are rolling out serious savings on editor-loved essentials. But with so many deals flooding the internet, it can be hard to know what’s actually worth adding to cart, where the steepest discounts are, and which sales truly deserve your attention. ',
  imageAlt: 'two girls looking at their phones',
  imageUrl:
    'https://cdn.sanity.io/images/u19h5dbs/production/ccb52ed2b9108409dd9f6c07dc67928bcfa2b662-1120x1120.heif',
  title:
    'The 2026 Memorial Day Weekend Deals ELLE Editors Say Are Actually Worth Your Money',
  href: 'the-2026-memorial-day-weekend-deals-elle-editors-say-are-actually-worth-your-money',
};

const meta: Meta<typeof Hero> = {
  title: 'Components/Shared/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

  args: {
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'paperTexture', 'categorize'],
      description: 'Hero variantions differ due to displaying on the website',
      table: {
        type: {
          summary: `default | paperTexture | categorize`,
          detail: `
            default: Used in Home Page as Main Hero
            paperTexture: Used as Section Hero for displaying featured section
            categorize: Used in Main articles page as featured post
          `.trim(),
        },
      },
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS class',
    },

    media: {
      control: 'object',
      description: 'Hero image and alternative text',
      table: {
        type: {
          summary: `imageUrl: string; imageAlt: string;`,
          detail: `
                    imageUrl: Full Sanity image URL to the content lake
                    imageAlt: Image Alternative text for screen reader
                `.trim(),
        },
      },
    },

    title: {
      control: 'text',
      description: 'Hero Main Title',
    },

    eyebrow: {
      control: 'text',
      description:
        'Initials of the author to display vertically on default hero',
    },

    description: {
      control: 'text',
      description: 'Short Summary Text',
    },

    action: {
      control: 'object',
      description: 'Call to Action to the particular page',
      table: {
        type: {
          summary: `label: string; href: string`,
          detail: `
                    label: Label for the call to action
                    href: Full URL to the destination page
            `.trim(),
        },
      },
    },

    scrollIndicator: {
      control: 'boolean',
      description: 'Bouncing indicator to indicate to scroll down',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: mockBlog.title,
    scrollIndicator: true,
    eyebrow: 'LT',
    description: mockBlog.excerpt,
    action: {
      label: 'Read Article',
      href: mockBlog.href,
    },
    media: {
      imageAlt: mockBlog.imageAlt,
      imageUrl: mockBlog.imageUrl,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole('heading');
    const eyebrow = canvas.getByText(/lt/i);
    const link = canvas.getByRole('link');
    const image = canvas.getByRole('img');

    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent(args.title);
    await expect(eyebrow).toBeInTheDocument();
    await expect(eyebrow).toHaveTextContent('LT');
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute(
      'href',
      'the-2026-memorial-day-weekend-deals-elle-editors-say-are-actually-worth-your-money',
    );
    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute(
      'alt',
      expect.stringContaining('two girls'),
    );
  },
};

export const Categorize: Story = {
  args: {
    title: mockBlog.title,
    description: mockBlog.excerpt,
    action: {
      label: 'Read Article',
      href: mockBlog.href,
    },
    media: {
      imageAlt: mockBlog.imageAlt,
      imageUrl: mockBlog.imageUrl,
    },
    variant: 'categorize',
    category: mockBlog.category,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole('heading');
    const link = canvas.getByRole('link');
    const image = canvas.getByRole('img');
    const category = canvas.getByText(/shopping/i);

    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent(args.title);
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute(
      'href',
      'the-2026-memorial-day-weekend-deals-elle-editors-say-are-actually-worth-your-money',
    );
    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute(
      'alt',
      expect.stringContaining('two girls'),
    );
    await expect(category).toBeInTheDocument();
    await expect(category).toHaveTextContent('Shopping');
  },
};

export const PaperTexture: Story = {
  args: {
    title: mockBlog.title,
    description: mockBlog.excerpt,
    action: {
      label: 'Read Article',
      href: mockBlog.href,
    },
    media: {
      imageAlt: mockBlog.imageAlt,
      imageUrl: mockBlog.imageUrl,
    },
    variant: 'paperTexture',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole('heading');
    const link = canvas.getByRole('link');
    const image = canvas.getByRole('img');

    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent(args.title);
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute(
      'href',
      'the-2026-memorial-day-weekend-deals-elle-editors-say-are-actually-worth-your-money',
    );
    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute(
      'alt',
      expect.stringContaining('two girls'),
    );
  },
};
