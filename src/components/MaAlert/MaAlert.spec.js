import { render, cleanup } from '@testing-library/vue'
import MaAlert from './MaAlert'

afterEach(cleanup)

describe('Alert', () => {
  it(`renders a title and slot's content`, () => {
    const title = 'This is a title'
    const slotDefault = 'This is a slot'

    const { getByText } = render(MaAlert, {
      props: { title },
      slots: { default: slotDefault },
    })

    getByText(title)
    getByText(slotDefault)
  })

  it('renders the provided text', () => {
    const text = 'This is a text'

    const { getByText } = render(MaAlert, {
      props: { text },
    })

    getByText(text)
  })

  it(`doesn't render the provided text if a slot is provided`, () => {
    const text = 'This is a text'
    const slotDefault = 'This is a slot'

    const { getByText, queryByText } = render(MaAlert, {
      props: { text },
      slots: { default: slotDefault },
    })

    getByText(slotDefault)
    expect(queryByText(text)).toBeNull()
  })
})
