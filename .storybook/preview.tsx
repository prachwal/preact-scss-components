import type { Preview } from '@storybook/preact';
import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ThemeProvider, ThemeContext, getThemeIcon, getThemeLabel } from '../src/providers/ThemeProvider';
import '../src/styles/index.scss';

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
      border: '1px solid var(--color-border)',
      borderRadius: '0.25rem',
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-primary)',
      cursor: 'pointer',
      fontSize: '1.2rem',
    }
  }, theme === 'light' ? '🌙' : theme === 'dark' ? '⚙️' : '☀️');
}

// Custom CSS for docs story container theme support
function DocsStoryThemeStyles() {
  return h('style', {}, `
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