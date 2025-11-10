import { useContext } from 'preact/hooks';
import { ThemeContext } from '@providers';
import { ExampleComponent, Container, getThemeIcon, getThemeLabel } from '@components';

import './App.scss';

/**
 * Main application component that renders the demo interface for Preact SCSS components.
 * 
 * This component uses the ThemeContext to manage theme state and provides a header
 * with theme toggle functionality and a main content area displaying example components.
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
      <Container as="header" className="app-header">
        <h1 className="app-header__title">
          Preact SCSS Components Demo
        </h1>
        <button
          type={'button'}
          className="app-header__theme-button"
          onClick={toggleTheme}
        >
          Motyw: {getThemeLabel(theme)} ({getThemeIcon(currentTheme)})
        </button>
      </Container>

      <Container as="main" className="app-main">
        <ExampleComponent />
        
        <Container as="section" className="app-demo">
          <h2>Container Component Demo</h2>
          
          <h3>Flex Layout (div)</h3>
          <Container layout="flex" direction="row" gap="1rem" className="demo-flex">
            <div className="demo-item">Item 1</div>
            <div className="demo-item">Item 2</div>
            <div className="demo-item">Item 3</div>
          </Container>
          
          <h3>Flex Layout Column (section)</h3>
          <Container as="section" layout="flex" direction="column" gap="0.5rem" className="demo-flex-column" aria-label="Vertical layout">
            <div className="demo-item">Item A</div>
            <div className="demo-item">Item B</div>
            <div className="demo-item">Item C</div>
          </Container>
          
          <h3>Grid Layout (article)</h3>
          <Container as="article" layout="grid" gap="1rem" className="demo-grid">
            <div className="demo-item">Grid 1</div>
            <div className="demo-item">Grid 2</div>
            <div className="demo-item">Grid 3</div>
            <div className="demo-item">Grid 4</div>
          </Container>
        </Container>
      </Container>

      <Container as="footer" className="app-footer">
        <p>© 2024 Preact SCSS Components. Wszelkie prawa zastrzeżone.</p>
      </Container>
    </Container>
  );
}