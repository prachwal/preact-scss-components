import type { Meta, StoryObj } from '@storybook/preact';
import { Divider, DividerProps } from './Divider';

const meta: Meta<DividerProps> = {
  title: 'Layout/Divider',
  tags: ['autodocs'],
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A visual separator component that can be horizontal or vertical, with optional title and dashed styling.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
    },
    title: {
      control: 'text',
      description: 'Optional title text to display on the divider',
    },
    dashed: {
      control: 'boolean',
      description: 'Whether to display the divider as a dashed line',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'span', 'hr'],
      description: 'HTML tag to use for the container element',
    },
  },
};

export default meta;
type Story = StoryObj<DividerProps>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  parameters: {
    layout: 'centered',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Section Title',
  },
};

export const Dashed: Story = {
  args: {
    dashed: true,
  },
};

export const DashedWithTitle: Story = {
  args: {
    title: 'Dashed Section',
    dashed: true,
  },
};

export const VerticalWithTitle: Story = {
  args: {
    orientation: 'vertical',
    title: 'Vertical Section',
  },
  parameters: {
    layout: 'centered',
  },
};

export const CustomTag: Story = {
  args: {
    as: 'span',
    title: 'Custom Tag',
  },
};

export const InContent: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>First Section</h2>
      <p>This is some content in the first section.</p>

      <Divider />

      <h2>Second Section</h2>
      <p>This is some content in the second section.</p>

      <Divider title="Important Notice" />

      <h2>Third Section</h2>
      <p>This is some content in the third section.</p>
    </div>
  ),
};

export const VerticalInLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '200px', gap: '20px', alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '20px', backgroundColor: 'var(--psc-color-surface-secondary)' }}>
        <h3>Left Panel</h3>
        <p>Content in the left panel.</p>
      </div>

      <Divider orientation="vertical" />

      <div style={{ flex: 1, padding: '20px', backgroundColor: 'var(--psc-color-surface-secondary)' }}>
        <h3>Right Panel</h3>
        <p>Content in the right panel.</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};