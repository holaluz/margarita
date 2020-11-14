import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaButton from '@margarita/components/MaButton'
import MaIcon from '@margarita/components/MaIcon'

import MaTextField from './MaTextField'

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

export default {
  title: 'Components/TextField',
}

export const TextField = () => {
  const disabled = boolean('Disable', false)
  const label = text('Label', 'Label')
  const ariaLabel = text('ARIA Label', '')
  const placeholder = text('Placeholder', 'Placeholder')
  const value = text('Value', '')

  return {
    components: { MaTextField, MaGridColumn, MaIcon, MaButton },

    template: `
      <ma-grid-column class="ma-grid-col--4">
        <ma-text-field
          :disabled="disabled"
          :label="label"
          :aria-label="ariaLabel"
          :placeholder="placeholder"
          v-model="value"
          @blur="onBlur"
        />
      </ma-grid-column>
    `,

    props: {
      disabled: { default: disabled },
      label: { default: label },
      ariaLabel: { default: ariaLabel },
      placeholder: { default: placeholder },
      textValue: { default: value },
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
}

export const TextFieldWithSiblingLabel = () => {
  const siblingLabel = text('Sibling label', 'additional label')

  return {
    components: { MaTextField, MaGridColumn },

    template: `
      <ma-grid-column class="ma-grid-col--4">
        <ma-text-field v-model="value" @blur="onBlur" label="Label">
          <span slot="labelSibling">{{siblingLabel}}</span>
        </ma-text-field>
      </ma-grid-column>
    `,

    data() {
      return {
        value: '',
      }
    },

    props: {
      siblingLabel: { default: siblingLabel },
    },

    methods: {
      onBlur: action(`${TRIGGERED_MSG} blur`),
    },
  }
}

export const TextFieldWithIcon = () => {
  const disabled = boolean('Disable', false)
  const label = text('Label', 'Label')
  const placeholder = text('Placeholder', 'Placeholder')
  const value = text('Value', '')
  const icon = select('Icon', ICONS, ICONS[0])

  return {
    components: { MaTextField, MaGridColumn, MaIcon, MaButton },

    template: `
      <ma-grid-column class="ma-grid-col--4">
        <ma-text-field
          :disabled="disabled"
          :label="label"
          :placeholder="placeholder"
          v-model="value"
          @blur="onBlur"
        >
          <ma-button slot="inputSibling">
            <ma-icon
              :icon="icon"
              width="16"
              height="16"
            />
          </ma-button>
        </ma-text-field>
      </ma-grid-column>
    `,

    props: {
      disabled: { default: disabled },
      label: { default: label },
      placeholder: { default: placeholder },
      textValue: { default: value },
      icon: { default: icon },
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
}

export const ErroredTextField = () => {
  const errorMessage = text('Error msg', 'You have an error')
  const label = text('Label', 'Label')

  return {
    components: { MaTextField, MaGridColumn },

    template: `
      <ma-grid-column class="ma-grid-col--4">
        <ma-text-field
          :errorMessage="errorMessage"
          :hasError="true"
          :label="label"
          v-model="value"
        />
      </ma-grid-column>
    `,

    props: {
      errorMessage: { default: errorMessage },
      label: { default: label },
    },

    data() {
      return {
        value: '',
      }
    },
  }
}
