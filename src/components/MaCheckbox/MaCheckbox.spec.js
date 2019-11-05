import { render, fireEvent } from '@testing-library/vue'
import MaCheckbox from './MaCheckbox'

describe('Checkbox', () => {
  test('renders a checkbox element with its label', () => {
    const { checkbox } = CheckboxBuilder()

    expect(checkbox).toBeInTheDocument()
  })

  test('renders a disabled checkbox', async () => {
    const { checkbox, emitted } = CheckboxBuilder({ disabled: true })

    expect(checkbox).toBeDisabled()

    await fireEvent.click(checkbox)

    expect(emitted()).toMatchObject({})
  })

  test('renders a checked checkbox', () => {
    const { checkbox } = CheckboxBuilder({ checked: true })

    expect(checkbox).toBeChecked()
  })

  test('renders a custom id', () => {
    const id = 'customId'
    const { checkbox } = CheckboxBuilder({ id })

    expect(checkbox).toHaveAttribute('id', id)
  })

  test('emits event when checked', async () => {
    const { checkbox, emitted } = CheckboxBuilder()

    await fireEvent.click(checkbox)

    expect(emitted()).toHaveProperty('input')
    expect(emitted().input).toHaveLength(1)
    expect(emitted().input[0][0]).toStrictEqual(true)

    await fireEvent.click(checkbox)

    expect(emitted().input).toHaveLength(2)
    expect(emitted().input[1][0]).toStrictEqual(false)
  })
})

function CheckboxBuilder(customProps) {
  const utils = render(MaCheckbox, {
    props: {
      label: 'checkbox label',
      ...customProps,
    },
  })

  const checkbox = utils.getByLabelText(/checkbox label/i)

  return {
    ...utils,
    checkbox,
  }
}
