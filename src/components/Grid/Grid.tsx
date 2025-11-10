import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Grid.scss';

/**
 * Breakpoint values for responsive grid columns.
 * Represents the number of columns an item should span on different screen sizes.
 */
type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | true | false;

/**
 * Breakpoint keys for responsive design.
 */
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Grid component.
 */
interface GridProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'size'> {
  /**
   * If true, the component will have the flex container behavior.
   * You should be wrapping items with a container.
   */
  container?: boolean;

  /**
   * If true, the component will have the flex item behavior.
   * You should be wrapping items with a container.
   */
  item?: boolean;

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs?: GridSize;

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the sm breakpoint and wider screens.
   */
  sm?: GridSize;

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the md breakpoint and wider screens.
   */
  md?: GridSize;

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the lg breakpoint and wider screens.
   */
  lg?: GridSize;

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the xl breakpoint and wider screens.
   */
  xl?: GridSize;

  /**
   * Defines the space between the type item components.
   * It can only be used on a type container component.
   */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  /**
   * Defines the flex-direction style property.
   * It can only be used on a type container component.
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  /**
   * Defines the justify-content style property.
   * It can only be used on a type container component.
   */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

  /**
   * Defines the align-items style property.
   * It can only be used on a type container component.
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

  /**
   * Defines the flex-wrap style property.
   * It can only be used on a type container component.
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';

  /**
   * If true, it sets min-width: 0 on the item.
   * Refer to the limitations section of the documentation to understand the use case.
   */
  zeroMinWidth?: boolean;

  /**
   * Children elements to be contained.
   */
  children: ComponentChildren;
}

/**
 * Grid component for creating responsive layouts.
 * Provides a flexible grid system similar to Material-UI or Ant Design.
 * Supports both container and item behaviors with responsive breakpoints.
 * Uses semantic HTML5 elements and BEM CSS methodology.
 *
 * @param props - Component props including grid options and standard HTML attributes
 * @returns JSX element with grid layout using the specified HTML tag
 *
 * @example
 * ```tsx
 * import { Grid } from './components/Grid/Grid';
 *
 * // Container with spacing
 * <Grid container spacing={2}>
 *   <Grid item xs={12} sm={6} md={4}>
 *     <div>Item 1</div>
 *   </Grid>
 *   <Grid item xs={12} sm={6} md={4}>
 *     <div>Item 2</div>
 *   </Grid>
 *   <Grid item xs={12} md={4}>
 *     <div>Item 3</div>
 *   </Grid>
 * </Grid>
 * ```
 */
export const Grid: FunctionComponent<GridProps> = ({
  container = false,
  item = false,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing,
  direction = 'row',
  justifyContent,
  alignItems,
  wrap = 'wrap',
  zeroMinWidth = false,
  className,
  style,
  children,
  ...props
}: GridProps) => {
  // Build CSS classes
  const baseClass = 'grid';

  // Build breakpoint classes (bez zmian, już poprawne: --xs-1, --sm-1 etc.)
  const getBreakpointClass = (bp: Breakpoint, size: GridSize | undefined): string => {
    if (size === undefined) return '';
    const sizeStr = typeof size === 'boolean' ? (size ? 'true' : '') : size;
    if (!sizeStr) return '';
    return `${baseClass}--${bp}-${sizeStr}`;
  };

  const breakpointClasses = [
    getBreakpointClass('xs', xs),
    getBreakpointClass('sm', sm),
    getBreakpointClass('md', md),
    getBreakpointClass('lg', lg),
    getBreakpointClass('xl', xl),
  ].filter(Boolean).join(' ');

  // Spacing (bez zmian)
  const spacingClass = spacing !== undefined ? `${baseClass}--spacing-${spacing}` : '';

  // Direction (dodaj --container--)
  const directionClass = container && direction !== 'row' ? `${baseClass}--container--direction-${direction}` : '';

  // Justify (poprawka: mapping bez błędnego replace('-',''), dodaj --container--)
  const getJustifyClass = (jc?: string): string => {
    if (!jc) return '';
    let mapped = jc.replace(/^flex-/, ''); // Tylko leading flex-
    if (mapped === 'start') mapped = 'start';
    else if (mapped === 'end') mapped = 'end';
    else if (mapped === 'space-between') mapped = 'between';
    else if (mapped === 'space-around') mapped = 'around';
    else if (mapped === 'space-evenly') mapped = 'evenly';
    // center zostaje center
    return `${baseClass}--container--justify-${mapped}`;
  };
  const justifyClass = container ? getJustifyClass(justifyContent) : '';

  // Align (analogicznie)
  const getAlignClass = (ai?: string): string => {
    if (!ai) return '';
    let mapped = ai.replace(/^flex-/, '');
    if (mapped === 'start') mapped = 'start';
    else if (mapped === 'end') mapped = 'end';
    // stretch, baseline, center bez zmian
    return `${baseClass}--container--align-${mapped}`;
  };
  const alignClass = container ? getAlignClass(alignItems) : '';

  // Wrap (dodaj --container--)
  const wrapClass = container && wrap !== 'wrap' ? `${baseClass}--container--wrap-${wrap}` : '';

  // Zero min-width (dodaj item &&, --item--)
  const zeroMinWidthClass = item && zeroMinWidth ? `${baseClass}--item--zero-min-width` : '';

  const combinedClass = [
    baseClass,
    container ? `${baseClass}--container` : '',
    item ? `${baseClass}--item` : '',
    breakpointClasses,
    spacingClass,
    directionClass,
    justifyClass,
    alignClass,
    wrapClass,
    zeroMinWidthClass,
    className,
  ].filter(Boolean).join(' ');

  // Build inline styles
  const combinedStyle = {
    ...(style && typeof style === 'object' ? style : {}),
  };

  return h('div', {
    className: combinedClass,
    style: combinedStyle,
    'data-testid': 'grid',
    ...props
  }, children);
};

export default Grid;