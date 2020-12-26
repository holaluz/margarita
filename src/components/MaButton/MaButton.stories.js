import { select, text, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import availableIcons from '@margarita/components/MaIcon/availableIcons'

const BUTTON_CATEGORIES = [
  'primary',
  'secondary',
  'tertiary',
  'gradient',
  'no-background',
]

const HTML_TAGS = ['button', 'a']

export default {
  title: 'Components/Button',
}

export const Button = () => {
  const category = select('Categories', BUTTON_CATEGORIES, 'primary')
  const textButton = text('Text', 'Click me')
  const loading = boolean('Loading', false)
  const rounded = boolean('Rounded', false)
  const ariaLabel = text('Aria Label', '')
  const disabled = boolean('Disabled', false)
  const tag = select('HTML tag', HTML_TAGS, 'button')

  return {
    template: `
      <ma-button @click="action"v-bind="$props">
        {{ text }}
      </ma-button>
    `,

    props: {
      ariaLabel: {
        default: ariaLabel,
      },
      disabled: {
        default: disabled,
      },
      loading: {
        default: loading,
      },
      rounded: {
        default: rounded,
      },
      tag: {
        default: tag,
      },
      text: {
        default: textButton,
      },
      category: {
        default: category,
      },
    },

    methods: {
      action: action('clicked'),
    },
  }
}

export const IconButton = () => {
  const icon = select('Icons', availableIcons, availableIcons[0])
  const iconSize = number('Icon height size in px', 18)

  return {
    template: `
    <ma-button rounded category="primary">
      <ma-icon
        :icon="computedIcon"
        :width="iconSize"
        :height="iconSize"
      />
    </ma-button>
    `,

    props: {
      icon: {
        default: icon,
      },
      iconSize: {
        default: iconSize,
      },
    },

    computed: {
      computedIcon() {
        return this.icon === 'None' ? null : this.icon
      },
    },
  }
}
