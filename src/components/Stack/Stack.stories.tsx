import type { Meta, StoryObj } from '@storybook/preact';
import { Stack, StackProps } from './Stack';

const meta: Meta<StackProps> = {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexbox container component that stacks children vertically or horizontally with consistent spacing.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: 'The direction of the stack layout',
    },
    spacing: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'Spacing between items',
    },
    alignItems: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Alignment of items along the cross axis',
    },
    justifyContent: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justification of items along the main axis',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'aside'],
      description: 'HTML tag to use for the container element',
    },
  },
};

export default meta;
type Story = StoryObj<StackProps>;

export const Column: Story = {
  args: {
    direction: 'column',
    spacing: 'md',
    children: [
      <div key="1" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
        Item 1
      </div>,
      <div key="2" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
        Item 2
      </div>,
      <div key="3" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
        Item 3
      </div>,
    ],
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    children: [
      <div key="1" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
        Item 1
      </div>,
      <div key="2" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
        Item 2
      </div>,
      <div key="3" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
        Item 3
      </div>,
    ],
  },
};

export const DifferentSpacings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Small spacing</h4>
        <Stack direction="row" spacing="sm">
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            A
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            B
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            C
          </div>
        </Stack>
      </div>

      <div>
        <h4>Medium spacing</h4>
        <Stack direction="row" spacing="md">
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            A
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            B
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            C
          </div>
        </Stack>
      </div>

      <div>
        <h4>Large spacing</h4>
        <Stack direction="row" spacing="lg">
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            A
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            B
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            C
          </div>
        </Stack>
      </div>
    </div>
  ),
};

export const AlignmentExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Center alignment</h4>
        <Stack direction="row" spacing="md" alignItems="center" style={{ height: '100px', border: '1px solid var(--psc-color-border)' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Short
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Medium height
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Short
          </div>
        </Stack>
      </div>

      <div>
        <h4>Stretch alignment</h4>
        <Stack direction="row" spacing="md" alignItems="stretch" style={{ height: '100px', border: '1px solid var(--psc-color-border)' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Auto height
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Auto height
          </div>
        </Stack>
      </div>
    </div>
  ),
};

export const JustifyContentExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Space between</h4>
        <Stack direction="row" spacing="md" justifyContent="space-between" style={{ border: '1px solid var(--psc-color-border)', padding: '1rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Start
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            End
          </div>
        </Stack>
      </div>

      <div>
        <h4>Center</h4>
        <Stack direction="row" spacing="md" justifyContent="center" style={{ border: '1px solid var(--psc-color-border)', padding: '1rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Item 1
          </div>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Item 2
          </div>
        </Stack>
      </div>
    </div>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <Stack direction="row" spacing="lg" alignItems="center" style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
      <div style={{ fontWeight: 'bold', color: 'var(--psc-color-text-primary)' }}>
        Logo
      </div>
      <Stack direction="row" spacing="md">
        <a href="#" style={{ color: 'var(--psc-color-text-primary)', textDecoration: 'none' }}>Home</a>
        <a href="#" style={{ color: 'var(--psc-color-text-primary)', textDecoration: 'none' }}>About</a>
        <a href="#" style={{ color: 'var(--psc-color-text-primary)', textDecoration: 'none' }}>Contact</a>
      </Stack>
      <div style={{ marginLeft: 'auto' }}>
        <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--psc-color-primary)', color: 'white', border: 'none', borderRadius: '4px' }}>
          Sign In
        </button>
      </div>
    </Stack>
  ),
};

export const CardListExample: Story = {
  render: () => (
    <Stack direction="column" spacing="md" style={{ maxWidth: '400px' }}>
      <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface)', border: '1px solid var(--psc-color-border)', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>Card Title 1</h3>
        <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)' }}>
          This is the content of the first card. It contains some descriptive text.
        </p>
      </div>

      <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface)', border: '1px solid var(--psc-color-border)', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>Card Title 2</h3>
        <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)' }}>
          This is the content of the second card. It also contains some descriptive text.
        </p>
      </div>

      <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface)', border: '1px solid var(--psc-color-border)', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>Card Title 3</h3>
        <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)' }}>
          This is the content of the third card. It contains the final piece of content.
        </p>
      </div>
    </Stack>
  ),
};

export const AllSpacingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((spacing) => (
        <div key={spacing}>
          <h4 style={{ marginBottom: '0.5rem' }}>{spacing.toUpperCase()} spacing</h4>
          <Stack direction="row" spacing={spacing as any}>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-primary)', color: 'white' }}>A</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-secondary)', color: 'white' }}>B</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-success)', color: 'white' }}>C</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const NumericSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {[4, 8, 16, 24, 32].map((spacing) => (
        <div key={spacing}>
          <h4 style={{ marginBottom: '0.5rem' }}>{spacing}px spacing</h4>
          <Stack direction="row" spacing={spacing}>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-info)', color: 'white' }}>A</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-warning)', color: 'black' }}>B</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-error)', color: 'white' }}>C</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const SemanticHTMLTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>As Section</h4>
        <Stack as="section" direction="row" spacing="md">
          <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Section Item 1
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Section Item 2
          </div>
        </Stack>
      </div>

      <div>
        <h4>As Article</h4>
        <Stack as="article" direction="row" spacing="md">
          <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Article Item 1
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)', border: '1px solid var(--psc-color-border)' }}>
            Article Item 2
          </div>
        </Stack>
      </div>
    </div>
  ),
};

export const AllAlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map((alignment) => (
        <div key={alignment}>
          <h4>{alignment}</h4>
          <Stack direction="row" spacing="md" alignItems={alignment as any} style={{ height: '120px', border: '1px solid var(--psc-color-border)', padding: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-primary)', color: 'white' }}>Short</div>
            <div style={{ padding: '2rem 0.5rem', backgroundColor: 'var(--psc-color-secondary)', color: 'white' }}>Tall</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-success)', color: 'white' }}>Short</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const AllJustifyContentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((justify) => (
        <div key={justify}>
          <h4>{justify}</h4>
          <Stack direction="row" spacing="md" justifyContent={justify as any} style={{ border: '1px solid var(--psc-color-border)', padding: '1rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-info)', color: 'white', width: '80px' }}>A</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-warning)', color: 'black', width: '80px' }}>B</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--psc-color-error)', color: 'white', width: '80px' }}>C</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};