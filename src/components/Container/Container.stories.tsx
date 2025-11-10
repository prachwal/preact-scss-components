import type { Meta, StoryObj } from '@storybook/preact';
import { Container } from '@components';

const meta: Meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <div style={{ padding: '1rem', background: '#007acc', color: 'white' }}>Item 1</div>
      <div style={{ padding: '1rem', background: '#28a745', color: 'white' }}>Item 2</div>
      <div style={{ padding: '1rem', background: '#ffc107', color: 'white' }}>Item 3</div>
    </Container>
  ),
};

export const FlexLayout: Story = {
  render: () => (
    <Container layout="flex" gap="medium">
      <div style={{ padding: '1rem', background: '#007acc', color: 'white' }}>Flex Item 1</div>
      <div style={{ padding: '1rem', background: '#28a745', color: 'white' }}>Flex Item 2</div>
      <div style={{ padding: '1rem', background: '#ffc107', color: 'white' }}>Flex Item 3</div>
    </Container>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <Container layout="grid" gap="medium">
      <div style={{ padding: '1rem', background: '#007acc', color: 'white' }}>Grid Item 1</div>
      <div style={{ padding: '1rem', background: '#28a745', color: 'white' }}>Grid Item 2</div>
      <div style={{ padding: '1rem', background: '#ffc107', color: 'white' }}>Grid Item 3</div>
      <div style={{ padding: '1rem', background: '#dc3545', color: 'white' }}>Grid Item 4</div>
    </Container>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <Container layout="flex" justifyContent="space-between" gap="small">
      <div style={{ padding: '1rem', background: '#007acc', color: 'white' }}>Start</div>
      <div style={{ padding: '1rem', background: '#28a745', color: 'white' }}>Center</div>
      <div style={{ padding: '1rem', background: '#ffc107', color: 'white' }}>End</div>
    </Container>
  ),
};