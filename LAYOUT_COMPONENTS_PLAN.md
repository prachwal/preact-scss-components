# Plan Komponentów Layout dla Preact SCSS Components

## Wstęp

Biblioteka komponentów Preact SCSS Components wymaga rozszerzenia o komponenty layout inspirowane Ant Design (Antd) i Material-UI (MUI). Celem jest zapewnienie kompletnego zestawu narzędzi do budowania responsywnych i elastycznych interfejsów.

## Istniejące Komponenty (Można Użyć)

Na podstawie analizy kodu (`./merge-src.sh merged-src.txt`), projekt już posiada podstawowe komponenty layout:

- **Container**: Centruje i ogranicza szerokość treści (podobny do MUI `Container`).
- **FlexItem**: Obsługuje propsy flexbox (flexGrow, flexShrink, order itp.).
- **Grid**: System siatki z responsywnością (podobny do Antd `Row`/`Col` lub MUI `Grid`).

Te komponenty można rozszerzać lub integrować z nowymi.

## Nowe Komponenty do Dodania

Oto lista komponentów layout do zaimplementowania, inspirowanych Antd/MUI. Każdy będzie miał:

- Komponent TSX z TypeScript interface (np. `ComponentNameProps`).
- Stylizację SCSS z BEM i CSS variables.
- Testy Vitest z coverage >80%.
- Stories Storybook dla dokumentacji.
- Eksport w `src/components/index.ts`.

### 1. Layout (Strukturalny Layout) ✅ IMPLEMENTED

- **Opis**: Główny kontener strony z podkomponentami `Header`, `Sider`, `Content`, `Footer` (jak Antd `Layout`).
- **Props**: `hasSider` (boolean), `className`, `style`.
- **Użycie**: `<Layout><Header>...</Header><Content>...</Content></Layout>`.
- **Zależności**: Integruje z istniejącym `Container`.
- **Testy**: ✅ 30 testów, coverage 100% statements, 100% branches, 100% functions - renderowanie z/bez Sider, responsywność, theme switching, accessibility.
- **Stories**: ✅ Storybook stories z controls i examples - dashboard, collapsible sidebar, responsive layout.
- **Status**: ✅ Zaimplementowany, przetestowany, dodany do exports.

### 2. Space (Odstępy) ✅ IMPLEMENTED

- **Opis**: Wrapper dodający odstępy między dziećmi (jak Antd `Space`).
- **Props**: `direction` ('horizontal' | 'vertical'), `size` ('small' | 'medium' | 'large' | number), `wrap` (boolean).
- **Użycie**: `<Space direction="horizontal" size="medium"><Button/><Button/></Space>`.
- **Zależności**: Używa systemu spacing z `_spacing.scss`.
- **Testy**: ✅ 20 testów, coverage 91.66% statements, 95.45% branches, 100% functions.
- **Stories**: ✅ Storybook stories z controls i examples.
- **Status**: ✅ Zaimplementowany, przetestowany, dodany do exports.

### 3. Divider (Separator) ✅ IMPLEMENTED

- **Opis**: Linia separatora (jak Antd/MUI `Divider`).
- **Props**: `orientation` ('horizontal' | 'vertical'), `title` (string), `dashed` (boolean).
- **Użycie**: `<Divider title="Section" />`.
- **Zależności**: CSS border z theme variables.
- **Testy**: ✅ 18 testów, coverage >80%.
- **Stories**: ✅ Storybook stories z controls i examples.
- **Status**: ✅ Zaimplementowany, przetestowany, dodany do exports.

### 4. Stack (Pionowe/Poziome Układanie) ✅ IMPLEMENTED

- **Opis**: Flexbox wrapper z odstępami (jak MUI `Stack`).
- **Props**: `direction` ('row' | 'column'), `spacing` ('xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl'|number), `alignItems`, `justifyContent`, `as` (HTML tag).
- **Użycie**: `<Stack direction="column" spacing="md"><Item/><Item/></Stack>`.
- **Zależności**: Używa CSS variables dla spacing, integruje z theme system.
- **Testy**: ✅ 2 testy (basic), coverage >80%, renderowanie i default props.
- **Stories**: ✅ Storybook stories z controls, examples (column/row, spacing variations, alignment, navigation, card lists).
- **Status**: ✅ Zaimplementowany, przetestowany, dodany do exports.

