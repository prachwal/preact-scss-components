import type { Meta, StoryObj } from '@storybook/preact';
import { Grid } from '@components';

const meta: Meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Responsive grid component similar to Material-UI Grid. Supports both container and item behaviors with responsive breakpoints.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demo items
const DemoItem = ({ children, bg = '#007acc', style, ...props }: { children: string; bg?: string; style?: any; [key: string]: any }) => (
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

export const BasicContainer: Story = {
  render: (args) => (
    <Grid container {...args}>
      <Grid item xs={12} sm={6} md={4}>
        <DemoItem>xs=12 sm=6 md=4</DemoItem>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DemoItem bg="#28a745">xs=12 sm=6 md=4</DemoItem>
      </Grid>
      <Grid item xs={12} md={4}>
        <DemoItem bg="#ffc107">xs=12 md=4</DemoItem>
      </Grid>
    </Grid>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div>
      <h3>Spacing 0 (no spacing)</h3>
      <Grid container spacing={0}>
        <Grid item xs={4}><DemoItem>Item 1</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Item 2</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">Item 3</DemoItem></Grid>
      </Grid>

      <h3>Spacing 2</h3>
      <Grid container spacing={2}>
        <Grid item xs={4}><DemoItem>Item 1</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Item 2</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">Item 3</DemoItem></Grid>
      </Grid>

      <h3>Spacing 4</h3>
      <Grid container spacing={4}>
        <Grid item xs={4}><DemoItem>Item 1</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Item 2</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">Item 3</DemoItem></Grid>
      </Grid>
    </div>
  ),
};

export const Direction: Story = {
  render: () => (
    <div>
      <h3>Row (default)</h3>
      <Grid container spacing={2}>
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#ffc107">3</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#dc3545">4</DemoItem></Grid>
      </Grid>

      <h3>Row Reverse</h3>
      <Grid container spacing={2} direction="row-reverse">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#ffc107">3</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#dc3545">4</DemoItem></Grid>
      </Grid>

      <h3>Column</h3>
      <Grid container spacing={2} direction="column" style={{ height: '300px' }}>
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#ffc107">3</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#dc3545">4</DemoItem></Grid>
      </Grid>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div>
      <h3>Flex Start (default)</h3>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
      </Grid>

      <h3>Center</h3>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
      </Grid>

      <h3>Flex End</h3>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
      </Grid>

      <h3>Space Between</h3>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
      </Grid>

      <h3>Space Around</h3>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
      </Grid>

      <h3>Space Evenly</h3>
      <Grid container spacing={2} justifyContent="space-evenly">
        <Grid item xs={3}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={3}><DemoItem bg="#28a745">2</DemoItem></Grid>
      </Grid>
    </div>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <div>
      <h3>Stretch (default)</h3>
      <Grid container spacing={2} alignItems="stretch" style={{ height: '120px' }}>
        <Grid item xs={4}><DemoItem>Stretch</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Stretch</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">Stretch</DemoItem></Grid>
      </Grid>

      <h3>Flex Start</h3>
      <Grid container spacing={2} alignItems="flex-start" style={{ height: '120px' }}>
        <Grid item xs={4}><DemoItem>Start</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Start</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">Start</DemoItem></Grid>
      </Grid>

      <h3>Center</h3>
      <Grid container spacing={2} alignItems="center" style={{ height: '120px' }}>
        <Grid item xs={4}><DemoItem>Center</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Center</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">Center</DemoItem></Grid>
      </Grid>

      <h3>Flex End</h3>
      <Grid container spacing={2} alignItems="flex-end" style={{ height: '120px' }}>
        <Grid item xs={4}><DemoItem>End</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">End</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107">End</DemoItem></Grid>
      </Grid>

      <h3>Baseline</h3>
      <Grid container spacing={2} alignItems="baseline" style={{ height: '120px' }}>
        <Grid item xs={4}><DemoItem style={{ paddingBottom: '2rem' }}>Baseline</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#28a745">Baseline</DemoItem></Grid>
        <Grid item xs={4}><DemoItem bg="#ffc107" style={{ paddingTop: '1rem' }}>Baseline</DemoItem></Grid>
      </Grid>
    </div>
  ),
};

export const Wrap: Story = {
  render: () => (
    <div>
      <h3>Wrap (default)</h3>
      <Grid container spacing={2} style={{ width: '300px', background: '#f5f5f5', padding: '1rem' }}>
        <Grid item xs={6}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#28a745">2</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#ffc107">3</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#dc3545">4</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#6f42c1">5</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#e83e8c">6</DemoItem></Grid>
      </Grid>

      <h3>No Wrap</h3>
      <Grid container spacing={2} wrap="nowrap" style={{ width: '300px', background: '#f5f5f5', padding: '1rem' }}>
        <Grid item xs={6}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#28a745">2</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#ffc107">3</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#dc3545">4</DemoItem></Grid>
      </Grid>

      <h3>Wrap Reverse</h3>
      <Grid container spacing={2} wrap="wrap-reverse" style={{ width: '300px', background: '#f5f5f5', padding: '1rem' }}>
        <Grid item xs={6}><DemoItem>1</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#28a745">2</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#ffc107">3</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#dc3545">4</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#6f42c1">5</DemoItem></Grid>
        <Grid item xs={6}><DemoItem bg="#e83e8c">6</DemoItem></Grid>
      </Grid>
    </div>
  ),
};

export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div>
      <h3>Responsive Grid</h3>
      <p>Resize your browser to see the responsive behavior:</p>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DemoItem>xs=12 sm=6 md=4 lg=3</DemoItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DemoItem bg="#28a745">xs=12 sm=6 md=4 lg=3</DemoItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DemoItem bg="#ffc107">xs=12 sm=6 md=4 lg=3</DemoItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DemoItem bg="#dc3545">xs=12 sm=6 md=4 lg=3</DemoItem>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <DemoItem bg="#6f42c1">xs=12 sm=8 md=6 lg=6</DemoItem>
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <DemoItem bg="#e83e8c">xs=12 sm=4 md=6 lg=6</DemoItem>
        </Grid>
      </Grid>

      <h3>Different Breakpoint Combinations</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <DemoItem>xs=12 md=8 lg=9</DemoItem>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <DemoItem bg="#28a745">xs=12 md=4 lg=3</DemoItem>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={6} xl={4}>
          <DemoItem bg="#ffc107">xs=6 sm=4 md=4 lg=6 xl=4</DemoItem>
        </Grid>
        <Grid item xs={6} sm={8} md={8} lg={6} xl={8}>
          <DemoItem bg="#dc3545">xs=6 sm=8 md=8 lg=6 xl=8</DemoItem>
        </Grid>
      </Grid>
    </div>
  ),
};

