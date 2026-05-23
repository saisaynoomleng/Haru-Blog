import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PaperTorn } from './PaperTorn';
import Image from 'next/image';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof PaperTorn> = {
  title: 'Components/Shared/PaperTorn',
  component: PaperTorn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
    children: {
      control: 'text',
      description: 'Can be any elements or nodes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaperTorn>;

export const Default: Story = {
  render: (args) => (
    <PaperTorn {...args}>
      <Image
        src="https://cdn.sanity.io/images/u19h5dbs/production/ccb52ed2b9108409dd9f6c07dc67928bcfa2b662-1120x1120.heif"
        alt=""
        width={200}
        height={200}
        loading="lazy"
        className="relative z-20"
        data-testid="img"
      />
    </PaperTorn>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvas.getByTestId('img');

    await expect(img).toBeInTheDocument();
    await expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
  },
};
