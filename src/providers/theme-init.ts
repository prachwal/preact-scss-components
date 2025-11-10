import { signal } from '@preact/signals';

/**
 * Available theme options for the application
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Retrieves the stored theme preference from localStorage.
 * Falls back to 'system' if no valid theme is stored or in SSR environment.
 *
 * @returns The stored theme preference or 'system' as fallback
 */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';

  try {
    const stored = localStorage.getItem('theme');
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  return 'system';
}

/**
 * Synchronously injects the theme into the HTML document by setting the data-theme attribute.
 * This prevents FOUC (Flash of Unstyled Content) by applying the theme before rendering.
 *
 * @param theme - The theme to apply ('light', 'dark', or 'system')
 */
export function injectThemeToHTML(theme: Theme) {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  let currentTheme: 'light' | 'dark';

  if (theme === 'system') {
    // Dla system theme sprawdź preferencje
    try {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      currentTheme = 'light'; // Fallback
    }
  } else {
    currentTheme = theme;
  }

  html.setAttribute('data-theme', currentTheme);
}

/**
 * Sets up a listener for system theme preference changes.
 * Automatically updates the provided signal when the user changes their system theme preference.
 *
 * @param systemThemeSignal - The signal to update when system theme changes
 */
export function setupSystemThemeListener(systemThemeSignal: ReturnType<typeof signal<'light' | 'dark'>>) {
  if (typeof window === 'undefined') return () => {}; // Return no-op cleanup for SSR

  try {
    // Nasłuchiwanie zmian systemowych preferencji
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      systemThemeSignal.value = e.matches ? 'dark' : 'light';
    };

    mediaQuery.addEventListener('change', handleChange);

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  } catch (error) {
    console.warn('Failed to set up system theme listener:', error);
    return () => {}; // Return no-op cleanup on error
  }
}