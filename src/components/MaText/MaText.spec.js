import { render, fireEvent } from '@testing-library/vue'
import MaText from './MaText'

const TextBuilder = (customProps, customParams) => {
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

describe('Text', () => {
  it('renders an input element with a label', () => {
    const { input, getByRole } = TextBuilder()

    getByRole('textbox')
    expect(input.type).toEqual('text')
  })

  it('renders a button element with a label', () => {
    const { input, getByRole } = TextBuilder({ type: 'button' })

    getByRole('textbox')
    expect(input.type).toEqual('button')
  })

  it('renders error CSS class', () => {
    const errorMessage = 'Something went wrong'
    const { getByText, input } = TextBuilder({
      hasError: true,
      errorMessage,
    })

    expect(input.classList).toContain('ma-text__field--error')

    expect(getByText(errorMessage))
  })

  it('renders a disabled input', () => {
    const { input } = TextBuilder({ disabled: true })

    expect(input.disabled).toBe(true)
  })

  it('renders custom id', () => {
    const { input } = TextBuilder({ id: 'customId' })

    expect(input.id).toBe('customId')
  })

  it('renders initial value', () => {
    const value = 'initial value'
    const { getByDisplayValue } = TextBuilder({ value })

    getByDisplayValue(value)
  })

  it('emits its value after typing', async () => {
    const { getByDisplayValue, input, emitted } = TextBuilder({
      value: 'initial value',
    })

    const newValue = '42'

    await fireEvent.update(input, newValue)

    getByDisplayValue(/42/i)
    expect(emitted()).toHaveProperty('input')
    expect(emitted().input[0][0]).toEqual(newValue)
  })

  it('triggers change event with its value when typing', async () => {
    const { input, emitted } = TextBuilder()

    await fireEvent.change(input)

    expect(emitted()).toHaveProperty('change')
  })

  it('emits value on blur', async () => {
    const value = '42'
    const { input, emitted } = TextBuilder({ value })

    await fireEvent.blur(input)

    expect(emitted()).toHaveProperty('blur')
    expect(emitted().blur[0][0]).toEqual(value)
  })

  it('emits value on enter', async () => {
    const value = '42'
    const { input, emitted } = TextBuilder({ value })

    await fireEvent.keyUp(input, {
      key: 'Enter',
      code: 13,
    })

    expect(emitted()).toHaveProperty('enter')
    expect(emitted().enter[0][0]).toEqual(value)
  })

  it('renders the inputSibling slot if provided', () => {
    const inputSibling = 'Test slot'
    const { getByText } = TextBuilder(null, {
      slots: {
        inputSibling,
      },
    })

    getByText(inputSibling)
  })

  it('renders the labelSibling slot if provided', () => {
    const labelSibling = 'Test slot'
    const { getByText } = TextBuilder(null, {
      slots: {
        labelSibling,
      },
    })

    getByText(labelSibling)
  })
})
