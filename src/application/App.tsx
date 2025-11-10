import { useContext } from 'preact/hooks';
import { ThemeContext } from '@providers';
import { 
  Container, 
  Grid, 
  Card, 
  Stack, 
  Space, 
  Divider,
  Layout,
  Header,
  Content,
  Footer,
  getThemeIcon, 
  getThemeLabel 
} from '@components';
import { ExampleComponent } from './ExampleComponent';

import './App.scss';

/**
 * Main application component that renders a comprehensive demo of all Preact SCSS components.
 * 
 * This component demonstrates:
 * - Responsive design with mobile-first approach
 * - Complete component library showcase
 * - Theme switching (light/dark/system)
 * - Layout patterns and best practices
 *
 * @returns JSX element containing the main app structure
 */
export function App() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Loading...</div>;
  }

  const { theme, currentTheme, toggleTheme } = themeContext;

  return (
    <Container className="app">
      {/* Header with Theme Toggle */}
      <Container as="header" className="app-header">
        <Container layout="flex" justifyContent="space-between" alignItems="center" gap="1rem">
          <h1 className="app-header__title">
            🎨 Preact SCSS Components
          </h1>
          <Container layout="flex" gap="1rem" alignItems="center">
            <span className="app-header__theme-info">
              {getThemeLabel(theme)} ({getThemeIcon(currentTheme)})
            </span>
            <button
              type="button"
              className="app-header__theme-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙' : theme === 'dark' ? '⚙️' : '☀️'}
            </button>
          </Container>
        </Container>
      </Container>

      {/* Main Content */}
      <Container as="main" className="app-main">
        {/* Hero Section */}
        <section className="app-hero">
          <Stack direction="column" alignItems="center" spacing="xl">
            <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', margin: 0, textAlign: 'center' }}>
              Modern Component Library
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', opacity: 0.8, maxWidth: '600px', textAlign: 'center', margin: 0 }}>
              Responsive, accessible, and themeable components built with Preact and SCSS.
            </p>
            <Space size="medium" wrap>
              <div className="demo-item demo-item--primary">🚀 Responsive</div>
              <div className="demo-item demo-item--secondary">🎨 Themeable</div>
              <div className="demo-item demo-item--success">📱 Mobile-First</div>
              <div className="demo-item demo-item--info">⚡ Lightweight</div>
            </Space>
          </Stack>
        </section>

        {/* Layout Component Demo */}
        <section className="app-section">
          <h2>🏗️ Layout System</h2>
          <p>Structural components for building page layouts.</p>
          
          <Layout style={{ minHeight: '300px', border: '1px solid var(--psc-color-border)' }}>
            <Header style={{ padding: '1rem', backgroundColor: 'var(--psc-color-primary)', color: 'white' }}>
              <strong>Header</strong>
            </Header>
            <Content style={{ padding: '1rem' }}>
              <div className="demo-item">Main Content Area</div>
            </Content>
            <Footer style={{ padding: '1rem', backgroundColor: 'var(--psc-color-surface-secondary)' }}>
              <strong>Footer</strong>
            </Footer>
          </Layout>
        </section>

        {/* Grid System Demo */}
        <section className="app-section">
          <h2>📐 Grid System</h2>
          <p>12-column responsive grid with breakpoint support.</p>
          
          <div className="demo-section">
            <h3>Responsive Columns</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card elevation={2} padding="md">
                  <div style={{ textAlign: 'center' }}>xs=12, sm=6, md=4, lg=3</div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card elevation={2} padding="md">
                  <div style={{ textAlign: 'center' }}>xs=12, sm=6, md=4, lg=3</div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card elevation={2} padding="md">
                  <div style={{ textAlign: 'center' }}>xs=12, sm=6, md=4, lg=3</div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card elevation={2} padding="md">
                  <div style={{ textAlign: 'center' }}>xs=12, sm=6, md=4, lg=3</div>
                </Card>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Card Component Demo */}
        <section className="app-section">
          <h2>🃏 Card Component</h2>
          <p>Versatile content containers with elevation and variants.</p>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={1} padding="lg">
                <h3 style={{ marginTop: 0 }}>Low Elevation</h3>
                <p>Subtle shadow for minimal depth.</p>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={8} padding="lg">
                <h3 style={{ marginTop: 0 }}>Medium Elevation</h3>
                <p>Moderate shadow for emphasis.</p>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={16} padding="lg">
                <h3 style={{ marginTop: 0 }}>High Elevation</h3>
                <p>Strong shadow for prominence.</p>
              </Card>
            </Grid>
          </Grid>
        </section>

        {/* Stack Component Demo */}
        <section className="app-section">
          <h2>📚 Stack Component</h2>
          <p>Flexbox container with consistent spacing.</p>
          
          <div className="demo-section">
            <h3>Vertical Stack</h3>
            <Stack direction="column" spacing="md">
              <div className="demo-item demo-item--primary">Stack Item 1</div>
              <div className="demo-item demo-item--secondary">Stack Item 2</div>
              <div className="demo-item demo-item--success">Stack Item 3</div>
            </Stack>
          </div>

          <div className="demo-section">
            <h3>Horizontal Stack</h3>
            <Stack direction="row" spacing="lg">
              <div className="demo-item demo-item--info">Item A</div>
              <div className="demo-item demo-item--warning">Item B</div>
              <div className="demo-item demo-item--error">Item C</div>
            </Stack>
          </div>
        </section>

        {/* Space Component Demo */}
        <section className="app-section">
          <h2>↔️ Space Component</h2>
          <p>Add spacing between inline elements.</p>
          
          <div className="demo-section">
            <h3>Horizontal Spacing</h3>
            <Space size="medium">
              <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--psc-color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Button 1
              </button>
              <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--psc-color-secondary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Button 2
              </button>
              <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--psc-color-success)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Button 3
              </button>
            </Space>
          </div>
        </section>

        {/* Divider Component Demo */}
        <section className="app-section">
          <h2>➖ Divider Component</h2>
          <p>Visual separators for content sections.</p>
          
          <div className="demo-section">
            <div className="demo-item demo-item--small">Content Above</div>
            <Divider />
            <div className="demo-item demo-item--small">Content Below</div>
          </div>

          <div className="demo-section">
            <Divider title="Section Title" />
          </div>

          <div className="demo-section">
            <Stack direction="row" spacing="md" alignItems="center">
              <div className="demo-item demo-item--small">Left</div>
              <Divider orientation="vertical" />
              <div className="demo-item demo-item--small">Right</div>
            </Stack>
          </div>
        </section>

        {/* Container Component Demo */}
        <section className="app-section">
          <h2>📦 Container Component</h2>
          <p>Versatile layout container with flex and grid support.</p>
          
          <div className="demo-section">
            <h3>Flex Container - Row</h3>
            <Container layout="flex" gap="md" justifyContent="space-between">
              <div className="demo-item demo-item--primary">Flex Start</div>
              <div className="demo-item demo-item--secondary">Center</div>
              <div className="demo-item demo-item--success">Flex End</div>
            </Container>
          </div>

          <div className="demo-section">
            <h3>Grid Container</h3>
            <Container layout="grid" gap="lg">
              <div className="demo-item demo-item--info">Grid 1</div>
              <div className="demo-item demo-item--warning">Grid 2</div>
              <div className="demo-item demo-item--error">Grid 3</div>
              <div className="demo-item demo-item--primary">Grid 4</div>
            </Container>
          </div>
        </section>

        {/* Example Component Demo */}
        <section className="app-section">
          <h2>🧩 Interactive Example</h2>
          <p>A demonstration component with stateful interactions.</p>
          <ExampleComponent />
        </section>

        {/* Responsive Dashboard Example */}
        <section className="app-section">
          <h2>💼 Responsive Dashboard</h2>
          <p>Real-world layout example combining multiple components.</p>
          
          <Grid container spacing={3}>
            {/* Stat Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} padding="lg">
                <Stack direction="column" spacing="sm" alignItems="center">
                  <div style={{ fontSize: '2rem' }}>📊</div>
                  <h3 style={{ margin: 0 }}>1,234</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--psc-color-text-secondary)' }}>Total Users</p>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} padding="lg">
                <Stack direction="column" spacing="sm" alignItems="center">
                  <div style={{ fontSize: '2rem' }}>💰</div>
                  <h3 style={{ margin: 0 }}>$45.2K</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--psc-color-text-secondary)' }}>Revenue</p>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} padding="lg">
                <Stack direction="column" spacing="sm" alignItems="center">
                  <div style={{ fontSize: '2rem' }}>📈</div>
                  <h3 style={{ margin: 0 }}>+18.2%</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--psc-color-text-secondary)' }}>Growth</p>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} padding="lg">
                <Stack direction="column" spacing="sm" alignItems="center">
                  <div style={{ fontSize: '2rem' }}>⭐</div>
                  <h3 style={{ margin: 0 }}>4.8/5</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--psc-color-text-secondary)' }}>Rating</p>
                </Stack>
              </Card>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <Card elevation={2} padding="xl">
                <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
                <Stack direction="column" spacing="md">
                  <div className="demo-item demo-item--small">User John Doe registered</div>
                  <div className="demo-item demo-item--small">New order #1234 received</div>
                  <div className="demo-item demo-item--small">Payment processed successfully</div>
                </Stack>
              </Card>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Card elevation={2} padding="xl">
                <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
                <Stack direction="column" spacing="sm">
                  <button style={{ padding: '0.75rem', backgroundColor: 'var(--psc-color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                    Add User
                  </button>
                  <button style={{ padding: '0.75rem', backgroundColor: 'var(--psc-color-secondary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                    View Reports
                  </button>
                  <button style={{ padding: '0.75rem', backgroundColor: 'var(--psc-color-success)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                    Export Data
                  </button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </section>
      </Container>

      {/* Footer */}
      <Container as="footer" className="app-footer">
        <p style={{ margin: 0 }}>
          © 2024 Preact SCSS Components • Built with ❤️ using Preact & SCSS
        </p>
      </Container>
    </Container>
  );
}