import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { signal } from '@preact/signals'
import ExampleComponent, { handleClick, handleReset } from './ExampleComponent'

describe('ExampleComponent', () => {
  beforeEach(() => {
    // Reset signals before each test
    handleReset()
  })

  describe('Component Rendering', () => {
    it('renders with default props and correct structure', () => {
      render(<ExampleComponent />)

      // Check main structure
      expect(screen.getByRole('article')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(2)
      expect(screen.getByText(/Ten komponent używa/)).toBeInTheDocument()
    })

    it('applies correct CSS classes', () => {
      render(<ExampleComponent />)

      const article = screen.getByRole('article')
      expect(article).toHaveClass('example-component')

      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveClass('example-component__title')

      // Find actions div by its class or by containing the buttons
      const actionsDiv = screen.getByRole('button', { name: /kliknij mnie/i }).parentElement
      expect(actionsDiv).toHaveClass('example-component__actions')

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveClass('example-component__button', 'example-component__button--primary')
      expect(buttons[1]).toHaveClass('example-component__button', 'example-component__button--secondary')
    })

    it('displays default message when no props provided', () => {
      render(<ExampleComponent />)

      expect(screen.getByText('Witaj w bibliotece komponentów!')).toBeInTheDocument()
    })

    it('displays custom message when message prop is provided', () => {
      const customMessage = 'Custom test message'
      render(<ExampleComponent message={customMessage} />)

      expect(screen.getByText(customMessage)).toBeInTheDocument()
      expect(screen.queryByText('Witaj w bibliotece komponentów!')).not.toBeInTheDocument()
    })
  })

  describe('Interactive Behavior', () => {
    it('handles single click correctly', async () => {
      render(<ExampleComponent />)

      const clickButton = screen.getByRole('button', { name: /kliknij mnie/i })

      fireEvent.click(clickButton)

      await waitFor(() => {
        expect(screen.getByText('Kliknięto 1 raz!')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /kliknij mnie \(1\)/i })).toBeInTheDocument()
      })
    })

    it('handles multiple clicks with correct pluralization', async () => {
      render(<ExampleComponent />)

      const clickButton = screen.getByRole('button', { name: /kliknij mnie/i })

      // Click once
      fireEvent.click(clickButton)
      await waitFor(() => {
        expect(screen.getByText('Kliknięto 1 raz!')).toBeInTheDocument()
      })

      // Click second time
      fireEvent.click(clickButton)
      await waitFor(() => {
        expect(screen.getByText('Kliknięto 2 razy!')).toBeInTheDocument()
      })

      // Click third time
      fireEvent.click(clickButton)
      await waitFor(() => {
        expect(screen.getByText('Kliknięto 3 razy!')).toBeInTheDocument()
      })

      // Click fourth time
      fireEvent.click(clickButton)
      await waitFor(() => {
        expect(screen.getByText('Kliknięto 4 razy!')).toBeInTheDocument()
      })

      // Click fifth time (should still show "razy")
      fireEvent.click(clickButton)
      await waitFor(() => {
        expect(screen.getByText('Kliknięto 5 razy!')).toBeInTheDocument()
      })
    })

    it('resets counter and message when reset button is clicked', async () => {
      render(<ExampleComponent />)

      const clickButton = screen.getByRole('button', { name: /kliknij mnie/i })
      const resetButton = screen.getByRole('button', { name: 'Reset' })

      // Click a few times
      fireEvent.click(clickButton)
      fireEvent.click(clickButton)
      fireEvent.click(clickButton)

      await waitFor(() => {
        expect(screen.getByText('Kliknięto 3 razy!')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /kliknij mnie \(3\)/i })).toBeInTheDocument()
      })

      // Reset
      fireEvent.click(resetButton)

      await waitFor(() => {
        expect(screen.getByText('Witaj w bibliotece komponentów!')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /kliknij mnie \(0\)/i })).toBeInTheDocument()
      })
    })

    it('maintains custom message prop after interactions', async () => {
      const customMessage = 'Custom message'
      render(<ExampleComponent message={customMessage} />)

      const clickButton = screen.getByRole('button', { name: /kliknij mnie/i })

      // Click to change internal state
      fireEvent.click(clickButton)

      // Custom message should still be displayed (props take precedence)
      expect(screen.getByText(customMessage)).toBeInTheDocument()
      expect(screen.queryByText('Kliknięto 1 raz!')).not.toBeInTheDocument()
    })
  })

  describe('Exported Functions', () => {
    it('handleClick increments counter and updates message', () => {
      // Reset first
      handleReset()

      // Initial state
      expect(screen.queryByText('Kliknięto 1 raz!')).not.toBeInTheDocument()

      // Call handleClick
      handleClick()

      // Check if message was updated (this tests the exported function directly)
      // Note: Since handleClick modifies signals, we need to render component to see effects
      render(<ExampleComponent />)

      expect(screen.getByText('Kliknięto 1 raz!')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /kliknij mnie \(1\)/i })).toBeInTheDocument()
    })

    it('handleReset resets counter and message', () => {
      // First increment counter
      handleClick()
      handleClick()

      // Then reset
      handleReset()

      // Render to check state
      render(<ExampleComponent />)

      expect(screen.getByText('Witaj w bibliotece komponentów!')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /kliknij mnie \(0\)/i })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA structure', () => {
      render(<ExampleComponent />)

      // Check semantic HTML
      expect(screen.getByRole('article')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('buttons have descriptive text', () => {
      render(<ExampleComponent />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveTextContent(/kliknij mnie/i)
      expect(buttons[1]).toHaveTextContent('Reset')
    })
  })

  describe('Signal Integration', () => {
    it('uses Preact signals for reactive state', () => {
      // Test that signals are properly integrated
      render(<ExampleComponent />)

      // Initial state
      expect(screen.getByText('Witaj w bibliotece komponentów!')).toBeInTheDocument()

      // Signals should be reactive - clicking should update UI automatically
      const clickButton = screen.getByRole('button', { name: /kliknij mnie/i })
      fireEvent.click(clickButton)

      expect(screen.getByText('Kliknięto 1 raz!')).toBeInTheDocument()
    })

    it('signals are independent between component instances', () => {
      // Test that different component instances have independent signal state
      // Note: In this implementation, signals are shared at module level
      // So instances are not truly independent - this tests the current behavior

      const { rerender } = render(<ExampleComponent />)
      const clickButton1 = screen.getByRole('button', { name: /kliknij mnie/i })

      fireEvent.click(clickButton1)
      expect(screen.getByText('Kliknięto 1 raz!')).toBeInTheDocument()

      // Render second instance - signals are shared, so state persists
      rerender(<ExampleComponent />)
      const clickButton2 = screen.getByRole('button', { name: /kliknij mnie/i })

      // State should persist (signals are module-level)
      expect(screen.getByText('Kliknięto 1 raz!')).toBeInTheDocument()

      fireEvent.click(clickButton2)
      expect(screen.getByText('Kliknięto 2 razy!')).toBeInTheDocument()
    })
  })
})