import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaOption from './MaOption'

export default {
  title: 'Components/Option',
}

export const Radio = () => {
  const card = boolean('Card', false)
  const disabled = boolean('Disabled', false)
  const text1 = text('Text radio 1', 'My first radio')
  const text2 = text('Text radio 2', 'Second radio button')

  return {
    components: { MaOption },

    template: `
      <div>
        <ma-option v-model="selected" :card="card" value="id1" type="radio" @change="onChange">
          {{ text1 }}
        </ma-option>
        <ma-option v-model="selected" :card="card" :disabled="disabled" value="id2" type="radio" @change="onChange">
          {{ text2 }}
        </ma-option>
      </div>
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
}

export const Checkbox = () => {
  const card = boolean('Card', false)
  const checked = boolean('Checked', false)
  const disabled = boolean('Disabled', false)
  const textSlot = text('Text checkbox ', 'My first checkbox')

  return {
    components: { MaOption },

    template: `
      <ma-option v-model="checked" :card="card" type="checkbox" :disabled="disabled" @change="onChange">
        {{ text1 }}
      </ma-option>
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
}
