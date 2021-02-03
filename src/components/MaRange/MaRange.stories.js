import { select, object, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import docs from '../../../docs/components/MaRange.docs.mdx'

const defaultSteps = [
  { text: 'Especial', value: 'special' },
  { text: 'Bajo', value: 'low' },
  { text: 'Medio', value: 'medium' },
  { text: 'Alto', value: 'high' },
]

export default {
  title: 'Components/Range',
  decorators: [
    () => ({
      template: '<div style="width: 600px"><story/></div>',
    }),
  ],
  parameters: {
    docs: { page: docs },
  },
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
    template: `<ma-range :steps="steps" :label="label" v-model="value"/>`,

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
