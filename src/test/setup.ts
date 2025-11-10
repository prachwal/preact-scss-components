import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/preact'
import '@testing-library/jest-dom'

// Mock browser APIs globally before any module imports
vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})))

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
})

// Don't mock document globally as it breaks testing-library
// Instead, mock document.documentElement.setAttribute in specific tests if needed

// Automatyczne czyszczenie po każdym teście
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})