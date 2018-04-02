import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs/vue'
import { withNotes } from '@storybook/addon-notes'

import Input from './Input.vue'

const knobs = (options = {}) => {
  return {
    label: text('Label', options.label || 'Label'),
    id: text('id', options.id || 'input'),
    name: text('name', options.name || 'name'),
    disabled: boolean('disabled', options.disabled || false),
    maxlength: number('maxlength', options.maxlength || 12)
  }
}

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('withLabel', withNotes('This a note for the input component')(() => {
    return ({
      components: { Input },
      template: '<Input v-bind="props" />',
      data () {
        return {
          props: knobs()
        }
      }
    })
  }))
