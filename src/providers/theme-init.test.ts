import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getStoredTheme, injectThemeToHTML, setupSystemThemeListener, type Theme } from './theme-init'

// Mock browser APIs globally
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
})

vi.stubGlobal('matchMedia', vi.fn())

vi.stubGlobal('document', {
  documentElement: {
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
  },
})

describe('Theme Initialization Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getStoredTheme', () => {
    it('returns system theme when window is undefined', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      expect(getStoredTheme()).toBe('system')

      global.window = originalWindow
    })

    it('returns stored theme when valid', () => {
      ;(localStorage.getItem as any).mockReturnValue('dark')
      expect(getStoredTheme()).toBe('dark')
    })

    it('returns system theme when stored value is invalid', () => {
      ;(localStorage.getItem as any).mockReturnValue('invalid')
      expect(getStoredTheme()).toBe('system')
    })

    it('returns system theme when localStorage is null', () => {
      ;(localStorage.getItem as any).mockReturnValue(null)
      expect(getStoredTheme()).toBe('system')
    })

    it('handles localStorage errors gracefully', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      ;(localStorage.getItem as any).mockImplementation(() => {
        throw new Error('localStorage error')
      })

      expect(getStoredTheme()).toBe('system')
      expect(consoleWarnSpy).toHaveBeenCalledWith('Failed to read theme from localStorage:', expect.any(Error))

      consoleWarnSpy.mockRestore()
    })
  })

  describe('injectThemeToHTML', () => {
    it('does nothing when window is undefined', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      injectThemeToHTML('dark')

      global.window = originalWindow
    })

    it('sets data-theme attribute for light theme', () => {
      injectThemeToHTML('light')
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light')
    })

    it('sets data-theme attribute for dark theme', () => {
      injectThemeToHTML('dark')
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
    })

    it('sets data-theme attribute for system theme with light preference', () => {
      ;(matchMedia as any).mockReturnValue({ matches: false })
      injectThemeToHTML('system')
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light')
    })

    it('sets data-theme attribute for system theme with dark preference', () => {
      ;(matchMedia as any).mockReturnValue({ matches: true })
      injectThemeToHTML('system')
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
    })

    it('handles matchMedia errors gracefully', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      ;(matchMedia as any).mockImplementation(() => {
        throw new Error('matchMedia error')
      })

      injectThemeToHTML('system')
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light')

      consoleWarnSpy.mockRestore()
    })
  })

  describe('setupSystemThemeListener', () => {
    it('does nothing when window is undefined', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const signal = { value: 'light' }
      setupSystemThemeListener(signal as any)

      global.window = originalWindow
    })

    it('sets up event listener for system theme changes', () => {
      const signal = { value: 'light' }
      const mockMediaQuery = {
        addEventListener: vi.fn(),
      }
      ;(matchMedia as any).mockReturnValue(mockMediaQuery)

      setupSystemThemeListener(signal as any)

      expect(matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
      expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

      // Trigger the event listener to ensure the anonymous function is executed
      const callback = mockMediaQuery.addEventListener.mock.calls[0][1]
      callback({ matches: true })
      expect(signal.value).toBe('dark')

      callback({ matches: false })
      expect(signal.value).toBe('light')
    })

    it('handles addEventListener errors gracefully', () => {
      const signal = { value: 'light' }
      const mockMediaQuery = {
        addEventListener: vi.fn(() => {
          throw new Error('addEventListener error')
        }),
      }
      ;(matchMedia as any).mockReturnValue(mockMediaQuery)

      // This should not throw
      expect(() => setupSystemThemeListener(signal as any)).not.toThrow()
    })
  })
})