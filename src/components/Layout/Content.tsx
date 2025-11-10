import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';

/**
 * Props for the Content component.
 * Provides a main content section within a Layout.
 */
export interface ContentProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * HTML tag to use for the content element.
   * @default 'main'
   */
  as?: 'main' | 'div' | 'section';
}

/**
 * Content component for layout main content sections.
 * Used within Layout components to provide consistent content area styling.
 *
 * @param props - Component props
 * @returns JSX element with content styling
 *
 * @example
 * ```tsx
 * <Content>
 *   <h1>Page Title</h1>
 *   <p>Main content goes here</p>
 * </Content>
 * ```
 */
export const Content: FunctionComponent<ContentProps> = ({
  as: Tag = 'main',
  className,
  children,
  ...props
}: ContentProps) => {
  const combinedClassName = [
    'layout-content',
    className
  ].filter(Boolean).join(' ');

  return h(Tag, { className: combinedClassName, ...props }, children);
};

export default Content;