import { render, fireEvent, cleanup } from '@testing-library/vue'
import MaSelect from './MaSelect'

afterEach(cleanup)

const OPTIONS = [
  { label: 'Option1', text: 'Option1', value: 'option1' },
  { label: 'Option2', text: 'Option2', value: 'option2' },
  { label: 'Option3', text: 'Option3', value: 'option3' },
]

const OPTIONS_WITH_PLACEHOLDER = [
  {
    label: 'Placeholder text',
    text: 'Placeholder text',
    value: '',
    disabled: true,
  },
  ...OPTIONS,
]

const SelectBuilder = customProps =>
  render(MaSelect, {
    props: {
      label: 'Test Select label',
      options: OPTIONS,
      ...customProps,
    },
  })

describe('Select', () => {
  it('should have multiple options', () => {
    const { getByText } = SelectBuilder()

    getByText(/option1/i)
    getByText(/option2/i)
    getByText(/option3/i)
  })

  it('should have change its value when selected option changes', async () => {
    const { queryByDisplayValue, getByDisplayValue } = SelectBuilder()

    const select = getByDisplayValue(/option1/i)

    await fireEvent.change(select, { target: { value: 'option2' } })

    expect(queryByDisplayValue(/option1/i)).toBe(null)
    getByDisplayValue(/option2/i)
  })

  it('should have error with custom error message', () => {
    const { getByText } = SelectBuilder({
      hasError: true,
      errorMessage: 'Something went wrong',
    })

    getByText(/Something went wrong/i)
  })

  it('should have bold class', () => {
    const { getByDisplayValue } = SelectBuilder({
      weight: 'bold',
    })

    const select = getByDisplayValue(/option1/i)

    expect(select.classList.contains('ma-select__field--bold')).toBeTruthy()
  })

  it('should have custom class', () => {
    const customClass = 'my-custom-class'
    const { getByDisplayValue } = SelectBuilder({
      fieldClass: customClass,
    })

    const select = getByDisplayValue(/option1/i)

    expect(select.classList.contains(customClass)).toBeTruthy()
  })

  it('should have aria-label attr and hidden label', () => {
    const { queryByDisplayValue, getByDisplayValue } = SelectBuilder({
      'aria-label': 'test',
    })

    const select = getByDisplayValue(/option1/i)

    const { name, value } = select.attributes[1]

    expect(name).toBe('aria-label')
    expect(value).toBe('test')

    // If we provide an aria-label, the <label> element should not be there
    expect(queryByDisplayValue(/Test Select label/i)).toBe(null)
  })

  it('should have a placeholder text', () => {
    const { getByDisplayValue } = SelectBuilder({
      options: OPTIONS_WITH_PLACEHOLDER,
    })

    getByDisplayValue(/placeholder text/i)
  })

  it(`shouldn't show placeholder text after change value`, async () => {
    const { getByDisplayValue } = SelectBuilder({
      options: OPTIONS_WITH_PLACEHOLDER,
    })

    const select = getByDisplayValue(/placeholder text/i)

    await fireEvent.change(select, { target: { value: 'option1' } })
    getByDisplayValue(/option1/i)
  })

  it('placeholder option should be disabled', () => {
    const { getByText } = SelectBuilder({
      options: OPTIONS_WITH_PLACEHOLDER,
    })

    const placeholder = getByText(/placeholder text/i)
    expect(placeholder.disabled).toBe(true)
  })

  it('displays properly formatted options', () => {
    const options = [
      { potato: 'Pataton', something: 'blabla', active: true },
      { potato: 'Pataton2', something: 'bleble' },
    ]

    const { getByText } = SelectBuilder({
      options,
      formatter: o => ({
        label: o.potato,
        text: o.potato,
        value: o.something,
        disabled: !o.active,
      }),
    })

    options.forEach(o => {
      const option = getByText(o.potato)
      expect(option.disabled).toBe(!o.active)
    })
  })
})
