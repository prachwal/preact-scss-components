# Preact SCSS Components

[![npm version](https://badge.fury.io/js/preact-scss-components.svg)](https://badge.fury.io/js/preact-scss-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Preact-673AB8?logo=preact&logoColor=white)](https://preactjs.com/)

A modern, theme-aware component library for Preact with SCSS styling support. Built with TypeScript, featuring a sophisticated theme system with light/dark/system modes, WCAG AA compliant colors, and comprehensive testing.

## ✨ Features

- 🎨 **Advanced Theme System**: Light, dark, and system theme support with CSS Custom Properties
- ⚡ **Preact Signals**: Reactive state management for optimal performance
- 🎯 **WCAG AA Compliant**: Full accessibility compliance with proper color contrast ratios
- 🧪 **Comprehensive Testing**: 100% test coverage with Vitest and Testing Library
- 📱 **Responsive Design**: Mobile-first approach with flexible spacing system
- 🔧 **TypeScript**: Full type safety with comprehensive type definitions
- 🎭 **Semantic Colors**: Consistent color API that works across all themes
- 🚀 **Tree Shaking**: Optimized bundle size with ES modules
- 🛠️ **Developer Experience**: Hot reload, comprehensive documentation, and helpful error messages

## 📦 Installation

```bash
npm install preact-scss-components
```

**Peer Dependencies:**

```bash
npm install preact @preact/signals
```

## 🚀 Quick Start

```tsx
import { ThemeProvider, ExampleComponent } from 'preact-scss-components';
import 'preact-scss-components/dist/index.css';

function App() {
  return (
    <ThemeProvider>
      <ExampleComponent message="Hello World!" />
    </ThemeProvider>
  );
}
```

## 🎨 Theme System

The library includes a sophisticated theme system that automatically adapts to user preferences:

### Theme Modes

- **Light**: Clean, bright interface
- **Dark**: Easy on the eyes for low-light environments
- **System**: Automatically follows OS preference

### Usage

```tsx
import { ThemeProvider, ThemeContext } from 'preact-scss-components';
import { useContext } from 'preact/hooks';

function ThemeToggle() {
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current: {theme} | Active: {currentTheme}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* Your components */}
    </ThemeProvider>
  );
}
```

### Styling Components

Components automatically adapt to the current theme using CSS Custom Properties:

```scss
.my-component {
  background-color: var(--psc-color-surface);
  color: var(--psc-color-text-primary);
  border: 1px solid var(--psc-color-border);

  &:hover {
    background-color: var(--psc-color-surface-secondary);
  }
}
```

## 🧩 Components

### ExampleComponent

A demonstration component showcasing the theme system and Preact Signals.

```tsx
import { ExampleComponent } from 'preact-scss-components';

<ExampleComponent message="Custom message" />
```

**Props:**

- `message?: string` - Optional custom message to display

## 🎯 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/preact-scss-components.git
cd preact-scss-components

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server
npm run preview      # Preview built library

# Testing
npm test             # Run tests once
npm run test:run     # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:ui      # Run tests with UI

# Build
npm run build        # Build for production
```

### Project Structure

```text
src/
├── components/          # Reusable components
│   ├── ExampleComponent/ # Example component with SCSS
│   └── index.ts         # Component exports
├── Providers/           # Context providers
│   ├── ThemeProvider.tsx # Theme management
│   └── theme-init.ts    # Theme utilities
├── styles/              # SCSS architecture
│   ├── _colors.scss     # Color palettes
│   ├── _functions.scss  # SCSS utilities
│   ├── _theme.scss      # CSS custom properties
│   └── index.scss       # Main stylesheet
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## 🧪 Testing

The library maintains 100% test coverage with comprehensive testing strategies:

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:run

# Run with UI
npm run test:ui
```

### Test Structure

- **Unit Tests**: Individual functions and components
- **Integration Tests**: Component interactions and theme integration
- **Accessibility Tests**: ARIA attributes and semantic HTML
- **Error Handling**: localStorage and browser API failures

### Test Environment

- **Vitest**: Fast, modern test runner
- **jsdom**: DOM simulation for browser APIs
- **Testing Library**: User-centric testing utilities
- **100% Coverage**: Statements, branches, functions, and lines

## 🎨 Styling Architecture

### CSS Custom Properties

The theme system uses CSS Custom Properties for dynamic theming:

```css
:root {
  --psc-color-surface: #ffffff;
  --psc-color-text-primary: #212529;
  --psc-color-border: #dee2e6;
  /* ... more variables */
}

html[data-theme="dark"] {
  --psc-color-surface: #1a1a1a;
  --psc-color-text-primary: #f8fbfc;
  /* ... dark theme overrides */
}
```

### SCSS Functions

Available utility functions for SCSS:

```scss
@use "preact-scss-components/dist/functions" as *;

// Get theme color
.element {
  background: theme-color('primary');
  color: theme-color('surface');
}

// Get spacing
.element {
  padding: spacing('md');
  margin: spacing('lg');
}
```

### BEM Methodology

Components follow BEM naming convention:

```scss
.component-name {
  &__element {
    &--modifier {
      /* styles */
    }
  }
}
```

## 🔧 Build & Deployment

### Build Process

```bash
npm run build
```

Generates:

- `dist/index.es.js` - ES modules
- `dist/index.umd.js` - UMD bundle
- `dist/index.css` - Compiled styles
- `dist/index.d.ts` - TypeScript definitions

### Library Configuration

- **Vite**: Modern build tool with library mode
- **External Dependencies**: Preact excluded from bundle
- **TypeScript**: Declaration files generated automatically
- **SCSS**: Compiled and included in final CSS bundle

## 📚 Documentation

### Theme System

Detailed documentation about the theme system is available in [THEME_LOGIC.md](./THEME_LOGIC.md).

### Testing

Comprehensive testing guide is available in [TESTING.md](./TESTING.md).

### API Reference

- [ThemeProvider](./THEME_LOGIC.md#4-themeprovider-tsx---logika-javascript)
- [ExampleComponent](./src/components/ExampleComponent/ExampleComponent.tsx)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Write tests** for new functionality
4. **Ensure** 100% test coverage
5. **Follow** the existing code style
6. **Submit** a pull request

### Development Guidelines

- **TypeScript**: Strict type checking enabled
- **ESLint + Prettier**: Code formatting enforced
- **Conventional Commits**: Semantic commit messages
- **WCAG AA**: Accessibility compliance required
- **BEM**: Consistent CSS naming convention

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Preact](https://preactjs.com/) - Fast, lightweight React alternative
- [Vitest](https://vitest.dev/) - Modern testing framework
- [Sass](https://sass-lang.com/) - Powerful CSS preprocessor
- [Vite](https://vitejs.dev/) - Fast build tool

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/preact-scss-components/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/preact-scss-components/discussions)

---

Made with ❤️ by Przemyslaw Rachwal
