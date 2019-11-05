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

describe('Select', () => {
  test('renders multiple options', () => {
    const { queryByText } = SelectBuilder()

    expect(queryByText(/option1/i)).toBeInTheDocument()
    expect(queryByText(/option2/i)).toBeInTheDocument()
    expect(queryByText(/option3/i)).toBeInTheDocument()
  })

  test('changes its value when selected option changes', async () => {
    const { queryByDisplayValue, getSelect } = SelectBuilder()

    await fireEvent.update(getSelect(), 'option2')

    expect(queryByDisplayValue(/option1/i)).not.toBeInTheDocument()
    expect(queryByDisplayValue(/option2/i)).toBeInTheDocument()
  })

  test('displays error message', () => {
    const { queryByText } = SelectBuilder({
      hasError: true,
      errorMessage: 'Something went wrong',
    })

    expect(queryByText(/Something went wrong/i)).toBeInTheDocument()
  })

  test('renders bold class', () => {
    const { getSelect } = SelectBuilder({ weight: 'bold' })

    expect(getSelect()).toHaveClass('ma-select__field--bold')
  })

  test('renders custom class', () => {
    const fieldClass = 'my-custom-class'
    const { getSelect } = SelectBuilder({ fieldClass })

    expect(getSelect()).toHaveClass(fieldClass)
  })

  test('adds aria-label attr and hids label element', () => {
    const ariaLabel = 'test'
    const { queryByDisplayValue, getSelect } = SelectBuilder({
      'aria-label': ariaLabel,
    })

    expect(getSelect()).toHaveAttribute('aria-label', ariaLabel)

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

function SelectBuilder(customProps) {
  const utils = render(MaSelect, {
    props: {
      label: 'Test Select label',
      options: OPTIONS,
      ...customProps,
    },
  })

  const getSelect = () => utils.getByDisplayValue(/option1/i)

  return {
    ...utils,
    getSelect,
  }
}
