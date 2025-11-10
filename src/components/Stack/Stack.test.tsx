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
});
