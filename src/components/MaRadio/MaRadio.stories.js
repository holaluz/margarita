import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridRow from '@margarita/components/MaGridRow'
import MaGridColumn from '@margarita/components/MaGridColumn'

import MaRadio from './MaRadio'

storiesOf('Radio', module)
  .addDecorator(withKnobs)

  .add('Radio', () => {
    const card = boolean('Card', true)
    const disabled = boolean('Disabled', true)
    const text1 = text('Text radio 1', 'My first radio')
    const text2 = text('Text radio 2', 'Second radio button')

    return {
      components: { MaRadio, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-row>
          <ma-grid-column class="ma-grid-col--3 ma-grid-col--offset-3">
            <ma-radio name="patata" v-model="selected" :card="card" value="id1" @change="onChange">
              {{ text1 }}
            </ma-radio>
          </ma-grid-column>
          <ma-grid-column class="ma-grid-col--3">
            <ma-radio v-model="selected" :card="card" :disabled="disabled" value="id2" @change="onChange">
              {{ text2 }}
            </ma-radio>
          </ma-grid-column>
        </ma-grid-row>
      `,

      props: {
        card: {
          default: card,
        },
        text1: {
          default: text1,
        },
        text2: {
          default: text2,
        },
        disabled: {
          default: disabled,
        },
      },

      data() {
        return {
          selected: 'id1',
        }
      },

      methods: {
        onChange: action(`Change`),
      },
    }
  })
