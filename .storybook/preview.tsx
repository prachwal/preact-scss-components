import type { Preview } from '@storybook/preact';
import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ThemeProvider, ThemeContext, getThemeIcon, getThemeLabel } from '../src/providers/ThemeProvider';
import '../src/styles/index.scss';

// Add CSS variables directly to ensure they're available in Storybook
const cssVariables = `
  html {
    --psc-color-primary: #007bff;
    --psc-color-primary-50: #e7f3ff;
    --psc-color-primary-100: #d0e7ff;
    --psc-color-primary-200: #a5d1ff;
    --psc-color-primary-300: #74b9ff;
    --psc-color-primary-400: #42a1ff;
    --psc-color-primary-500: #007bff;
    --psc-color-primary-600: #0066cc;
    --psc-color-primary-700: #0052a3;
    --psc-color-primary-800: #004080;
    --psc-color-primary-900: #002966;
    --psc-color-secondary: #6c757d;
    --psc-color-secondary-50: #f8f9fa;
    --psc-color-secondary-100: #e9ecef;
    --psc-color-secondary-200: #dee2e6;
    --psc-color-secondary-300: #ced4da;
    --psc-color-secondary-400: #adb5bd;
    --psc-color-secondary-500: #6c757d;
    --psc-color-secondary-600: #5a6268;
    --psc-color-secondary-700: #495057;
    --psc-color-secondary-800: #343a40;
    --psc-color-secondary-900: #212529;
    --psc-color-success: #28a745;
    --psc-color-success-50: #e8f5e8;
    --psc-color-success-100: #d4edda;
    --psc-color-success-200: #c3e6cb;
    --psc-color-success-300: #abe2b7;
    --psc-color-success-400: #8fd6a0;
    --psc-color-success-500: #28a745;
    --psc-color-success-600: #218838;
    --psc-color-success-700: #1e7e34;
    --psc-color-success-800: #1c7430;
    --psc-color-success-900: #155724;
    --psc-color-warning: #ffc107;
    --psc-color-warning-50: #fff9e6;
    --psc-color-warning-100: #fff3cd;
    --psc-color-warning-200: #ffeaa7;
    --psc-color-warning-300: #ffdf7e;
    --psc-color-warning-400: #ffd43b;
    --psc-color-warning-500: #ffc107;
    --psc-color-warning-600: #e0a800;
    --psc-color-warning-700: #d39e00;
    --psc-color-warning-800: #b8860b;
    --psc-color-warning-900: #997404;
    --psc-color-error: #dc3545;
    --psc-color-error-50: #fee;
    --psc-color-error-100: #f8d7da;
    --psc-color-error-200: #f5c6cb;
    --psc-color-error-300: #f1aeb5;
    --psc-color-error-400: #ea868f;
    --psc-color-error-500: #dc3545;
    --psc-color-error-600: #c82333;
    --psc-color-error-700: #bd2130;
    --psc-color-error-800: #a02622;
    --psc-color-error-900: #721c24;
    --psc-color-info: #17a2b8;
    --psc-color-info-50: #e0f7fa;
    --psc-color-info-100: #b2ebf2;
    --psc-color-info-200: #80deea;
    --psc-color-info-300: #4dd0e1;
    --psc-color-info-400: #26c6da;
    --psc-color-info-500: #17a2b8;
    --psc-color-info-600: #138496;
    --psc-color-info-700: #117a8b;
    --psc-color-info-800: #0e6269;
    --psc-color-info-900: #0b4f56;
    --psc-color-white: #ffffff;
    --psc-color-gray-50: #f8f9fa;
    --psc-color-gray-100: #e9ecef;
    --psc-color-gray-200: #dee2e6;
    --psc-color-gray-300: #ced4da;
    --psc-color-gray-400: #adb5bd;
    --psc-color-gray-500: #6c757d;
    --psc-color-gray-600: #5a6268;
    --psc-color-gray-700: #495057;
    --psc-color-gray-800: #343a40;
    --psc-color-gray-900: #212529;
    --psc-color-black: #000000;
    --psc-color-surface: #ffffff;
    --psc-color-surface-secondary: #f8f9fa;
    --psc-color-surface-tertiary: #e9ecef;
    --psc-color-border: #dee2e6;
    --psc-color-border-hover: #ced4da;
    --psc-color-text-primary: #212529;
    --psc-color-text-secondary: #6c757d;
    --psc-color-text-tertiary: #868e96;
    --psc-color-button-primary-bg: #007bff;
    --psc-color-button-primary-text: #ffffff;
    --psc-color-button-primary-hover: #0066cc;
    --psc-color-button-secondary-bg: #6c757d;
    --psc-color-button-secondary-text: #ffffff;
    --psc-color-button-secondary-hover: #5a6268;
    --psc-color-button-outline-bg: #ffffff;
    --psc-color-button-outline-text: #6c757d;
    --psc-color-button-outline-border: #dee2e6;
    --psc-color-button-outline-hover: #f8f9fa;
    --psc-spacing-xs: .25rem;
    --psc-spacing-sm: .5rem;
    --psc-spacing-md: 1rem;
    --psc-spacing-lg: 1.5rem;
    --psc-spacing-xl: 2rem;
    --psc-spacing-2xl: 3rem;
    --psc-spacing-3xl: 4rem;
    --psc-spacing-4xl: 6rem;
    --psc-spacing-5xl: 8rem;
    --psc-spacing-6xl: 12rem;
    --psc-border-radius-none: 0;
    --psc-border-radius-sm: .125rem;
    --psc-border-radius-md: .25rem;
    --psc-border-radius-lg: .375rem;
    --psc-border-radius-xl: .5rem;
    --psc-border-radius-2xl: .75rem;
    --psc-border-radius-3xl: 1rem;
    --psc-border-radius-full: 9999px;
  }
  html[data-theme="dark"] {
    --psc-color-primary: #4dabf7;
    --psc-color-primary-50: #0a1929;
    --psc-color-primary-100: #0f2942;
    --psc-color-primary-200: #1e4976;
    --psc-color-primary-300: #2d69aa;
    --psc-color-primary-400: #3c89de;
    --psc-color-primary-500: #4dabf7;
    --psc-color-primary-600: #6bb8f8;
    --psc-color-primary-700: #89c5f9;
    --psc-color-primary-800: #a7d2fa;
    --psc-color-primary-900: #c5dffc;
    --psc-color-secondary: #adb5bd;
    --psc-color-secondary-50: #1a1d1e;
    --psc-color-secondary-100: #2d3236;
    --psc-color-secondary-200: #495057;
    --psc-color-secondary-300: #6c757d;
    --psc-color-secondary-400: #868e96;
    --psc-color-secondary-500: #adb5bd;
    --psc-color-secondary-600: #b8c1c6;
    --psc-color-secondary-700: #c3cdd2;
    --psc-color-secondary-800: #ced9de;
    --psc-color-secondary-900: #d9e4ea;
    --psc-color-success: #51cf66;
    --psc-color-success-50: #0b1a0f;
    --psc-color-success-100: #16301e;
    --psc-color-success-200: #2c5f3d;
    --psc-color-success-300: #428f5c;
    --psc-color-success-400: #58bf7b;
    --psc-color-success-500: #51cf66;
    --psc-color-success-600: #74d680;
    --psc-color-success-700: #97dd9a;
    --psc-color-success-800: #bae4b4;
    --psc-color-success-900: #ddecce;
    --psc-color-warning: #ffd43b;
    --psc-color-warning-50: #1a1a0a;
    --psc-color-warning-100: #332f0a;
    --psc-color-warning-200: #665e14;
    --psc-color-warning-300: #998d1f;
    --psc-color-warning-400: #ccbc29;
    --psc-color-warning-500: #ffd43b;
    --psc-color-warning-600: #ffdd5e;
    --psc-color-warning-700: #ffe681;
    --psc-color-warning-800: #ffefa4;
    --psc-color-warning-900: #fff8c7;
    --psc-color-error: #ff6b6b;
    --psc-color-error-50: #1a0d0d;
    --psc-color-error-100: #331a1a;
    --psc-color-error-200: #662f2f;
    --psc-color-error-300: #994545;
    --psc-color-error-400: #cc5a5a;
    --psc-color-error-500: #ff6b6b;
    --psc-color-error-600: #ff8585;
    --psc-color-error-700: #ff9f9f;
    --psc-color-error-800: #ffb9b9;
    --psc-color-error-900: #ffd3d3;
    --psc-color-info: #74c0fc;
    --psc-color-info-50: #0d1418;
    --psc-color-info-100: #1a2830;
    --psc-color-info-200: #355060;
    --psc-color-info-300: #4f7890;
    --psc-color-info-400: #6aa0c0;
    --psc-color-info-500: #74c0fc;
    --psc-color-info-600: #8ccafd;
    --psc-color-info-700: #a4d4fd;
    --psc-color-info-800: #bcdefe;
    --psc-color-info-900: #d4e8fe;
    --psc-color-white: #ffffff;
    --psc-color-gray-50: #1a1a1a;
    --psc-color-gray-100: #2d3236;
    --psc-color-gray-200: #495057;
    --psc-color-gray-300: #6c757d;
    --psc-color-gray-400: #868e96;
    --psc-color-gray-500: #adb5bd;
    --psc-color-gray-600: #c3cdd2;
    --psc-color-gray-700: #d9e4ea;
    --psc-color-gray-800: #e9f0f5;
    --psc-color-gray-900: #f8fbfc;
    --psc-color-black: #000000;
    --psc-color-surface: #1a1a1a;
    --psc-color-surface-secondary: #2d3236;
    --psc-color-surface-tertiary: #495057;
    --psc-color-border: #495057;
    --psc-color-border-hover: #6c757d;
    --psc-color-text-primary: #f8fbfc;
    --psc-color-text-secondary: #adb5bd;
    --psc-color-text-tertiary: #868e96;
    --psc-color-button-primary-bg: #4dabf7;
    --psc-color-button-primary-text: #1a1a1a;
    --psc-color-button-primary-hover: #6bb8f8;
    --psc-color-button-secondary-bg: #6c757d;
    --psc-color-button-secondary-text: #f8fbfc;
    --psc-color-button-secondary-hover: #868e96;
    --psc-color-button-outline-bg: #2d3236;
    --psc-color-button-outline-text: #adb5bd;
    --psc-color-button-outline-border: #495057;
    --psc-color-button-outline-hover: #495057;
  }
`;

