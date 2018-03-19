import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, text } from '@storybook/addon-knobs/vue'
import { withNotes } from '@storybook/addon-notes'

import Checkbox from './Checkbox.vue'

const knobs = (options = {}) => {
  return {
    description: text('description', options.description || 'lorem ipsum dolor sit amet'),
    id: text('id', options.id || 'checkbox'),
    group: text('group', options.group || 'group'),
    name: text('name', options.name || 'name'),
    checked: boolean('checked', options.checked || false),
    disabled: boolean('disabled', options.disabled || false)
  }
}

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('default', withNotes('Holi')(() => {
    return ({
      components: { Checkbox },
      template: '<Checkbox v-bind="props" />',
      data () {
        return {
          props: knobs()
        }
      }
    })
  }))
  .add('checked', withNotes('Holi')(() => {
    return ({
      components: { Checkbox },
      template: '<Checkbox v-bind="props" />',
      data () {
        return {
          props: knobs({
            checked: true
          })
        }
      }
    })
  }))
  .add('disabled', withNotes('Holi')(() => {
    return ({
      components: { Checkbox },
      template: '<Checkbox v-bind="props" />',
      data () {
        return {
          props: knobs({
            disabled: true
          })
        }
      }
    })
  }))
