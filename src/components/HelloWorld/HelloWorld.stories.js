import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs/vue'
import { withNotes } from '@storybook/addon-notes'

import HelloWorld from './HelloWorld.vue'

storiesOf('HelloWorld', module)
  .addDecorator(withKnobs)
  .add('default', withNotes('Holi')(() => {
    const textAlign = text('textAlign', 'center')

    return ({
      components: { HelloWorld },
      template: '<HelloWorld :style="{textAlign: textAlign}" msg="Welcome to Your Vue.js App"/>',
      data () {
        return {
          textAlign: textAlign
        }
      }
    })
  }))
