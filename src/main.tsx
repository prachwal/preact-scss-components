import { render } from 'preact';
import { useContext } from 'preact/hooks';
import { ThemeProvider, ThemeContext, getThemeLabel, getThemeIcon } from '.';
import { ExampleComponent } from '.';
import './main.scss';

function App() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Loading...</div>;
  }

  const { theme, currentTheme, toggleTheme } = themeContext;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">
          Preact SCSS Components Demo
        </h1>
        <button
          className="app-header__theme-button"
          onClick={toggleTheme}
        >
          Motyw: {getThemeLabel(theme)} ({getThemeIcon(currentTheme)})
        </button>
      </header>
      <main className="app-main">
        <ExampleComponent />
      </main>
    </div>
  );
}

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')!
);