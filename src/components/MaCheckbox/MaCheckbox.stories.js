import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaCheckbox from './MaCheckbox'

const GRID_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)

  .add('Checkbox', () => {
    const card = boolean('Card', true)
    const checked = boolean('Checked', false)
    const size = select('Size', GRID_ARRAY, 3)
    const offset = select('Offset', [0, ...GRID_ARRAY], 4)
    const disabled = boolean('Disabled', false)
    const textSlot = text('Text checkbox ', 'My first checkbox')

    return {
      components: { MaCheckbox, MaGridColumn },

      template: `
        <ma-grid-column :class="getClass">
          <ma-checkbox :checked="checked" :card="card" :disabled="disabled">
            {{ textSlot }}
          </ma-checkbox>
        </ma-grid-column>
      `,

      computed: {
        getClass() {
          return {
            [`ma-grid-col--${this.size}`]: this.size,
            [`ma-grid-col--offset-${this.offset}`]: this.offset,
          }
        },
      },

      props: {
        card: {
          default: card,
        },
        checked: {
          default: checked,
        },
        disabled: {
          default: disabled,
        },
        textSlot: {
          default: textSlot,
        },
        offset: {
          default: offset,
        },
        size: {
          default: size,
        },
      },
    }
  })
