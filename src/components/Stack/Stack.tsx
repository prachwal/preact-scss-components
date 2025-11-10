import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Stack.scss';

/**
 * Props for the Stack component.
 * Provides a flexbox container with consistent spacing between child elements.
 */
export interface StackProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Direction of the stack layout.
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /**
   * Spacing between items.
   * Can be a predefined spacing key or a custom number (in pixels).
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | number;
  /**
   * Alignment of items along the cross axis.
   * @default 'stretch'
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /**
   * Justification of items along the main axis.
   * @default 'flex-start'
   */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * HTML tag to use for the container element.
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Stack component for creating flexbox layouts with consistent spacing.
 * Similar to MUI Stack component, provides vertical or horizontal stacking with spacing.
 *
 * @param props - Component props
 * @returns JSX element with stacked children
 *
 * @example
 * ```tsx
 * <Stack direction="column" spacing="md" alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack: FunctionComponent<StackProps> = ({
  direction = 'column',
  spacing = 'md',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  as: Tag = 'div',
  className,
  style,
  ...props
}: StackProps) => {
  // Map spacing to CSS value
  const getSpacingValue = (spacing: StackProps['spacing']): string => {
    if (typeof spacing === 'number') {
      return `${spacing}px`;
    }
    switch (spacing) {
      case 'xs':
        return 'var(--psc-spacing-xs)';
      case 'sm':
        return 'var(--psc-spacing-sm)';
      case 'md':
        return 'var(--psc-spacing-md)';
      case 'lg':
        return 'var(--psc-spacing-lg)';
      case 'xl':
        return 'var(--psc-spacing-xl)';
      case '2xl':
        return 'var(--psc-spacing-2xl)';
      case '3xl':
        return 'var(--psc-spacing-3xl)';
      case '4xl':
        return 'var(--psc-spacing-4xl)';
      case '5xl':
        return 'var(--psc-spacing-5xl)';
      case '6xl':
        return 'var(--psc-spacing-6xl)';
      default:
        return 'var(--psc-spacing-md)';
    }
  };

  const combinedStyle = {
    ...(style && typeof style === 'object' ? style : {}),
    display: 'flex',
    flexDirection: direction,
    gap: getSpacingValue(spacing),
    alignItems,
    justifyContent
  };

  const combinedClassName = className ? `stack ${className}` : 'stack';

  return h(Tag, {
    className: combinedClassName,
    style: combinedStyle,
    ...props
  });
};

export default Stack;