import { render, fireEvent } from '@testing-library/vue'
import MaTextField from './MaTextField'

describe('TextField', () => {
  test('renders an input element with a label', () => {
    const { getByRole } = renderComponent()

    expect(getByRole('textbox')).toBeInTheDocument()
  })

  test('renders a button element with a label', () => {
    const { input, getByRole } = renderComponent({ type: 'button' })

    expect(getByRole('button')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'button')
  })

  test('renders error CSS class', () => {
    const errorMessage = 'Something went wrong'
    const { getByText, input } = renderComponent({
      hasError: true,
      errorMessage,
    })

    expect(input).toHaveClass('ma-text-field__input--error')

    expect(getByText(errorMessage)).toBeInTheDocument()
  })

  test('renders a disabled input', () => {
    const { input } = renderComponent({ disabled: true })

    expect(input).toBeDisabled()
  })

  test('renders custom id', () => {
    const id = 'customId'
    const { input } = renderComponent({ id })

    expect(input).toHaveAttribute('id', id)
  })

  test('renders initial value', () => {
    const value = 'initial value'
    const { getByDisplayValue } = renderComponent({ value })

    expect(getByDisplayValue(value)).toBeInTheDocument()
  })

  test('emits its value after typing', async () => {
    const { getByDisplayValue, input, emitted } = renderComponent({
      value: 'initial value',
    })

    const newValue = '42'

    await fireEvent.update(input, newValue)

    expect(getByDisplayValue(/42/i)).toBeInTheDocument()
    expect(emitted()).toHaveProperty('input')
    expect(emitted().input).toHaveLength(1)
    expect(emitted().input[0][0]).toStrictEqual(newValue)
  })

  test('triggers change event with its value when typing', async () => {
    const { input, emitted } = renderComponent()

    await fireEvent.change(input)

    expect(emitted()).toHaveProperty('change')
  })

  test('emits value on blur', async () => {
    const value = '42'
    const { input, emitted } = renderComponent({ value })

    await fireEvent.blur(input)

    expect(emitted()).toHaveProperty('blur')
    expect(emitted().blur).toHaveLength(1)
    expect(emitted().blur[0][0]).toStrictEqual(value)
  })

  test('emits value on enter', async () => {
    const value = '42'
    const { input, emitted } = renderComponent({ value })

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
    const { input, queryByText } = renderComponent(null, {
      attrs: { 'aria-label': ariaLabel },
    })

    expect(input).toHaveAttribute('aria-label', ariaLabel)
    expect(queryByText('input label')).toHaveClass('visually-hidden')
  })

  test('input has provided attrs', () => {
    const type = 'number'
    const placeholder = 'A placeholder'

    const { input } = renderComponent(null, { attrs: { type, placeholder } })

    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  test.each(['inputSibling', 'labelSibling'])(
    'renders provided %s slot',
    (slotName) => {
      const slotText = 'Test slot'
      const { getByText } = renderComponent(null, {
        slots: {
          [slotName]: slotText,
        },
      })

      expect(getByText(slotText)).toBeInTheDocument()
    }
  )
})

function renderComponent(customProps, customParams) {
  const label = 'input label'
  const utils = render(MaTextField, {
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
