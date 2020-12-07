import { render } from '@testing-library/vue'
import MaText from './MaText'
import { fontSizes, fontTags } from '../../tokens'

describe('MaText', () => {
  const slotText = 'Hello everybody'
  test('renders content from slot', () => {
    const { getByText } = render(MaText, {
      slots: { default: slotText },
    })

    expect(getByText(slotText)).toBeInTheDocument()
  })

  test('allows proper tag values according to prop validator', () => {
    const validator = MaText.props.tag.validator
    fontTags.forEach((validTag) => expect(validator(validTag)).toBe(true))
    expect(validator('irrelevant')).toBe(false)
  })

  test('allows proper size name values according to prop validator', () => {
    const validator = MaText.props.size.validator
    fontSizes.forEach((validFontSizeName) =>
      expect(validator(validFontSizeName)).toBe(true)
    )
    expect(validator('irrelevant')).toBe(false)
  })

  test.each(fontTags)('renders the provided %s tag', (desiredTag) => {
    const { getByText } = render(MaText, {
      props: { tag: desiredTag },
      slots: { default: slotText },
    })

    expect(getByText(slotText).nodeName).toBe(desiredTag.toUpperCase())
  })

  test.each(fontSizes)(
    'assigns the provided %s class to text',
    (desiredFontSize) => {
      const { getByText } = render(MaText, {
        props: { size: desiredFontSize },
        slots: { default: slotText },
      })

      expect(getByText(slotText)).toHaveClass(`text--${desiredFontSize}`)
    }
  )
})
