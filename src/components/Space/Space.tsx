import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Space.scss';

/**
 * Props for the Space component.
 * Provides consistent spacing between child elements.
 */
export interface SpaceProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Direction of the spacing layout.
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Size of the spacing between items.
   * Can be a predefined size or a custom number (in pixels).
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large' | number;
  /**
   * Whether to wrap items to the next line when space is insufficient.
   * @default false
   */
  wrap?: boolean;
  /**
   * HTML tag to use for the container element.
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Children elements to space.
   */
  children: ComponentChildren;
}

/**
 * Space component for adding consistent spacing between child elements.
 * Uses flexbox with gap for modern spacing control.
 *
 * @param props - Component props
 * @returns JSX element with spaced children
 *
 * @example
 * ```tsx
 * <Space direction="horizontal" size="medium">
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 * </Space>
 * ```
 */
export const Space: FunctionComponent<SpaceProps> = ({
  direction = 'horizontal',
  size = 'small',
  wrap = false,
  as: Tag = 'div',
  children,
  className,
  style,
  ...props
}: SpaceProps) => {
  // Map size to CSS value
  const getSizeValue = (size: 'small' | 'medium' | 'large' | number): string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    switch (size) {
      case 'small':
        return 'var(--psc-spacing-sm)';
      case 'medium':
        return 'var(--psc-spacing-md)';
      case 'large':
        return 'var(--psc-spacing-lg)';
      default:
        return 'var(--psc-spacing-sm)';
    }
  };

  const combinedStyle = {
    ...(style && typeof style === 'object' ? style : {}),
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    gap: getSizeValue(size),
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: direction === 'vertical' ? 'stretch' : 'center'
  };

  const combinedClassName = className ? `space ${className}` : 'space';

  return h(Tag, {
    className: combinedClassName,
    style: combinedStyle,
    ...props
  }, children);
};

export default Space;