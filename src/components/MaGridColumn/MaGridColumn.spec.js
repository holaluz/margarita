import { render } from '@testing-library/vue'
import MaGridColumn from './MaGridColumn'

describe('GridColumn', () => {
  test('renders DOM element specified in the prop', () => {
    const { queryByRole } = render(MaGridColumn, {
      context: Object.assign({
        props: {
          tag: 'nav',
        },
      }),
    })

    expect(queryByRole('navigation')).toBeInTheDocument()
  })

  test('renders custom class', () => {
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

  test('renders default slot', () => {
    const defaultSlot = 'default slot content'
    const { queryByText } = render(MaGridColumn, {
      slots: {
        default: defaultSlot,
      },
    })

    expect(queryByText(defaultSlot)).toBeInTheDocument()
  })
})
