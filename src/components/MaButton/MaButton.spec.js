import { render, fireEvent } from '@testing-library/vue'
import MaButton from './MaButton'

describe('Button', () => {
  test('renders a button element by default', () => {
    const { queryByText, queryByRole } = render(MaButton, {
      slots: { default: 'Hello World' },
    })

    expect(queryByText(/Hello World/i)).toBeInTheDocument()
    expect(queryByRole('button')).toBeInTheDocument()
  })

  test('renders a link element on passing the right prop', () => {
    const href = 'http://link.com/'

    const { getByRole } = render(MaButton, {
      props: { tag: 'a', href },
    })

    expect(getByRole('link')).toHaveAttribute('href', href)
  })

  test('emits on click', async () => {
    const { emitted, getByRole } = render(MaButton)

    await fireEvent.click(getByRole('button'))

    expect(emitted()).toHaveProperty('click')
    expect(emitted().click).toHaveLength(1)
  })

  test('renders a disabled button if disabled prop is passed', () => {
    const { getByRole } = render(MaButton, {
      props: { disabled: true },
    })

    expect(getByRole('button')).toBeDisabled()
  })

  test('renders a loading state if loading prop is passed', () => {
    const { queryByTitle, getByRole } = render(MaButton, {
      props: { loading: true },
    })

    expect(getByRole('button')).toBeDisabled()
    expect(queryByTitle(/loading/i)).toBeInTheDocument()
  })
})
