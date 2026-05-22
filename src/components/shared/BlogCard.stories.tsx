import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlogCard from './BlogCard';

const mockBlog = {
  author: '',
};

const meta = {
  title: 'Components/Shared/BlogCard',
  component: BlogCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  args: {},
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  render: (args) => <BlogCard {...args} />,
};
