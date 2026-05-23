import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { YouTubeEmbeded } from './YouTubeEmbeded';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof YouTubeEmbeded> = {
  title: 'Components/Shared/YouTubeEmbeded',
  component: YouTubeEmbeded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },

  args: {
    videoId: '5NGyXTsg77E',
    title: 'Model Editorial shoots short clips',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    videoId: {
      control: 'text',
      description: 'YouTube Video ID',
    },

    title: {
      control: 'text',
      description: 'Video title for the Screen Reader',
    },
  },
};

export default meta;
type Story = StoryObj<typeof YouTubeEmbeded>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const video = canvas.getByTitle(/Model Editorial shoots short clips/i);

    await expect(video).toBeInTheDocument();
    await expect(video).toHaveClass('pointer-events-none');
    await expect(video).toHaveAttribute(
      'src',
      expect.stringContaining('5NGyXTsg77E'),
    );
  },
};
