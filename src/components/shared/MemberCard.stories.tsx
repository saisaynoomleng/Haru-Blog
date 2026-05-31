import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MemberCard } from './MemberCard';
import { expect, within } from 'storybook/test';

const mockMember = {
  name: 'Andre Huan',
  email: 'andrehuan@harublog.com',
  imageAlt: 'andre huan',
  imageUrl:
    'https://cdn.sanity.io/images/u19h5dbs/production/d8cbdae718e873bbff1624abd5a0e6a100687e0d-736x1308.jpg',
  role: 'editor',
};

const meta = {
  title: 'Components/Shared/MemberCard',
  tags: ['autodocs'],
  component: MemberCard,
  parameters: {
    layout: 'centered',
  },

  args: {
    name: mockMember.name,
    email: mockMember.email,
    media: {
      imageAlt: mockMember.imageAlt,
      imageUrl: mockMember.imageUrl,
    },
    role: mockMember.role,
  },
  argTypes: {
    name: {
      control: 'text',
      description: "Team Member's Name",
    },

    email: {
      control: 'text',
      description: `Team Member's email`,
    },

    media: {
      control: 'object',
      description: "Team member's image url and alternative text",
      table: {
        type: {
          summary: `imageUrl: string; imageAlt: string;`,
          detail: `
                imageUrl: Full URL path to the Sanity's data lake
                imageAlt: Image alternative text for the screen reader
            `,
        },
      },
    },
  },
} satisfies Meta<typeof MemberCard>;

export default meta;
type Story = StoryObj<typeof MemberCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByRole('img');
    const name = canvas.getByText(/andre huan/i);
    const email = canvas.getByText(/andrehuan@harublog.com/i);
    const role = canvas.getByText(/editor/i);

    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute('alt', 'andre huan');
    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(role).toBeInTheDocument();
  },
};
