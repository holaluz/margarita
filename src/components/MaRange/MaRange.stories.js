import { storiesOf } from '@storybook/vue'
import { withKnobs, select, object, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaRange from '@margarita/components/MaRange'

const defaultSteps = [
  { text: 'Especial', value: 'special' },
  { text: 'Bajo', value: 'low' },
  { text: 'Medio', value: 'medium' },
  { text: 'Alto', value: 'high' },
]

storiesOf('Range', module)
  .addDecorator(withKnobs)

  .add('Range', () => {
    const selectedValue = select(
      'Value',
      defaultSteps.map(s => s.value),
      'medium'
    )
    const steps = object('Steps', defaultSteps)
    const label = text('Label', 'Label')

    return {
      components: { MaRange, MaGridColumn },

      template: `
        <ma-grid-column>
          <ma-range
            :steps="steps"
            :label="label"
            v-model="value"
          />
        </ma-grid-column>`,

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
  })
