import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Container } from './Container';

describe('Container', () => {
  describe('Component Rendering', () => {
    it('renders with default props (no layout)', () => {
      render(<Container>Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
      expect(container).not.toHaveClass('container--flex');
      expect(container).not.toHaveClass('container--grid');
    });

    it('renders with flex layout and row direction', () => {
      render(<Container layout="flex" direction = "row" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      expect(container).not.toHaveClass('container--column');
    });

    it('renders with flex layout and column direction', () => {
      render(<Container layout="flex" direction = "column" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--column');
    });

    it('renders with grid layout', () => {
      render(<Container layout="grid" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--grid');
      expect(container).not.toHaveClass('container--flex');
    });

    it('applies custom gap style', () => {
      render(<Container gap="1rem" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '1rem' });
    });

    it('applies custom gap style with different values', () => {
      render(<Container gap="0.5rem" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '0.5rem' });
    });

    it('applies custom className', () => {
      render(<Container className="custom-class" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'custom-class');
    });

    it('renders children correctly', () => {
      render(
        <Container>
        <div>Child 1 </div>
        <div>Child 2 </div>
      </Container>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('does not apply direction class for grid layout', () => {
      render(<Container layout="grid" direction = "column" > Content </Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--grid');
      expect(container).not.toHaveClass('container--column');
      expect(container).not.toHaveClass('container--flex');
    });

    it('passes through additional props to the div element', () => {
      render(<Container id="test-container" onClick = {() => {}}> Content </Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveAttribute('id', 'test-container');
  });

  it('renders as section element when as="section"', () => {
    render(<Container as="section" > Content </Container>);

    const container = screen.getByTestId('container');
    expect(container?.tagName).toBe('SECTION');
  });

  it('renders as article element when as="article"', () => {
    render(<Container as="article" > Content </Container>);

    const container = screen.getByTestId('container');
    expect(container?.tagName).toBe('ARTICLE');
  });

  it('renders as main element when as="main"', () => {
    render(<Container as="main" > Content </Container>);

    const container = screen.getByTestId('container');
    expect(container?.tagName).toBe('MAIN');
  });

  it('renders as header element when as="header"', () => {
    render(<Container as="header" > Content </Container>);

    const container = screen.getByTestId('container');
    expect(container?.tagName).toBe('HEADER');
  });

  it('combines layout, direction, gap, and custom className', () => {
    render(
      <Container
          layout="flex"
          direction = "column"
          gap = "0.5rem"
          className = "demo-flex-column"
      >
      Content
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('container', 'container--flex', 'container--flex--column', 'demo-flex-column');
    expect(container).toHaveStyle({ gap: '0.5rem' });
  });

  it('combines grid layout with gap and custom className', () => {
    render(
      <Container
          layout="grid"
          gap = "1rem"
          className = "demo-grid"
      >
      Content
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('container', 'container--grid', 'demo-grid');
    expect(container).toHaveStyle({ gap: '1rem' });
    expect(container).not.toHaveClass('container--flex');
  });

  it('passes through aria-label for accessibility', () => {
    render(<Container aria-label="Test container" > Content </Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveAttribute('aria-label', 'Test container');
  });

  it('combines custom style prop with gap', () => {
    render(
      <Container
        gap="1rem"
        style={{ backgroundColor: 'red', padding: '10px' }}
      >
        Content
      </Container>
    );

    const container = screen.getByTestId('container');
    // Check that the style attribute contains the expected styles
    expect(container).toHaveAttribute('style');
    const styleAttr = container.getAttribute('style');
    expect(styleAttr).toContain('background-color: red');
    expect(styleAttr).toContain('padding: 10px');
    expect(styleAttr).toContain('gap: 1rem');
  });
});

describe('Accessibility', () => {
  it('renders as a div element by default', () => {
    render(<Container>Content </Container>);

    const container = screen.getByTestId('container');
    expect(container?.tagName).toBe('DIV');
  });

  it('maintains semantic HTML structure with different tags', () => {
    const { rerender } = render(<Container as="header" > Header Content </Container>);
    expect(screen.getByTestId('container')?.tagName).toBe('HEADER');

    rerender(<Container as="main" > Main Content </Container>);
    expect(screen.getByTestId('container')?.tagName).toBe('MAIN');

    rerender(<Container as="section" > Section Content </Container>);
    expect(screen.getByTestId('container')?.tagName).toBe('SECTION');

    rerender(<Container as="article" > Article Content </Container>);
    expect(screen.getByTestId('container')?.tagName).toBe('ARTICLE');
  });

  describe('Gap Validation', () => {
    it('accepts valid CSS gap values', () => {
      const validGaps = ['1rem', '10px', '2em', '1.5rem', '20%', '0.5fr'];

      validGaps.forEach(gap => {
        const { unmount } = render(<Container layout="flex" gap={gap}>Content</Container>);
        const container = screen.getByTestId('container');
        expect(container).toHaveStyle({ gap });
        unmount();
      });
    });

    it('warns about invalid gap values', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Container layout="flex" gap="invalid-value">Content</Container>);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Container: Invalid gap value "invalid-value". Expected a valid CSS length value (e.g., "1rem", "10px", "2em").'
      );

      consoleSpy.mockRestore();
    });

    it('does not warn for valid gap values', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Container layout="flex" gap="1rem">Content</Container>);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
});