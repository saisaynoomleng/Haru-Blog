import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EditorCard } from './EditorCard';
import { expect, within } from 'storybook/test';

const mockAuthor = {
  imageUrl:
    'https://cdn.sanity.io/images/u19h5dbs/production/7cdeef60190bf9526b1f3684fffba2f811188163-200x200.heif',
  imageAlt: "Laura Tarafa's photo",
  name: 'Laura Tarafa',
  slug: 'laura-tarafa',
};

const meta: Meta<typeof EditorCard> = {
  title: 'Components/Shared/EditorCard',
  component: EditorCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  args: {
    name: mockAuthor.name,
    href: mockAuthor.slug,
    media: {
      imageAlt: mockAuthor.imageAlt,
      imageUrl: mockAuthor.imageUrl,
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: `Editor's name`,
    },

    href: {
      control: 'text',
      description: "Sanity Slug as URL to go to the Editor's details page",
    },

    media: {
      control: 'object',
      description: `Editor's photo and photo alternative text`,
      table: {
        type: {
          summary: `imageUrl: string; imageAlt: string;`,
          detail: `
                        imageUrl: Full URL to the sanity's content lake,
                        imageAlt: Alternative text for the screen reader
                `,
        },
      },
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

    const name = canvas.getByText(/Laura Tarafa/i);

    await expect(name).toBeInTheDocument();
    await expect(name).toHaveTextContent('Laura Tarafa');
  },
};
