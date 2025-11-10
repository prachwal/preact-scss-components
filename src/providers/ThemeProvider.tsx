import { createContext } from 'preact';
import { signal, computed, effect } from '@preact/signals';
import { ComponentChildren } from 'preact';
import '../styles/index.scss';
import { getStoredTheme, injectThemeToHTML, setupSystemThemeListener, type Theme } from './theme-init';

/**
 * Context providing theme-related functionality to child components.
 * Contains current theme state, theme switching functions, and loading status.
 */
export const ThemeContext = createContext<{
  theme: Theme;
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoaded: boolean;
} | null>(null);

// Synchroniczna inicjalizacja - ustaw theme przed jakimkolwiek renderowaniem
const initialTheme = getStoredTheme();
injectThemeToHTML(initialTheme);

// Signals dla zarządzania motywami
const themeSignal = signal<Theme>(initialTheme);

// Dodaj try-catch dla obsługi błędów matchMedia (dla pełnego branch coverage)
let them: 'light' | 'dark';
try {
  them = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
} catch (error) {
  console.warn('Failed to detect system theme:', error);
  them = 'light';
}

export { them };
export const systemThemeSignal = signal<'light' | 'dark'>(them);
const isLoadedSignal = signal<boolean>(true); // Ustawione na true od razu

// Computed signal - aktualny motyw
const currentThemeSignal = computed(() => {
  if (themeSignal.value === 'system') {
    return systemThemeSignal.value;
  }
  return themeSignal.value;
});

/**
 * Toggles the current theme in sequence: light → dark → system → light.
 * Persists the new theme to localStorage.
 */
const toggleTheme = () => {
  const currentTheme = themeSignal.value;
  let nextTheme: Theme;

  if (currentTheme === 'light') {
    nextTheme = 'dark';
  } else if (currentTheme === 'dark') {
    nextTheme = 'system';
  } else {
    nextTheme = 'light';
  }

  themeSignal.value = nextTheme;

  // Zapisz do localStorage
  try {
    localStorage.setItem('theme', nextTheme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
};

/**
 * Returns a human-readable label for the given theme.
 *
 * @param theme - The theme to get the label for
 * @returns Localized theme label in Polish
 */
export const getThemeLabel = (theme: Theme): string => {
  switch (theme) {
    case 'light': return 'Jasny';
    case 'dark': return 'Ciemny';
    case 'system': return 'Systemowy';
  }
};

/**
 * Returns an emoji icon representing the current theme state.
 *
 * @param currentTheme - The current active theme ('light' or 'dark')
 * @returns Emoji icon for the theme
 */
export const getThemeIcon = (currentTheme: 'light' | 'dark'): string => {
  return currentTheme === 'dark' ? '🌙' : '☀️';
};

/**
 * Initializes client-side effects for theme management.
 * Sets up reactive effects for HTML attribute updates and system theme listeners.
 * Safe to call multiple times - effects are idempotent.
 */
export function initializeClientSideEffects() {
  if (typeof window !== 'undefined') {
    // Effect do aktualizacji HTML data-theme przy zmianie motywu
    effect(() => {
      const theme = currentThemeSignal.value;
      document.documentElement.setAttribute('data-theme', theme);
    });

    // Nasłuchiwanie zmian systemowych preferencji
    const cleanupSystemThemeListener = setupSystemThemeListener(systemThemeSignal);

    // Store cleanup function for potential future use
    // Note: In a real app, you might want to call this on unmount
    // cleanupSystemThemeListener();
  }
}

// Inicjalizacja - tylko po stronie klienta
initializeClientSideEffects();

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: ComponentChildren;
}

/**
 * ThemeProvider component that provides theme context to child components.
 * Manages theme state, persistence, and system theme synchronization.
 * Must be placed high in the component tree to provide theme context to all components.
 *
 * @param props - Component props
 * @param props.children - Child components that will have access to theme context
 * @returns JSX element with theme context provider
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from './Providers/ThemeProvider';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const value = {
    theme: themeSignal.value,
    currentTheme: currentThemeSignal.value,
    toggleTheme,
    isLoaded: isLoadedSignal.value,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}