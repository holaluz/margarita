import { render } from '@testing-library/vue'
import MaStack from './MaStack'
import { spacing } from '../../tokens'
import responsivePlugin from '@margarita/plugins/responsivePlugin'

describe('Stack', () => {
  test('adds spacing classes', () => {
    const { contentWrapper } = renderComponent({ space: 'large' })

    expect(contentWrapper).toHaveStyle({ gap: spacing.large })
  })

  test('adds spacing classes from array', () => {
    const { contentWrapper } = renderComponent({ space: ['small', 'large'] })

    expect(contentWrapper).toHaveStyle({ gap: spacing.small })
  })

  test('adds alignment classes', () => {
    const { contentWrapper } = renderComponent({ align: 'right' })

    expect(contentWrapper).toHaveClass('stack--align-right')
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
