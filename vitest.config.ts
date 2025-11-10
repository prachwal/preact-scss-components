import { defineConfig } from 'vitest/config'
import { default as config } from './vite.config.js'

export default defineConfig({...config,
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'coverage/',
        'src/main.tsx',
        'src/index.ts',
        'src/styles/**',
        '**/*.scss',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})