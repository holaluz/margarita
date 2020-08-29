import { render } from '@testing-library/vue'
import MaStack from './MaStack'

describe('Stack', () => {
  test('adds spacing classes', () => {
    const { contentWrapper } = renderComponent({ space: 'large' })

    expect(contentWrapper).toHaveClass('stack--space-large')
  })

  test('adds alignment classes', () => {
    const { contentWrapper } = renderComponent({ align: 'center' })

    expect(contentWrapper).toHaveClass('stack--align-center')
  })

  test('custom wrapper element', () => {
    const { queryByRole } = renderComponent({ component: 'ul' })

    expect(queryByRole('list')).toBeInTheDocument()
  })
})

function renderComponent(props) {
  const utils = render(MaStack, {
    props: {
      space: 'small',
      ...props,
    },
    slots: {
      default: 'content',
    },
  })

  const contentWrapper = utils.getByText('content')

  return {
    ...utils,
    contentWrapper,
  }
}
