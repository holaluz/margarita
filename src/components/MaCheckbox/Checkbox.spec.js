import { render, fireEvent, cleanup } from '@testing-library/vue'
import Checkbox from './Checkbox'

afterEach(cleanup)

const CheckboxBuilder = customProps =>
  render(Checkbox, {
    props: {
      label: 'checkbox label',
      ...customProps,
    },
  })

describe('Checkbox', () => {
  it('renders a checkbox element with its label', () => {
    const { getByLabelText } = CheckboxBuilder()

    getByLabelText(/checkbox label/i)
  })

  it('renders a disabled checkbox', async () => {
    const { getByLabelText, emitted } = CheckboxBuilder({ disabled: true })

    expect(getByLabelText(/checkbox label/i).disabled).toBeTruthy()

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted()).toEqual({})
  })

  it('renders a checked checkbox', () => {
    const { getByLabelText } = CheckboxBuilder({ checked: true })

    expect(getByLabelText(/checkbox label/i).checked).toBeTruthy()
  })

  it('renders a custom id', () => {
    const { getByLabelText } = CheckboxBuilder({
      id: 'customId',
    })

    expect(getByLabelText(/checkbox label/i).id).toBe('customId')
  })

  it('emits event when checked', async () => {
    const { getByLabelText, emitted } = CheckboxBuilder()

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted().input[0]).toContain(true)

    await fireEvent.click(getByLabelText(/checkbox label/i))

    expect(emitted().input[1]).toContain(false)
  })
})