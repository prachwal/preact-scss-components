import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';

/**
 * Props for the Sider component.
 * Provides a sidebar section within a Layout.
 */
export interface SiderProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Width of the sider.
   * @default 200
   */
  width?: number | string;
  /**
   * Whether the sider is collapsible.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Whether the sider is collapsed.
   * @default false
   */
  collapsed?: boolean;
  /**
   * Trigger for collapsing/expanding the sider.
   */
  trigger?: ComponentChildren;
  /**
   * HTML tag to use for the sider element.
   * @default 'aside'
   */
  as?: 'aside' | 'div' | 'section';
}

/**
 * Sider component for layout sidebar sections.
 * Used within Layout components to provide collapsible sidebars.
 *
 * @param props - Component props
 * @returns JSX element with sider styling
 *
 * @example
 * ```tsx
 * <Sider width={250} collapsible>
 *   <nav>Menu Items</nav>
 * </Sider>
 * ```
 */
export const Sider: FunctionComponent<SiderProps> = ({
  width = 200,
  collapsible = false,
  collapsed = false,
  trigger,
  as: Tag = 'aside',
  className,
  style,
  children,
  ...props
}: SiderProps) => {
  const combinedClassName = [
    'layout-sider',
    collapsible && 'layout-sider--collapsible',
    collapsed && 'layout-sider--collapsed',
    className
  ].filter(Boolean).join(' ');

  const combinedStyle = {
    ...(typeof style === 'object' && style !== null ? style : {}),
    width: collapsed ? '0px' : (typeof width === 'number' ? `${width}px` : width),
    flex: collapsed ? '0 0 0px' : `0 0 ${typeof width === 'number' ? `${width}px` : width}`
  };

  return h(Tag, { className: combinedClassName, style: combinedStyle, ...props }, [
    children,
    trigger && h('div', { className: 'layout-sider-trigger' }, trigger)
  ]);
};

export default Sider;