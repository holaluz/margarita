import { render } from '@margarita/margarita-test-utils'
import MaStack from './MaStack'
import { spacing } from '../../tokens'

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

    expect(contentWrapper).toHaveStyle({ justifyItems: 'flex-end' })
  })

  test(`alignment class defaults to 'fill'`, () => {
    const { contentWrapper } = renderComponent({ space: 'medium' })

    expect(contentWrapper).toHaveStyle({ justifyItems: 'stretch' })
  })

  test('adds alignment classes from array', () => {
    const { contentWrapper } = renderComponent({ align: ['center', 'right'] })

    expect(contentWrapper).toHaveStyle({ justifyItems: 'center' })
  })

  test('keeps additional attributes', () => {
    const { getByText } = render({
      components: { MaStack },
      template: `
      <ma-stack space="small" :class="['custom-class']" id="123" random-attr>
        content
      </ma-stack>
      `,
    })

    const content = getByText('content')

    expect(content).toHaveAttribute('id', '123')
    expect(content).toHaveAttribute('random-attr')
    expect(content).toHaveClass('custom-class', 'stack')
  })
})

function renderComponent(props) {
  const utils = render(MaStack, {
    props: { space: 'small', ...props },
    slots: { default: 'content' },
  })

  const contentWrapper = utils.getByText('content')

  return {
    ...utils,
    contentWrapper,
  }
}
