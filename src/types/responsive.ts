/**
 * Responsive breakpoint values for the design system.
 * Follows common breakpoint naming conventions.
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Responsive value that can be a single value or an object with breakpoint-specific values.
 * Similar to MUI's responsive value system.
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Utility type to extract the value type from a ResponsiveValue.
 */
export type ResponsiveValueType<T extends ResponsiveValue<any>> = T extends ResponsiveValue<infer U> ? U : never;

/**
 * Common responsive props interface that can be extended by components.
 */
export interface ResponsiveProps {
  /**
   * Responsive direction values.
   */
  direction?: ResponsiveValue<'row' | 'column'>;
  /**
   * Responsive gap values.
   */
  gap?: ResponsiveValue<string | number>;
  /**
   * Responsive justify content values.
   */
  justifyContent?: ResponsiveValue<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'>;
  /**
   * Responsive align items values.
   */
  alignItems?: ResponsiveValue<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
  /**
   * Responsive wrap values.
   */
  wrap?: ResponsiveValue<'nowrap' | 'wrap' | 'wrap-reverse'>;
}