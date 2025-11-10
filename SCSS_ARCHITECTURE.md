# SCSS Architecture Documentation - Preact SCSS Components

## 🎨 Overview

This document provides a comprehensive guide to the SCSS architecture, BEM naming conventions, class purposes, and mobile-first responsive design system in the Preact SCSS Components library.

## 📁 Project Structure

```
src/styles/
├── _colors.scss        # Color palettes (light/dark themes)
├── _spacing.scss       # Spacing scale and breakpoints
├── _functions.scss     # SCSS functions and mixins
├── _theme.scss         # Theme generation
├── _variables.scss     # Main variables aggregator
└── index.scss          # Main entry point
```

## 🎯 BEM Naming Convention

The library follows **Block Element Modifier (BEM)** naming pattern:

```scss
.block {}                    // Component base
.block__element {}           // Child element
.block--modifier {}          // Variant/state modifier
.block__element--modifier {} // Element with modifier
```

### Examples:
- `.container` - Block (base component)
- `.container--flex` - Block with modifier (flex layout)
- `.container--flex--column` - Nested modifiers (flex column direction)
- `.grid--item` - Block with element
- `.grid--spacing-3` - Block with parametric modifier

## 📦 Component SCSS Classes

### 1. Container Component (`Container.scss`)

**Purpose**: Versatile layout container with flexbox and grid support.

#### Base Classes:
- `.container` - Base container (width: 100%, box-sizing: border-box)

#### Layout Variants:
- `.container--flex` - Activates flexbox layout
  - `.container--flex--column` - Column direction
  - Default: row direction

#### Flexbox Modifiers:
**Justify Content:**
- `.container--flex--justify-start` - Align items to start
- `.container--flex--justify-center` - Center items
- `.container--flex--justify-end` - Align items to end
- `.container--flex--justify-between` - Space between items
- `.container--flex--justify-around` - Space around items
- `.container--flex--justify-evenly` - Even spacing

**Align Items:**
- `.container--flex--align-start` - Align to flex-start
- `.container--flex--align-center` - Center align
- `.container--flex--align-end` - Align to flex-end
- `.container--flex--align-stretch` - Stretch items (default)
- `.container--flex--align-baseline` - Baseline alignment

**Flex Wrap:**
- `.container--flex--wrap-nowrap` - Prevent wrapping
- `.container--flex--wrap-wrap-reverse` - Reverse wrap

