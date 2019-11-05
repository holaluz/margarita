import { render } from '@testing-library/vue'
import MaAlert from './MaAlert'

describe('Alert', () => {
  test('renders title', () => {
    const title = 'This is a title'

    const { queryByText } = render(MaAlert, {
      props: { title },
    })

    expect(queryByText(title)).toBeInTheDocument()
  })

  test('renders default slot content', () => {
    const slotDefault = 'This is a slot'

    const { queryByText } = render(MaAlert, {
      slots: { default: slotDefault },
    })

    expect(queryByText(slotDefault)).toBeInTheDocument()
  })

  test('renders the provided text', () => {
    const text = 'This is a text'

    const { queryByText } = render(MaAlert, {
      props: { text },
    })

    expect(queryByText(text)).toBeInTheDocument()
  })

  test('text is not rendered if default slot is provided', () => {
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
