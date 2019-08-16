import { render, fireEvent, cleanup } from '@testing-library/vue'
import MaText from './MaText'

afterEach(cleanup)

const TextBuilder = (customProps, customParams) =>
  render(MaText, {
    props: {
      label: 'input label',
      ...customProps,
    },
    ...customParams,
  })

describe('Text', () => {
  it('renders an input element with a label', () => {
    const { getByLabelText } = TextBuilder()

    expect(getByLabelText(/input label/i).type).toEqual('text')
  })

  it('renders a button element with a label', () => {
    const { getByLabelText } = TextBuilder({ type: 'button ' })

    expect(getByLabelText(/input label/i).type.trim()).toEqual('button')
  })

  it('renders error CSS class', () => {
    const { getByText, getByLabelText } = TextBuilder({
      hasError: true,
      errorMessage: 'Something went wrong',
    })

    expect(
      getByLabelText(/input label/i).classList.contains('ma-text__field--error')
    ).toBeTruthy()

    expect(getByText(/Something went wrong/i))
  })

  it('renders a disabled input', () => {
    const { getByLabelText } = TextBuilder({ disabled: true })

    expect(getByLabelText(/input label/i).disabled).toBeTruthy()
  })

  it('renders custom id', () => {
    const { getByLabelText } = TextBuilder({ id: 'customId' })

    expect(getByLabelText(/input label/i).id).toBe('customId')
  })

  it('renders initial value', () => {
    const { getByDisplayValue } = TextBuilder({ value: 'initial value' })

    getByDisplayValue(/initial value/i)
  })

  it('triggers input event with its value when typing', async () => {
    const { getByDisplayValue, getByLabelText, emitted } = TextBuilder({
      value: 'initial value',
    })

    const newValue = '42'

    await fireEvent.update(getByLabelText(/input label/i), newValue)

    getByDisplayValue(/42/i)
    expect(emitted()).toHaveProperty('input')
    expect(emitted().input[0][0]).toEqual(newValue)
  })

  it('triggers change event with its value when typing', async () => {
    const { getByLabelText, emitted } = TextBuilder()

    await fireEvent.change(getByLabelText(/input label/i))

    expect(emitted()).toHaveProperty('change')
  })

  it('emits value on blur', async () => {
    const { getByLabelText, emitted } = TextBuilder()

    await fireEvent.blur(getByLabelText(/input label/i))

    expect(emitted()).toHaveProperty('blur')
  })

  it('emits value on enter', async () => {
    const { getByLabelText, emitted } = TextBuilder()

    await fireEvent.keyUp(getByLabelText(/input label/i), {
      key: 'Enter',
      code: 13,
    })

    expect(emitted()).toHaveProperty('enter')
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
