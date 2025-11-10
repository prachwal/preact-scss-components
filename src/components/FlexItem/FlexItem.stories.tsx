import type { Meta, StoryObj } from '@storybook/preact';
import { Container, FlexItem } from '@components';

const meta: Meta = {
  title: 'Components/FlexItem',
  component: FlexItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'FlexItem component for controlling individual flex item properties within a flex container.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demo items
const DemoItem = ({ children, bg = '#007acc', style, ...props }: { children: any; bg?: string; style?: any; [key: string]: any }) => (
  <div style={{
    padding: '1rem',
    background: bg,
    color: 'white',
    borderRadius: '4px',
    textAlign: 'center',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  }} {...props}>
    {children}
  </div>
);

export const Basic: Story = {
  render: () => (
    <Container layout="flex" gap="medium">
      <FlexItem>
        <DemoItem>Default</DemoItem>
      </FlexItem>
      <FlexItem>
        <DemoItem bg="#28a745">Default</DemoItem>
      </FlexItem>
      <FlexItem>
        <DemoItem bg="#ffc107">Default</DemoItem>
      </FlexItem>
    </Container>
  ),
};

export const FlexShorthand: Story = {
  render: () => (
    <div>
      <h3>flex: "1 1 200px"</h3>
      <Container layout="flex" gap="medium">
        <FlexItem flex="1 1 200px">
          <DemoItem>flex: "1 1 200px"</DemoItem>
        </FlexItem>
        <FlexItem flex="1 1 200px">
          <DemoItem bg="#28a745">flex: "1 1 200px"</DemoItem>
        </FlexItem>
        <FlexItem flex="1 1 200px">
          <DemoItem bg="#ffc107">flex: "1 1 200px"</DemoItem>
        </FlexItem>
      </Container>

      <h3>flex: "0 0 150px"</h3>
      <Container layout="flex" gap="medium">
        <FlexItem flex="0 0 150px">
          <DemoItem>Fixed 150px</DemoItem>
        </FlexItem>
        <FlexItem flex="1 1 auto">
          <DemoItem bg="#28a745">Flexible</DemoItem>
        </FlexItem>
      </Container>

      <h3>flex: "2 1 100px"</h3>
      <Container layout="flex" gap="medium">
        <FlexItem flex="2 1 100px">
          <DemoItem>Grow: 2</DemoItem>
        </FlexItem>
        <FlexItem flex="1 1 100px">
          <DemoItem bg="#28a745">Grow: 1</DemoItem>
        </FlexItem>
        <FlexItem flex="1 1 100px">
          <DemoItem bg="#ffc107">Grow: 1</DemoItem>
        </FlexItem>
      </Container>
    </div>
  ),
};

export const FlexGrow: Story = {
  render: () => (
    <div>
      <h3>flexGrow values</h3>
      <Container layout="flex" gap="medium">
        <FlexItem flexGrow={0}>
          <DemoItem>No grow</DemoItem>
        </FlexItem>
        <FlexItem flexGrow={1}>
          <DemoItem bg="#28a745">Grow: 1</DemoItem>
        </FlexItem>
        <FlexItem flexGrow={2}>
          <DemoItem bg="#ffc107">Grow: 2</DemoItem>
        </FlexItem>
        <FlexItem flexGrow={3}>
          <DemoItem bg="#dc3545">Grow: 3</DemoItem>
        </FlexItem>
      </Container>
    </div>
  ),
};

export const FlexShrink: Story = {
  render: () => (
    <div>
      <h3>flexShrink values (container width: 600px)</h3>
      <Container layout="flex" gap="medium" style={{ width: '600px', background: '#f5f5f5', padding: '1rem' }}>
        <FlexItem flexShrink={0}>
          <DemoItem style={{ minWidth: '200px' }}>No shrink</DemoItem>
        </FlexItem>
        <FlexItem flexShrink={1}>
          <DemoItem bg="#28a745" style={{ minWidth: '200px' }}>Shrink: 1</DemoItem>
        </FlexItem>
        <FlexItem flexShrink={2}>
          <DemoItem bg="#ffc107" style={{ minWidth: '200px' }}>Shrink: 2</DemoItem>
        </FlexItem>
      </Container>
    </div>
  ),
};

export const FlexBasis: Story = {
  render: () => (
    <div>
      <h3>flexBasis values</h3>
      <Container layout="flex" gap="medium">
        <FlexItem flexBasis="100px">
          <DemoItem>100px basis</DemoItem>
        </FlexItem>
        <FlexItem flexBasis="200px">
          <DemoItem bg="#28a745">200px basis</DemoItem>
        </FlexItem>
        <FlexItem flexBasis="150px">
          <DemoItem bg="#ffc107">150px basis</DemoItem>
        </FlexItem>
        <FlexItem flexBasis="auto">
          <DemoItem bg="#dc3545">auto basis</DemoItem>
        </FlexItem>
      </Container>
    </div>
  ),
};

export const Order: Story = {
  render: () => (
    <div>
      <h3>Order property</h3>
      <Container layout="flex" gap="medium">
        <FlexItem order={3}>
          <DemoItem>Order: 3</DemoItem>
        </FlexItem>
        <FlexItem order={1}>
          <DemoItem bg="#28a745">Order: 1</DemoItem>
        </FlexItem>
        <FlexItem order={2}>
          <DemoItem bg="#ffc107">Order: 2</DemoItem>
        </FlexItem>
        <FlexItem order={0}>
          <DemoItem bg="#dc3545">Order: 0 (default)</DemoItem>
        </FlexItem>
      </Container>

      <p>Items are displayed in order: 0, 1, 2, 3</p>
    </div>
  ),
};

export const DifferentTags: Story = {
  render: () => (
    <Container layout="flex" gap="medium" direction="column">
      <FlexItem as="div">
        <DemoItem>as="div" (default)</DemoItem>
      </FlexItem>
      <FlexItem as="section">
        <DemoItem bg="#28a745">as="section"</DemoItem>
      </FlexItem>
      <FlexItem as="article">
        <DemoItem bg="#ffc107">as="article"</DemoItem>
      </FlexItem>
      <FlexItem as="aside">
        <DemoItem bg="#dc3545">as="aside"</DemoItem>
      </FlexItem>
    </Container>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div>
      <h3>Complex flexbox layout with FlexItem properties</h3>
      <Container layout="flex" gap="medium" alignItems="center">
        {/* Fixed width sidebar */}
        <FlexItem flex="0 0 200px">
          <DemoItem style={{ minHeight: '200px' }}>Sidebar<br/>(fixed 200px)</DemoItem>
        </FlexItem>

        {/* Main content area that grows */}
        <FlexItem flex="1 1 auto">
          <Container layout="flex" gap="small" direction="column">
            {/* Header */}
            <FlexItem flex="0 0 60px">
              <DemoItem bg="#28a745">Header</DemoItem>
            </FlexItem>

            {/* Content area */}
            <FlexItem flex="1 1 auto">
              <Container layout="flex" gap="small">
                <FlexItem flex="2 1 200px">
                  <DemoItem bg="#ffc107" style={{ minHeight: '120px' }}>Content A<br/>(grows more)</DemoItem>
                </FlexItem>
                <FlexItem flex="1 1 150px">
                  <DemoItem bg="#dc3545" style={{ minHeight: '120px' }}>Content B<br/>(grows less)</DemoItem>
                </FlexItem>
              </Container>
            </FlexItem>

            {/* Footer */}
            <FlexItem flex="0 0 50px">
              <DemoItem bg="#6f42c1">Footer</DemoItem>
            </FlexItem>
          </Container>
        </FlexItem>

        {/* Right sidebar with different order */}
        <FlexItem flex="0 0 150px" order={-1}>
          <DemoItem bg="#e83e8c" style={{ minHeight: '200px' }}>Right Sidebar<br/>(order: -1)</DemoItem>
        </FlexItem>
      </Container>
    </div>
  ),
};