#### Grid Layout:
- `.container--grid` - Activates CSS Grid layout
  - Default: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`

#### Divider Elements:
- `.container__divider-wrapper` - Flex container for dividers
- `.container__divider` - Divider line (auto-adjusts for row/column)

---

### 2. Grid Component (`Grid.scss`)

**Purpose**: 12-column responsive grid system with breakpoints.

#### Constants:
```scss
$grid-columns: 12;
$grid-breakpoints: (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px);
```

#### Base Classes:
- `.grid` - Base grid element
- `.grid--container` - Container with flexbox display
- `.grid--item` - Grid item element
- `.grid--item--zero-min-width` - Item with min-width: 0

#### Container Modifiers:
**Direction:**
- `.grid--container--direction-row-reverse` - Reverse row
- `.grid--container--direction-column` - Column layout
- `.grid--container--direction-column-reverse` - Reverse column

**Justify Content:**
- `.grid--container--justify-start`
- `.grid--container--justify-center`
- `.grid--container--justify-end`
- `.grid--container--justify-between`
- `.grid--container--justify-around`
- `.grid--container--justify-evenly`

**Align Items:**
- `.grid--container--align-start`
- `.grid--container--align-center`
- `.grid--container--align-end`
- `.grid--container--align-stretch`
- `.grid--container--align-baseline`

**Wrap:**
- `.grid--container--wrap-nowrap`
- `.grid--container--wrap-wrap-reverse`

#### Spacing System:
- `.grid--spacing-{0-10}` - Container spacing (uses negative margin pattern)
  - Applies padding to `.grid--item` children
  - Example: `.grid--spacing-3` applies `calc(var(--psc-spacing-sm) * 3 / 2)` padding

#### Responsive Column Classes:
**Pattern**: `.grid--{breakpoint}-{size}`

**Auto-sizing:**
- `.grid--xs-auto`, `.grid--sm-auto`, etc. - Auto width
- `.grid--xs-true`, `.grid--sm-true`, etc. - Full width (flex-grow: 1)

**Column Spans (1-12):**
- `.grid--xs-{1-12}` - Mobile (0px+)
- `.grid--sm-{1-12}` - Small devices (576px+)
- `.grid--md-{1-12}` - Medium devices (768px+)
- `.grid--lg-{1-12}` - Large devices (992px+)
- `.grid--xl-{1-12}` - Extra large devices (1200px+)

**Example**:
```scss
.grid--xs-12  // 100% width on mobile
.grid--sm-6   // 50% width on small screens
.grid--md-4   // 33.33% width on medium screens
.grid--lg-3   // 25% width on large screens
```

---

### 3. Stack Component (`Stack.scss`)

**Purpose**: Vertical/horizontal stacking with consistent spacing.

#### Base Class:
- `.stack` - Base stack container

**Note**: Stack uses inline styles for dynamic spacing values via CSS custom properties.

---

### 4. Card Component (`Card.scss`)

**Purpose**: Content container with elevation and variants.

#### Base Classes:
- `.card` - Base card element
- `.card--elevated` - Card with box-shadow
- `.card--outlined` - Card with border

#### Elevation Levels:
- `.card--elevation-{0-24}` - Shadow depth (0 = no shadow, 24 = maximum)

#### Padding Modifiers:
- Uses CSS custom properties: `var(--psc-spacing-{xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl})`

---

### 5. Space Component (`Space.scss`)

**Purpose**: Adds spacing between child elements.

#### Base Classes:
- `.space` - Base space container
- `.space--horizontal` - Horizontal spacing (default)
- `.space--vertical` - Vertical spacing

#### Size Variants:
- `.space--size-{xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl}` - Predefined spacing
- Custom numeric spacing via inline styles

#### Wrap:
- `.space--wrap` - Enable wrapping

---

### 6. Divider Component (`Divider.scss`)

**Purpose**: Visual separator line.

#### Base Classes:
- `.divider` - Base divider
- `.divider--horizontal` - Horizontal line (default)
- `.divider--vertical` - Vertical line

#### Variants:
- `.divider--dashed` - Dashed border style
- `.divider--with-title` - Divider with text content

#### Elements:
- `.divider__content` - Text content wrapper
- `.divider__line` - Line element

---

### 7. Layout Component (`Layout.scss`)

**Purpose**: Page structure with Header, Sider, Content, Footer.

#### Base Classes:
- `.layout` - Main layout container
- `.layout--has-sider` - Layout with sidebar

#### Sub-components:
- `.layout-header` - Header section
- `.layout-sider` - Sidebar section
  - `.layout-sider--collapsed` - Collapsed state
- `.layout-content` - Main content area
- `.layout-footer` - Footer section

---

### 8. FlexItem Component (`FlexItem.scss`)

**Purpose**: Individual flex items with flex properties.

#### Base Class:
- `.flex-item` - Base flex item

**Note**: Uses inline styles for dynamic flex properties (flex-grow, flex-shrink, flex-basis, order).

---

## 🎨 CSS Custom Properties (Theme Colors)

All components use CSS custom properties for theming:

### Color Tokens:
```css
/* Surface colors */
--psc-color-surface
--psc-color-surface-secondary
--psc-color-surface-tertiary

/* Text colors */
--psc-color-text-primary
--psc-color-text-secondary
--psc-color-text-tertiary

/* Semantic colors */
--psc-color-primary
--psc-color-secondary
--psc-color-success
--psc-color-warning
--psc-color-error
--psc-color-info

/* Utility colors */
--psc-color-border
--psc-color-border-hover
--psc-color-white
--psc-color-black

/* Button colors */
--psc-color-button-primary-bg
--psc-color-button-primary-text
--psc-color-button-primary-hover
```

### Spacing Tokens:
```css
--psc-spacing-xs    /* 0.25rem / 4px */
--psc-spacing-sm    /* 0.5rem / 8px */
--psc-spacing-md    /* 1rem / 16px */
--psc-spacing-lg    /* 1.5rem / 24px */
--psc-spacing-xl    /* 2rem / 32px */
--psc-spacing-2xl   /* 3rem / 48px */
--psc-spacing-3xl   /* 4rem / 64px */
--psc-spacing-4xl   /* 6rem / 96px */
--psc-spacing-5xl   /* 8rem / 128px */
--psc-spacing-6xl   /* 12rem / 192px */
```

### Border Radius Tokens:
```css
--psc-border-radius-none   /* 0 */
--psc-border-radius-sm     /* 0.125rem / 2px */
--psc-border-radius-md     /* 0.25rem / 4px */
--psc-border-radius-lg     /* 0.375rem / 6px */
--psc-border-radius-xl     /* 0.5rem / 8px */
--psc-border-radius-2xl    /* 0.75rem / 12px */
--psc-border-radius-3xl    /* 1rem / 16px */
--psc-border-radius-full   /* 9999px */
```

---

## 📱 Mobile-First Responsive Design

### Breakpoints:
```scss
$breakpoints: (
  xs: 0px,      // Mobile (default)
  sm: 576px,    // Small devices
  md: 768px,    // Tablets
  lg: 992px,    // Desktops
  xl: 1200px,   // Large desktops
  2xl: 1400px   // Extra large
);
```

### Responsive Strategy:

1. **Base styles** target mobile (xs: 0px) first
2. **Media queries** progressively enhance for larger screens
3. **Grid system** auto-adjusts columns based on breakpoints

### Usage Examples:

```tsx
// Mobile: 12 columns (100% width)
// Tablet (md): 6 columns (50% width)
// Desktop (lg): 4 columns (33.33% width)
<Grid item xs={12} md={6} lg={4}>
  <Card>Content</Card>
