import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaButton from '@margarita/components/MaButton'
import MaIcon from '@margarita/components/MaIcon'

import MaText from './MaText'

const GRID_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const ICONS = [
  'AddContract',
  'Arrow',
  'ArrowToEnd',
  'BulbOn',
  'Close',
  'DetailsContract',
  'DownloadContract',
  'Exit',
  'Gas',
  'Link',
  'Logo',
  'LongArrow',
  'Phone',
  'Plug',
  'User',
]

const TRIGGERED_MSG = 'Triggered event:'
const CHANGED_MSG = 'Changed property:'

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Text', () => {
    const disabled = boolean('Disable', false)
    const errorMessage = text('Error msg', 'You have an error')
    const hasError = boolean('Has error', false)
    const label = text('Label', 'Label')
    const ariaLabel = text('ARIA Label', '')
    const placeholder = text('Placeholder', 'Placeholder')
    const size = select('Size', GRID_ARRAY, 4)
    const value = text('Value', '')
    const icon = select('Icon', ['', ...ICONS], '')
    const siblingLabel = text('Sibling label', '')

    return {
      components: { MaText, MaGridColumn, MaIcon, MaButton },

      template: `
        <ma-grid-column :class="getClass">
          <ma-text
            :errorMessage="errorMessage"
            :disabled="disabled"
            :hasError="hasError"
            :label="label"
            :aria-label="ariaLabel"
            :placeholder="placeholder"
            v-model="value"
            @blur="onBlur"
          >
            <ma-button
              v-if="siblingLabel"
              href="#"
              category="no-background"
              style="flex: 0 1 100%; margin-left: 1rem;"
              slot="labelSibling"
              v-text="siblingLabel"
            />
            <ma-button
              v-if="icon"
              slot="inputSibling"
            >
              <ma-icon
                :icon="icon"
                width="16"
                height="16"
              />
            </ma-button>
          </ma-text>
        </ma-grid-column>`,

      computed: {
        getClass() {
          return [`ma-grid-col--${this.size}`]
        },
      },

      props: {
        disabled: {
          default: disabled,
        },
        errorMessage: {
          default: errorMessage,
        },
        hasError: {
          default: hasError,
        },
        label: {
          default: label,
        },
        ariaLabel: {
          default: ariaLabel,
        },
        placeholder: {
          default: placeholder,
        },
        size: {
          default: size,
        },
        textValue: {
          default: value,
        },
        icon: {
          default: icon,
        },
        siblingLabel: {
          default: siblingLabel,
        },
      },

      data() {
        return {
          value: this.textValue,
        }
      },

      methods: {
        onBlur: action(`${TRIGGERED_MSG} blur`),
      },

      watch: {
        textValue(newValue) {
          this.value = newValue
        },
        value: action(`${CHANGED_MSG} value`),
      },
    }
  })
