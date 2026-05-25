import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FAQs } from './FAQs';
import { expect, within } from 'storybook/test';

const mockFAQ = {
  name: 'Digital Lookbooks & Interactive Features',
  faqs: [
    {
      title: 'How does the Interactive Boutique Map work?',
      body: `Our "Boutique Locator" uses real-time geolocation via React Map GL. It allows you to find physical pop-up shops, luxury flagship stores, and sustainable fashion stockists mentioned in our articles close to your current location.`,
    },
    {
      title: 'Are the digital fashion lookbooks downloadable?',
      body: `Yes, premium members can download high-resolution, interactive PDF lookbooks directly from their dashboard for offline style inspiration.`,
    },
    {
      title: `Why isn't the map displaying my current location?`,
      body: `Please ensure that you have granted location permissions to your web browser. If permissions are denied, the map will default to our flagship studio location in San Francisco.`,
    },
  ],
};

const meta: Meta<typeof FAQs> = {
  title: 'Components/Shared/FAQs',
  component: FAQs,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

  args: {
    name: mockFAQ.name,
    faqs: mockFAQ.faqs,
  },
  argTypes: {
    name: {
      control: 'text',
      description:
        'FAQs Title, for example, shipping, membership, payments, etc.',
    },

    faqs: {
      control: 'object',
      description: 'Main FAQs body',
      table: {
        type: {
          summary: `title: string; body: string;`,
          detail: `
                    title: FAQ question
                    body: FAQ answer description
                `.trim(),
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = canvas.getByTestId('faqs title');

    await expect(name).toBeInTheDocument();
    await expect(name).toHaveTextContent('Digital');
  },
};
