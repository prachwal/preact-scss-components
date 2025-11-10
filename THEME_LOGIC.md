# Logika Motywów Jasny/Ciemny w Preact SCSS Components

## Przegląd Architektury

Biblioteka używa **CSS Custom Properties** (zmiennych CSS) do dynamicznego przełączania między motywami jasnym i ciemnym. System jest oparty na:

- **Preact Signals** - reaktywne zarządzanie stanem motywów
- **CSS Custom Properties** - dynamiczne kolory bez rekompilacji
- **Semantyczne nazwy kolorów** - spójne API niezależne od motywu
- **Synchroniczna inicjalizacja** - ustawienie motywu przed renderowaniem, aby uniknąć FOUC (Flash of Unstyled Content)

## Pliki Kluczowe

### 1. `_colors.scss` - Definicje Kolorów

```scss
@use "sass:map";

// Color variables - WCAG AA compliant palettes
$colors: (
  light: (
    // Primary colors (full palette)
    primary: #007bff,
    primary-50: #e7f3ff,
    primary-100: #d0e7ff,
    primary-200: #a5d1ff,
    primary-300: #74b9ff,
    primary-400: #42a1ff,
    primary-500: #007bff,
    primary-600: #0066cc,
    primary-700: #0052a3,
    primary-800: #004080,
    primary-900: #002966,

    // Secondary (full palette)
    secondary: #6c757d,
    secondary-50: #f8f9fa,
    secondary-100: #e9ecef,
    secondary-200: #dee2e6,
    secondary-300: #ced4da,
    secondary-400: #adb5bd,
    secondary-500: #6c757d,
    secondary-600: #5a6268,
    secondary-700: #495057,
    secondary-800: #343a40,
    secondary-900: #212529,

    // Success, Warning, Error, Info (full palettes)
    success: #28a745,
    // ... success-50 do success-900

    warning: #ffc107,
    // ... warning-50 do warning-900

    error: #dc3545,
    // ... error-50 do error-900

    info: #17a2b8,
    // ... info-50 do info-900

    // Neutral colors
    white: #ffffff,
    gray-50: #f8f9fa,
    gray-100: #e9ecef,
    gray-200: #dee2e6,
    gray-300: #ced4da,
    gray-400: #adb5bd,
    gray-500: #6c757d,
    gray-600: #5a6268,
    gray-700: #495057,
    gray-800: #343a40,
    gray-900: #212529,
    black: #000000,

    // Semantic colors for components (recommended)
    surface: #ffffff,
    surface-secondary: #f8f9fa,
    surface-tertiary: #e9ecef,
    border: #dee2e6,
    border-hover: #ced4da,
    text-primary: #212529,
    text-secondary: #6c757d,
    text-tertiary: #868e96,
    button-primary-bg: #007bff,
    button-primary-text: #ffffff,
    button-primary-hover: #0066cc,
    button-secondary-bg: #6c757d,
    button-secondary-text: #ffffff,
    button-secondary-hover: #5a6268,
    button-outline-bg: #ffffff,
    button-outline-text: #6c757d,
    button-outline-border: #dee2e6,
    button-outline-hover: #f8f9fa
  ),
  dark: (
    // Primary colors (lighter for dark theme)
    primary: #4dabf7,
    primary-50: #0a1929,
    primary-100: #0f2942,
    primary-200: #1e4976,
    primary-300: #2d69aa,
    primary-400: #3c89de,
    primary-500: #4dabf7,
    primary-600: #6bb8f8,
    primary-700: #89c5f9,
    primary-800: #a7d2fa,
    primary-900: #c5dffc,

    // Secondary (lighter for dark theme)
    secondary: #adb5bd,
    secondary-50: #1a1d1e,
    secondary-100: #2d3236,
    secondary-200: #495057,
    secondary-300: #6c757d,
    secondary-400: #868e96,
    secondary-500: #adb5bd,
    secondary-600: #b8c1c6,
    secondary-700: #c3cdd2,
    secondary-800: #ced9de,
    secondary-900: #d9e4ea,

    // Success, Warning, Error, Info (adjusted for dark theme)
    success: #51cf66,
    // ... success-50 do success-900 (adjusted for dark)

    warning: #ffd43b,
    // ... warning-50 do warning-900 (adjusted for dark)

    error: #ff6b6b,
    // ... error-50 do error-900 (adjusted for dark)

    info: #74c0fc,
    // ... info-50 do info-900 (adjusted for dark)

    // Neutral colors (dark theme variants)
    white: #ffffff,
    gray-50: #1a1a1a,    // Very dark for dark theme backgrounds
    gray-100: #2d3236,   // Dark gray for subtle backgrounds
    gray-200: #495057,   // Medium dark gray
    gray-300: #6c757d,   // Medium gray
    gray-400: #868e96,   // Light medium gray
    gray-500: #adb5bd,   // Light gray
    gray-600: #c3cdd2,   // Very light gray
    gray-700: #d9e4ea,   // Almost white
    gray-800: #e9f0f5,   // Very light
    gray-900: #f8fbfc,   // Nearly white
    black: #000000,

    // Semantic colors for components (dark theme)
    surface: #1a1a1a,
    surface-secondary: #2d3236,
    surface-tertiary: #495057,
    border: #495057,
    border-hover: #6c757d,
    text-primary: #f8fbfc,
    text-secondary: #adb5bd,
    text-tertiary: #868e96,
    button-primary-bg: #4dabf7,
    button-primary-text: #1a1a1a,
    button-primary-hover: #6bb8f8,
    button-secondary-bg: #6c757d,
    button-secondary-text: #f8fbfc,
    button-secondary-hover: #868e96,
    button-outline-bg: #2d3236,
    button-outline-text: #adb5bd,
    button-outline-border: #495057,
    button-outline-hover: #495057
  )
);

```scss
    text-secondary: #6c757d,    // Tekst drugorzędny
    text-tertiary: #868e96,     // Tekst trzeciorzędny
    border: #dee2e6,            // Ramki
    border-hover: #ced4da,      // Ramki hover

    // Kolory komponentów
    button-primary-bg: #007bff,
    button-primary-text: #ffffff,
    button-primary-hover: #0066cc,
    // ... pozostałe kolory przycisków
  ),
  dark: (
    // Analogiczne palety dla ciemnego motywu
    primary: #4dabf7,
    primary-50: #0a1929,
    // ... dostosowane do ciemnego tła

    // Kolory semantyczne dla ciemnego motywu
    surface: #1a1a1a,           // Ciemne tło główne
    surface-secondary: #2d3236, // Ciemne tło drugorzędne
    surface-tertiary: #495057,  // Ciemne tło trzeciorzędne
    text-primary: #f8fbfc,      // Jasny tekst główny
    text-secondary: #adb5bd,    // Jasny tekst drugorzędny
    text-tertiary: #868e96,     // Jasny tekst trzeciorzędny
    border: #495057,            // Ciemne ramki
    border-hover: #6c757d,      // Ciemne ramki hover

    // Kolory komponentów dla ciemnego motywu
    button-primary-bg: #4dabf7,
    button-primary-text: #1a1a1a,
    button-primary-hover: #6bb8f8,
    // ... pozostałe kolory przycisków
  )
);

