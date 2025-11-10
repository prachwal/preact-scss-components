import { createContext } from 'preact';
import { signal, computed, effect } from '@preact/signals';
import { ComponentChildren } from 'preact';
import '../styles/index.scss';
import { getStoredTheme, injectThemeToHTML, setupSystemThemeListener, type Theme } from './theme-init';

// Context dla motywów
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

// Funkcja do przełączania motywów
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

// Funkcja do pobierania etykiety motywu
export const getThemeLabel = (theme: Theme): string => {
  switch (theme) {
    case 'light': return 'Jasny';
    case 'dark': return 'Ciemny';
    case 'system': return 'Systemowy';
  }
};

// Funkcja do pobierania ikony motywu
export const getThemeIcon = (currentTheme: 'light' | 'dark'): string => {
  return currentTheme === 'dark' ? '🌙' : '☀️';
};

// Funkcja do inicjalizacji efektów po stronie klienta
export function initializeClientSideEffects() {
  if (typeof window !== 'undefined') {
    // Effect do aktualizacji HTML data-theme przy zmianie motywu
    effect(() => {
      const theme = currentThemeSignal.value;
      document.documentElement.setAttribute('data-theme', theme);
    });

    // Nasłuchiwanie zmian systemowych preferencji
    setupSystemThemeListener(systemThemeSignal);
  }
}

// Inicjalizacja - tylko po stronie klienta
initializeClientSideEffects();

interface ThemeProviderProps {
  children: ComponentChildren;
}

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