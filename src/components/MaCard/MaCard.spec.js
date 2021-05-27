import { render } from '@margarita/margarita-test-utils'
import MaCard from './MaCard'

describe('Card', () => {
  test('renders a card element by default', () => {
    const { contentWrapper } = renderComponent()
    expect(contentWrapper).toBeVisible()
  })

  test('renders the default grey variant when we do not specify the prop color', () => {
    const { contentWrapper } = renderComponent()

    expect(contentWrapper).toHaveClass('ma-card--gray')
  })

  test('renders the white variant when we specify the white prop color', () => {
    const { contentWrapper } = renderComponent({
      tone: 'white',
    })

    expect(contentWrapper).toHaveClass('ma-card--white')
  })
})

function renderComponent(props = {}) {
  const utils = render(MaCard, {
    props,
    slots: { default: 'content' },
  })
  const contentWrapper = utils.getByText('content')
  return {
    ...utils,
    contentWrapper,
  }
}
