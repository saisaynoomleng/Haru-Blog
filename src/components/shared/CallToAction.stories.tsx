import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CallToAction } from './CallToAction';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Components/Shared/CallToAction',
  component: CallToAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  args: {
    label: 'read article',
    href: '/',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    label: {
      control: 'text',
      description: 'Text to display on the Call to Action Button',
    },

    href: {
      control: 'text',
      description: 'FULL URL to the destination page',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof CallToAction>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');

    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '/');
    await expect(link).toHaveTextContent('read article');
  },
};
