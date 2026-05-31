import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Bounded from './Bounded';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'Components/Shared/Bounded',
  tags: ['autodocs'],
  component: Bounded,

  args: {
    as: 'section',
    padding: 'md',
    isCentered: true,
  },
  argTypes: {
    as: {
      control: 'radio',
      description: 'Element type of the Component',
      table: {
        type: {
          summary: `'section' | 'main'`,
          detail: `
                section makes the component SECTION
                main makes the component MAIN
                `.trim(),
        },
      },
    },
    padding: {
      control: 'radio',
      description: 'Add vertical padding to the component, default to medium',
      table: {
        type: {
          summary: `'none' | 'sm' | 'md' | 'lg'`,
        },
      },
    },
    isCentered: {
      control: 'boolean',
      description:
        'Limit the component size to span to extra large screen, centering everyting with the maximum width of 1280px',
    },
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
    children: {
      control: 'object',
      description: 'Any React Node',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof Bounded>;

export const Default: Story = {
  render: (args) => (
    <Bounded {...args} padding="md">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate alias
        vero ipsam laboriosam. Quaerat maiores minima aliquam dignissimos
        consequuntur pariatur!
      </p>
    </Bounded>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paragraph = canvas.getByRole('paragraph');
    const bounded = paragraph.parentElement;

    await expect(paragraph).toBeInTheDocument();
    await expect(bounded).toBeInTheDocument();

    await expect(bounded).toHaveClass('px-8');
    await expect(bounded?.tagName).toBe('SECTION');
  },
};

export const MainWithMultipleChildren: Story = {
  args: {
    as: 'main',
  },
  render: (args) => (
    <Bounded {...args}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti hic
        blanditiis, repellat fuga consectetur quam officia porro nobis ab odit.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae saepe
        blanditiis facere ad obcaecati inventore aperiam perspiciatis dolor
        totam quis.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        consectetur aperiam magni consequuntur accusantium reiciendis sapiente
        excepturi dolor velit commodi?
      </p>
    </Bounded>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const bounded = canvas.getByRole('main');

    await expect(bounded).toBeInTheDocument();
  },
};
