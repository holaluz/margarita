import { render } from '@margarita/margarita-test-utils'
import MaContainer from './MaContainer'

describe('Container', () => {
  test('renders a container', () => {
    const { getByText } = render(MaContainer, {
      slots: { default: 'Hello World' },
      props: { size: 'small' },
    })

    expect(getByText(/hello world/i)).toHaveClass('ma-container--small')
  })
})
