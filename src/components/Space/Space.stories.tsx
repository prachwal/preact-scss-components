import type { Meta, StoryObj } from '@storybook/preact';
import { Space, SpaceProps } from './Space';

const meta: Meta<SpaceProps> = {
  title: 'Layout/Space',
  component: Space,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Space component provides consistent spacing between child elements using flexbox gap.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction of the spacing layout',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the spacing between items',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether to wrap items to the next line',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'span', 'section'],
      description: 'HTML tag to use for the container',
    },
  },
};

export default meta;
type Story = StoryObj<SpaceProps>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
    size: 'small',
    wrap: false,
    children: [
      <button key="1">Button 1</button>,
      <button key="2">Button 2</button>,
      <button key="3">Button 3</button>,
    ],
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    size: 'medium',
    children: [
      <div key="1">Item 1</div>,
      <div key="2">Item 2</div>,
      <div key="3">Item 3</div>,
    ],
  },
};

export const LargeSpacing: Story = {
  args: {
    direction: 'horizontal',
    size: 'large',
    children: [
      <span key="1">Element 1</span>,
      <span key="2">Element 2</span>,
    ],
  },
};

export const WithWrap: Story = {
  args: {
    direction: 'horizontal',
    size: 'medium',
    wrap: true,
    children: Array.from({ length: 10 }, (_, i) => (
      <button key={i} style={{ minWidth: '100px' }}>
        Button {i + 1}
      </button>
    )),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrapping behavior when items exceed container width.',
      },
    },
  },
};

export const CustomSize: Story = {
  args: {
    direction: 'horizontal',
    size: 32, // Custom numeric size
    children: [
      <div key="1">Custom spacing</div>,
      <div key="2">between items</div>,
    ],
  },
};

export const AsSpan: Story = {
  args: {
    as: 'span',
    direction: 'horizontal',
    size: 'small',
    children: [
      <span key="1">Inline element 1</span>,
      <span key="2">Inline element 2</span>,
    ],
  },
};