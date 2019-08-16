import { render } from '@testing-library/vue'
import MaGridRow from './MaGridRow'

describe('GridRow', () => {
  it('renders content from default slot', () => {
    const { getByText } = render(MaGridRow, {
      slots: { default: 'Hello World' },
    })

    getByText(/Hello World/i)
  })

  it('renders the specified tag', () => {
    const { getByTestId } = render(MaGridRow, {
      props: { tag: 'span' },
      attrs: { 'data-testid': 'row' },
    })

    expect(getByTestId('row').nodeName).toBe('SPAN')
  })

  it('adds a class based in a prop', async () => {
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

    const gridRowClasses = getByTestId('row').classList

    expect(gridRowClasses).toContain('ma-grid-row--no-gutters')
    expect(gridRowClasses).toContain('ma-grid-row--has-margin-top')
    expect(gridRowClasses).toContain('ma-grid-row--no-margin-bottom')
    expect(gridRowClasses).toContain('ma-grid-row--direction-column')
  })
})
