import { render } from '@testing-library/vue'
import MaGridContainer from './MaGridContainer'

const ContainerBuilder = options => {
  const utils = render(MaGridContainer, {
    attrs: {
      'data-testid': 'container',
    },
    ...options,
  })

  return {
    gridContainer: utils.getByTestId('container'),
    ...utils,
  }
}

describe('GridContainer', () => {
  test('renders the DOM element specified in the prop', () => {
    const { gridContainer } = ContainerBuilder({
      context: {
        props: {
          tag: 'section',
        },
      },
    })

    expect(gridContainer.nodeName).toBe('SECTION')
  })

  test('adds a class based in a prop', () => {
    const { gridContainer } = ContainerBuilder({
      context: {
        props: {
          fluid: true,
        },
      },
    })

    expect(gridContainer.classList).toContain('ma-grid-container--fluid')
  })

  test('adds the passed class names', () => {
    const { gridContainer } = ContainerBuilder({
      context: {
        class: {
          'test-class': true,
        },
      },
    })

    expect(gridContainer.classList).toContain('ma-grid-container')
    expect(gridContainer.classList).toContain('test-class')
  })

  test('renders the default slot', () => {
    const defaultSlot = 'default slot text'
    const { getByText } = ContainerBuilder({
      slots: {
        default: defaultSlot,
      },
    })

    getByText(defaultSlot)
  })
})
