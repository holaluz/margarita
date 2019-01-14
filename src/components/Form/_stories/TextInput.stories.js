import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'
import { action } from '@storybook/addon-actions'

import GridColumn from '../../Grid/GridColumn/GridColumn'

import TextInput from '../TextInput/TextInput'
import TextInputNotes from './notes/TextInput.md'

const GRID_ARRAY = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

storiesOf('Form Components', module)
  .addDecorator(withKnobs)
  .add('Text Input', withMarkdownNotes(TextInputNotes)(() => {
    const disabled = boolean('Disable', false)
    const errorMessage = text('Error msg', 'You have an error')
    const hasError = boolean('Has error', false)
    const label = text('Label', 'Label')
    const offset = select('Offset', [ 0, ...GRID_ARRAY ], 4)
    const placeholder = text('Placeholder', 'Placeholder')
    const size = select('Size', GRID_ARRAY, 4)
    const value = text('Value', '')

    return ({
      components: { TextInput, GridColumn },

      template: `
        <GridColumn :class="getClass">
          <TextInput
            id="my-text-input"
            :errorMessage="errorMessage"
            :disabled="disabled"
            :hasError="hasError"
            :label="label"
            :placeholder="placeholder"
            @blur="onBlur"
            @input.native="onInput"
            @change="onChange"
            v-model="value"
          />
        </GridColumn>`,

      computed: {
        getClass () {
          return {
            [`grid-col--${this.size}`]: this.size,
            [`grid-col--offset-${this.offset}`]: this.offset
          }
        }
      },

      data () {
        return {
          disabled,
          errorMessage,
          hasError,
          label,
          offset,
          placeholder,
          size,
          value
        }
      },

      methods: {
        onInput: action('Triggered event: input'),
        onChange: action('Triggered event: change'),
        onBlur: action('Triggered event: blur')
      },

      watch: {
        value: action('Changed property: value')
      }
    })
  }))
