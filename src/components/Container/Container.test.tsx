import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Container, getJustifyClass, getAlignClass, getWrapClass } from './Container';
import * as responsiveUtils from '../../utils/responsive';

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

    it('applies justify content flex-start', () => {
      render(<Container layout="flex" justifyContent="flex-start">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-start');
    });

    it('applies justify content center', () => {
      render(<Container layout="flex" justifyContent="center">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-center');
    });

    it('applies justify content space-between', () => {
      render(<Container layout="flex" justifyContent="space-between">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-between');
    });

    it('applies justify content flex-end', () => {
      render(<Container layout="flex" justifyContent="flex-end">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-end');
    });

    it('applies justify content space-around', () => {
      render(<Container layout="flex" justifyContent="space-around">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-around');
    });

    it('applies justify content space-evenly', () => {
      render(<Container layout="flex" justifyContent="space-evenly">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-evenly');
    });

    it('applies align items flex-start', () => {
      render(<Container layout="flex" alignItems="flex-start">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--align-start');
    });

    it('applies align items center', () => {
      render(<Container layout="flex" alignItems="center">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--align-center');
    });

    it('applies align items stretch', () => {
      render(<Container layout="flex" alignItems="stretch">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--align-stretch');
    });

    it('applies align items flex-end', () => {
      render(<Container layout="flex" alignItems="flex-end">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--align-end');
    });

    it('applies align items baseline', () => {
      render(<Container layout="flex" alignItems="baseline">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--align-baseline');
    });

    it('applies wrap nowrap', () => {
      render(<Container layout="flex" wrap="nowrap">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--wrap-nowrap');
    });

    it('applies wrap wrap-reverse', () => {
      render(<Container layout="flex" wrap="wrap-reverse">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--wrap-wrap-reverse');
    });

    it('does not apply wrap class for default wrap value', () => {
      render(<Container layout="flex" wrap="wrap">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      expect(container).not.toHaveClass('container--flex--wrap-wrap');
    });

    it('does not apply justify class for grid layout', () => {
      render(<Container layout="grid" justifyContent="center">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--grid');
      expect(container).not.toHaveClass('container--flex--justify-center');
    });

    it('does not apply align class for grid layout', () => {
      render(<Container layout="grid" alignItems="center">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--grid');
      expect(container).not.toHaveClass('container--flex--align-center');
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

describe('Responsive Values and Gap Presets', () => {
  describe('Gap Presets', () => {
    it('applies small gap preset', () => {
      render(<Container layout="flex" gap="small">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '0.5rem' });
    });

    it('applies medium gap preset', () => {
      render(<Container layout="flex" gap="medium">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '1rem' });
    });

    it('applies large gap preset', () => {
      render(<Container layout="flex" gap="large">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '1.5rem' });
    });

    it('applies xl gap preset', () => {
      render(<Container layout="flex" gap="xl">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '2rem' });
    });

    it('applies numeric gap value', () => {
      render(<Container layout="flex" gap={0.5}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '0.5rem' });
    });

    it('applies custom string gap value', () => {
      render(<Container layout="flex" gap="10px">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ gap: '10px' });
    });
  });

  describe('Responsive Direction', () => {
    it('applies responsive direction with object', () => {
      render(<Container layout="flex" direction={{ xs: 'column', md: 'row' }}>Content</Container>);

      const container = screen.getByTestId('container');
      // For now, it should use the default breakpoint (md) which is 'row'
      expect(container).toHaveClass('container', 'container--flex');
      expect(container).not.toHaveClass('container--flex--column');
    });
  });

  describe('Responsive Gap', () => {
    it('applies responsive gap with object', () => {
      render(<Container layout="flex" gap={{ xs: 'small', md: 'large' }}>Content</Container>);

      const container = screen.getByTestId('container');
      // For now, it should use the default breakpoint (md) which is 'large' = '1.5rem'
      expect(container).toHaveStyle({ gap: '1.5rem' });
    });
  });

  describe('Responsive Justify Content', () => {
    it('applies responsive justifyContent with object', () => {
      render(<Container layout="flex" justifyContent={{ xs: 'flex-start', md: 'center' }}>Content</Container>);

      const container = screen.getByTestId('container');
      // For now, it should use the default breakpoint (md) which is 'center'
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-center');
    });

    it('applies stretch justify content', () => {
      render(<Container layout="flex" justifyContent="stretch">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--justify-stretch');
    });
  });

  describe('Responsive Align Items', () => {
    it('applies responsive alignItems with object', () => {
      render(<Container layout="flex" alignItems={{ xs: 'flex-start', md: 'center' }}>Content</Container>);

      const container = screen.getByTestId('container');
      // For now, it should use the default breakpoint (md) which is 'center'
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--align-center');
    });
  });

  describe('Responsive Wrap', () => {
    it('applies responsive wrap with object', () => {
      render(<Container layout="flex" wrap={{ xs: 'nowrap', md: 'wrap' }}>Content</Container>);

      const container = screen.getByTestId('container');
      // For now, it should use the default breakpoint (md) which is 'wrap' (no class)
      expect(container).toHaveClass('container', 'container--flex');
      expect(container).not.toHaveClass('container--flex--wrap-nowrap');
    });
  });

  describe('Vertical Shorthand', () => {
    it('applies column direction when vertical is true', () => {
      render(<Container layout="flex" vertical={true}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--column');
    });

    it('ignores direction prop when vertical is true', () => {
      render(<Container layout="flex" direction="row" vertical={true}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--column');
      expect(container).not.toHaveClass('container--flex--row');
    });

    it('uses direction prop when vertical is false', () => {
      render(<Container layout="flex" direction="column" vertical={false}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--column');
    });

    it('uses direction prop when vertical is undefined', () => {
      render(<Container layout="flex" direction="column">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex', 'container--flex--column');
    });
  });
});

describe('Divider Support', () => {
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

describe('Divider Support', () => {
  it('renders children without dividers when divider is not provided', () => {
    render(
      <Container layout="flex">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container.children).toHaveLength(3);
    expect(container).not.toHaveClass('container__divider');
  });

  it('renders children with default dividers when divider is true', () => {
    render(
      <Container layout="flex" divider={true}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container.children).toHaveLength(5); // 3 items + 2 dividers

    // Check that dividers are present
    const dividers = container.querySelectorAll('.container__divider');
    expect(dividers).toHaveLength(2);
  });

  it('renders children with custom divider element', () => {
    const customDivider = <span data-testid="custom-divider">-</span>;

    render(
      <Container layout="flex" divider={customDivider}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container.children).toHaveLength(5); // 3 items + 2 dividers

    // Check that custom dividers are present
    const customDividers = screen.getAllByTestId('custom-divider');
    expect(customDividers).toHaveLength(2);
  });

  it('does not add dividers when there is only one child', () => {
    render(
      <Container layout="flex" divider={true}>
        <div>Single Item</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container.children).toHaveLength(1);
    expect(container).not.toHaveClass('container__divider');
  });

  it('handles non-array children correctly with dividers', () => {
    render(
      <Container layout="flex" divider={true}>
        Single Child
      </Container>
    );

    const container = screen.getByTestId('container');
    // String children should be wrapped in spans or similar by Preact
    expect(container.textContent).toBe('Single Child');
    expect(container).not.toHaveClass('container__divider');
  });
});

describe('useFlexGap Option', () => {
  it('uses flex gap by default (useFlexGap=true)', () => {
    render(<Container layout="flex" gap="1rem">Content</Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveStyle({ gap: '1rem' });
  });

  it('uses flex gap when useFlexGap is explicitly true', () => {
    render(<Container layout="flex" gap="1rem" useFlexGap={true}>Content</Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveStyle({ gap: '1rem' });
  });

  it('still uses flex gap when useFlexGap is false (for now, maintains compatibility)', () => {
    render(<Container layout="flex" gap="1rem" useFlexGap={false}>Content</Container>);

    const container = screen.getByTestId('container');
    // For now, we still use gap. In the future, this could switch to margin-based spacing
    expect(container).toHaveStyle({ gap: '1rem' });
  });
});

describe('Grid Layout Properties', () => {
  it('applies grid-template-columns', () => {
    render(<Container layout="grid" gridTemplateColumns="1fr 1fr">Content</Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveStyle({ gridTemplateColumns: '1fr 1fr' });
  });

  it('applies grid-template-rows', () => {
    render(<Container layout="grid" gridTemplateRows="100px 200px">Content</Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveStyle({ gridTemplateRows: '100px 200px' });
  });

  it('applies place-items', () => {
    render(<Container layout="grid" placeItems="center">Content</Container>);

    const container = screen.getByTestId('container');
    expect(container).toHaveStyle({ placeItems: 'center' });
  });

  it('combines grid properties', () => {
    render(
      <Container
        layout="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridTemplateRows="auto"
        placeItems="start"
        gap="1rem"
      >
        Content
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveStyle({
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'auto',
      placeItems: 'start',
      gap: '1rem'
    });
  });
});

describe('Helper Functions', () => {
  describe('getJustifyClass', () => {
    it('returns empty string for undefined input', () => {
      expect(getJustifyClass(undefined)).toBe('');
    });

    it('returns empty string for empty string input', () => {
      expect(getJustifyClass('')).toBe('');
    });

    it('maps flex-start to justify-start', () => {
      expect(getJustifyClass('flex-start')).toBe('container--flex--justify-start');
    });

    it('maps center to justify-center', () => {
      expect(getJustifyClass('center')).toBe('container--flex--justify-center');
    });

    it('maps flex-end to justify-end', () => {
      expect(getJustifyClass('flex-end')).toBe('container--flex--justify-end');
    });

    it('maps space-between to justify-between', () => {
      expect(getJustifyClass('space-between')).toBe('container--flex--justify-between');
    });

    it('maps space-around to justify-around', () => {
      expect(getJustifyClass('space-around')).toBe('container--flex--justify-around');
    });

    it('maps space-evenly to justify-evenly', () => {
      expect(getJustifyClass('space-evenly')).toBe('container--flex--justify-evenly');
    });

    it('maps stretch to justify-stretch', () => {
      expect(getJustifyClass('stretch')).toBe('container--flex--justify-stretch');
    });
  });

  describe('getAlignClass', () => {
    it('returns empty string for undefined input', () => {
      expect(getAlignClass(undefined)).toBe('');
    });

    it('returns empty string for empty string input', () => {
      expect(getAlignClass('')).toBe('');
    });

    it('maps flex-start to align-start', () => {
      expect(getAlignClass('flex-start')).toBe('container--flex--align-start');
    });

    it('maps center to align-center', () => {
      expect(getAlignClass('center')).toBe('container--flex--align-center');
    });

    it('maps flex-end to align-end', () => {
      expect(getAlignClass('flex-end')).toBe('container--flex--align-end');
    });

    it('maps stretch to align-stretch', () => {
      expect(getAlignClass('stretch')).toBe('container--flex--align-stretch');
    });

    it('maps baseline to align-baseline', () => {
      expect(getAlignClass('baseline')).toBe('container--flex--align-baseline');
    });
  });

  describe('Responsive Props', () => {
    it('renders with responsive direction', () => {
      const spy = vi.spyOn(responsiveUtils, 'resolveResponsiveValue');
      render(<Container layout="flex" direction={{ sm: 'column', md: 'row' }}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      // At md breakpoint, should resolve to row (default direction)
      expect(container).not.toHaveClass('container--flex--column');

      // Check that resolveResponsiveValue was called with responsive object
      expect(spy).toHaveBeenCalledWith({ sm: 'column', md: 'row' }, 'md');
      spy.mockRestore();
    });

    it('renders with responsive gap', () => {
      render(<Container layout="flex" gap={{ sm: 'small', md: 'large' }}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      // Gap classes should be applied based on resolved value
    });

    it('renders with responsive justifyContent', () => {
      render(<Container layout="flex" justifyContent={{ sm: 'flex-start', md: 'center' }}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      // At md breakpoint, should resolve to center
      expect(container).toHaveClass('container--flex--justify-center');
    });

    it('renders with responsive alignItems', () => {
      render(<Container layout="flex" alignItems={{ sm: 'flex-start', md: 'center' }}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      // At md breakpoint, should resolve to center
      expect(container).toHaveClass('container--flex--align-center');
    });

    it('renders with responsive wrap', () => {
      render(<Container layout="flex" wrap={{ sm: 'nowrap', md: 'wrap' }}>Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container', 'container--flex');
      // At md breakpoint, should resolve to wrap (default)
    });
  });

  describe('getWrapClass', () => {
    it('returns empty string for undefined input', () => {
      expect(getWrapClass(undefined)).toBe('');
    });

    it('returns empty string for wrap input', () => {
      expect(getWrapClass('wrap')).toBe('');
    });

    it('returns empty string for empty string input', () => {
      expect(getWrapClass('')).toBe('');
    });

    it('maps nowrap to wrap-nowrap', () => {
      expect(getWrapClass('nowrap')).toBe('container--flex--wrap-nowrap');
    });

    it('maps wrap-reverse to wrap-wrap-reverse', () => {
      expect(getWrapClass('wrap-reverse')).toBe('container--flex--wrap-wrap-reverse');
    });
  });
});