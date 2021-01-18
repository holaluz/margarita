import { render } from '@testing-library/vue'
import MaText from './MaText'
import { text } from '../../tokens'
import responsivePlugin from '@margarita/plugins/responsivePlugin'
import { colorNamesList as COLOR_NAME_LIST } from '@margarita/utils/colorNamesList'

const CURRENT_BREAKPOINT = 'mobile'
const { textSize: TEXT_SIZE_TOKENS, textTags: TEXT_TAGS_TOKENS } = text
const TEXT_SIZE_NAMES = Object.keys(TEXT_SIZE_TOKENS[CURRENT_BREAKPOINT])

describe('MaText', () => {
  const slotText = 'Test text'
  test('renders content from slot', () => {
    const { getByText } = renderComponent(slotText)

    expect(getByText(slotText)).toBeInTheDocument()
  })

  describe('Property validators tests', () => {
    test.each`
      prop       | validValues
      ${'tag'}   | ${TEXT_TAGS_TOKENS}
      ${'size'}  | ${TEXT_SIZE_NAMES}
      ${'color'} | ${COLOR_NAME_LIST}
    `(
      `allows proper $prop values according to prop validator`,
      ({ prop, validValues }) => {
        const validator = MaText.props[prop].validator

        validValues.forEach((value) => {
          expect(validator(value)).toBe(true)
        })
        expect(validator('irrelevant')).toBe(false)
      }
    )
  })
  describe(`'Tag' property test`, () => {
    test.each(TEXT_TAGS_TOKENS)('renders the provided %s tag', (desiredTag) => {
      const { getByText } = renderComponent(slotText, { tag: desiredTag })

      expect(getByText(slotText).nodeName).toBe(desiredTag.toUpperCase())
    })
  })

  describe(`'Size' property test`, () => {
    test.each(TEXT_SIZE_NAMES)(
      'assigns the provided %s size styles to text',
      (desiredFontSize) => {
        const { getByText } = renderComponent(slotText, {
          size: desiredFontSize,
        })

        Object.entries(
          TEXT_SIZE_TOKENS[CURRENT_BREAKPOINT][desiredFontSize]
        ).forEach(([style, value]) => {
          expect(getByText(slotText)).toHaveStyle(`${style}: ${value}`)
        })
      }
    )
  })

  describe(`'Color' property test`, () => {
    test.each(COLOR_NAME_LIST)(
      `assigns the provided '%s' color style to text`,
      (desiredColor) => {
        const { getByText } = renderComponent(slotText, {
          color: desiredColor,
        })

        expect(getByText(slotText)).toHaveStyle(
          `color: var(--color-${desiredColor})`
        )
      }
    )
  })
})

const renderComponent = (defaultText = 'Hello everybody', props = {}) => {
  return render(
    MaText,
    {
      props: { ...props },
      slots: { default: defaultText },
    },
    (vue) => {
      vue.use(responsivePlugin)
      // this.$layout.currentBreakpoint is 'mobile' by default
    }
  )
}
