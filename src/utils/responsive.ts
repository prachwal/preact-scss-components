import type { ResponsiveValue, Breakpoint } from '../types/responsive';

/**
 * Utility function to resolve responsive values based on current breakpoint.
 * For now, this is a simple implementation that returns the base value or breakpoint-specific value.
 * In a real implementation, this would be connected to a theme provider or media query system.
 *
 * @param value - The responsive value to resolve
 * @param breakpoint - The current breakpoint (defaults to 'md' for now)
 * @returns The resolved value for the given breakpoint
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint = 'md'
): T | undefined {
  if (value === undefined) return undefined;

  // If it's not an object, return the value directly
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  // Check if it's a responsive object
  const responsiveObj = value as Partial<Record<Breakpoint, T>>;

  // Try to get the value for the current breakpoint
  if (responsiveObj[breakpoint] !== undefined) {
    return responsiveObj[breakpoint];
  }

  // Fallback to smaller breakpoints if current is not found
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const currentIndex = breakpoints.indexOf(breakpoint);

  for (let i = currentIndex; i >= 0; i--) {
    if (responsiveObj[breakpoints[i]] !== undefined) {
      return responsiveObj[breakpoints[i]];
    }
  }

  // If no breakpoint-specific value found, return undefined
  return undefined;
}

/**
 * Type guard to check if a value is a responsive object.
 */
export function isResponsiveValue<T>(value: any): value is Partial<Record<Breakpoint, T>> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  // Check if it has any breakpoint keys
  const breakpointKeys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  return breakpointKeys.some(key => key in value);
}