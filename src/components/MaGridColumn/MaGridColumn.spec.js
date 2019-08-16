import { render } from '@testing-library/vue'
import MaGridColumn from './MaGridColumn'

describe('GridColumn', () => {
  it('renders the DOM element specified in the prop', () => {
    const { getByRole } = render(MaGridColumn, {
      context: Object.assign({
        props: {
          tag: 'section',
        },
      }),
    })

    getByRole('region')
  })

  it('adds the wanted class names', () => {
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

    expect(getByTestId('col').classList).toContain('ma-grid-col')
    expect(getByTestId('col').classList).toContain('ma-grid-col--12')
  })

  it('renders the default slot', () => {
    const defaultSlot = 'default slot content'
    const { getByText } = render(MaGridColumn, {
      slots: {
        default: defaultSlot,
      },
    })

    getByText(defaultSlot)
  })
})
