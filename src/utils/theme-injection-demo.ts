/**
 * Demonstracja synchronicznego wstrzykiwania theme do HTML
 *
 * Ten plik pokazuje jak ThemeProvider teraz działa:
 *
 * 1. SYNCHRONICZNA INICJALIZACJA (przed jakimkolwiek renderowaniem):
 *    - Odczytuje theme z localStorage synchronicznie
 *    - Ustawia data-theme na <html> element od razu
 *    - Inicjalizuje signals z poprawnymi wartościami
 *
 * 2. REAKTYWNE AKTUALIZACJE (po renderowaniu):
 *    - Effects aktualizują data-theme przy zmianach
 *    - Nasłuchuje zmian systemowych preferencji
 *
 * Rezultat: Brak FOUC (Flash of Unstyled Content) - theme jest
 * dostępny od pierwszej klatki renderowania!
 */

// Te funkcje są teraz używane wewnętrznie w ThemeProvider
// Można je wykorzystać w innych miejscach aplikacji jeśli potrzeba

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
  const currentTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  html.setAttribute('data-theme', currentTheme);
}