import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';

/**
 * Props for the FlexItem component.
 * Used to control individual flex item properties within a Container.
 */
interface FlexItemProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * The flex shorthand property. Sets flex-grow, flex-shrink, and flex-basis.
   */
  flex?: string | number;
  /**
   * Defines the flex-grow property for this item.
   */
  flexGrow?: number;
  /**
   * Defines the flex-shrink property for this item.
   */
  flexShrink?: number;
  /**
   * Defines the flex-basis property for this item.
   */
  flexBasis?: string;
  /**
   * Defines the order property for this item.
   */
  order?: number;
  /**
   * HTML tag to use for the item element. Defaults to 'div'.
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Children elements.
   */
  children: ComponentChildren;
}

/**
 * FlexItem component for controlling individual flex item properties.
 * Should be used as children within a Container with flex layout.
 *
 * @param props - Component props
 * @returns JSX element with flex item properties
 *
 * @example
 * ```tsx
 * import { Container, FlexItem } from './components/Container';
 *
 * <Container layout="flex">
 *   <FlexItem flex="1 1 200px">Item 1</FlexItem>
 *   <FlexItem flexGrow={2}>Item 2</FlexItem>
 *   <FlexItem order={-1}>Item 3</FlexItem>
 * </Container>
 * ```
 */
export const FlexItem: FunctionComponent<FlexItemProps> = ({
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  order,
  as: Tag = 'div',
  children,
  className,
  style,
  ...props
}: FlexItemProps) => {
  const combinedStyle = {
    ...(style && typeof style === 'object' ? style : {}),
    ...(flex !== undefined ? { flex } : {}),
    ...(flexGrow !== undefined ? { flexGrow } : {}),
    ...(flexShrink !== undefined ? { flexShrink } : {}),
    ...(flexBasis !== undefined ? { flexBasis } : {}),
    ...(order !== undefined ? { order } : {})
  };

  return h(Tag, {
    className,
    style: combinedStyle,
    ...props
  }, children);
};

export default FlexItem;