import { render, fireEvent } from '@testing-library/vue'
import MaCheckbox from './MaCheckbox'

const CheckboxBuilder = customProps =>
  render(MaCheckbox, {
    props: {
      label: 'checkbox label',
      ...customProps,
    },
  })

describe('Checkbox', () => {
  test('renders a checkbox element with its label', () => {
    const { getByLabelText } = CheckboxBuilder()

    getByLabelText(/checkbox label/i)
  })

  test('renders a disabled checkbox', async () => {
    const { getByLabelText, emitted } = CheckboxBuilder({ disabled: true })

    expect(getByLabelText(/checkbox label/i).disabled).toBe(true)

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted()).toMatchObject({})
  })

  test('renders a checked checkbox', () => {
    const { getByLabelText } = CheckboxBuilder({ checked: true })

    expect(getByLabelText(/checkbox label/i).checked).toBe(true)
  })

  test('renders a custom id', () => {
    const { getByLabelText } = CheckboxBuilder({
      id: 'customId',
    })

    expect(getByLabelText(/checkbox label/i).id).toBe('customId')
  })

  test('emits event when checked', async () => {
    const { getByLabelText, emitted } = CheckboxBuilder()

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted()).toHaveProperty('input')
    expect(emitted().input[0][0]).toStrictEqual(true)

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted().input[1][0]).toStrictEqual(false)
  })
})
