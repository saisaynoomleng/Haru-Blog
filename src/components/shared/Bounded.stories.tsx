import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Bounded from './Bounded';

const meta = {
  title: 'Components/Shared/Bounded',
  tags: ['autodocs'],
  component: Bounded,

  parameters: {
    layout: 'fullscreen',
  },

  args: {
    as: 'section',
    padding: 'md',
    isCentered: true,
  },
  argTypes: {},
} satisfies Meta<typeof Bounded>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