export const AutoAndTrueSizes: Story = {
  render: () => (
    <div>
      <h3>Auto sizing</h3>
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <DemoItem>Auto width</DemoItem>
        </Grid>
        <Grid item xs={true}>
          <DemoItem bg="#28a745">True (fills remaining)</DemoItem>
        </Grid>
        <Grid item xs="auto">
          <DemoItem bg="#ffc107">Auto width</DemoItem>
        </Grid>
      </Grid>

      <h3>Mixed sizes</h3>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DemoItem>xs=2</DemoItem>
        </Grid>
        <Grid item xs="auto">
          <DemoItem bg="#28a745">Auto</DemoItem>
        </Grid>
        <Grid item xs={true}>
          <DemoItem bg="#ffc107">True</DemoItem>
        </Grid>
        <Grid item xs={2}>
          <DemoItem bg="#dc3545">xs=2</DemoItem>
        </Grid>
      </Grid>
    </div>
  ),
};

export const ZeroMinWidth: Story = {
  render: () => (
    <div>
      <h3>Normal behavior (content may overflow)</h3>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{
            padding: '1rem',
            background: '#007acc',
            color: 'white',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Very long content that might overflow the container width and cause issues
          </div>
        </Grid>
        <Grid item xs={4}>
          <DemoItem bg="#28a745">Normal</DemoItem>
        </Grid>
        <Grid item xs={4}>
          <DemoItem bg="#ffc107">Normal</DemoItem>
        </Grid>
      </Grid>

      <h3>With zeroMinWidth (prevents overflow)</h3>
      <Grid container spacing={2}>
        <Grid item xs={4} zeroMinWidth>
          <div style={{
            padding: '1rem',
            background: '#007acc',
            color: 'white',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Very long content that might overflow the container width and cause issues
          </div>
        </Grid>
        <Grid item xs={4}>
          <DemoItem bg="#28a745">Normal</DemoItem>
        </Grid>
        <Grid item xs={4}>
          <DemoItem bg="#ffc107">Normal</DemoItem>
        </Grid>
      </Grid>
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <div>
      <h3>Dashboard Layout Example</h3>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <DemoItem bg="#007acc" style={{ minHeight: '80px' }}>Header</DemoItem>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <DemoItem bg="#28a745" style={{ minHeight: '300px' }}>Sidebar</DemoItem>
        </Grid>

        {/* Main content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <DemoItem bg="#ffc107" style={{ minHeight: '200px' }}>Main Content</DemoItem>
            </Grid>
            <Grid item xs={12} lg={4}>
              <DemoItem bg="#dc3545" style={{ minHeight: '200px' }}>Widget</DemoItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DemoItem bg="#6f42c1" style={{ minHeight: '150px' }}>Card 1</DemoItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DemoItem bg="#e83e8c" style={{ minHeight: '150px' }}>Card 2</DemoItem>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer */}
        <Grid item xs={12}>
          <DemoItem bg="#17a2b8" style={{ minHeight: '60px' }}>Footer</DemoItem>
        </Grid>
      </Grid>
    </div>
  ),
};