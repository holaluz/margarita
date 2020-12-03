import { render } from '@testing-library/vue'
import MaGridColumn from './MaGridColumn'

describe('GridColumn', () => {
  test('renders DOM element specified in the prop', () => {
    const { getByRole } = render(MaGridColumn, {
      context: Object.assign({
        props: {
          tag: 'nav',
        },
      }),
    })

    expect(getByRole('navigation')).toBeInTheDocument()
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
    const { getByText } = render(MaGridColumn, {
      slots: {
        default: defaultSlot,
      },
    })

    expect(getByText(defaultSlot)).toBeInTheDocument()
  })
})
