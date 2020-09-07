import { render } from '@testing-library/vue'
import MaStack from './MaStack'
import responsivePlugin from '@margarita/plugins/responsivePlugin'

describe('Stack', () => {
  test('adds spacing classes', () => {
    const { contentWrapper } = renderComponent({ space: 'large' })

    expect(contentWrapper).toHaveClass('stack--space-large')
  })

  test('adds spacing classes from array', () => {
    const { contentWrapper } = renderComponent({ space: ['small', 'large'] })

    expect(contentWrapper).toHaveClass('stack--space-small')
  })

  test('adds alignment classes', () => {
    const { contentWrapper } = renderComponent({ align: 'right' })

    expect(contentWrapper).toHaveClass('stack--align-right')
  })

  test('aligns to left by default', () => {
    const { contentWrapper } = renderComponent()

    expect(contentWrapper).toHaveClass('stack--align-left')
  })

  test('adds alignment classes from array', () => {
    const { contentWrapper } = renderComponent({ align: ['center', 'right'] })

    expect(contentWrapper).toHaveClass('stack--align-center')
  })
})

function renderComponent(props) {
  const utils = render(
    MaStack,
    {
      props: { space: 'small', ...props },
      slots: { default: 'content' },
    },
    (vue) => {
      vue.use(responsivePlugin)
      // this.$layout.currentBreakpoint is 'mobile' by default
    }
  )

  const contentWrapper = utils.getByText('content')

  return {
    ...utils,
    contentWrapper,
  }
}
