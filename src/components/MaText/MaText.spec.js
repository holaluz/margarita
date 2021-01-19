import { render } from '@testing-library/vue'
import MaText from './MaText'
import { text } from '../../tokens'
import responsivePlugin from '@margarita/plugins/responsivePlugin'

const CURRENT_BREAKPOINT = 'mobile' // this.$layout.currentBreakpoint is 'mobile' by default
const { textSize: TEXT_SIZE_TOKENS } = text
const slotText = 'Hello everybody'

describe('MaText', () => {
  test('renders content from slot', () => {
    const { getByText } = renderComponent()

    expect(getByText(slotText)).toBeInTheDocument()
  })

  describe(`'Tag' property test`, () => {
    const tag = 'h1'
    test(`renders the valid provided '${tag}' tag`, () => {
      const { getByText } = renderComponent({ tag })

      expect(getByText(slotText).nodeName).toBe(tag.toUpperCase())
    })
  })

  describe(`'Size' property test`, () => {
    const size = 'large'
    test(`assigns the valid provided '${size}' size styles to text`, () => {
      const { getByText } = renderComponent({
        size,
      })

      Object.entries(TEXT_SIZE_TOKENS[CURRENT_BREAKPOINT][size]).forEach(
        ([style, value]) => {
          expect(getByText(slotText)).toHaveStyle(`${style}: ${value}`)
        }
      )
    })
  })

  describe(`'Color' property test`, () => {
    const color = 'pink-dark'
    test(`assigns the provided '${color}' color style to text`, () => {
      const { getByText } = renderComponent({
        color,
      })

      expect(getByText(slotText)).toHaveStyle(`color: var(--color-${color})`)
    })
  })
})

const renderComponent = (props = {}) => {
  return render(
    MaText,
    {
      props: { ...props },
      slots: { default: slotText },
    },
    (vue) => {
      vue.use(responsivePlugin)
    }
  )
}
