import type { Meta, StoryObj } from '@storybook/web-components-vite';

type OpoIconArgs = {
  icon: string;
  decorative: boolean;
  a11yTitle?: string;
  width?: number;
  height?: number;
};

const meta: Meta<OpoIconArgs> = {
  title: 'Components/Opo Icon',
  tags: ['autodocs'],
  component: 'opo-icon',
  args: {
    icon: 'logo',
    decorative: false,
    a11yTitle: 'OpositaTest',
    width: 160,
    height: 45,
  },
  argTypes: {
    icon: {
      control: 'text',
    },
    decorative: {
      control: 'boolean',
    },
    a11yTitle: {
      control: 'text',
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
  render: ({ icon, decorative, a11yTitle, width, height }) => {
    const element = document.createElement('opo-icon');
    element.setAttribute('icon', icon);

    if (decorative) {
      element.setAttribute('decorative', '');
    } else {
      element.removeAttribute('decorative');
    }

    if (a11yTitle !== undefined) {
      element.setAttribute('a11y-title', a11yTitle);
    } else {
      element.removeAttribute('a11y-title');
    }

    if (width !== undefined) {
      element.setAttribute('width', String(width));
    } else {
      element.removeAttribute('width');
    }

    if (height !== undefined) {
      element.setAttribute('height', String(height));
    } else {
      element.removeAttribute('height');
    }

    return element;
  },
};

export default meta;

type Story = StoryObj<OpoIconArgs>;

export const Default: Story = {};

export const Decorative: Story = {
  args: {
    decorative: true,
    a11yTitle: undefined,
  },
};

export const NoSize: Story = {
  args: {
    width: undefined,
    height: undefined,
  },
};
