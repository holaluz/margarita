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

  test(`'tag' property test renders the valid provided tag element`, () => {
    const { getByText } = renderComponent({ tag: 'label' })

    expect(getByText(slotText).nodeName).toBe('LABEL')
  })

  test(`'size' property test assigns the valid provided size styles to text`, () => {
    const { getByText } = renderComponent({
      size: 'medium',
    })

    expect(getByText(slotText)).toHaveStyle(
      TEXT_SIZE_TOKENS[CURRENT_BREAKPOINT]['medium']
    )
  })

  test(`'tone' property test assigns the provided style to text`, () => {
    const { getByText } = renderComponent({
      tone: 'gray-base',
    })

    expect(getByText(slotText)).toHaveStyle({ color: 'rgb(118, 118, 118)' }) //jest converts hex colors to rgb
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
