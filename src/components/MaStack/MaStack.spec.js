import { render } from '@testing-library/vue'
import MaStack from './MaStack'

describe('Stack', () => {
  test('renders slot', () => {
    const slotContent = 'content'
    const { queryByText } = renderComponent({
      slots: {
        default: slotContent,
      },
    })

    expect(queryByText(slotContent)).toBeInTheDocument()
  })

  test('adds spacing classes', () => {
    const { component } = renderComponent({
      props: {
        space: 'small',
      },
    })

    expect(component).toHaveClass('stack--space-small')
  })

  test('adds alignment classes', () => {
    const { component } = renderComponent({
      props: {
        align: 'center',
      },
    })

    expect(component).toHaveClass('stack--align-center')
  })

  test('custom wrapper element', () => {
    const { queryByRole } = renderComponent({
      props: {
        component: 'ul',
      },
    })

    expect(queryByRole('list')).toBeInTheDocument()
  })
})

function renderComponent(opts) {
  const utils = render(MaStack, {
    ...opts,
    slots: {
      default: 'content',
    },
  })

  const component = utils.getByText('content')

  return {
    ...utils,
    component,
  }
}
