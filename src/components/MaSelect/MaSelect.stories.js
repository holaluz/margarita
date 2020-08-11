import { storiesOf } from '@storybook/vue'
import {
  withKnobs,
  boolean,
  object,
  select,
  text,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaSelect from './MaSelect'

const GRID_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const AVAILABLE_WEIGHTS = ['bold', 'semibold', 'medium', 'regular']
const DEFAULT_OPTIONS = [
  { label: 'Placeholder text', text: 'Placeholder text', disabled: true },
  { label: 'Option1', text: 'Option1', value: 'option1' },
  { label: 'Option2', text: 'Option2', value: 'option2' },
  { label: 'Option3', text: 'Option3', value: 'option3' },
  { label: 'Option4', text: 'Option4', value: 'option4' },
]

storiesOf('Select', module)
  .addDecorator(withKnobs)

  .add('Select', () => {
    const selectedValue = select(
      'Value',
      ['', ...DEFAULT_OPTIONS.map((o) => o.value)],
      ''
    )
    const label = text('Label', 'Label')
    const ariaLabel = text('ARIA Label', '')
    const disabled = boolean('Disable', false)
    const weight = select('Peso', ['', ...AVAILABLE_WEIGHTS], '')
    const hasError = boolean('Has error', false)
    const errorMessage = text('Error msg', 'You have an error')
    const fieldClass = text('Additional class', '')
    const options = object('Options', DEFAULT_OPTIONS)

    const size = select('Size', GRID_ARRAY, 4)

    return {
      components: { MaGridColumn, MaSelect },

      template: `
        <ma-grid-column :class="getClass">
          <ma-select
            id="my-select-input"
            :aria-label="ariaLabel"
            :errorMessage="errorMessage"
            :disabled="disabled"
            :hasError="hasError"
            :label="label"
            :options="options"
            :weight="weight"
            :fieldClass="fieldClass"
            v-model="value"
          />
        </ma-grid-column>`,

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
        size: {
          default: size,
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

      computed: {
        getClass() {
          return {
            [`ma-grid-col--${this.size}`]: this.size,
          }
        },
      },

      watch: {
        selectedValue(newValue) {
          this.value = newValue
        },
        value: action('value'),
      },
    }
  })
