import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaCheckbox from './MaCheckbox'

const GRID_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)

  .add('Checkbox', () => {
    const checked = boolean('Checked', false)
    const label = text('Label', 'Click to check the checkbox')
    const size = select('Size', GRID_ARRAY, 3)
    const offset = select('Offset', [0, ...GRID_ARRAY], 4)
    const disabled = boolean('Disabled', false)

    return {
      components: { MaCheckbox, MaGridColumn },

      template: `
        <ma-checkbox
          :label="label"
          :checked="checked"
          :disabled="disabled"
        />
      `,

      props: {
        checked: {
          default: checked,
        },
        disabled: {
          default: disabled,
        },
        label: {
          default: label,
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
