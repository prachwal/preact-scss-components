import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';

/**
 * Props for the Header component.
 * Provides a header section within a Layout.
 */
export interface HeaderProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * HTML tag to use for the header element.
   * @default 'header'
   */
  as?: 'header' | 'div' | 'section';
}

/**
 * Header component for layout header sections.
 * Used within Layout components to provide consistent header styling.
 *
 * @param props - Component props
 * @returns JSX element with header styling
 *
 * @example
 * ```tsx
 * <Header>
 *   <nav>Navigation</nav>
 *   <div>Logo</div>
 * </Header>
 * ```
 */
export const Header: FunctionComponent<HeaderProps> = ({
  as: Tag = 'header',
  className,
  children,
  ...props
}: HeaderProps) => {
  const combinedClassName = [
    'layout-header',
    className
  ].filter(Boolean).join(' ');

  return h(Tag, { className: combinedClassName, ...props }, children);
};

export default Header;