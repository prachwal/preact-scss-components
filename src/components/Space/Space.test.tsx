import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Space } from './Space';

describe('Space', () => {
  describe('Component Rendering', () => {
    it('renders with default props', () => {
      render(<Space>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toBeInTheDocument();
      expect(space.tagName).toBe('DIV');
      expect(space).toHaveClass('space');
    });

    it('renders children correctly', () => {
      render(
        <Space>
          <div>Child 1</div>
          <div>Child 2</div>
        </Space>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      render(<Space as="span">Content</Space>);

      const space = screen.getByText('Content');
      expect(space.tagName).toBe('SPAN');
    });
  });

  describe('Direction Property', () => {
    it('applies horizontal direction by default', () => {
      render(<Space>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ flexDirection: 'row' });
    });

    it('applies vertical direction', () => {
      render(<Space direction="vertical">Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ flexDirection: 'column' });
    });

    it('aligns items correctly for horizontal direction', () => {
      render(<Space direction="horizontal">Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ alignItems: 'center' });
    });

    it('aligns items correctly for vertical direction', () => {
      render(<Space direction="vertical">Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ alignItems: 'stretch' });
    });
  });

  describe('Size Property', () => {
    it('applies small size by default', () => {
      render(<Space>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ gap: 'var(--psc-spacing-sm)' });
    });

    it('applies medium size', () => {
      render(<Space size="medium">Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ gap: 'var(--psc-spacing-md)' });
    });

    it('applies large size', () => {
      render(<Space size="large">Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ gap: 'var(--psc-spacing-lg)' });
    });

    it('applies custom numeric size', () => {
      render(<Space size={20}>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ gap: '20px' });
    });
  });

  describe('Wrap Property', () => {
    it('does not wrap by default', () => {
      render(<Space>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ flexWrap: 'nowrap' });
    });

    it('applies wrap when enabled', () => {
      render(<Space wrap={true}>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ flexWrap: 'wrap' });
    });
  });

  describe('Styling and Props', () => {
    it('applies custom className', () => {
      render(<Space className="custom-class">Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveClass('space', 'custom-class');
    });

    it('applies custom style', () => {
      render(<Space style={{ backgroundColor: 'red' }}>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveAttribute('style');
      expect(space.getAttribute('style')).toContain('background-color: red');
    });

    it('combines custom style with space properties', () => {
      render(
        <Space
          direction="vertical"
          size="large"
          style={{ backgroundColor: 'blue', padding: '10px' }}
        >
          Content
        </Space>
      );

      const space = screen.getByText('Content');
      const styleAttr = space.getAttribute('style');
      expect(styleAttr).toContain('flex-direction: column');
      expect(styleAttr).toContain('gap: var(--psc-spacing-lg)');
      expect(styleAttr).toContain('background-color: blue');
      expect(styleAttr).toContain('padding: 10px');
    });

    it('passes through additional props', () => {
      render(<Space id="test-space" data-testid="space-element">Content</Space>);

      const space = screen.getByTestId('space-element');
      expect(space).toHaveAttribute('id', 'test-space');
    });
  });

  describe('Integration and Edge Cases', () => {
    it('renders multiple children with spacing', () => {
      render(
        <Space size="medium">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </Space>
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      expect(buttons[0]).toHaveTextContent('Button 1');
      expect(buttons[1]).toHaveTextContent('Button 2');
      expect(buttons[2]).toHaveTextContent('Button 3');
    });

    it('handles empty children gracefully', () => {
      render(<Space>{null}</Space>);

      // Should not crash, but may not render anything visible
      expect(document.body).toBeDefined();
    });

    it('applies correct flex display', () => {
      render(<Space>Content</Space>);

      const space = screen.getByText('Content');
      expect(space).toHaveStyle({ display: 'flex' });
    });
  });
});