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

// Space component for consistent spacing between elements
export { default as Space } from './Space/Space';

// Stack component for flexbox layouts with consistent spacing
export { default as Stack } from './Stack/Stack';

// Divider component for visual separators
export { default as Divider } from './Divider/Divider';

// Card component for content containers with elevation
export { Card } from './Card/Card';

// Layout component for structural page organization
export { Layout, Header, Sider, Content, Footer } from './Layout';

// Theme-related exports (re-exported for convenience)
export { ThemeProvider, ThemeContext, getThemeLabel, getThemeIcon } from '../providers/ThemeProvider';