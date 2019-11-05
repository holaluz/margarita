import { render, fireEvent } from '@testing-library/vue'
import MaSelect from './MaSelect'

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
  test('renders multiple options', () => {
    const { queryByText } = SelectBuilder()

    expect(queryByText(/option1/i)).toBeInTheDocument()
    expect(queryByText(/option2/i)).toBeInTheDocument()
    expect(queryByText(/option3/i)).toBeInTheDocument()
  })

  test('changes its value when selected option changes', async () => {
    const { queryByDisplayValue, getByDisplayValue } = SelectBuilder()

    const select = getByDisplayValue(/option1/i)

    await fireEvent.update(select, 'option2')

    expect(queryByDisplayValue(/option1/i)).not.toBeInTheDocument()
    expect(queryByDisplayValue(/option2/i)).toBeInTheDocument()
  })

  test('displays error', () => {
    const { queryByText } = SelectBuilder({
      hasError: true,
      errorMessage: 'Something went wrong',
    })

    expect(queryByText(/Something went wrong/i)).toBeInTheDocument()
  })

  test('renders bold class', () => {
    const { getByDisplayValue } = SelectBuilder({
      weight: 'bold',
    })

    const select = getByDisplayValue(/option1/i)

    expect(select).toHaveClass('ma-select__field--bold')
  })

  test('renders custom class', () => {
    const customClass = 'my-custom-class'
    const { getByDisplayValue } = SelectBuilder({
      fieldClass: customClass,
    })

    const select = getByDisplayValue(/option1/i)

    expect(select).toHaveClass(customClass)
  })

  test('adds aria-label attr and hidden label', () => {
    const { queryByDisplayValue, getByDisplayValue } = SelectBuilder({
      'aria-label': 'test',
    })

    const select = getByDisplayValue(/option1/i)

    const { name, value } = select.attributes[1]

    expect(name).toBe('aria-label')
    expect(value).toBe('test')

    // If we provide an aria-label, the <label> element should not be there
    expect(queryByDisplayValue(/Test Select label/i)).not.toBeInTheDocument()
  })

  test('renders a placeholder text', () => {
    const { queryByDisplayValue } = SelectBuilder({
      options: OPTIONS_WITH_PLACEHOLDER,
    })

    expect(queryByDisplayValue(/placeholder text/i)).toBeInTheDocument()
  })

  test('overrides placeholder with selected value', async () => {
    const { getByDisplayValue } = SelectBuilder({
      options: OPTIONS_WITH_PLACEHOLDER,
    })

    const select = getByDisplayValue(/placeholder text/i)

    await fireEvent.update(select, 'option1')

    expect(getByDisplayValue(/option1/i)).toBeInTheDocument()
  })

  test('renders disabled placeholder option', () => {
    const { getByText } = SelectBuilder({
      options: OPTIONS_WITH_PLACEHOLDER,
    })

    expect(getByText(/placeholder text/i)).toBeDisabled()
  })

  test('displays properly formatted options', () => {
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
