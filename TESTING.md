# Testing

This project uses [Vitest](https://vitest.dev/) for unit testing with [Testing Library](https://testing-library.com/) for Preact components and [jsdom](https://github.com/jsdom/jsdom) for DOM simulation.

## Running Tests

```bash
# Run tests once (CI mode)
npm test

# Run tests in watch mode (development)
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests with UI (requires @vitest/ui)
npm run test:ui
```

## Test Structure

- Tests are located next to the components they test
- Test files use the `.test.tsx` extension
- Global setup is configured in `src/test/setup.ts`
- Vitest configuration in `vitest.config.ts`

## Coverage

Coverage reports are generated in the `coverage/` directory with:

- HTML report: `coverage/index.html`
- JSON report: `coverage/coverage.json`
- Text summary in terminal

Coverage thresholds are set to 80% for:

- Branches
- Functions
- Lines
- Statements

## Global Test Setup

The test environment includes global mocks for browser APIs:

- **`matchMedia`**: Mocked to return `false` by default (light theme)
- **`localStorage`**: Fully mocked with `getItem`, `setItem`, `removeItem`, `clear`
- **Automatic cleanup**: Testing Library cleanup runs after each test
- **Mock clearing**: All mocks are cleared after each test

## Writing Tests

### Component Testing

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Testing with Theme Context

```tsx
import { ThemeProvider } from '../Providers/ThemeProvider'

it('works with theme', () => {
  render(
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  )
})
```

### Testing Preact Signals

```tsx
import { signal } from '@preact/signals'

it('uses Preact signals for reactive state', () => {
  const countSignal = signal(0)
  render(<Counter count={countSignal} />)

  expect(screen.getByText('Count: 0')).toBeInTheDocument()

  // Update signal
  countSignal.value = 5
  expect(screen.getByText('Count: 5')).toBeInTheDocument()
})
```

### Mocking Browser APIs

```tsx
import { vi } from 'vitest'

// Mock localStorage for specific test
const localStorageMock = {
  getItem: vi.fn(() => 'dark'),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

it('handles localStorage operations', () => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  })

  render(<ThemeProvider />)
  expect(localStorageMock.getItem).toHaveBeenCalledWith('theme')
})
```

### Testing Error Handling

```tsx
it('handles localStorage errors gracefully', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  // Mock localStorage to throw error
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(() => { throw new Error('Storage quota exceeded') }),
      setItem: vi.fn(() => { throw new Error('Storage quota exceeded') }),
    }
  })

  // Should not throw and handle error gracefully
  expect(() => render(<ThemeProvider />)).not.toThrow()

  consoleSpy.mockRestore()
})
```

### Testing Async Behavior

```tsx
import userEvent from '@testing-library/user-event'

it('handles user interactions', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)

  const button = screen.getByRole('button', { name: /click me/i })
  await user.click(button)

  expect(screen.getByText('Button clicked')).toBeInTheDocument()
})
```

## Testing Patterns Used in This Project

### Theme Provider Testing

- **Error handling**: Tests for localStorage and matchMedia failures
- **System theme detection**: Tests for light/dark/system theme initialization
- **SSR compatibility**: Tests for server-side rendering scenarios
- **Signal reactivity**: Tests for reactive theme switching

### Component Testing 2

- **Props validation**: Tests for default and custom props
- **Interactive behavior**: Tests for user interactions and state changes
- **Accessibility**: Tests for ARIA attributes and semantic HTML
- **Signal integration**: Tests for Preact Signals reactivity
- **CSS classes**: Tests for correct BEM class application

### Utility Testing

- **Persistence utilities**: Tests for localStorage wrapper functions
- **Theme injection**: Tests for CSS custom property injection
- **SSR safety**: Tests for window/document availability checks

## Best Practices

1. **Use semantic queries** (`getByRole`, `getByLabelText`) over CSS selectors
2. **Test behavior, not implementation details**
3. **Mock external dependencies** (localStorage, fetch, matchMedia)
4. **Keep tests isolated and fast**
5. **Use descriptive test names**
6. **Test error scenarios** and edge cases
7. **Test accessibility** features
8. **Mock browser APIs** appropriately for each test
9. **Clean up after tests** (automatic via setup)
10. **Test Preact Signals** reactivity patterns

## Coverage Exclusions

The following files are excluded from coverage:

- `node_modules/`
- `dist/`
- `src/test/`
- `coverage/`
- Type definition files (`**/*.d.ts`)
- Config files (`**/*.config.*`)
- Main entry points (`src/main.tsx`, `src/index.ts`)
- Styles directory (`src/styles/**`)
- SCSS files (`**/*.scss`)

## Test Categories

### Unit Tests

- Individual functions and utilities
- Component rendering and props
- Signal reactivity
- Error handling

### Integration Tests

- Component interactions
- Theme provider integration
- Persistence layer integration

### Accessibility Tests

- ARIA attributes
- Keyboard navigation
- Screen reader compatibility
- Color contrast (via visual testing)

## Debugging Tests

### Common Issues

**Test fails due to missing cleanup:**

```tsx
// Solution: Use afterEach cleanup
import { cleanup } from '@testing-library/preact'

afterEach(() => {
  cleanup()
})
```

**Async test timeouts:**

```tsx
// Solution: Wait for elements or use fake timers
it('handles async operation', async () => {
  render(<AsyncComponent />)
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
```

**Signal updates not reflected:**

```tsx
// Solution: Signals are synchronous, no need for waitFor
it('signal updates immediately', () => {
  const signal = signal('initial')
  render(<Display value={signal} />)

  signal.value = 'updated'
  expect(screen.getByText('updated')).toBeInTheDocument()
})
```

## Continuous Integration

Tests run automatically on:

- Pre-commit hooks (via husky)
- Pull requests
- Main branch pushes
- Manual builds

Coverage reports are uploaded to external services for tracking.

- Config files
- Main entry points
