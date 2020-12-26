import { select, object, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

const defaultSteps = [
  { text: 'Especial', value: 'special' },
  { text: 'Bajo', value: 'low' },
  { text: 'Medio', value: 'medium' },
  { text: 'Alto', value: 'high' },
]

export default {
  title: 'Components/Range',
}

export const Range = () => {
  const selectedValue = select(
    'Value',
    defaultSteps.map((s) => s.value),
    'medium'
  )
  const steps = object('Steps', defaultSteps)
  const label = text('Label', 'Label')

  return {
    template: `
        <div style="width: 500px">
          <ma-range
            :steps="steps"
            :label="label"
            v-model="value"
          />
        </div>`,

    props: {
      steps: {
        default: steps,
      },
      label: {
        default: label,
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
