import { render, fireEvent } from '@testing-library/vue'
import MaCheckbox from './MaCheckbox'

describe('Checkbox', () => {
  test('renders a checkbox element with its label', () => {
    const { queryByLabelText } = CheckboxBuilder()

    expect(queryByLabelText(/checkbox label/i)).toBeInTheDocument()
  })

  test('renders a disabled checkbox', async () => {
    const { getByLabelText, emitted } = CheckboxBuilder({ disabled: true })

    expect(getByLabelText(/checkbox label/i)).toBeDisabled()

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted()).toMatchObject({})
  })

  test('renders a checked checkbox', () => {
    const { getByLabelText } = CheckboxBuilder({ checked: true })

    expect(getByLabelText(/checkbox label/i)).toBeChecked()
  })

  test('renders a custom id', () => {
    const id = 'customId'
    const { getByLabelText } = CheckboxBuilder({ id })

    expect(getByLabelText(/checkbox label/i)).toHaveAttribute('id', id)
  })

  test('emits event when checked', async () => {
    const { getByLabelText, emitted } = CheckboxBuilder()

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted()).toHaveProperty('input')
    expect(emitted().input).toHaveLength(1)
    expect(emitted().input[0][0]).toStrictEqual(true)

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted().input).toHaveLength(2)
    expect(emitted().input[1][0]).toStrictEqual(false)
  })
})

function CheckboxBuilder(customProps) {
  return render(MaCheckbox, {
    props: {
      label: 'checkbox label',
      ...customProps,
    },
  })
}
