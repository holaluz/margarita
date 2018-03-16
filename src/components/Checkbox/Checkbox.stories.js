import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs/vue'
import { withNotes } from '@storybook/addon-notes'

import Checkbox from './Checkbox.vue'

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('default', withNotes('Holi')(() => {
    const knobs = {
      description: text('description', 'lorem ipsum dolor sit amet'),
      id: text('id', 'checkbox'),
      group: text('group', 'group'),
      name: text('name', 'name')
    }

    return ({
      components: { Checkbox },
      template: '<Checkbox v-bind="props" />',
      data () {
        return {
          props: knobs
        }
      }
    })
  }))
