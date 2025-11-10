import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';

/**
 * Props for the Footer component.
 * Provides a footer section within a Layout.
 */
export interface FooterProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * HTML tag to use for the footer element.
   * @default 'footer'
   */
  as?: 'footer' | 'div' | 'section';
}

/**
 * Footer component for layout footer sections.
 * Used within Layout components to provide consistent footer styling.
 *
 * @param props - Component props
 * @returns JSX element with footer styling
 *
 * @example
 * ```tsx
 * <Footer>
 *   <p>&copy; 2024 My App</p>
 *   <nav>Footer Links</nav>
 * </Footer>
 * ```
 */
export const Footer: FunctionComponent<FooterProps> = ({
  as: Tag = 'footer',
  className,
  children,
  ...props
}: FooterProps) => {
  const combinedClassName = [
    'layout-footer',
    className
  ].filter(Boolean).join(' ');

  return h(Tag, { className: combinedClassName, ...props }, children);
};

export default Footer;