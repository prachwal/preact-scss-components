import { render } from 'preact';
import { ThemeProvider } from '.';
import { App } from '.';

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')!
);