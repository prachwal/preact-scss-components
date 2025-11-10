import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { FlexItem } from './FlexItem';

describe('FlexItem', () => {
  describe('Component Rendering', () => {
    it('renders with default props', () => {
      render(<FlexItem>Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toBeInTheDocument();
      expect(flexItem.tagName).toBe('DIV');
    });

    it('renders children correctly', () => {
      render(
        <FlexItem>
          <div>Child 1</div>
          <div>Child 2</div>
        </FlexItem>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      render(<FlexItem as="span">Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem.tagName).toBe('SPAN');
    });
  });

  describe('Flex Properties', () => {
    it('applies flex shorthand property', () => {
      render(<FlexItem flex="1 1 200px">Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({ flex: '1 1 200px' });
    });

    it('applies flexGrow property', () => {
      render(<FlexItem flexGrow={2}>Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({ flexGrow: '2' });
    });

    it('applies flexShrink property', () => {
      render(<FlexItem flexShrink={0}>Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({ flexShrink: '0' });
    });

    it('applies flexBasis property', () => {
      render(<FlexItem flexBasis="300px">Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({ flexBasis: '300px' });
    });

    it('applies order property', () => {
      render(<FlexItem order={-1}>Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({ order: '-1' });
    });

    it('combines multiple flex properties', () => {
      render(
        <FlexItem
          flexGrow={1}
          flexShrink={1}
          flexBasis="auto"
          order={2}
        >
          Content
        </FlexItem>
      );

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({
        flexGrow: '1',
        flexShrink: '1',
        flexBasis: 'auto',
        order: '2'
      });
    });

    it('combines flex shorthand with individual properties', () => {
      render(
        <FlexItem
          flex="1 1 auto"
          order={3}
        >
          Content
        </FlexItem>
      );

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveStyle({
        flex: '1 1 auto',
        order: '3'
      });
    });
  });

  describe('Styling and Props', () => {
    it('applies custom className', () => {
      render(<FlexItem className="custom-class">Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      render(<FlexItem style={{ backgroundColor: 'red' }}>Content</FlexItem>);

      const flexItem = screen.getByText('Content');
      expect(flexItem).toHaveAttribute('style');
      expect(flexItem.getAttribute('style')).toContain('background-color: red');
    });

    it('combines custom style with flex properties', () => {
      render(
        <FlexItem
          flexGrow={1}
          style={{ backgroundColor: 'blue', padding: '10px' }}
        >
          Content
        </FlexItem>
      );

      const flexItem = screen.getByText('Content');
      const styleAttr = flexItem.getAttribute('style');
      expect(styleAttr).toContain('flex-grow: 1');
      expect(styleAttr).toContain('background-color: blue');
      expect(styleAttr).toContain('padding: 10px');
    });

    it('passes through additional props', () => {
      render(<FlexItem id="test-item" data-testid="flex-item">Content</FlexItem>);

      const flexItem = screen.getByTestId('flex-item');
      expect(flexItem).toHaveAttribute('id', 'test-item');
    });
  });
});