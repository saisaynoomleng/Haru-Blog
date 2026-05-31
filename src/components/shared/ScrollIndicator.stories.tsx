import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ScrollIndicator } from './ScrollIndicator';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof ScrollIndicator> = {
  title: 'Components/Shared/ScrollIndicator',
  component: ScrollIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    themes: {
      themeOverride: 'dark',
    },
  },

  args: {
    label: 'Scroll Down',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
    label: {
      control: 'text',
      description: 'Label to display near bouncing arrow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollIndicator>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(/scroll down/i);
    const icon = canvas.getByTestId('bounce indicator');

    await expect(label).toBeInTheDocument();
    await expect(icon).toBeInTheDocument();
  },
};
