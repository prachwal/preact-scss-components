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

    it('applies 2xl padding', () => {
      render(<Card padding="2xl">Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-2xl)' });
    });

    it('applies 3xl padding', () => {
      render(<Card padding="3xl">Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-3xl)' });
    });

    it('applies 4xl padding', () => {
      render(<Card padding="4xl">Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-4xl)' });
    });

    it('applies 5xl padding', () => {
      render(<Card padding="5xl">Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-5xl)' });
    });

    it('applies 6xl padding', () => {
      render(<Card padding="6xl">Content</Card>);
      const card = screen.getByText('Content');

      expect(card).toHaveStyle({ padding: 'var(--psc-spacing-6xl)' });
    });
  });

  describe('style prop', () => {
    it('merges custom styles with computed styles', () => {
      const { container } = render(<Card style={{ backgroundColor: 'red' }}>Content</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card.style.backgroundColor).toBe('red');
      expect(card.style.padding).toBe('var(--psc-spacing-md)');
    });

    it('handles empty style object', () => {
      const { container } = render(<Card style={{}}>Content</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card.style.padding).toBe('var(--psc-spacing-md)');
    });

    it('handles null style', () => {
      const { container } = render(<Card style={null as any}>Content</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card.style.padding).toBe('var(--psc-spacing-md)');
    });
  });

  describe('combined props', () => {
    it('applies all props together', () => {
      const { container } = render(
        <Card
          elevation={8}
          variant="outlined"
          padding="xl"
          as="article"
          className="custom-card"
          style={{ backgroundColor: 'blue' }}
        >
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card?.tagName).toBe('ARTICLE');
      expect(card).toHaveClass('card');
      expect(card).toHaveClass('card--elevation-8');
      expect(card).toHaveClass('card--variant-outlined');
      expect(card).toHaveClass('custom-card');
      expect(card.style.padding).toBe('var(--psc-spacing-xl)');
      expect(card.style.backgroundColor).toBe('blue');
    });
  });

  describe('HTML attributes', () => {
    it('forwards additional props', () => {
      render(
        <Card data-testid="card-element" aria-label="Card container">
          Content
        </Card>
      );
      const card = screen.getByText('Content');

      expect(card.getAttribute('data-testid')).toBe('card-element');
      expect(card.getAttribute('aria-label')).toBe('Card container');
    });
  });

  describe('semantic HTML tags', () => {
    it('renders as section', () => {
      render(<Card as="section">Content</Card>);
      const card = screen.getByText('Content');

      expect(card?.tagName).toBe('SECTION');
    });

    it('renders as header', () => {
      render(<Card as="header">Content</Card>);
      const card = screen.getByText('Content');

      expect(card?.tagName).toBe('HEADER');
    });

    it('renders as main', () => {
      render(<Card as="main">Content</Card>);
      const card = screen.getByText('Content');

      expect(card?.tagName).toBe('MAIN');
    });

    it('renders as aside', () => {
      render(<Card as="aside">Content</Card>);
      const card = screen.getByText('Content');

      expect(card?.tagName).toBe('ASIDE');
    });

    it('renders as footer', () => {
      render(<Card as="footer">Content</Card>);
      const card = screen.getByText('Content');

      expect(card?.tagName).toBe('FOOTER');
    });
  });
});
