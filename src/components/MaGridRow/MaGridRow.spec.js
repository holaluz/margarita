import { render } from '@testing-library/vue'
import MaGridRow from './MaGridRow'

describe('GridRow', () => {
  test('renders content from default slot', () => {
    const { queryByText } = render(MaGridRow, {
      slots: { default: 'Hello World' },
    })

    expect(queryByText(/Hello World/i)).toBeInTheDocument()
  })

  test('renders the specified tag', () => {
    const { getByTestId } = render(MaGridRow, {
      props: { tag: 'span' },
      attrs: { 'data-testid': 'row' },
    })

    expect(getByTestId('row').nodeName).toBe('SPAN')
  })

  test('adds a class based in a prop', () => {
    const { getByTestId } = render(MaGridRow, {
      props: {
        noGutters: true,
        noMarginBottom: true,
        directionColumn: true,
        hasMarginTop: true,
      },
      attrs: {
        'data-testid': 'row',
      },
    })

    const row = getByTestId('row')

    expect(row).toHaveClass('ma-grid-row--no-gutters')
    expect(row).toHaveClass('ma-grid-row--has-margin-top')
    expect(row).toHaveClass('ma-grid-row--no-margin-bottom')
    expect(row).toHaveClass('ma-grid-row--direction-column')
  })
})
