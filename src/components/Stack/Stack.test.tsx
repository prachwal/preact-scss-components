import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Stack } from './Stack';

// Mock the SCSS import
vi.mock('./Stack.scss', () => ({}));

describe('Stack', () => {
  it('renders children correctly', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    const { container } = render(
      <Stack>
        <div>Item</div>
      </Stack>
    );

    const stackElement = container.firstChild as HTMLElement;
    expect(stackElement).toHaveClass('stack');
    expect(stackElement.style.display).toBe('flex');
    expect(stackElement.style.flexDirection).toBe('column');
  });

  describe('direction prop', () => {
    it('applies row direction', () => {
      const { container } = render(
        <Stack direction="row">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.flexDirection).toBe('row');
    });

    it('applies column direction', () => {
      const { container } = render(
        <Stack direction="column">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.flexDirection).toBe('column');
    });
  });

  describe('spacing prop', () => {
    it('applies xs spacing', () => {
      const { container } = render(
        <Stack spacing="xs">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-xs)');
    });

    it('applies sm spacing', () => {
      const { container } = render(
        <Stack spacing="sm">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-sm)');
    });

    it('applies md spacing (default)', () => {
      const { container } = render(
        <Stack spacing="md">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-md)');
    });

    it('applies lg spacing', () => {
      const { container } = render(
        <Stack spacing="lg">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-lg)');
    });

    it('applies xl spacing', () => {
      const { container } = render(
        <Stack spacing="xl">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-xl)');
    });

    it('applies 2xl spacing', () => {
      const { container } = render(
        <Stack spacing="2xl">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-2xl)');
    });

    it('applies 3xl spacing', () => {
      const { container } = render(
        <Stack spacing="3xl">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-3xl)');
    });

    it('applies 4xl spacing', () => {
      const { container } = render(
        <Stack spacing="4xl">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-4xl)');
    });

    it('applies 5xl spacing', () => {
      const { container } = render(
        <Stack spacing="5xl">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-5xl)');
    });

    it('applies 6xl spacing', () => {
      const { container } = render(
        <Stack spacing="6xl">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-6xl)');
    });

    it('applies numeric spacing in pixels', () => {
      const { container } = render(
        <Stack spacing={20}>
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('20px');
    });

    it('falls back to md spacing for invalid values', () => {
      const { container } = render(
        <Stack spacing={'invalid' as any}>
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.gap).toBe('var(--psc-spacing-md)');
    });
  });

  describe('alignItems prop', () => {
    it('applies flex-start alignment', () => {
      const { container } = render(
        <Stack alignItems="flex-start">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.alignItems).toBe('flex-start');
    });

    it('applies center alignment', () => {
      const { container } = render(
        <Stack alignItems="center">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.alignItems).toBe('center');
    });

    it('applies flex-end alignment', () => {
      const { container } = render(
        <Stack alignItems="flex-end">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.alignItems).toBe('flex-end');
    });

    it('applies stretch alignment (default)', () => {
      const { container } = render(
        <Stack alignItems="stretch">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.alignItems).toBe('stretch');
    });

    it('applies baseline alignment', () => {
      const { container } = render(
        <Stack alignItems="baseline">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.alignItems).toBe('baseline');
    });
  });

  describe('justifyContent prop', () => {
    it('applies flex-start justification (default)', () => {
      const { container } = render(
        <Stack justifyContent="flex-start">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.justifyContent).toBe('flex-start');
    });

    it('applies center justification', () => {
      const { container } = render(
        <Stack justifyContent="center">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.justifyContent).toBe('center');
    });

    it('applies flex-end justification', () => {
      const { container } = render(
        <Stack justifyContent="flex-end">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.justifyContent).toBe('flex-end');
    });

    it('applies space-between justification', () => {
      const { container } = render(
        <Stack justifyContent="space-between">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.justifyContent).toBe('space-between');
    });

    it('applies space-around justification', () => {
      const { container } = render(
        <Stack justifyContent="space-around">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.justifyContent).toBe('space-around');
    });

    it('applies space-evenly justification', () => {
      const { container } = render(
        <Stack justifyContent="space-evenly">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.justifyContent).toBe('space-evenly');
    });
  });

  describe('as prop', () => {
    it('renders as div by default', () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.tagName).toBe('DIV');
    });

    it('renders as article', () => {
      const { container } = render(
        <Stack as="article">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.tagName).toBe('ARTICLE');
    });

    it('renders as section', () => {
      const { container } = render(
        <Stack as="section">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.tagName).toBe('SECTION');
    });
  });

  describe('className prop', () => {
    it('combines custom className with base class', () => {
      const { container } = render(
        <Stack className="custom-class">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement).toHaveClass('stack');
      expect(stackElement).toHaveClass('custom-class');
    });

    it('works without custom className', () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement).toHaveClass('stack');
      expect(stackElement.className).toBe('stack');
    });
  });

  describe('style prop', () => {
    it('merges custom styles with computed styles', () => {
      const { container } = render(
        <Stack style={{ backgroundColor: 'red' }}>
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.backgroundColor).toBe('red');
      expect(stackElement.style.display).toBe('flex');
    });

    it('handles empty style object', () => {
      const { container } = render(
        <Stack style={{}}>
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.style.display).toBe('flex');
    });
  });

  describe('combined props', () => {
    it('applies all props together', () => {
      const { container } = render(
        <Stack
          direction="row"
          spacing="lg"
          alignItems="center"
          justifyContent="space-between"
          as="section"
          className="custom-stack"
          style={{ backgroundColor: 'blue' }}
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.tagName).toBe('SECTION');
      expect(stackElement).toHaveClass('stack');
      expect(stackElement).toHaveClass('custom-stack');
      expect(stackElement.style.display).toBe('flex');
      expect(stackElement.style.flexDirection).toBe('row');
      expect(stackElement.style.gap).toBe('var(--psc-spacing-lg)');
      expect(stackElement.style.alignItems).toBe('center');
      expect(stackElement.style.justifyContent).toBe('space-between');
      expect(stackElement.style.backgroundColor).toBe('blue');
    });
  });

  describe('additional HTML attributes', () => {
    it('forwards additional props', () => {
      const { container } = render(
        <Stack data-testid="stack-element" aria-label="Stack container">
          <div>Item</div>
        </Stack>
      );

      const stackElement = container.firstChild as HTMLElement;
      expect(stackElement.getAttribute('data-testid')).toBe('stack-element');
      expect(stackElement.getAttribute('aria-label')).toBe('Stack container');
    });
  });
});
