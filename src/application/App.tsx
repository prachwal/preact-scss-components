import { useContext } from 'preact/hooks';
import { ThemeContext } from '@providers';
import { Container, Grid, getThemeIcon, getThemeLabel } from '@components';
import { ExampleComponent } from './ExampleComponent';

import './App.scss';

/**
 * Main application component that renders the demo interface for Preact SCSS components.
 *
 * This component uses the ThemeContext to manage theme state and provides a comprehensive
 * demo showcasing all component capabilities including responsive design, theming, and layout options.
 *
 * @returns JSX element containing the main app structure with header and content areas,
 *          or a loading indicator if theme context is not available
 */
export function App() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Loading...</div>;
  }

  const { theme, currentTheme, toggleTheme } = themeContext;

  return (
    <Container className="app">
      {/* Header with theme toggle */}
      <Container as="header" className="app-header">
        <Container layout="flex" justifyContent="space-between" alignItems="center" gap="1rem">
          <h1 className="app-header__title">
            🎨 Preact SCSS Components Demo
          </h1>
          <Container layout="flex" gap="1rem" alignItems="center">
            <span className="app-header__theme-info">
              Motyw: {getThemeLabel(theme)} ({getThemeIcon(currentTheme)})
            </span>
            <button
              type="button"
              className="app-header__theme-button"
              onClick={toggleTheme}
              aria-label={`Przełącz na ${theme === 'light' ? 'ciemny' : theme === 'dark' ? 'systemowy' : 'jasny'} motyw`}
            >
              {theme === 'light' ? '🌙' : theme === 'dark' ? '⚙️' : '☀️'}
            </button>
          </Container>
        </Container>
      </Container>

      <Container as="main" className="app-main">
        {/* Hero Section */}
        <Container as="section" className="app-hero">
          <Container layout="flex" direction="column" alignItems="center" gap="2rem" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Komponenty Preact + SCSS</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: 0 }}>
              Kompleksowa biblioteka komponentów UI z wsparciem dla responsywności, motywów i nowoczesnych layoutów.
            </p>
            <Container layout="flex" gap="1rem" wrap="wrap" justifyContent="center">
              <div className="demo-item demo-item--primary demo-item--large">🚀 Responsywne</div>
              <div className="demo-item demo-item--secondary demo-item--large">🎨 Motywy</div>
              <div className="demo-item demo-item--success demo-item--large">📱 Mobile-first</div>
              <div className="demo-item demo-item--warning demo-item--large">⚡ Wydajne</div>
            </Container>
          </Container>
        </Container>

        {/* Example Component Demo */}
        <Container as="section" className="app-section">
          <h2>🧩 ExampleComponent</h2>
          <p>Podstawowy komponent demonstracyjny z interaktywnymi funkcjami.</p>
          <ExampleComponent />
        </Container>

        {/* Container Component Showcase */}
        <Container as="section" className="app-section">
          <h2>📦 Container Component</h2>
          <p>Wszechstronny komponent layout z wsparciem dla Flexbox i Grid.</p>

          <Container as="article" className="demo-section">
            <h3>🎯 Flex Layout - Kierunki</h3>
            <Container layout="flex" direction="row" gap="1rem" className="demo-flex" style={{ marginBottom: '1rem' }}>
              <div className="demo-item demo-item--primary">Row 1</div>
              <div className="demo-item demo-item--primary">Row 2</div>
              <div className="demo-item demo-item--primary">Row 3</div>
            </Container>
            <Container layout="flex" direction="column" gap="0.5rem" className="demo-flex-column" style={{ maxWidth: '200px' }}>
              <div className="demo-item demo-item--secondary">Column 1</div>
              <div className="demo-item demo-item--secondary">Column 2</div>
              <div className="demo-item demo-item--secondary">Column 3</div>
            </Container>
          </Container>

          <Container as="article" className="demo-section">
            <h3>⚖️ Justify Content</h3>
            <Container layout="flex" gap="0.5rem" justifyContent="flex-start" className="demo-justify">
              <div className="demo-item demo-item--small">Start</div>
              <div className="demo-item demo-item--small">Start</div>
              <div className="demo-item demo-item--small">Start</div>
            </Container>
            <Container layout="flex" gap="0.5rem" justifyContent="center" className="demo-justify">
              <div className="demo-item demo-item--small demo-item--success">Center</div>
              <div className="demo-item demo-item--small demo-item--success">Center</div>
            </Container>
            <Container layout="flex" gap="0.5rem" justifyContent="space-between" className="demo-justify">
              <div className="demo-item demo-item--small demo-item--warning">Between</div>
              <div className="demo-item demo-item--small demo-item--warning">Between</div>
            </Container>
            <Container layout="flex" gap="0.5rem" justifyContent="space-around" className="demo-justify">
              <div className="demo-item demo-item--small demo-item--info">Around</div>
              <div className="demo-item demo-item--small demo-item--info">Around</div>
            </Container>
          </Container>

          <Container as="article" className="demo-section">
            <h3>📏 Align Items</h3>
            <Container layout="flex" gap="0.5rem" alignItems="flex-start" style={{ height: '80px' }} className="demo-align">
              <div className="demo-item demo-item--small">Start</div>
              <div className="demo-item demo-item--small">Start</div>
              <div className="demo-item demo-item--small">Start</div>
            </Container>
            <Container layout="flex" gap="0.5rem" alignItems="center" style={{ height: '80px' }} className="demo-align">
              <div className="demo-item demo-item--small demo-item--primary">Center</div>
              <div className="demo-item demo-item--small demo-item--primary">Center</div>
            </Container>
            <Container layout="flex" gap="0.5rem" alignItems="flex-end" style={{ height: '80px' }} className="demo-align">
              <div className="demo-item demo-item--small demo-item--secondary">End</div>
              <div className="demo-item demo-item--small demo-item--secondary">End</div>
            </Container>
            <Container layout="flex" gap="0.5rem" alignItems="stretch" style={{ height: '80px' }} className="demo-align">
              <div className="demo-item demo-item--small demo-item--error">Stretch</div>
              <div className="demo-item demo-item--small demo-item--error">Stretch</div>
            </Container>
          </Container>

          <Container as="article" className="demo-section">
            <h3>🔄 Wrap Options</h3>
            <Container layout="flex" gap="0.5rem" wrap="wrap" style={{ maxWidth: '300px' }} className="demo-wrap">
              <div className="demo-item demo-item--small demo-item--info">Wrap 1</div>
              <div className="demo-item demo-item--small demo-item--info">Wrap 2</div>
              <div className="demo-item demo-item--small demo-item--info">Wrap 3</div>
              <div className="demo-item demo-item--small demo-item--info">Wrap 4</div>
              <div className="demo-item demo-item--small demo-item--info">Wrap 5</div>
            </Container>
            <Container layout="flex" gap="0.5rem" wrap="nowrap" style={{ maxWidth: '300px', overflow: 'hidden' }} className="demo-wrap">
              <div className="demo-item demo-item--small demo-item--error">No Wrap 1</div>
              <div className="demo-item demo-item--small demo-item--error">No Wrap 2</div>
              <div className="demo-item demo-item--small demo-item--error">No Wrap 3</div>
              <div className="demo-item demo-item--small demo-item--error">No Wrap 4</div>
            </Container>
          </Container>

          <Container as="article" className="demo-section">
            <h3>📐 Gap Presets</h3>
            <Container layout="flex" gap="small" className="demo-gap">
              <div className="demo-item demo-item--small">Small</div>
              <div className="demo-item demo-item--small">Gap</div>
            </Container>
            <Container layout="flex" gap="medium" className="demo-gap">
              <div className="demo-item demo-item--small demo-item--primary">Medium</div>
              <div className="demo-item demo-item--small demo-item--primary">Gap</div>
            </Container>
            <Container layout="flex" gap="large" className="demo-gap">
              <div className="demo-item demo-item--small demo-item--secondary">Large</div>
              <div className="demo-item demo-item--small demo-item--secondary">Gap</div>
            </Container>
            <Container layout="flex" gap="xl" className="demo-gap">
              <div className="demo-item demo-item--small demo-item--warning">XL</div>
              <div className="demo-item demo-item--small demo-item--warning">Gap</div>
            </Container>
          </Container>

          <Container as="article" className="demo-section">
            <h3>🏗️ Grid Layout</h3>
            <Container layout="grid" gap="1rem" className="demo-grid">
              <div className="demo-item demo-item--success">Grid 1</div>
              <div className="demo-item demo-item--success">Grid 2</div>
              <div className="demo-item demo-item--success">Grid 3</div>
              <div className="demo-item demo-item--success">Grid 4</div>
              <div className="demo-item demo-item--success">Grid 5</div>
              <div className="demo-item demo-item--success">Grid 6</div>
            </Container>
          </Container>
        </Container>

        {/* Grid Component Showcase */}
        <Container as="section" className="app-section">
          <h2>🎯 Grid Component</h2>
          <p>Zaawansowany system siatki z wsparciem dla responsywnych breakpointów.</p>

          <Container as="article" className="demo-section">
            <h3>📱 Responsive Breakpoints</h3>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--primary">xs=12<br/>sm=6<br/>md=4<br/>lg=3</div>
              </Grid>
              <Grid item xs={6} sm={3} md={4} lg={3}>
                <div className="demo-item demo-item--secondary">xs=6<br/>sm=3<br/>md=4<br/>lg=3</div>
              </Grid>
              <Grid item xs={6} sm={3} md={4} lg={3}>
                <div className="demo-item demo-item--success">xs=6<br/>sm=3<br/>md=4<br/>lg=3</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3}>
                <div className="demo-item demo-item--warning">xs=12<br/>sm=12<br/>md=12<br/>lg=3</div>
              </Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>🎯 Auto-sizing & Full Width</h3>
            <Grid container spacing={2}>
              <Grid item xs="auto">
                <div className="demo-item demo-item--info">Auto</div>
              </Grid>
              <Grid item xs={true}>
                <div className="demo-item demo-item--surface-secondary">Full Width</div>
              </Grid>
              <Grid item xs="auto">
                <div className="demo-item demo-item--error">Auto</div>
              </Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>📐 Spacing Levels</h3>
            <Grid container spacing={0}>
              <Grid item xs={4}><div className="demo-item demo-item--small">0</div></Grid>
              <Grid item xs={4}><div className="demo-item demo-item--small">0</div></Grid>
              <Grid item xs={4}><div className="demo-item demo-item--small">0</div></Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={4}><div className="demo-item demo-item--large">5</div></Grid>
              <Grid item xs={4}><div className="demo-item demo-item--large">5</div></Grid>
              <Grid item xs={4}><div className="demo-item demo-item--large">5</div></Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>↔️ Justify Content Options</h3>
            <Grid container spacing={1} justifyContent="flex-start">
              <Grid item xs={3}><div className="demo-item">Start</div></Grid>
              <Grid item xs={3}><div className="demo-item">Start</div></Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={3}><div className="demo-item demo-item--primary">Center</div></Grid>
              <Grid item xs={3}><div className="demo-item demo-item--primary">Center</div></Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid item xs={3}><div className="demo-item demo-item--secondary">End</div></Grid>
              <Grid item xs={3}><div className="demo-item demo-item--secondary">End</div></Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item xs={3}><div className="demo-item demo-item--success">Between</div></Grid>
              <Grid item xs={3}><div className="demo-item demo-item--success">Between</div></Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>🔄 Direction & Wrap</h3>
            <Grid container spacing={1} direction="row">
              <Grid item xs={3}><div className="demo-item">Row 1</div></Grid>
              <Grid item xs={3}><div className="demo-item">Row 2</div></Grid>
              <Grid item xs={3}><div className="demo-item">Row 3</div></Grid>
              <Grid item xs={3}><div className="demo-item">Row 4</div></Grid>
            </Grid>
            <Grid container spacing={1} direction="row-reverse">
              <Grid item xs={3}><div className="demo-item demo-item--success">Row Reverse 1</div></Grid>
              <Grid item xs={3}><div className="demo-item demo-item--success">Row Reverse 2</div></Grid>
              <Grid item xs={3}><div className="demo-item demo-item--success">Row Reverse 3</div></Grid>
              <Grid item xs={3}><div className="demo-item demo-item--success">Row Reverse 4</div></Grid>
            </Grid>
            <Grid container spacing={1} wrap="wrap" style={{ maxWidth: '400px' }}>
              <Grid item xs={6}><div className="demo-item demo-item--info">Wrap 1</div></Grid>
              <Grid item xs={6}><div className="demo-item demo-item--info">Wrap 2</div></Grid>
              <Grid item xs={6}><div className="demo-item demo-item--info">Wrap 3</div></Grid>
              <Grid item xs={6}><div className="demo-item demo-item--info">Wrap 4</div></Grid>
              <Grid item xs={6}><div className="demo-item demo-item--info">Wrap 5</div></Grid>
              <Grid item xs={6}><div className="demo-item demo-item--info">Wrap 6</div></Grid>
            </Grid>
          </Container>
        </Container>

        {/* Real-world Examples */}
        <Container as="section" className="app-section">
          <h2>💼 Praktyczne Przykłady</h2>
          <p>Real-world zastosowania komponentów w różnych scenariuszach.</p>

          <Container as="article" className="demo-section">
            <h3>📊 Dashboard Layout</h3>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="demo-item demo-item--primary demo-item--large" style={{ textAlign: 'center' }}>
                  🏠 Header / Navigation
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="demo-item demo-item--success demo-item--large">
                      📈 Main Chart Area
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="demo-item demo-item--info">
                      📊 Statistics Card 1
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="demo-item demo-item--warning">
                      📊 Statistics Card 2
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={3}>
                        <div className="demo-item demo-item--secondary">📱 Mobile</div>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <div className="demo-item demo-item--secondary">💻 Desktop</div>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <div className="demo-item demo-item--secondary">📱 Tablet</div>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <div className="demo-item demo-item--secondary">🖥️ Large</div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={2} direction="column">
                  <Grid item xs={12}>
                    <div className="demo-item demo-item--error">
                      🚨 Alerts & Notifications
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="demo-item demo-item--surface-secondary">
                      👤 User Profile
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="demo-item demo-item--surface-secondary">
                      ⚙️ Settings
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className="demo-item demo-item--surface-secondary demo-item--large" style={{ textAlign: 'center' }}>
                  🦶 Footer
                </div>
              </Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>🛍️ Product Grid</h3>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
                  <div style={{ fontWeight: 'bold' }}>Smartphone</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$599</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💻</div>
                  <div style={{ fontWeight: 'bold' }}>Laptop</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$1299</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⌚</div>
                  <div style={{ fontWeight: 'bold' }}>Smartwatch</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$299</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎧</div>
                  <div style={{ fontWeight: 'bold' }}>Headphones</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$199</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                  <div style={{ fontWeight: 'bold' }}>Camera</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$899</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎮</div>
                  <div style={{ fontWeight: 'bold' }}>Gaming Console</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$499</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📺</div>
                  <div style={{ fontWeight: 'bold' }}>Smart TV</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$799</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className="demo-item demo-item--large" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔊</div>
                  <div style={{ fontWeight: 'bold' }}>Sound System</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>$349</div>
                </div>
              </Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>🎨 Color Showcase</h3>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={2}><div className="demo-item demo-item--primary">Primary</div></Grid>
              <Grid item xs={6} sm={4} md={2}><div className="demo-item demo-item--secondary">Secondary</div></Grid>
              <Grid item xs={6} sm={4} md={2}><div className="demo-item demo-item--success">Success</div></Grid>
              <Grid item xs={6} sm={4} md={2}><div className="demo-item demo-item--warning">Warning</div></Grid>
              <Grid item xs={6} sm={4} md={2}><div className="demo-item demo-item--error">Error</div></Grid>
              <Grid item xs={6} sm={4} md={2}><div className="demo-item demo-item--info">Info</div></Grid>
            </Grid>
          </Container>

          <Container as="article" className="demo-section">
            <h3>📝 Form Layout</h3>
            <Container layout="flex" direction="column" gap="1.5rem" style={{ maxWidth: '400px' }}>
              <Container layout="flex" direction="column" gap="0.5rem">
                <label style={{ fontWeight: 'bold' }}>Email</label>
                <input type="email" placeholder="your@email.com" style={{
                  padding: '0.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)'
                }} />
              </Container>
              <Container layout="flex" direction="column" gap="0.5rem">
                <label style={{ fontWeight: 'bold' }}>Password</label>
                <input type="password" placeholder="••••••••" style={{
                  padding: '0.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)'
                }} />
              </Container>
              <Container layout="flex" gap="1rem" alignItems="center">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </Container>
              <Container layout="flex" gap="1rem">
                <button style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Sign In</button>
                <button style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Sign Up</button>
              </Container>
            </Container>
          </Container>
        </Container>

        {/* Theme Showcase */}
        <Container as="section" className="app-section">
          <h2>🎭 Theme System</h2>
          <p>Dynamiczne motywy z wsparciem dla jasnego, ciemnego i systemowego motywu.</p>

          <Container as="article" className="demo-section">
            <h3>🎨 Theme Colors</h3>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-surface)' }}>
                  Surface
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
                  Surface Secondary
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-surface)' }}>
                  Text Primary
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-text-secondary)', color: 'var(--color-surface)' }}>
                  Text Secondary
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-primary)' }}>
                  Primary
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  Secondary
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-success)' }}>
                  Success
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <div className="demo-item" style={{ backgroundColor: 'var(--color-border)' }}>
                  Border
                </div>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Container>

      <Container as="footer" className="app-footer">
        <p>© 2024 Preact SCSS Components. Wszelkie prawa zastrzeżone.</p>
      </Container>
    </Container>
  );
}