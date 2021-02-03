import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import docs from '../../../docs/components/MaTextField.docs.mdx'

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
  parameters: {
    docs: { page: docs },
  },
}

export const TextField = () => {
  const disabled = boolean('Disable', false)
  const label = text('Label', 'Label')
  const ariaLabel = text('ARIA Label', '')
  const placeholder = text('Placeholder', 'Placeholder')
  const value = text('Value', '')

  return {
    template: `
      <ma-text-field
        :disabled="disabled"
        :label="label"
        :aria-label="ariaLabel"
        :placeholder="placeholder"
        v-model="value"
        @blur="onBlur"
      />
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
    template: `
      <ma-text-field v-model="value" @blur="onBlur" label="Label">
        <span slot="labelSibling">{{siblingLabel}}</span>
      </ma-text-field>
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
    template: `
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

export const TextFieldWithError = () => {
  const errorMessage = text('Error msg', 'You have an error')
  const label = text('Label', 'Label')

  return {
    template: `
      <ma-text-field
        :errorMessage="errorMessage"
        :hasError="true"
        :label="label"
        v-model="value"
      />
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
