import { render, fireEvent } from '@testing-library/vue'
import MaText from './MaText'

describe('Text', () => {
  test('renders an input element with a label', () => {
    const { queryByRole } = TextBuilder()

    expect(queryByRole('textbox')).toBeInTheDocument()
  })

  test('renders a button element with a label', () => {
    const { input, queryByRole } = TextBuilder({ type: 'button' })

    expect(queryByRole('button')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'button')
  })

  test('renders error CSS class', () => {
    const errorMessage = 'Something went wrong'
    const { queryByText, input } = TextBuilder({
      hasError: true,
      errorMessage,
    })

    expect(input).toHaveClass('ma-text__field--error')

    expect(queryByText(errorMessage)).toBeInTheDocument()
  })

  test('renders a disabled input', () => {
    const { input } = TextBuilder({ disabled: true })

    expect(input).toBeDisabled()
  })

  test('renders custom id', () => {
    const id = 'customId'
    const { input } = TextBuilder({ id })

    expect(input).toHaveAttribute('id', id)
  })

  test('renders initial value', () => {
    const value = 'initial value'
    const { queryByDisplayValue } = TextBuilder({ value })

    expect(queryByDisplayValue(value)).toBeInTheDocument()
  })

  test('emits its value after typing', async () => {
    const { queryByDisplayValue, input, emitted } = TextBuilder({
      value: 'initial value',
    })

    const newValue = '42'

    await fireEvent.update(input, newValue)

    expect(queryByDisplayValue(/42/i)).toBeInTheDocument()
    expect(emitted()).toHaveProperty('input')
    expect(emitted().input).toHaveLength(1)
    expect(emitted().input[0][0]).toStrictEqual(newValue)
  })

  test('triggers change event with its value when typing', async () => {
    const { input, emitted } = TextBuilder()

    await fireEvent.change(input)

    expect(emitted()).toHaveProperty('change')
  })

  test('emits value on blur', async () => {
    const value = '42'
    const { input, emitted } = TextBuilder({ value })

    await fireEvent.blur(input)

    expect(emitted()).toHaveProperty('blur')
    expect(emitted().blur).toHaveLength(1)
    expect(emitted().blur[0][0]).toStrictEqual(value)
  })

  test('emits value on enter', async () => {
    const value = '42'
    const { input, emitted } = TextBuilder({ value })

    await fireEvent.keyUp(input, {
      key: 'Enter',
      code: 13,
    })

    expect(emitted()).toHaveProperty('enter')
    expect(emitted().enter).toHaveLength(1)
    expect(emitted().enter[0][0]).toStrictEqual(value)
  })

  test('hides label if aria-label is provided', () => {
    const ariaLabel = 'Aria Label'
    const { input, queryByText } = TextBuilder(null, {
      attrs: { 'aria-label': ariaLabel },
    })

    expect(input).toHaveAttribute('aria-label', ariaLabel)
    expect(queryByText('input label')).toHaveClass('visually-hidden')
  })

  test('input has provided attrs', () => {
    const type = 'number'
    const placeholder = 'A placeholder'

    const { input } = TextBuilder(null, { attrs: { type, placeholder } })

    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  test.each(['inputSibling', 'labelSibling'])(
    'renders provided %s slot',
    (slotName) => {
      const slotText = 'Test slot'
      const { queryByText } = TextBuilder(null, {
        slots: {
          [slotName]: slotText,
        },
      })

      expect(queryByText(slotText)).toBeInTheDocument()
    }
  )
})

function TextBuilder(customProps, customParams) {
  const label = 'input label'
  const utils = render(MaText, {
    props: {
      label,
      ...customProps,
    },
    ...customParams,
  })

  return {
    input: utils.getByLabelText(label),
    ...utils,
  }
}
