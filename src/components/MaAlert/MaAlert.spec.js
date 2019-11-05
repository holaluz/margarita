import { render } from '@testing-library/vue'
import MaAlert from './MaAlert'

describe('Alert', () => {
  test(`renders a title and slot's content`, () => {
    const title = 'This is a title'
    const slotDefault = 'This is a slot'

    const { queryByText } = render(MaAlert, {
      props: { title },
      slots: { default: slotDefault },
    })

    expect(queryByText(title)).toBeInTheDocument()
    expect(queryByText(slotDefault)).toBeInTheDocument()
  })

  test('renders the provided text', () => {
    const text = 'This is a text'

    const { queryByText } = render(MaAlert, {
      props: { text },
    })

    expect(queryByText(text)).toBeInTheDocument()
  })

  test(`doesn't render the provided text if a slot is provided`, () => {
    const text = 'This is a text'
    const slotDefault = 'This is a slot'

    const { queryByText } = render(MaAlert, {
      props: { text },
      slots: { default: slotDefault },
    })

    expect(queryByText(slotDefault)).toBeInTheDocument()
    expect(queryByText(text)).not.toBeInTheDocument()
  })
})
