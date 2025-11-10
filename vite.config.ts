import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), dts()],
  resolve: {
    alias: {
      '@styles': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/styles'),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PreactScssComponents',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['preact', 'preact/hooks'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'index.css';
          }
          return assetInfo.name || 'assets/[name]-[hash][extname]';
        },
        globals: {
          preact: 'Preact',
          'preact/hooks': 'PreactHooks',
        },
      },
    },
  },
});