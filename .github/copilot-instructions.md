# Preact SCSS Components Library - AI Agent Instructions

## Architecture Overview
This is a **component library** for Preact with SCSS styling support and advanced theme system. Key structure:
- `src/components/` - Individual components (e.g., `ExampleComponent.tsx` + `ExampleComponent.scss`)
- `src/styles/` - Modular SCSS architecture with semantic color system
- `src/utils/` - Persistence utilities and theme injection helpers
- `src/index.ts` - Library exports
- `dist/` - Built outputs (JS, CSS, TypeScript declarations)

Uses Vite for library bundling, Preact Signals for reactive state, and CSS Custom Properties for dynamic theming.

## Critical Workflows
- **Development**: `npm run dev` starts Vite dev server at `http://localhost:5174/` with hot reload
- **Build**: `npm run build` generates `dist/index.es.js`, `dist/index.umd.js`, `dist/index.css`, and `dist/index.d.ts`
- **Preview**: `npm run preview` serves built library for testing
- **Code Analysis**: `./merge-src.sh merged-src.txt` combines all source files for analysis

## Component Patterns
- **Signals for State**: Use `@preact/signals` for reactive state (e.g., `const count = signal(0)`)
- **Modular Styling**: Each component imports its own `.scss` file with BEM naming
- **Semantic HTML5**: Use `<article>`, `<header>`, `<main>` instead of generic `<div>`
- **TypeScript Interfaces**: Define props with `ComponentNameProps` interfaces
- **Theme Integration**: Components automatically adapt to light/dark/system themes

## Theme System Architecture
- **Synchronous Injection**: Theme applied to `<html>` element before render to prevent FOUC
- **CSS Custom Properties**: All colors use `var(--color-semantic-name)` for theme switching
- **Persistence**: Theme choice saved to localStorage with `createPersistedSignal`
- **System Theme**: Respects `prefers-color-scheme` media query
- **Semantic Colors**: Use `surface`, `text-primary`, `border`, etc. instead of hardcoded colors

## Styling Conventions
- **SCSS Modules**: Use `@use` imports in `src/styles/index.scss`
- **CSS Variables**: Access colors via `var(--color-surface)`, `var(--color-text-primary)`
- **BEM Methodology**: `.component-name__element--modifier` naming
- **Spacing System**: Use `spacing(sm|medium|large|xl)` functions
- **Theme Overrides**: Dark theme applied via `html[data-theme="dark"]` selector

## Persistence Patterns
- **Universal Persistence**: Use `createPersistedSignal<T>(key, defaultValue)` for any reactive value
- **SSR Safe**: Checks `typeof window !== 'undefined'` before localStorage access
- **Error Handling**: Graceful fallbacks when localStorage unavailable
- **Custom Serialization**: Optional serializer/deserializer functions for complex types

## Key Files & Examples
- `src/components/ThemeProvider.tsx` - Synchronous theme injection + persistence
- `src/utils/persistence.ts` - Universal localStorage utility with signals
- `src/styles/_colors.scss` - Semantic color definitions for light/dark themes
- `src/styles/_functions.scss` - SCSS mixins for generating CSS variables
- `src/components/ExampleComponent.tsx` - Signals + BEM + semantic colors example
- `vite.config.ts` - Library build config with external Preact dependencies

## Development Patterns
- **Signals Over Hooks**: Prefer `signal()` over `useState()` for reactive state
- **Direct localStorage**: For theme, use direct localStorage instead of persisted signals
- **Theme-Aware Components**: Use CSS variables, avoid hardcoded colors
- **Merge Scripts**: Use `./merge-src.sh` to analyze entire codebase in single file
- **External Dependencies**: Preact excluded from bundle - consumers provide it

## Testing Patterns
- **Vitest + JSDOM**: Use `@testing-library/preact` for component testing
- **Coverage Thresholds**: 80% coverage required across statements, branches, functions, lines
- **Mocking**: Mock localStorage, matchMedia for theme testing
- **Semantic Queries**: Use `getByRole`, `getByLabelText` over CSS selectors
- **Theme Context**: Wrap components in `ThemeProvider` for theme-aware testing

## Build Configuration
- **Library Mode**: Vite configured for component library output
- **External Preact**: Preact dependencies excluded from bundle
- **TypeScript Declarations**: Generated via `vite-plugin-dts`
- **SCSS Compilation**: Processed and included in final CSS bundle
- **Multiple Formats**: ES modules and UMD builds available

## Code Quality Standards
- **TypeScript Strict**: Full type checking enabled
- **ESLint + Prettier**: Code formatting and linting enforced
- **Semantic Commit Messages**: Conventional commits for version management
- **WCAG AA Compliance**: Color contrast ratios meet accessibility standards
- **BEM Naming**: Consistent CSS class naming convention

## Common Patterns to Follow
1. **Component Structure**: `ComponentName.tsx` + `ComponentName.scss` in same directory
2. **Props Interface**: `ComponentNameProps` defined at top of component file
3. **Signal Usage**: `const state = signal(initialValue)` for reactive state
4. **Styling**: `@use "@styles/_variables"` and CSS custom properties
5. **Theme Colors**: Never use hardcoded colors - always `var(--color-semantic-name)`
6. **Persistence**: `createPersistedSignal` for values that survive page reloads
7. **Error Handling**: Try/catch for localStorage operations with fallbacks
8. **Testing**: Mock external dependencies, test theme switching behavior

## Anti-Patterns to Avoid

1. **Hardcoded Colors**: Never use `#ffffff` - use `var(--color-surface)` instead
2. **useState Hooks**: Prefer signals for reactive state management
3. **Generic Divs**: Use semantic HTML5 elements (`<article>`, `<header>`, `<main>`)
4. **Direct localStorage**: Use `createPersistedSignal` for reactive persistence
5. **CSS Selectors in Tests**: Use semantic queries instead
6. **Theme Logic in Components**: Handle theming through CSS variables only
7. **Synchronous Theme Injection**: Must happen before any component rendering
8. **Missing TypeScript**: All components must have proper type definitions

## File Organization Rules
- **Components**: `src/components/ComponentName/ComponentName.tsx` + `ComponentName.scss`
- **Styles**: `src/styles/_partial.scss` for SCSS partials
- **Utils**: `src/utils/utilityName.ts` for shared utilities
- **Types**: `src/types/` for shared TypeScript interfaces
- **Tests**: Colocated with components or in `__tests__/` directories
- **Index Files**: Export components from `src/components/index.ts`

## Theme Implementation Checklist
- [ ] Synchronous theme injection before render (`injectThemeToHTML`)
- [ ] CSS custom properties for all colors (`var(--color-surface)`)
- [ ] System preference detection (`prefers-color-scheme`)
- [ ] localStorage persistence with error handling
- [ ] Theme switching: light → dark → system → light
- [ ] Media query listeners for system changes
- [ ] FOUC prevention through pre-render injection
- [ ] Semantic color naming (surface, text-primary, border, etc.)

## Component Development Checklist
- [ ] TypeScript interface for props (`ComponentNameProps`)
- [ ] Preact Signals for reactive state
- [ ] Semantic HTML5 structure
- [ ] BEM CSS class naming
- [ ] CSS custom properties for theming
- [ ] Modular SCSS import
- [ ] Export from `src/components/index.ts`
- [ ] Unit tests with theme context
- [ ] Accessibility considerations (ARIA labels, keyboard navigation)