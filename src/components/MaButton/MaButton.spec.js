import { render, fireEvent } from '@testing-library/vue'
import MaButton from './MaButton'

describe('Button', () => {
  it('renders a button element by default', () => {
    const { getByText, getByRole } = render(MaButton, {
      slots: { default: 'Hello World' },
    })

    getByText(/Hello World/i)
    expect(getByRole('button').type).toStrictEqual('submit')
  })

  it('renders a link element on passing the right prop', () => {
    const href = 'http://link.com/'

    const { getByRole } = render(MaButton, {
      props: { tag: 'a', href },
    })

    expect(getByRole('link').href).toBe(href)
  })

  it('emits on click', async () => {
    const { emitted, getByRole } = render(MaButton)

    await fireEvent.click(getByRole('button'))

    expect(emitted()).toHaveProperty('click')
    expect(emitted().click).toHaveLength(1)
  })

  it('renders a disabled button if disabled prop is passed', () => {
    const { getByRole } = render(MaButton, {
      props: { disabled: true },
    })

    expect(getByRole('button').disabled).toBe(true)
  })

  it('renders a loading state if loading prop is passed', () => {
    const { getByTitle, getByRole } = render(MaButton, {
      props: { loading: true },
    })

    expect(getByRole('button').disabled).toBe(true)
    getByTitle(/loading/i)
  })
})
