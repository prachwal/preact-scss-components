import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Container.scss';
import type { ResponsiveValue } from '../../types/responsive';
import { resolveResponsiveValue } from '../../utils/responsive';
import { resolveGapValue, type GapValue, type ResponsiveGap } from '../../utils/gap';

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
   * Direction for flex layout: 'row' or 'column'. Can be responsive.
   * @default 'row'
   */
  direction?: ResponsiveValue<'row' | 'column'>;
  /**
   * Shorthand for vertical direction (equivalent to direction="column").
   * Similar to Ant Design's vertical prop.
   */
  vertical?: boolean;
  /**
   * Gap between items. Supports presets ('small', 'medium', 'large', 'xl'),
   * custom CSS values, or numbers (converted to rem). Can be responsive.
   */
  gap?: ResponsiveGap;
  /**
   * Defines the justify-content style property for flex layout.
   * It can only be used on flex layout. Can be responsive.
   */
  justifyContent?: ResponsiveValue<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'>;
  /**
   * Defines the align-items style property for flex layout.
   * It can only be used on flex layout. Can be responsive.
   */
  alignItems?: ResponsiveValue<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
  /**
   * Defines the flex-wrap style property for flex layout.
   * It can only be used on flex layout. Can be responsive.
   * @default 'wrap'
   */
  wrap?: ResponsiveValue<'nowrap' | 'wrap' | 'wrap-reverse'>;
  /**
   * For grid layout: defines grid-template-columns.
   * Can be a string like "1fr 1fr" or "repeat(3, 1fr)".
   * It can only be used on grid layout. Can be responsive.
   */
  gridTemplateColumns?: ResponsiveValue<string>;
  /**
   * For grid layout: defines grid-template-rows.
   * Can be a string like "1fr 1fr" or "repeat(3, 1fr)".
   * It can only be used on grid layout. Can be responsive.
   */
  gridTemplateRows?: ResponsiveValue<string>;
  /**
   * For grid layout: defines place-items (align-items + justify-items).
   * Can be responsive.
   */
  placeItems?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>;
  /**
   * HTML tag to use for the container element. Defaults to 'div'.
   * Can be 'div', 'section', 'article', 'main', 'aside', 'header', 'footer', etc.
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Element to insert between each child. Similar to MUI Stack divider.
   * Can be a React element or true (uses default divider).
   */
  divider?: JSX.Element | boolean;
  /**
   * If true, uses CSS flexbox gap for spacing instead of margins.
   * This is the default behavior. Set to false for legacy margin-based spacing.
   * @default true
   */
  useFlexGap?: boolean;
  /**
   * Children elements to be contained.
   */
  children: ComponentChildren;
}/**
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

// Helper functions for CSS class generation
export const getJustifyClass = (jc?: string): string => {
  if (!jc) return '';
  let mapped = jc.replace(/^flex-/, ''); // Remove leading flex-
  if (mapped === 'start') mapped = 'start';
  else if (mapped === 'end') mapped = 'end';
  else if (mapped === 'space-between') mapped = 'between';
  else if (mapped === 'space-around') mapped = 'around';
  else if (mapped === 'space-evenly') mapped = 'evenly';
  // center and stretch stay the same
  return `container--flex--justify-${mapped}`;
};

export const getAlignClass = (ai?: string): string => {
  if (!ai) return '';
  let mapped = ai.replace(/^flex-/, '');
  if (mapped === 'start') mapped = 'start';
  else if (mapped === 'end') mapped = 'end';
  // stretch, baseline, center stay the same
  return `container--flex--align-${mapped}`;
};

export const getWrapClass = (wrap?: string): string => {
  if (!wrap || wrap === 'wrap') return '';
  return `container--flex--wrap-${wrap}`;
};

/**
 * Renders children with optional dividers between them.
 */
const renderChildrenWithDividers = (
  children: ComponentChildren,
  divider?: JSX.Element | boolean
): ComponentChildren => {
  if (!divider || !children) return children;

  const childArray = Array.isArray(children) ? children : [children];
  if (childArray.length <= 1) return children;

  const defaultDivider = h('div', {
    className: 'container__divider',
    'aria-hidden': 'true'
  });

  const dividerElement = divider === true ? defaultDivider : divider;

  const result: ComponentChildren[] = [];
  childArray.forEach((child, index) => {
    if (index > 0) {
      result.push(h('div', { key: `divider-${index}`, className: 'container__divider-wrapper' }, dividerElement));
    }
    result.push(child);
  });

  return result;
};

export const Container: FunctionComponent<ContainerProps> = ({
  layout,
  direction = 'row',
  vertical,
  gap,
  justifyContent,
  alignItems,
  wrap = 'wrap',
  gridTemplateColumns,
  gridTemplateRows,
  placeItems,
  as: Tag = 'div',
  divider,
  useFlexGap = true,
  children,
  className,
  style,
  ...props
}: ContainerProps) => {
  // Resolve responsive values (for now using default breakpoint 'md')
  const resolvedDirection = vertical ? 'column' : (resolveResponsiveValue(direction, 'md') || 'row');
  const resolvedGap = resolveResponsiveValue(gap, 'md');
  const resolvedJustifyContent = resolveResponsiveValue(justifyContent, 'md');
  const resolvedAlignItems = resolveResponsiveValue(alignItems, 'md');
  const resolvedWrap = resolveResponsiveValue(wrap, 'md') || 'wrap';
  const resolvedGridTemplateColumns = resolveResponsiveValue(gridTemplateColumns, 'md');
  const resolvedGridTemplateRows = resolveResponsiveValue(gridTemplateRows, 'md');
  const resolvedPlaceItems = resolveResponsiveValue(placeItems, 'md');

  // Validate gap prop
  const resolvedGapValue = resolveGapValue(resolvedGap);
  if (resolvedGapValue && !isValidCssGap(resolvedGapValue)) {
    console.warn(`Container: Invalid gap value "${resolvedGapValue}". Expected a valid CSS length value (e.g., "1rem", "10px", "2em").`);
  }
  const baseClass = 'container';
  const layoutClass = layout ? (layout === 'grid' ? `${baseClass}--grid` : `${baseClass}--flex`) : '';
  const directionClass = layout === 'flex' && resolvedDirection === 'column' ? `${baseClass}--flex--column` : '';
  const justifyClass = layout === 'flex' && resolvedJustifyContent ? getJustifyClass(resolvedJustifyContent) : '';
  const alignClass = layout === 'flex' && resolvedAlignItems ? getAlignClass(resolvedAlignItems) : '';
  const wrapClass = layout === 'flex' ? getWrapClass(resolvedWrap) : '';
  const combinedClass = [baseClass, layoutClass, directionClass, justifyClass, alignClass, wrapClass, className].filter(Boolean).join(' ');

  const combinedStyle = {
    ...(style && typeof style === 'object' ? style : {}),
    ...(resolvedGapValue ? { gap: resolvedGapValue } : {}),
    ...(resolvedGridTemplateColumns ? { gridTemplateColumns: resolvedGridTemplateColumns } : {}),
    ...(resolvedGridTemplateRows ? { gridTemplateRows: resolvedGridTemplateRows } : {}),
    ...(resolvedPlaceItems ? { placeItems: resolvedPlaceItems } : {})
  };

  const renderedChildren = renderChildrenWithDividers(children, divider);

  return h(Tag, {
    className: combinedClass,
    style: combinedStyle,
    'data-testid': 'container',
    ...props
  }, renderedChildren);
};

export default Container;