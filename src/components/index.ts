/**
 * Components module exports
 *
 * This module provides access to all reusable UI components in the library.
 * Components are built with Preact, use SCSS for styling, and follow accessibility guidelines.
 */

// Container component for flex or grid layouts
export { default as Container } from './Container/Container';

// FlexItem component for individual flex item control
export { default as FlexItem } from './FlexItem/FlexItem';

// Grid component for responsive layouts (similar to MUI/Ant Design)
export { default as Grid } from './Grid/Grid';

// Theme-related exports (re-exported for convenience)
export { ThemeProvider, ThemeContext, getThemeLabel, getThemeIcon } from '../providers/ThemeProvider';