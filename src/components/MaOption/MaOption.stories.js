import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import docs from '../../../docs/components/MaOption.docs.mdx'

export default {
  title: 'Components/Option',
  parameters: {
    docs: { page: docs },
  },
}

export const Radio = () => {
  const card = boolean('Card', false)
  const disabled = boolean('Disabled', false)

  return {
    template: `
      <div>
        <ma-option v-model="selected" v-bind="$props" value="id1" type="radio" @change="onChange">
          My first radio
        </ma-option>
        <ma-option v-model="selected" v-bind="$props" value="id2" type="radio" @change="onChange">
          My second radio
        </ma-option>
      </div>
    `,

    props: {
      card: {
        default: card,
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
}

export const Checkbox = () => {
  const card = boolean('Card', false)
  const disabled = boolean('Disabled', false)

  return {
    template: `
      <div>
        <ma-option v-model="checked" value="checkbox1" type="checkbox" v-bind="$props" @change="onChange">
          My first checkbox
        </ma-option>
        <ma-option v-model="checked" value="checkbox2" type="checkbox" v-bind="$props" @change="onChange">
          My second checkbox
        </ma-option>
      </div>
    `,

    props: {
      card: {
        default: card,
      },
      disabled: {
        default: disabled,
      },
    },

    data() {
      return {
        checked: [],
      }
    },

    methods: {
      onChange: action(`Change`),
    },
  }
}