```

### 2. `_functions.scss` - Funkcje SCSS

```scss
@use "sass:map";
@use "colors" as *;
@use "spacing" as *;

// SCSS functions for theme colors (recommended approach)
/// Retrieves a color value from the theme colors map for the specified theme.
/// @param {String} $key - The color key (e.g., 'primary', 'surface').
/// @param {String} $theme - The theme name (default: 'light').
/// @return {Color} The color value.
@function theme-color($key, $theme: light) {
  @return map.get(map.get($colors, $theme), $key);
}

/// Retrieves a spacing value from the spacing map.
/// @param {String} $key - The spacing key (e.g., 'sm', 'md').
/// @return {Length} The spacing value.
@function spacing($key) {
  @return map.get($spacing, $key);
}

/// Retrieves a breakpoint value from the breakpoints map.
/// @param {String} $key - The breakpoint key (e.g., 'mobile', 'desktop').
/// @return {Length} The breakpoint value.
@function breakpoint($key) {
  @return map.get($breakpoints, $key);
}

/// Retrieves a border radius value from the border radius scale map.
/// @param {String} $key - The border radius key (default: 'md').
/// @return {Length} The border radius value.
@function border-radius($key: md) {
  @return map.get($border-radius-scale, $key);
}

// Utility functions
/// Returns a contrasting color (black or white) based on the lightness of the input color.
/// @param {Color} $color - The input color.
/// @param {Color} $dark - The dark color to return (default: black).
/// @param {Color} $light - The light color to return (default: white).
/// @return {Color} The contrasting color.
@function color-contrast($color, $dark: #000000, $light: #ffffff) {
  @if (lightness($color) > 50) {
    @return $dark;
  } @else {
    @return $light;
  }
}

