import { render } from '@testing-library/vue'
import MaText from './MaText'
import responsivePlugin from '@margarita/plugins/responsivePlugin'

const slotText = 'Hello everybody'

describe('MaText', () => {
  test('renders content from slot', () => {
    const { getByText } = renderComponent()

    expect(getByText(slotText)).toBeInTheDocument()
  })

  test(`'tag' property renders the valid provided tag element`, () => {
    const { getByText } = renderComponent({ tag: 'label' })

    expect(getByText(slotText).nodeName).toBe('LABEL')
  })

  test(`'size' property assigns the valid provided size styles to text`, () => {
    const { getByText } = renderComponent({
      size: 'medium',
    })

    expect(getByText(slotText)).toHaveStyle({
      'font-size': '1.125rem',
      'line-height': '1.35',
    })
  })

  test(`'tone' property assigns the provided style to text`, () => {
    const { getByText } = renderComponent({
      tone: 'gray',
    })

    expect(getByText(slotText)).toHaveStyle({ color: 'rgb(118, 118, 118)' }) //jest converts hex colors to rgb
  })

  test(`'bold' property renders ma-text--bold class`, () => {
    const { getByText } = renderComponent({ bold: true })

    expect(getByText(slotText)).toHaveClass('ma-text--bold')
  })

  test(`'italic' property renders ma-text--italic class`, () => {
    const { getByText } = renderComponent({ italic: true })

    expect(getByText(slotText)).toHaveClass('ma-text--italic')
  })
})

const renderComponent = (props = {}) => {
  return render(
    MaText,
    {
      props,
      slots: { default: slotText },
    },
    (vue) => {
      vue.use(responsivePlugin)
    }
  )
}
