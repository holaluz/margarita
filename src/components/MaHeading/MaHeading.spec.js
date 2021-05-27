import { render } from '@margarita/margarita-test-utils'
import MaHeading from './MaHeading'

const slotText = 'Hello everybody'

describe('MaHeading', () => {
  test('renders content from slot', () => {
    const { getByText } = renderComponent()

    expect(getByText(slotText)).toBeInTheDocument()
    expect(getByText(slotText).nodeName).toBe('DIV')
  })

  test(`'level' property renders proper HTML tag`, () => {
    const { getByRole } = renderComponent({ level: '1' })
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  test(`'size' property assigns the provided style to text`, () => {
    const { getByText } = renderComponent({ size: 'xsmall' })
    expect(getByText(slotText)).toHaveStyle({
      'font-size': '1.5rem',
      'line-height': 1.35,
    })
  })

  test(`'tone' property assigns the provided style to heading`, () => {
    const { getByText } = renderComponent({
      tone: 'gray',
    })

    expect(getByText(slotText)).toHaveStyle({ color: 'rgb(118, 118, 118)' }) //jest converts hex colors to rgb
  })

  test(`'align' property assigns provided align styles to heading`, () => {
    const { getByText } = renderComponent({
      align: 'center',
    })

    expect(getByText(slotText)).toHaveStyle({
      'text-align': 'center',
    })
  })
})

function renderComponent(props = {}) {
  return render(MaHeading, {
    props,
    slots: { default: slotText },
  })
}