</Grid>
```

### Responsive Gap:
```tsx
// Small gap on mobile, larger on desktop
<Container gap={{ xs: 'small', md: 'large' }}>
  {children}
</Container>
```

---

## 🛠️ SCSS Functions & Mixins

### Functions (`_functions.scss`):

```scss
// Get theme color
theme-color($key, $theme: light)

// Get spacing value
spacing($key)
spacing-scale($key)

// Get breakpoint
breakpoint($key)

// Get border radius
border-radius($key: md)

// Color utilities
color-contrast($color, $dark, $light)
rgba-from-hex($hex, $alpha)
```

### Mixins:

```scss
// Generate color CSS custom properties
@include generate-color-properties($theme);

// Generate spacing CSS custom properties
@include generate-spacing-properties();

// Generate border radius CSS custom properties
@include generate-border-radius-properties();

// Generate responsive grid classes
@include generate-grid-breakpoint-classes($suffix);
```

---

## 📝 Best Practices

### 1. **Always use CSS custom properties** for colors:
```scss
// ✅ Good
color: var(--psc-color-text-primary);

// ❌ Bad
color: #212529;
```

### 2. **Use BEM naming** for component-specific classes:
```scss
// ✅ Good
.card__header--primary {}

// ❌ Bad
.cardHeaderPrimary {}
```

### 3. **Mobile-first media queries**:
```scss
// ✅ Good
.element {
  font-size: 14px; // Mobile
  
  @media (min-width: 768px) {
    font-size: 16px; // Tablet+
  }
}
```

### 4. **Use spacing scale** for consistency:
```scss
// ✅ Good
padding: var(--psc-spacing-md);

// ❌ Bad
padding: 15px;
```

### 5. **Semantic HTML** with appropriate classes:
```tsx
// ✅ Good
<article className="card">
  <header className="card__header">Title</header>
</article>

// ❌ Bad
<div className="card">
  <div className="card-header">Title</div>
</div>
```

---

## 🔍 Class Name Quick Reference

| Component | Primary Class | Key Modifiers | Responsive |
|-----------|--------------|---------------|------------|
| Container | `.container` | `--flex`, `--grid`, `--flex--column` | ❌ |
| Grid | `.grid` | `--container`, `--item`, `--spacing-{n}` | ✅ |
| Stack | `.stack` | Dynamic inline styles | ❌ |
| Card | `.card` | `--elevated`, `--outlined`, `--elevation-{n}` | ❌ |
| Space | `.space` | `--horizontal`, `--vertical`, `--size-{size}` | ❌ |
| Divider | `.divider` | `--horizontal`, `--vertical`, `--dashed` | ❌ |
| Layout | `.layout` | `--has-sider` | ✅ |
| FlexItem | `.flex-item` | Dynamic inline styles | ❌ |

---

## 🎓 Advanced Usage Examples

### Responsive Dashboard Layout:
```tsx
<Grid container spacing={3}>
  {/* Header - full width on all screens */}
  <Grid item xs={12}>
    <Header />
  </Grid>
  
  {/* Main content - stacks on mobile, 2/3 on desktop */}
  <Grid item xs={12} md={8}>
    <MainContent />
  </Grid>
  
  {/* Sidebar - stacks on mobile, 1/3 on desktop */}
  <Grid item xs={12} md={4}>
    <Sidebar />
  </Grid>
  
  {/* Footer - full width */}
  <Grid item xs={12}>
    <Footer />
  </Grid>
</Grid>
```

### Complex Flexbox Layout:
```tsx
<Container 
  layout="flex" 
  direction="column" 
  gap="large"
  alignItems="stretch"
>
  <Container 
    layout="flex" 
    justifyContent="space-between"
    alignItems="center"
    gap="medium"
  >
    <Logo />
    <Navigation />
  </Container>
  
  <Container layout="flex" gap="small" wrap="wrap">
    {items.map(item => <Card key={item.id}>{item}</Card>)}
  </Container>
</Container>
```

---

## 📊 Performance Considerations

1. **CSS Custom Properties** enable efficient theme switching without recompilation
2. **BEM naming** reduces CSS specificity conflicts
3. **Mobile-first** approach minimizes media query overrides
4. **Modular SCSS** allows tree-shaking unused styles
5. **Flexbox/Grid** provide native browser layout optimization

---

## 🚀 Future Enhancements

- [ ] Add CSS Grid template utilities
- [ ] Implement container queries for component-level responsiveness
- [ ] Add animation/transition utilities
- [ ] Create utility classes for common patterns
- [ ] Add dark mode auto-detection improvements

---

**Last Updated**: 2024-11-10
**Version**: 0.0.1
