import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

import '../../index.ts';

type OpoButtonArgs = {
  variant: 'primary' | 'secondary';
  disabled: boolean;
  label: string;
  onOpoClick?: () => void;
};

const meta: Meta<OpoButtonArgs> = {
  title: 'Components/Opo Button',
  tags: ['autodocs'],
  component: 'opo-button',
  args: {
    variant: 'primary',
    disabled: false,
    label: 'Empieza ahora',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onOpoClick: {
      action: 'opoClick',
      table: {
        category: 'Events',
      },
    },
  },
  render: ({ variant, disabled, label }) => {
    const element = document.createElement('opo-button');
    element.setAttribute('variant', variant);

    if (disabled) {
      element.setAttribute('disabled', '');
    } else {
      element.removeAttribute('disabled');
    }

    element.textContent = label;
    element.addEventListener('opoClick', action('opoClick'));
    return element;
  },
};

export default meta;

type Story = StoryObj<OpoButtonArgs>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Ver plazas',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'No disponible',
  },
};
