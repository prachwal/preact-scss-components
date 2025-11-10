import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Container.scss';

/**
 * Props for the Container component.
 */
interface ContainerProps extends JSX.HTMLAttributes<HTMLElement> {
/**
 * Layout type: 'flex' or 'grid'. If not provided, no display property is set,
 * allowing the container to use existing CSS or inherit from parent.
 * @default undefined (no layout)
 */
  layout?: 'flex' | 'grid';
  /**
   * Direction for flex layout: 'row' or 'column'. Only applies to flex layout.
   */
  direction?: 'row' | 'column';
  /**
   * Gap between items. Can be any CSS length value (e.g., '1rem', '10px').
   */
  gap?: string;
  /**
   * HTML tag to use for the container element. Defaults to 'div'.
   * Can be 'div', 'section', 'article', 'main', 'aside', 'header', 'footer', etc.
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Children elements to be contained.
   */
  children: ComponentChildren;
}

/**
 * Container component for flex or grid layouts.
 * Provides a flexible container that can switch between flex and grid display modes.
 * Accepts all standard HTML attributes and passes them through to the underlying element.
 * Supports dynamic HTML tags for semantic markup.
 * Uses semantic HTML5 elements and BEM CSS methodology.
 *
 * @param props - Component props including layout options and standard HTML attributes
 * @returns JSX element with container layout using the specified HTML tag
 *
 * @example
 * ```tsx
 * import { Container } from './components/Container/Container';
 *
 * // Basic container without layout (inherits from CSS)
 * <Container>
 *   <div>Content</div>
 * </Container>
 *
 * // Flex container
 * <Container layout="flex" gap="1rem">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Container>
 *
 * // Semantic section container with grid
 * <Container as="section" layout="grid" gap="2rem" aria-label="Product grid">
 *   <article>Product 1</article>
 *   <article>Product 2</article>
 * </Container>
 * ```
 */
const isValidCssGap = (value: string): boolean => {
  // Basic validation for CSS length values
  const cssLengthRegex = /^(\d*\.?\d+)(px|rem|em|vh|vw|vmin|vmax|%|ex|ch|cm|mm|in|pt|pc|fr|auto|normal|unset|inherit|initial)?$/;
  return cssLengthRegex.test(value.trim());
};

export const Container: FunctionComponent<ContainerProps> = ({
  layout,
  direction = 'row',
  gap,
  as: Tag = 'div',
  children,
  className,
  style,
  ...props
}: ContainerProps) => {
  // Validate gap prop
  if (gap && !isValidCssGap(gap)) {
    console.warn(`Container: Invalid gap value "${gap}". Expected a valid CSS length value (e.g., "1rem", "10px", "2em").`);
  }
  const baseClass = 'container';
  const layoutClass = layout ? (layout === 'grid' ? `${baseClass}--grid` : `${baseClass}--flex`) : '';
  const directionClass = layout === 'flex' && direction === 'column' ? `${baseClass}--flex--column` : '';
  const combinedClass = [baseClass, layoutClass, directionClass, className].filter(Boolean).join(' ');

  const combinedStyle = {
    ...(style && typeof style === 'object' ? style : {}),
    ...(gap ? { gap } : {})
  };

  return h(Tag, {
    className: combinedClass,
    style: combinedStyle,
    'data-testid': 'container',
    ...props
  }, children);
};

export default Container;