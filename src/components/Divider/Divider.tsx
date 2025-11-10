import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Divider.scss';

/**
 * Props for the Divider component.
 * Provides a visual separator between content sections.
 */
export interface DividerProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Orientation of the divider line.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Optional title text to display on the divider.
   */
  title?: string;
  /**
   * Whether to display the divider as a dashed line.
   * @default false
   */
  dashed?: boolean;
  /**
   * HTML tag to use for the container element.
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Optional children content (alternative to title prop).
   */
  children?: ComponentChildren;
}

/**
 * Divider component for creating visual separators between content sections.
 * Supports horizontal and vertical orientations with optional titles.
 *
 * @param props - Component props
 * @returns JSX element representing the divider
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider title="Section Title" />
 * <Divider orientation="vertical" />
 * <Divider dashed />
 * ```
 */
export const Divider: FunctionComponent<DividerProps> = ({
  orientation = 'horizontal',
  title,
  dashed = false,
  as: Tag = 'div',
  children,
  className,
  style,
  ...props
}: DividerProps) => {
  const displayTitle = title || children;
  const hasTitle = title !== undefined || children !== undefined;

  const combinedClassName = [
    'divider',
    `divider--${orientation}`,
    dashed && 'divider--dashed',
    hasTitle && 'divider--with-title',
    className
  ].filter(Boolean).join(' ');

  const baseStyle = style && typeof style === 'object' ? style : {};

  // Don't override height/width from inline styles
  const combinedStyle = {
    ...baseStyle
  };

  // Render with title (three parts: line - title - line)
  if (hasTitle) {
    return h(Tag, {
      className: combinedClassName,
      style: combinedStyle,
      ...props
    }, [
      h('span', { className: 'divider__line', key: 'line-1' }),
      h('span', { className: 'divider__title', key: 'title' }, displayTitle),
      h('span', { className: 'divider__line', key: 'line-2' })
    ]);
  }

  // Render without title (just a single line)
  return h(Tag, {
    className: combinedClassName,
    style: combinedStyle,
    ...props
  }, h('span', { className: 'divider__line' }));
};

export default Divider;