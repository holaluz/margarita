import { render } from '@testing-library/vue'
import MaGridContainer from './MaGridContainer'

describe('GridContainer', () => {
  test('renders DOM element specified in the prop', () => {
    const { gridContainer } = ContainerBuilder({
      context: {
        props: {
          tag: 'section',
        },
      },
    })

    expect(gridContainer.nodeName).toBe('SECTION')
  })

  test('renders fluid class', () => {
    const { gridContainer } = ContainerBuilder({
      context: {
        props: {
          fluid: true,
        },
      },
    })

    expect(gridContainer).toHaveClass('ma-grid-container--fluid')
  })

  test('renders custom class', () => {
    const customClass = 'test-class'
    const { gridContainer } = ContainerBuilder({
      context: {
        class: {
          [customClass]: true,
        },
      },
    })

    expect(gridContainer).toHaveClass(customClass)
  })

  test('renders default slot', () => {
    const defaultSlot = 'default slot text'
    const { getByText } = ContainerBuilder({
      slots: {
        default: defaultSlot,
      },
    })

    expect(getByText(defaultSlot)).toBeInTheDocument()
  })
})

function ContainerBuilder(options) {
  const utils = render(MaGridContainer, {
    attrs: {
      'data-testid': 'container',
    },
    ...options,
  })

  return {
    ...utils,
    gridContainer: utils.getByTestId('container'),
  }
}
