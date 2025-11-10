import type { Meta, StoryObj } from '@storybook/preact';
import { Card } from './Card';

const meta: Meta = {
  title: 'Layout/Card',
  tags: ['autodocs'],
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile container component with elevation and variant styling for content presentation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card elevation={1} variant="elevated" padding="md">
      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>
        Card Title
      </h3>
      <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)' }}>
        This is a basic card component with default styling. It provides a clean container for your content.
      </p>
    </Card>
  ),
};

export const ElevationLevels: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
        <Card key={elevation} elevation={elevation as any} padding="md">
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>
            Elevation {elevation}
          </h4>
          <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)', fontSize: '0.875rem' }}>
            Shadow depth level {elevation}
          </p>
        </Card>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      <Card variant="elevated" elevation={4} padding="md">
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>
          Elevated Variant
        </h4>
        <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)' }}>
          The elevated variant uses shadows to create depth and visual hierarchy.
        </p>
      </Card>

      <Card variant="outlined" elevation={2} padding="md">
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>
          Outlined Variant
        </h4>
        <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)' }}>
          The outlined variant uses borders instead of shadows for a flatter appearance.
        </p>
      </Card>
    </div>
  ),
};

export const DifferentPaddings: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      {['xs', 'sm', 'md', 'lg', 'xl'].map((padding) => (
        <Card key={padding} elevation={2} padding={padding as any}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>
            Padding {padding}
          </h4>
          <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)', fontSize: '0.875rem' }}>
            This card uses {padding} padding.
          </p>
        </Card>
      ))}
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card elevation={3} padding="lg" style={{ maxWidth: '300px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'var(--psc-color-primary)',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          P
        </div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--psc-color-text-primary)' }}>
          Premium Product
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--psc-color-text-secondary)' }}>
          High-quality product with excellent features and great value.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--psc-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Buy Now
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: 'var(--psc-color-text-primary)',
            border: '1px solid var(--psc-color-border)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Learn More
          </button>
        </div>
      </div>
    </Card>
  ),
};

export const ContentCard: Story = {
  render: () => (
    <Card elevation={2} padding="md">
      <article>
        <header style={{ marginBottom: '1rem' }}>
          <h2 style={{ margin: '0 0 0.25rem 0', color: 'var(--psc-color-text-primary)' }}>
            Article Title
          </h2>
          <p style={{
            margin: '0',
            color: 'var(--psc-color-text-secondary)',
            fontSize: '0.875rem'
          }}>
            By Author Name • Published on January 15, 2024
          </p>
        </header>

        <p style={{ margin: '0 0 1rem 0', color: 'var(--psc-color-text-primary)' }}>
          This is the main content of the article. It contains important information
          that readers will find valuable. The card provides a clean, organized
          layout for presenting this content.
        </p>

        <p style={{ margin: '0 0 1rem 0', color: 'var(--psc-color-text-primary)' }}>
          Additional paragraphs can be added here to provide more detailed
          information. The card automatically handles spacing and provides
          consistent visual hierarchy.
        </p>

        <footer style={{
          paddingTop: '1rem',
          borderTop: '1px solid var(--psc-color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            color: 'var(--psc-color-text-secondary)',
            fontSize: '0.875rem'
          }}>
            5 min read
          </span>
          <button style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: 'var(--psc-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}>
            Read More
          </button>
        </footer>
      </article>
    </Card>
  ),
};

export const DashboardCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
      <Card elevation={3} padding="md">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'var(--psc-color-success)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--psc-color-text-primary)' }}>
              Tasks Completed
            </h3>
            <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
              24
            </p>
          </div>
        </div>
      </Card>

      <Card elevation={3} padding="md">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'var(--psc-color-warning)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            ⚡
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--psc-color-text-primary)' }}>
              In Progress
            </h3>
            <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
              8
            </p>
          </div>
        </div>
      </Card>

      <Card elevation={3} padding="md">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'var(--psc-color-info)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            📊
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--psc-color-text-primary)' }}>
              Total Projects
            </h3>
            <p style={{ margin: '0', color: 'var(--psc-color-text-secondary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
              12
            </p>
          </div>
        </div>
      </Card>
    </div>
  ),
};
