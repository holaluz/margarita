import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'

import MHeader from '../MHeader.vue'

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .add('Usage', () => {
    return ({
      components: { MHeader },
      template: `
        <v-app fluid>
          <MHeader></MHeader>
        </v-app>
      `
    })
  })
