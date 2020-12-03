import { render } from '@testing-library/vue'
import MaAlert from './MaAlert'

describe('Alert', () => {
  test('renders title', () => {
    const title = 'This is a title'

    const { getByText } = render(MaAlert, {
      props: { title },
    })

    expect(getByText(title)).toBeInTheDocument()
  })

  test('renders default slot content', () => {
    const slotDefault = 'This is a slot'

    const { getByText } = render(MaAlert, {
      slots: { default: slotDefault },
    })

    expect(getByText(slotDefault)).toBeInTheDocument()
  })

  test('renders the provided text', () => {
    const text = 'This is a text'

    const { getByText } = render(MaAlert, {
      props: { text },
    })

    expect(getByText(text)).toBeInTheDocument()
  })

  test('text is not rendered if default slot is provided', () => {
    const text = 'This is a text'
    const slotDefault = 'This is a slot'

    const { queryByText, getByText } = render(MaAlert, {
      props: { text },
      slots: { default: slotDefault },
    })

    expect(getByText(slotDefault)).toBeInTheDocument()
    expect(queryByText(text)).not.toBeInTheDocument()
  })
})