/// Generates CSS custom properties for colors of a given theme.
/// @param {String} $theme - The theme name (default: 'light').
@mixin generate-color-properties($theme: light) {
  $theme-colors: map.get($colors, $theme);

  @each $key, $value in $theme-colors {
    --psc-color-#{$key}: #{$value};
  }
}

/// Generates CSS custom properties for spacing values.
@mixin generate-spacing-properties() {
  @each $key, $value in $spacing-scale {
    --spacing-#{$key}: #{$value};
  }
}

/// Generates CSS custom properties for border radius values.
@mixin generate-border-radius-properties() {
  @each $key, $value in $border-radius-scale {
    --border-radius-#{$key}: #{$value};
  }
}
```

### 3. `_theme.scss` - CSS Rules dla Motywów

```scss
@use "functions";

// Generate CSS custom properties for themes

// Light theme (default)
:root {
  @include functions.generate-color-properties(light);
  @include functions.generate-spacing-properties();
  @include functions.generate-border-radius-properties();
}

// Dark theme - applied to html element
html[data-theme="dark"] {
  @include functions.generate-color-properties(dark);
}
```

**Uwaga:** Systemowy motyw (`prefers-color-scheme`) jest obsługiwany wyłącznie przez JavaScript w `ThemeProvider`, nie przez CSS.

### 4. `ThemeProvider.tsx` - Logika JavaScript

```tsx
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

