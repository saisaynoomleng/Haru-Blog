import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlogCard from './BlogCard';
import { expect, within } from 'storybook/test';

const mockBlog = {
  author: 'Laura Tarafa',
  category: 'Shopping',
  excerpt: `Just days away, Memorial Day weekend is creeping up fast, which means many of our favorite brands are rolling out serious savings on editor-loved essentials. But with so many deals flooding the internet, it can be hard to know what’s actually worth adding to cart, where the steepest discounts are, and which sales truly deserve your attention. We’ve already rounded up the best Amazon finds, and now we’re spotlighting all the can’t-miss deals from cult-favorite home, fashion, beauty, and lifestyle brands.`,
  imageAlt: 'two girls looking at their phones',
  imageUrl:
    'https://cdn.sanity.io/images/u19h5dbs/production/ccb52ed2b9108409dd9f6c07dc67928bcfa2b662-1120x1120.heif',
  title:
    'The 2026 Memorial Day Weekend Deals ELLE Editors Say Are Actually Worth Your Money',
  href: 'the-2026-memorial-day-weekend-deals-elle-editors-say-are-actually-worth-your-money',
};

const meta = {
  title: 'Components/Shared/BlogCard',
  component: BlogCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  args: {
    title: mockBlog.title,
    author: mockBlog.author,
    category: mockBlog.category,
    excerpt: mockBlog.excerpt,
    media: {
      imageUrl: mockBlog.imageUrl,
      imageAlt: mockBlog.imageAlt,
    },
    href: mockBlog.href,
    variant: 'default',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Blog Title',
    },

    author: {
      control: 'text',
      description: 'Author of the blog',
    },

    category: {
      control: 'text',
      description: `Blog's category`,
    },

    excerpt: {
      control: 'text',
      description: 'Short summary of the Blog display on the blog card',
    },

    media: {
      control: 'object',
      description:
        'Sanity Image URL and alternative text of the blog cover photo',
      table: {
        type: {
          summary: `imageUrl: string; imageAlt: string;`,
          detail: `
            imageUrl: Full Sanity URL to the blog image
            imageAlt: Image's alternative text for the screen reader
          `.trim(),
        },
      },
    },

    href: {
      control: 'text',
      description: `Full URL path to the blog, typically Sanity's slug`,
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS class',
    },

    variant: {
      control: 'radio',
      description: 'Layout for the blog card',
      table: {
        type: {
          summary: `Default | Text On Top`,
          detail: `
            Default: Default Blog card view with image, and text
            Text On Top: Image as the background and text on top of the image
          `,
        },
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByRole('img');
    const author = canvas.getByText(/laura tarafa/i);
    const category = canvas.getByText(/shopping/i);
    const blogCard = canvas.getByRole('link');
    const title = canvas.getByRole('heading');

    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute(
      'alt',
      expect.stringContaining('two girls'),
    );

    await expect(author).toBeInTheDocument();
    await expect(category).toBeInTheDocument();

    await expect(blogCard).toBeInTheDocument();
    await expect(blogCard).toHaveAttribute(
      'href',
      expect.stringContaining('the-2026-memorial-day-weekend'),
    );

    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent(
      'The 2026 Memorial Day Weekend Deals ELLE Editors Say Are Actually Worth Your Money',
    );
  },
};

export const TextOnTop: Story = {
  args: {
    variant: 'textOnTop',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByRole('img');
    const author = canvas.getByText(/laura tarafa/i);
    const category = canvas.getByText(/shopping/i);
    const blogCard = canvas.getByRole('link');
    const title = canvas.getByRole('heading');

    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute(
      'alt',
      expect.stringContaining('two girls'),
    );

    await expect(author).toBeInTheDocument();
    await expect(category).toBeInTheDocument();

    await expect(blogCard).toBeInTheDocument();
    await expect(blogCard).toHaveAttribute(
      'href',
      expect.stringContaining('the-2026-memorial-day-weekend'),
    );

    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent(
      'The 2026 Memorial Day Weekend Deals ELLE Editors Say Are Actually Worth Your Money',
    );
  },
};
