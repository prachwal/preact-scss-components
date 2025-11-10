import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { Grid } from './Grid'

describe('Grid', () => {
  describe('Component Rendering', () => {
    it('renders with default props', () => {
      render(<Grid>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid')
      expect(grid).toHaveTextContent('Content')
    })

    it('renders as container', () => {
      render(<Grid container>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container')
    })

    it('renders as item', () => {
      render(<Grid item>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item')
    })

    it('renders as both container and item', () => {
      render(<Grid container item>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--item')
    })

    it('applies custom className', () => {
      render(<Grid className="custom-class">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'custom-class')
    })

    it('passes through additional props', () => {
      render(<Grid id="test-grid" data-custom="value">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveAttribute('id', 'test-grid')
      expect(grid).toHaveAttribute('data-custom', 'value')
    })

    it('applies custom style object', () => {
      render(<Grid style={{ marginTop: '10px', color: 'red' }}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveStyle({ marginTop: '10px' })
      expect(grid).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })
  })

  describe('Breakpoint Classes', () => {
    it('applies xs breakpoint class', () => {
      render(<Grid item xs={6}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--xs-6')
    })

    it('applies multiple breakpoint classes', () => {
      render(<Grid item xs={12} sm={6} md={4}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--xs-12', 'grid--sm-6', 'grid--md-4')
    })

    it('applies auto sizing', () => {
      render(<Grid item xs="auto">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--xs-auto')
    })

    it('applies full width', () => {
      render(<Grid item xs={true}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--xs-true')
    })

    it('applies sm breakpoint class', () => {
      render(<Grid item sm={4}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--sm-4')
    })

    it('applies md breakpoint class', () => {
      render(<Grid item md={3}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--md-3')
    })

    it('applies lg breakpoint class', () => {
      render(<Grid item lg={2}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--lg-2')
    })

    it('applies xl breakpoint class', () => {
      render(<Grid item xl={1}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--xl-1')
    })

    it('ignores false breakpoint values', () => {
      render(<Grid item xs={false}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item')
      expect(grid).not.toHaveClass('grid--xs-false')
    })

    it('ignores undefined breakpoint values', () => {
      render(<Grid item xs={undefined}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item')
      expect(grid).not.toHaveClass('grid--xs-undefined')
    })

    it('ignores falsy breakpoint values', () => {
      render(<Grid item xs={0 as any}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item')
      expect(grid).not.toHaveClass('grid--xs-0')
    })
  })

  describe('Container Options', () => {
    it('applies spacing class', () => {
      render(<Grid container spacing={2}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--spacing-2')
    })

    it('applies direction class', () => {
      render(<Grid container direction="column">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--direction-column')
    })

    it('applies direction row-reverse', () => {
      render(<Grid container direction="row-reverse">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--direction-row-reverse')
    })

    it('applies direction column-reverse', () => {
      render(<Grid container direction="column-reverse">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--direction-column-reverse')
    })

    it('does not apply direction class for default row', () => {
      render(<Grid container direction="row">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container')
      expect(grid).not.toHaveClass('grid--container--direction-row')
    })

    it('applies justify content class', () => {
      render(<Grid container justifyContent="center">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--justify-center')
    })

    it('applies justify content flex-start', () => {
      render(<Grid container justifyContent="flex-start">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--justify-start')
    })

    it('applies justify content flex-end', () => {
      render(<Grid container justifyContent="flex-end">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--justify-end')
    })

    it('applies justify content space-between', () => {
      render(<Grid container justifyContent="space-between">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--justify-between')
    })

    it('applies justify content space-around', () => {
      render(<Grid container justifyContent="space-around">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--justify-around')
    })

    it('applies justify content space-evenly', () => {
      render(<Grid container justifyContent="space-evenly">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--justify-evenly')
    })

    it('applies align items class', () => {
      render(<Grid container alignItems="center">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--align-center')
    })

    it('applies align items flex-start', () => {
      render(<Grid container alignItems="flex-start">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--align-start')
    })

    it('applies align items flex-end', () => {
      render(<Grid container alignItems="flex-end">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--align-end')
    })

    it('applies align items stretch', () => {
      render(<Grid container alignItems="stretch">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--align-stretch')
    })

    it('applies align items baseline', () => {
      render(<Grid container alignItems="baseline">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--align-baseline')
    })

    it('does not apply align items class for undefined', () => {
      render(<Grid container alignItems={undefined}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container')
      expect(grid).not.toHaveClass('grid--container--align-undefined')
    })

    it('does not apply align items class for empty string', () => {
      render(<Grid container alignItems={'' as any}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container')
      expect(grid).not.toHaveClass('grid--container--align-')
    })

    it('does not apply align items class for null', () => {
      render(<Grid container alignItems={null as any}>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container')
      expect(grid).not.toHaveClass('grid--container--align-null')
    })

    it('applies wrap class', () => {
      render(<Grid container wrap="nowrap">Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--container', 'grid--container--wrap-nowrap')
    })

    it('applies zero min width class', () => {
      render(<Grid item zeroMinWidth>Content</Grid>)

      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('grid', 'grid--item', 'grid--item--zero-min-width')
    })
  })

  describe('Complex Layouts', () => {
    it('renders responsive grid layout', () => {
      render(
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            Item 1
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            Item 2
          </Grid>
          <Grid item xs={12} md={4}>
            Item 3
          </Grid>
        </Grid>
      )

      const allGrids = screen.getAllByTestId('grid')
      const container = allGrids[0]
      expect(container).toHaveClass('grid', 'grid--container', 'grid--spacing-3')

      const items = allGrids.slice(1)
      expect(items).toHaveLength(3)
      expect(items[0]).toHaveClass('grid', 'grid--item', 'grid--xs-12', 'grid--sm-6', 'grid--md-4')
      expect(items[1]).toHaveClass('grid', 'grid--item', 'grid--xs-12', 'grid--sm-6', 'grid--md-4')
      expect(items[2]).toHaveClass('grid', 'grid--item', 'grid--xs-12', 'grid--md-4')
    })

    it('renders nested grids', () => {
      render(
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                Nested 1
              </Grid>
              <Grid item xs={6}>
                Nested 2
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            Item 2
          </Grid>
        </Grid>
      )

      const allGrids = screen.getAllByTestId('grid')
      expect(allGrids).toHaveLength(6) // 1 container + 2 items + 1 nested container + 2 nested items
    })
  })

  describe('Accessibility', () => {
    it('renders with proper semantic structure', () => {
      render(
        <Grid container aria-label="Test grid">
          <Grid item>Item 1</Grid>
          <Grid item>Item 2</Grid>
        </Grid>
      )

      const container = screen.getAllByTestId('grid')[0]
      expect(container).toHaveAttribute('aria-label', 'Test grid')
    })
  })
})