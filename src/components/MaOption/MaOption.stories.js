import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridRow from '@margarita/components/MaGridRow'
import MaGridColumn from '@margarita/components/MaGridColumn'

import MaOption from './MaOption'

storiesOf('Option', module)
  .addDecorator(withKnobs)

  .add('Radio', () => {
    const card = boolean('Card', false)
    const disabled = boolean('Disabled', false)
    const text1 = text('Text radio 1', 'My first radio')
    const text2 = text('Text radio 2', 'Second radio button')

    return {
      components: { MaOption, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-row>
          <ma-grid-column class="ma-grid-col--3 ma-grid-col--offset-3">
            <ma-option v-model="selected" :card="card" value="id1" type="radio" @change="onChange">
              {{ text1 }}
            </ma-option>
          </ma-grid-column>
          <ma-grid-column class="ma-grid-col--3">
            <ma-option v-model="selected" :card="card" :disabled="disabled" value="id2" type="radio" @change="onChange">
              {{ text2 }}
            </ma-option>
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

  .add('Checkbox', () => {
    const card = boolean('Card', false)
    const checked = boolean('Checked', false)
    const disabled = boolean('Disabled', false)
    const textSlot = text('Text checkbox ', 'My first checkbox')

    return {
      components: { MaOption, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-row>
          <ma-grid-column class="ma-grid-col--3 ma-grid-col--offset-3">
            <ma-option v-model="checked" :card="card" type="checkbox" :disabled="disabled" @change="onChange">
              {{ text1 }}
            </ma-option>
          </ma-grid-column>
        </ma-grid-row>
      `,

      props: {
        card: {
          default: card,
        },
        text1: {
          default: textSlot,
        },
        disabled: {
          default: disabled,
        },
        checked: {
          default: checked,
        },
      },

      data() {
        return {
          selected: true,
        }
      },

      methods: {
        onChange: action(`Change`),
      },
    }
  })
