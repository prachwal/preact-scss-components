import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), dts()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@application': path.resolve(__dirname, 'src/application'),
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