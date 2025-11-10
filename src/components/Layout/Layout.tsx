import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Layout.scss';

/**
 * Props for the Layout component.
 * Provides a structural layout container for page-level organization.
 */
export interface LayoutProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Whether the layout contains a sider component.
   * Affects spacing and layout calculations.
   * @default false
   */
  hasSider?: boolean;
  /**
   * HTML tag to use for the container element.
   * @default 'div'
   */
  as?: 'div' | 'section' | 'main';
}

/**
 * Layout component for structural page organization.
 * Similar to Ant Design Layout, provides a container with optional sider support.
 * Automatically adjusts spacing when sider components are present.
 *
 * @param props - Component props
 * @returns JSX element with layout styling
 *
 * @example
 * ```tsx
 * <Layout hasSider>
 *   <Header>Header Content</Header>
 *   <Layout>
 *     <Sider>Sider Content</Sider>
 *     <Content>Main Content</Content>
 *   </Layout>
 *   <Footer>Footer Content</Footer>
 * </Layout>
 * ```
 */
export const Layout: FunctionComponent<LayoutProps> = ({
  hasSider = false,
  as: Tag = 'div',
  className,
  children,
  ...props
}: LayoutProps) => {
  const combinedClassName = [
    'layout',
    hasSider && 'layout--has-sider',
    className
  ].filter(Boolean).join(' ');

  return h(Tag, { className: combinedClassName, ...props }, children);
};

export default Layout;

// Re-export subcomponents for convenience
export { Header } from './Header';
export { Sider } from './Sider';
export { Content } from './Content';
export { Footer } from './Footer';