// Funkcja do przełączania motywów: light -> dark -> system -> light
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

  // Zapisz do localStorage z obsługą błędów
  try {
    localStorage.setItem('theme', nextTheme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
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

### 5. `theme-init.ts` - Funkcje Inicjalizacji Motywów

```typescript
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
```

```text

## Symulacja Kolorów dla `data-theme` w `<html>`

### Scenariusz 1: Motyw Jasny (domyślny)

```html
<html> <!-- lub <html data-theme="light"> -->
```

**Wygenerowane CSS Variables:**

```css
:root {
  --psc-color-surface: #ffffff;           /* Biały */
  --psc-color-surface-secondary: #f8f9fa; /* Jasnoszary */
  --psc-color-surface-tertiary: #e9ecef;  /* Trzeciorzędne tło */
  --psc-color-text-primary: #212529;      /* Ciemny tekst */
  --psc-color-text-secondary: #6c757d;    /* Średni szary tekst */
  --psc-color-text-tertiary: #868e96;     /* Trzeciorzędny tekst */
  --psc-color-border: #dee2e6;            /* Jasna ramka */
  --psc-color-border-hover: #ced4da;      /* Ramka hover */
  --psc-color-primary: #007bff;           /* Niebieski */
  --psc-color-button-primary-bg: #007bff; /* Tło przycisku primary */
  --psc-color-button-primary-text: #ffffff; /* Tekst przycisku primary */
  --psc-color-button-outline-bg: #ffffff; /* Biały przycisk outline */
  --psc-color-button-outline-text: #6c757d; /* Szary tekst przycisku outline */
  --psc-color-button-outline-border: #dee2e6; /* Ramka przycisku outline */
  /* ... pozostałe zmienne (pełne palety kolorów) */
}
```

**Wizualny efekt:**

- Tło strony: białe (#ffffff)
- Tekst: ciemny (#212529)
- Przyciski primary: niebieskie tło z białym tekstem
- Przyciski outline: białe tło z szarym tekstem i ramką
- Ramki: jasnoszare (#dee2e6)

### Scenariusz 2: Motyw Ciemny

```html
<html data-theme="dark">
```

**Wygenerowane CSS Variables:**

```css
html[data-theme="dark"] {
  --psc-color-surface: #1a1a1a;           /* Ciemnoszare tło */
  --psc-color-surface-secondary: #2d3236; /* Średnio ciemne */
  --psc-color-surface-tertiary: #495057;  /* Trzeciorzędne ciemne */
  --psc-color-text-primary: #f8fbfc;      /* Jasny tekst */
  --psc-color-text-secondary: #adb5bd;    /* Jasnoszary tekst */
  --psc-color-text-tertiary: #868e96;     /* Trzeciorzędny jasny tekst */
  --psc-color-border: #495057;            /* Ciemna ramka */
  --psc-color-border-hover: #6c757d;      /* Ciemna ramka hover */
  --psc-color-primary: #4dabf7;           /* Jaśniejszy niebieski */
  --psc-color-button-primary-bg: #4dabf7; /* Tło przycisku primary */
  --psc-color-button-primary-text: #1a1a1a; /* Ciemny tekst na przycisku */
  --psc-color-button-outline-bg: #2d3236; /* Ciemne tło przycisku outline */
  --psc-color-button-outline-text: #adb5bd; /* Jasny tekst przycisku outline */
  --psc-color-button-outline-border: #495057; /* Ciemna ramka przycisku outline */
  /* ... pozostałe zmienne (pełne palety kolorów) */
}
```

**Wizualny efekt:**

- Tło strony: ciemnoszare (#1a1a1a)
- Tekst: jasny (#f8fbfc)
- Przyciski primary: jasnoniebieskie tło z ciemnym tekstem
- Przyciski outline: ciemne tło z jasnym tekstem i ciemną ramką
- Ramki: ciemniejsze (#495057)

### Scenariusz 3: Motyw Systemowy (bez `data-theme`)

```html
<html> <!-- bez atrybutu data-theme -->
```

**Zachowanie:**

- Jeśli OS ma `prefers-color-scheme: dark` → JavaScript ustawia `data-theme="dark"`
- Jeśli OS ma `prefers-color-scheme: light` → JavaScript ustawia `data-theme="light"`
- Automatycznie reaguje na zmiany preferencji systemu poprzez JavaScript
- Brak obsługi CSS `@media (prefers-color-scheme)` - wszystko przez JS dla spójności

## Używanie Kolorów w Komponentach

### ✅ Zalecane: Semantyczne Nazwy z CSS Variables

```scss
.example-component {
  background-color: var(--psc-color-surface);
  color: var(--psc-color-text-primary);
  border: 1px solid var(--psc-color-border);

  &__button {
    background-color: var(--psc-color-button-outline-bg);
    color: var(--psc-color-button-outline-text);
    border: 1px solid var(--psc-color-button-outline-border);

    &:hover {
      background-color: var(--psc-color-button-outline-hover);
    }
  }
}
```

### ✅ Alternatywa: Funkcja theme-color() w SCSS

```scss
@use "@styles/functions" as *;

.example-component {
  // Domyślnie jasny motyw
  background-color: theme-color('surface');
  color: theme-color('text-primary');

  // Można też jawnie określić motyw
  border: 1px solid theme-color('border', light);
}
```

### ❌ Niezalecane: Bezpośrednie Kolory

```scss
/* ŹLE - nie reaguje na zmianę motywu */
.example-component {
  background-color: #ffffff; /* hardcoded */
  color: #212529; /* hardcoded */
}
```

## Cykl Życia Zmiany Motywu

### Inicjalizacja (Synchroniczna - Przed Renderowaniem)

1. **Odczyt z localStorage** → `getStoredTheme()` - synchroniczny odczyt
2. **Obliczenie aktualnego motywu** → dla 'system' sprawdź `prefers-color-scheme`
3. **Ustawienie na HTML** → `injectThemeToHTML()` ustawia `data-theme` na `<html>`
4. **Renderowanie** → komponenty renderują się z właściwymi kolorami (bez FOUC)

### Zmiana Motywu w Runtime

1. **Użytkownik klika przycisk** → `toggleTheme()` zmienia `themeSignal.value`
   - light → dark
   - dark → system  
   - system → light
2. **Zapis do localStorage** → natychmiastowy zapis
3. **Obliczenie currentTheme** → `computed()` reaguje na zmianę
4. **Aktualizacja HTML** → `effect()` ustawia `data-theme` na `<html>`
5. **CSS reaguje automatycznie** → wszystkie `var(--psc-color-*)` zmieniają się natychmiast
6. **Komponenty renderują się ponownie** → z nowymi kolorami

### Obsługa Zmian Systemowych Preferencji

1. **Nasłuchiwanie zmian** → `mediaQuery.addEventListener('change', ...)`
2. **Aktualizacja systemThemeSignal** → gdy użytkownik ma motyw 'system'
3. **Automatyczna zmiana** → `computed()` i `effect()` aktualizują HTML
4. **Bez interakcji użytkownika** → płynna adaptacja do systemu

## Debugowanie

### Sprawdzanie aktualnych wartości CSS

```javascript
// W konsoli przeglądarki
getComputedStyle(document.documentElement).getPropertyValue('--psc-color-surface');
// → "#ffffff" (jasny) lub "#1a1a1a" (ciemny)
```

### Sprawdzanie data-theme

```javascript
document.documentElement.getAttribute('data-theme');
// → "light", "dark", lub null (system - ale JS zawsze ustawia wartość)
```

### Sprawdzanie preferencji systemu

```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches;
// → true/false
```

### Sprawdzanie stanu Signals (w komponencie)

```javascript
// W komponencie używającym ThemeContext
const { theme, currentTheme } = useContext(ThemeContext);
console.log('Theme setting:', theme);        // 'light' | 'dark' | 'system'
console.log('Current theme:', currentTheme); // 'light' | 'dark'
```

## Najlepsze Praktyki

1. **Zawsze używaj semantycznych nazw** zamiast bezpośrednich kolorów
2. **Testuj w obu motywach** - jasnym i ciemnym
3. **Sprawdzaj kontrast** - upewnij się, że tekst jest czytelny
4. **Używaj surface-secondary** dla subtelnych różnic tła
5. **Testuj motyw systemowy** - zmieniaj preferencje OS
6. **Używaj CSS custom properties** zamiast funkcji SCSS w CSS
7. **Importuj style w ThemeProvider** - zapewnia dostępność zmiennych CSS
8. **Testuj obsługę błędów** - localStorage i matchMedia mogą zawieść

## Dodatkowe Funkcje

### Funkcje Pomocnicze

```tsx
// Pobieranie etykiety motywu
export const getThemeLabel = (theme: Theme): string => {
  switch (theme) {
    case 'light': return 'Jasny';
    case 'dark': return 'Ciemny';
    case 'system': return 'Systemowy';
  }
};

// Pobieranie ikony motywu
export const getThemeIcon = (currentTheme: 'light' | 'dark'): string => {
  return currentTheme === 'dark' ? '🌙' : '☀️';
};
```

### Context API

```tsx
import { useContext } from 'preact/hooks';
import { ThemeContext } from './ThemeProvider';

function MyComponent() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('MyComponent must be used within ThemeProvider');
  }

  const { theme, currentTheme, toggleTheme, isLoaded } = themeContext;

  return (
    <button onClick={toggleTheme}>
      {getThemeIcon(currentTheme)} {getThemeLabel(theme)}
    </button>
  );
}
```

## Architektura Signals

System używa następujących signal:

- **`themeSignal`**: Przechowuje ustawienie motywu ('light' | 'dark' | 'system')
- **`systemThemeSignal`**: Przechowuje wykryty motyw systemowy ('light' | 'dark')
- **`currentThemeSignal`**: Computed signal zwracający aktualny motyw do zastosowania
- **`isLoadedSignal`**: Wskazuje czy motyw został załadowany (zawsze true w aktualnej implementacji)

Signals są automatycznie reaktywne - zmiana wartości powoduje natychmiastową aktualizację UI.

## Problemy i Rozwiązania

### Problem: FOUC (Flash of Unstyled Content)

**Objawy:** Krótki błysk nieprawidłowych kolorów przy ładowaniu strony
**Przyczyna:** Motyw ustawiany po renderowaniu komponentów
**Rozwiązanie:** Synchroniczna inicjalizacja w `ThemeProvider` - `injectThemeToHTML()` wywołana przed jakimkolwiek renderowaniem

### Problem: Kolory nie zmieniają się

**Przyczyna:** Użycie `theme-color()` zamiast `var(--psc-color-*)` w CSS
**Rozwiązanie:** Zamień wszystkie wystąpienia na CSS custom properties, ponieważ `theme-color()` działa tylko w SCSS, nie w runtime

### Problem: Nieprawidłowe kolory w systemie motywów

**Przyczyna:** Niezgodność między `:root` a `html[data-theme="dark"]`
**Rozwiązanie:** Upewnij się, że wszystkie pliki używają spójnych nazw i że JS ustawia `data-theme` na `<html>`

### Problem: Błędy localStorage

**Objawy:** Ostrzeżenia w konsoli, motyw nie zapisuje się
**Przyczyna:** localStorage niedostępny (private mode, quota exceeded)
**Rozwiązanie:** Wszystkie operacje localStorage są opakowane w try/catch z fallback do wartości domyślnych

### Problem: Błędy matchMedia

**Objawy:** Ostrzeżenia w konsoli, systemowy motyw nie działa
**Przyczyna:** matchMedia niedostępny w starszych przeglądarkach lub środowiskach testowych
**Rozwiązanie:** Wszystkie wywołania matchMedia są opakowane w try/catch z fallback do 'light'

### Problem: Motyw systemowy nie reaguje na zmiany

**Przyczyna:** Brak nasłuchiwania zmian `prefers-color-scheme`
**Rozwiązanie:** `setupSystemThemeListener()` nasłuchuje zmian i aktualizuje `systemThemeSignal`

### Problem: ThemeProvider nie działa w testach

**Objawy:** Testy nie renderują się z właściwymi kolorami
**Przyczyna:** Brak globalnego setup dla matchMedia i localStorage w testach
**Rozwiązanie:** Patrz sekcja "Global Test Setup" w TESTING.md
