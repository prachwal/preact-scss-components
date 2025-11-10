import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Divider, DividerProps } from './Divider';

// Mock the SCSS import
vi.mock('./Divider.scss', () => ({}));

describe('Divider', () => {
  const defaultProps: DividerProps = {};

  it('renders horizontal divider by default', () => {
    render(<Divider {...defaultProps} data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('divider', 'divider--horizontal');
  });

  it('renders vertical divider when orientation is vertical', () => {
    render(<Divider {...defaultProps} orientation="vertical" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider', 'divider--vertical');
  });

  it('applies dashed class when dashed prop is true', () => {
    render(<Divider {...defaultProps} dashed data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--dashed');
  });

  it('renders title when title prop is provided', () => {
    render(<Divider {...defaultProps} title="Test Title" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--with-title');
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children as title when children prop is provided', () => {
    render(<Divider {...defaultProps} data-testid="divider">Custom Title</Divider>);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--with-title');
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders title with higher priority than children', () => {
    render(<Divider {...defaultProps} title="Title Prop" data-testid="divider">Children Content</Divider>);
    expect(screen.getByText('Title Prop')).toBeInTheDocument();
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Divider {...defaultProps} className="custom-class" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider', 'custom-class');
  });

  it('applies custom style object', () => {
    const customStyle = { marginTop: '20px' };
    render(<Divider {...defaultProps} style={customStyle} data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveStyle({ marginTop: '20px' });
  });

  it('uses custom HTML tag when as prop is provided', () => {
    render(<Divider {...defaultProps} as="span" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider.tagName).toBe('SPAN');
  });

  it('passes through additional props', () => {
    render(<Divider {...defaultProps} data-testid="custom-divider" id="divider-id" />);
    const divider = screen.getByTestId('custom-divider');
    expect(divider).toHaveAttribute('id', 'divider-id');
  });

  it('renders horizontal divider with title and three parts', () => {
    render(<Divider {...defaultProps} title="Section" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    const lines = divider.querySelectorAll('.divider__line');
    const title = divider.querySelector('.divider__title');

    expect(lines).toHaveLength(2);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Section');
  });

  it('renders vertical divider with title correctly', () => {
    render(<Divider {...defaultProps} orientation="vertical" title="Vertical" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--vertical', 'divider--with-title');
    expect(screen.getByText('Vertical')).toBeInTheDocument();
  });

  it('renders dashed horizontal divider', () => {
    render(<Divider {...defaultProps} dashed data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--horizontal', 'divider--dashed');
  });

  it('renders dashed vertical divider', () => {
    render(<Divider {...defaultProps} orientation="vertical" dashed data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--vertical', 'divider--dashed');
  });

  it('renders dashed divider with title', () => {
    render(<Divider {...defaultProps} title="Dashed Section" dashed data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--with-title', 'divider--dashed');
    expect(screen.getByText('Dashed Section')).toBeInTheDocument();
  });

  it('combines multiple modifier classes correctly', () => {
    render(
      <Divider
        {...defaultProps}
        orientation="vertical"
        title="Complex"
        dashed
        className="extra-class"
        data-testid="divider"
      />
    );
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(
      'divider',
      'divider--vertical',
      'divider--dashed',
      'divider--with-title',
      'extra-class'
    );
  });

  it('handles empty title gracefully', () => {
    render(<Divider {...defaultProps} title="" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('divider--with-title');
    expect(divider.querySelector('.divider__title')).toHaveTextContent('');
  });

  it('handles undefined title gracefully', () => {
    render(<Divider {...defaultProps} title={undefined} data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).not.toHaveClass('divider--with-title');
  });
});