// Custom theme provider for Storybook that can override the initial theme
function StorybookThemeProvider({ children, initialTheme }: { children: any, initialTheme?: string }) {
  // For Storybook, we'll let the decorator handle the theme override
  return h(ThemeProvider, { children });
}

// Theme toggle button component for Storybook
function ThemeToggleButton() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, currentTheme, toggleTheme } = themeContext;

  return h('button', {
    type: 'button',
    className: 'storybook-theme-toggle',
    onClick: toggleTheme,
    'aria-label': `Przełącz na ${theme === 'light' ? 'ciemny' : theme === 'dark' ? 'systemowy' : 'jasny'} motyw`,
    style: {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1000,
      padding: '0.5rem',
      border: '1px solid var(--psc-color-border)',
      borderRadius: '0.25rem',
      backgroundColor: 'var(--psc-color-surface)',
      color: 'var(--psc-color-text-primary)',
      cursor: 'pointer',
      fontSize: '1.2rem',
    }
  }, theme === 'light' ? '🌙' : theme === 'dark' ? '⚙️' : '☀️');
}

// Custom CSS for docs story container theme support
function DocsStoryThemeStyles() {
  return h('style', {}, cssVariables + `
    /* Docs story container theme support */
    .docs-story {
      background-color: var(--psc-color-surface) !important;
      color: var(--psc-color-text-primary) !important;
      border: 1px solid var(--psc-color-border) !important;
      border-radius: var(--psc-spacing-sm) !important;
      padding: var(--psc-spacing-md) !important;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
    }

    /* Ensure nested elements inherit theme colors */
    .docs-story * {
      color: inherit !important;
    }

    .docs-story h1,
    .docs-story h2,
    .docs-story h3,
    .docs-story h4,
    .docs-story h5,
    .docs-story h6 {
      color: var(--psc-color-text-primary) !important;
      border-bottom: 1px solid var(--psc-color-border) !important;
      padding-bottom: var(--psc-spacing-sm) !important;
      margin-bottom: var(--psc-spacing-md) !important;
    }

    .docs-story p {
      color: var(--psc-color-text-secondary) !important;
      line-height: 1.6 !important;
    }

    .docs-story code {
      background-color: var(--psc-color-surface-secondary) !important;
      color: var(--psc-color-text-primary) !important;
      padding: 0.125rem var(--psc-spacing-xs) !important;
      border-radius: 0.125rem !important;
      border: 1px solid var(--psc-color-border) !important;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
    }

    .docs-story pre {
      background-color: var(--psc-color-surface-secondary) !important;
      border: 1px solid var(--psc-color-border) !important;
      border-radius: var(--psc-spacing-xs) !important;
      padding: var(--psc-spacing-md) !important;
      overflow-x: auto !important;
    }

    .docs-story pre code {
      background-color: transparent !important;
      border: none !important;
      padding: 0 !important;
    }

    /* Storybook specific overrides for docs */
    .docs-story .sbdocs-wrapper {
      background-color: var(--psc-color-surface) !important;
      color: var(--psc-color-text-primary) !important;
    }

    .docs-story .sbdocs-content {
      background-color: var(--psc-color-surface) !important;
    }

    /* Table styling for docs */
    .docs-story table {
      border-collapse: collapse !important;
      width: 100% !important;
      margin: var(--psc-spacing-md) 0 !important;
    }

    .docs-story th,
    .docs-story td {
      border: 1px solid var(--psc-color-border) !important;
      padding: var(--psc-spacing-sm) var(--psc-spacing-md) !important;
      text-align: left !important;
    }

    .docs-story th {
      background-color: var(--psc-color-surface-secondary) !important;
      font-weight: 600 !important;
    }

    .docs-story tr:nth-child(even) {
      background-color: var(--psc-color-surface-secondary) !important;
    }

    /* Link styling */
    .docs-story a {
      color: var(--psc-color-primary) !important;
      text-decoration: none !important;
    }

    .docs-story a:hover {
      text-decoration: underline !important;
    }

    /* List styling */
    .docs-story ul,
    .docs-story ol {
      padding-left: var(--psc-spacing-lg) !important;
      margin: var(--psc-spacing-md) 0 !important;
    }

    .docs-story li {
      margin-bottom: var(--psc-spacing-xs) !important;
    }

    /* Blockquote styling */
    .docs-story blockquote {
      border-left: 4px solid var(--psc-color-border) !important;
      padding-left: var(--psc-spacing-md) !important;
      margin: var(--psc-spacing-md) 0 !important;
      color: var(--psc-color-text-secondary) !important;
      font-style: italic !important;
    }

    /* Storybook docblock code toggle button */
    .docs-story .docblock-code-toggle {
      background-color: var(--psc-color-surface-secondary) !important;
      color: var(--psc-color-text-primary) !important;
      border: 1px solid var(--psc-color-border) !important;
      border-radius: var(--psc-spacing-xs) !important;
      padding: var(--psc-spacing-xs) var(--psc-spacing-sm) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: var(--psc-spacing-xs) !important;
    }

    .docs-story .docblock-code-toggle:hover {
      background-color: var(--psc-color-surface-tertiary) !important;
      border-color: var(--psc-color-border-hover) !important;
    }

    .docs-story .docblock-code-toggle:active {
      background-color: var(--psc-color-surface) !important;
      transform: translateY(1px) !important;
    }

    .docs-story .docblock-code-toggle:focus {
      outline: 2px solid var(--psc-color-primary) !important;
      outline-offset: 2px !important;
    }

    /* Storybook docblock source code container */
    .docs-story .docblock-source {
      background-color: var(--psc-color-surface-secondary) !important;
      border: 1px solid var(--psc-color-border) !important;
      border-radius: var(--psc-spacing-xs) !important;
      margin: var(--psc-spacing-md) 0 !important;
    }

    .docs-story .docblock-source pre {
      background-color: transparent !important;
      border: none !important;
      margin: 0 !important;
      padding: var(--psc-spacing-md) !important;
    }
  `);
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // Set the theme on the document element
      if (typeof document !== 'undefined') {
        let currentTheme: 'light' | 'dark';

        if (theme === 'system') {
          try {
            currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          } catch (error) {
            currentTheme = 'light';
          }
        } else {
          currentTheme = theme as 'light' | 'dark';
        }

        document.documentElement.setAttribute('data-theme', currentTheme);
      }

      return h(StorybookThemeProvider, {
        initialTheme: theme,
        children: h('div', { id: 'app', style: { position: 'relative' } }, [
          h(DocsStoryThemeStyles, {}),
          h(Story, {}),
          h(ThemeToggleButton, {})
        ])
      });
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Jasny motyw' },
          { value: 'dark', icon: 'moon', title: 'Ciemny motyw' },
          { value: 'system', icon: 'cog', title: 'Systemowy motyw' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;