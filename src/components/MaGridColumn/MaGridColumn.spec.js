import { render } from '@testing-library/vue'
import MaGridColumn from './MaGridColumn'

describe('GridColumn', () => {
  test('renders the DOM element specified in the prop', () => {
    const { queryByRole } = render(MaGridColumn, {
      context: Object.assign({
        props: {
          tag: 'section',
        },
      }),
    })

    expect(queryByRole('region')).toBeInTheDocument()
  })

  test('adds the wanted class names', () => {
    const { getByTestId } = render(MaGridColumn, {
      context: Object.assign({
        class: {
          'ma-grid-col--12': true,
        },
        attrs: {
          'data-testid': 'col',
        },
      }),
    })

    expect(getByTestId('col')).toHaveClass('ma-grid-col')
    expect(getByTestId('col')).toHaveClass('ma-grid-col--12')
  })

  test('renders the default slot', () => {
    const defaultSlot = 'default slot content'
    const { queryByText } = render(MaGridColumn, {
      slots: {
        default: defaultSlot,
      },
    })

    expect(queryByText(defaultSlot)).toBeInTheDocument()
  })
})
