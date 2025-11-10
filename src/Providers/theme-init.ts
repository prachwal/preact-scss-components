import { signal } from '@preact/signals';

// Typy dla motywów
export type Theme = 'light' | 'dark' | 'system';

// Funkcja do synchronicznego odczytu theme z localStorage
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

// Funkcja do synchronicznego ustawienia theme na HTML element
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

// Funkcja do inicjalizacji nasłuchiwania zmian systemowych preferencji
export function setupSystemThemeListener(systemThemeSignal: ReturnType<typeof signal<'light' | 'dark'>>) {
  if (typeof window === 'undefined') return;

  try {
    // Nasłuchiwanie zmian systemowych preferencji
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      systemThemeSignal.value = e.matches ? 'dark' : 'light';
    });
  } catch (error) {
    console.warn('Failed to set up system theme listener:', error);
  }
}