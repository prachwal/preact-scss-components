import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default classes and styles', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');

    expect(card).toHaveClass('card');
    expect(card).toHaveClass('card--elevation-1');
    expect(card).toHaveClass('card--variant-elevated');
    expect(card?.tagName).toBe('DIV');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    const card = screen.getByText('Content');

    expect(card).toHaveClass('card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders with different HTML tags', () => {
    render(<Card as="article">Content</Card>);
    const card = screen.getByText('Content');

    expect(card?.tagName).toBe('ARTICLE');
  });

  describe('elevation prop', () => {
    it.each([0, 1, 2, 3, 4, 5, 6, 12, 18, 24] as const)(
      'applies elevation-%i class for elevation %i',
      (elevation) => {
        render(<Card elevation={elevation}>Content</Card>);
        const card = screen.getByText('Content');

        expect(card).toHaveClass(`card--elevation-${elevation}`);
      }
    );

    it('defaults to elevation 1', () => {
      render(<Card>Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveClass('card--elevation-1');
    });
  });

  describe('variant prop', () => {
    it('applies outlined variant class', () => {
      render(<Card variant="outlined">Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveClass('card--variant-outlined');
      expect(card).not.toHaveClass('card--variant-elevated');
    });

    it('applies elevated variant class by default', () => {
      render(<Card>Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveClass('card--variant-elevated');
      expect(card).not.toHaveClass('card--variant-outlined');
    });
  });

  describe('padding prop', () => {
    it.each([
      ['xs', 'var(--psc-spacing-xs)'],
      ['sm', 'var(--psc-spacing-sm)'],
      ['md', 'var(--psc-spacing-md)'],
      ['lg', 'var(--psc-spacing-lg)'],
      ['xl', 'var(--psc-spacing-xl)'],
      [16, '16px'],
      [32, '32px']
    ] as const)(
      'applies correct padding for %s',
      (padding, expected) => {
        render(<Card padding={padding}>Content</Card>);
        const card = screen.getByText('Content');

        expect(card).toHaveStyle({ padding: expected });
      }
    );

    it('defaults to md padding', () => {
      render(<Card>Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-md)' });
    });
  });

  describe('styling combinations', () => {
    it('combines elevation, variant, and padding correctly', () => {
      render(
        <Card
          elevation={4}
          variant="outlined"
          padding="lg"
          className="test-class"
        >
          Content
        </Card>
      );
      const card = screen.getByText('Content');

      expect(card).toHaveClass('card');
      expect(card).toHaveClass('card--elevation-4');
      expect(card).toHaveClass('card--variant-outlined');
      expect(card).toHaveClass('test-class');
      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-lg)' });
    });

    it('preserves custom styles', () => {
      render(
        <Card style={{ margin: '10px', backgroundColor: 'red' }}>
          Content
        </Card>
      );
      const card = screen.getByText('Content');

      expect(card.style.margin).toBe('10px');
      expect(card.style.backgroundColor).toBe('red');
      expect(card.style.padding).toBe('var(--psc-spacing-md)');
    });
  });

  describe('accessibility', () => {
    it('supports focus-visible for keyboard navigation', () => {
      render(<Card tabIndex={0}>Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('passes through other HTML attributes', () => {
      render(
        <Card
          role="region"
          aria-label="Test card"
          data-testid="card"
        >
          Content
        </Card>
      );
      const card = screen.getByTestId('card');

      expect(card).toHaveAttribute('role', 'region');
      expect(card).toHaveAttribute('aria-label', 'Test card');
    });
  });
});
