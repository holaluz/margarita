/* eslint-disable no-console */
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

  const tag = 'label'
  test(` 'tag' property test renders the valid provided '${tag}' tag`, () => {
    const { getByText } = renderComponent({ tag })

    expect(getByText(slotText).nodeName).toBe(tag.toUpperCase())
  })

  const size = 'medium'
  test(` 'size' property test assigns the valid provided '${size}' size styles to text`, () => {
    const { getByText } = renderComponent({
      size,
    })

    Object.entries(TEXT_SIZE_TOKENS[CURRENT_BREAKPOINT][size]).forEach(
      ([style, value]) => {
        expect(getByText(slotText)).toHaveStyle(`${style}: ${value}`)
      }
    )
  })

  const color = 'pink'
  const tone = 'dark'
  test(`'color' property test assigns the provided '${color}-${tone}' style to text`, () => {
    const { getByText } = renderComponent({
      color,
      tone,
    })

    expect(getByText(slotText)).toHaveStyle(
      `color: var(--color-${color}-${tone})`
    )
  })

  test('throws a console warn when tone does not exists for the desired color', () => {
    const originalWarn = console.warn
    console.warn = jest.fn()

    renderComponent({
      color: 'white',
      tone: 'darker',
    })

    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(`'darker' tone does not exist for color 'white'`)
    )

    console.warn = originalWarn
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
