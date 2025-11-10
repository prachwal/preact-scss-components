import type { ResponsiveValue } from '../types/responsive';

/**
 * Preset gap values for consistent spacing.
 */
export type GapPreset = 'small' | 'medium' | 'large' | 'xl';

/**
 * Extended gap type that includes presets and custom values.
 */
export type GapValue = GapPreset | string | number;

/**
 * Maps preset gap values to actual CSS values.
 */
const GAP_PRESETS: Record<GapPreset, string> = {
  small: '0.5rem',   // 8px
  medium: '1rem',    // 16px
  large: '1.5rem',   // 24px
  xl: '2rem'         // 32px
};

/**
 * Resolves a gap value to a CSS string.
 * Handles presets, numbers (converted to rem), and custom strings.
 */
export function resolveGapValue(gap: GapValue | undefined): string | undefined {
  if (gap === undefined) return undefined;

  if (typeof gap === 'string') {
    // Check if it's a preset
    if (GAP_PRESETS[gap as GapPreset]) {
      return GAP_PRESETS[gap as GapPreset];
    }
    // Otherwise treat as custom CSS value
    return gap;
  }

  if (typeof gap === 'number') {
    // Convert number to rem (assuming 1 = 1rem = 16px)
    return `${gap}rem`;
  }

  return undefined;
}

/**
 * Type for responsive gap values.
 */
export type ResponsiveGap = ResponsiveValue<GapValue>;