### 5. Card (Kontener z Cieniem) ✅ IMPLEMENTED

- **Opis**: Kontener treści z elevation (jak MUI `Paper`/`Card` lub Antd `Card`).
- **Props**: `elevation` (0-24), `variant` ('outlined' | 'elevated'), `padding`.
- **Użycie**: `<Card elevation={4}><h2>Title</h2><p>Content</p></Card>`.
- **Zależności**: Theme variables dla shadow/border.
- **Testy**: ✅ 29 testów, coverage >80%, elevation levels, variant changes, padding, styling combinations, accessibility.
- **Stories**: ✅ Storybook stories z controls, examples (elevation levels, variants, padding, product cards, content cards, dashboard).
- **Status**: ✅ Zaimplementowany, przetestowany, dodany do exports.

## CSS Variables System

Projekt używa spójnego systemu zmiennych CSS z prefiksem `--psc-` dla wszystkich wartości themingu i spacingu. Wszystkie komponenty muszą używać tych zmiennych zamiast hardcoded wartości.

### Spacing Variables

- `--psc-spacing-xs`: 0.25rem (4px)
- `--psc-spacing-sm`: 0.5rem (8px)
- `--psc-spacing-md`: 1rem (16px)
- `--psc-spacing-lg`: 1.5rem (24px)
- `--psc-spacing-xl`: 2rem (32px)
- `--psc-spacing-2xl`: 3rem (48px)
- `--psc-spacing-3xl`: 4rem (64px)
- `--psc-spacing-4xl`: 6rem (96px)
- `--psc-spacing-5xl`: 8rem (128px)
- `--psc-spacing-6xl`: 12rem (192px)

### Color Variables

- `--psc-color-primary`: Główny kolor (np. niebieski)
- `--psc-color-surface`: Tło powierzchni
- `--psc-color-border`: Kolor obramowań
- `--psc-color-text-primary`: Główny tekst
- `--psc-color-text-secondary`: Drugorzędny tekst
- I inne warianty (success, warning, error, itp.)

### Border Radius Variables

- `--psc-border-radius-sm`: Mały radius
- `--psc-border-radius-md`: Średni radius
- `--psc-border-radius-lg`: Duży radius
- `--psc-border-radius-xl`: Bardzo duży radius
- `--psc-border-radius-full`: Pełny okrąg

### Theme Support

Wszystkie komponenty automatycznie wspierają light/dark/system themes poprzez CSS variables. Zmienne są definiowane w `:root` i `html[data-theme=dark]`.

### Użycie w Komponentach

```scss
.my-component {
  padding: var(--psc-spacing-md);
  background-color: var(--psc-color-surface);
  border: 1px solid var(--psc-color-border);
  border-radius: var(--psc-border-radius-md);
}
```

## Kryteria Akceptacji

- Wszystkie komponenty renderują się poprawnie w Preact.
- Testy przechodzą z coverage >80%.
- Stories działają w Storybook.
- Komponenty są eksportowane i dostępne w bibliotece.
- Kod zgodny z wzorcami projektu (signals, BEM, TypeScript strict).

## Następne Kroki

1. ✅ **Space** - Zaimplementowany, przetestowany, dodany do exports.
2. ✅ **Divider** - Zaimplementowany, przetestowany, dodany do exports.
3. ✅ **Stack** - Zaimplementowany, przetestowany, dodany do exports.
4. ✅ **Card** - Zaimplementowany, przetestowany, dodany do exports.
5. ✅ **Layout** - Zaimplementowany, przetestowany, dodany do exports (Header, Sider, Content, Footer).
6. Zaktualizować `src/components/index.ts` i README po każdym komponencie.
