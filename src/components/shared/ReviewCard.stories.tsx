import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReviewCard } from './ReviewCard';
import { mockReviewCard } from '@/lib/dataAccessLayer';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof ReviewCard> = {
  title: 'Components/Shared/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  args: {
    role: mockReviewCard.role,
    title: mockReviewCard.title,
    body: mockReviewCard.body,
    username: mockReviewCard.username,
    reviewedAt: mockReviewCard.reviewedAt,
    rating: Number(mockReviewCard.rating),
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS class',
    },

    username: {
      control: 'text',
      description: `Reviewer's username`,
    },

    title: {
      control: 'text',
      description: 'Review title',
    },

    body: {
      control: 'text',
      description: 'Review Text',
    },

    role: {
      control: 'text',
      description: `Reviewer job position`,
    },

    rating: {
      control: 'number',
      description: `Rating number between 1 and 5`,
      table: {
        type: {
          summary: `rating: 1 | 2 | 3 | 4 | 5 `,
        },
      },
    },

    reviewedAt: {
      control: 'date',
      description: 'Reviewed Date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const username = canvas.getByText(/anna_luxstyle/i);
    const role = canvas.getByText(/brand strategist/i);
    const body = canvas.getByTestId('body');

    await expect(username).toBeInTheDocument();
    await expect(role).toBeInTheDocument();
    await expect(body).toBeInTheDocument();
  },
};
