/**
 * Components module exports
 *
 * This module provides access to all reusable UI components in the library.
 * Components are built with Preact, use SCSS for styling, and follow accessibility guidelines.
 */

// Example component demonstrating Signals usage and theming
export { default as ExampleComponent } from './ExampleComponent/ExampleComponent';

// Container component for flex or grid layouts
export { default as Container } from './Container/Container';

// Theme-related exports (re-exported for convenience)
export { ThemeProvider, ThemeContext, getThemeLabel, getThemeIcon } from '../providers/ThemeProvider';