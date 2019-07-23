import { render, fireEvent, cleanup } from '@testing-library/vue'
import MaButton from './MaButton'

afterEach(cleanup)

describe('Button', () => {
  it('should render a button element by default', () => {
    const { getByText, getByRole } = render(MaButton, {
      slots: { default: 'Hello World' },
    })

    getByText(/Hello World/i)
    expect(getByRole('button').type).toEqual('submit')
  })

  it('should render a link element on passing the right prop', () => {
    const href = 'http://link.com/'

    const { getByRole } = render(MaButton, {
      props: { tag: 'a', href },
    })

    expect(getByRole('link').href).toBe(href)
  })

  it('should emit on click', async () => {
    const { emitted, getByRole } = render(MaButton)

    await fireEvent.click(getByRole('button'))

    expect(emitted().click).toHaveLength(1)
  })

  it('should be render a disabled button if disabled prop is passed', () => {
    const { getByRole } = render(MaButton, {
      props: { disabled: true },
    })

    expect(getByRole('button').disabled).toBe(true)
  })

  it('should render on loading state when loading prop is passed', () => {
    const { getByTestId, getByRole } = render(MaButton, {
      props: { loading: true },
    })

    expect(getByRole('button').disabled).toBe(true)
    getByTestId('button-spinner')
  })
})
