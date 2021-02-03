import { boolean, object, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import docs from '../../../docs/components/MaSelect.docs.mdx'

const AVAILABLE_WEIGHTS = ['bold', 'semibold', 'medium', 'regular']
const DEFAULT_OPTIONS = [
  { label: 'Placeholder text', text: 'Placeholder text', disabled: true },
  { label: 'Option1', text: 'Option1', value: 'option1' },
  { label: 'Option2', text: 'Option2', value: 'option2' },
  { label: 'Option3', text: 'Option3', value: 'option3' },
  { label: 'Option4', text: 'Option4', value: 'option4' },
]

export default {
  title: 'Components/Select',
  parameters: {
    docs: { page: docs },
  },
}

export const Select = () => {
  const selectedValue = select(
    'Value',
    ['', ...DEFAULT_OPTIONS.map((o) => o.value)],
    ''
  )
  const label = text('Label', 'Label')
  const ariaLabel = text('ARIA Label', '')
  const disabled = boolean('Disable', false)
  const weight = select('Weight', ['', ...AVAILABLE_WEIGHTS], '')
  const hasError = boolean('Has error', false)
  const errorMessage = text('Error msg', 'You have an error')
  const fieldClass = text('Field class', '')
  const options = object('Options', DEFAULT_OPTIONS)

  return {
    template: `
        <ma-select id="my-select-input" v-bind="$props" v-model="value" />
    `,

    props: {
      ariaLabel: {
        default: ariaLabel,
      },
      disabled: {
        default: disabled,
      },
      errorMessage: {
        default: errorMessage,
      },
      hasError: {
        default: hasError,
      },
      label: {
        default: label,
      },
      options: {
        default: options,
      },
      fieldClass: {
        default: fieldClass,
      },
      weight: {
        default: weight,
      },
      selectedValue: {
        default: selectedValue,
      },
    },

    data() {
      return {
        value: this.selectedValue,
      }
    },

    watch: {
      selectedValue(newValue) {
        this.value = newValue
      },
      value: action('value'),
    },
  }
}
