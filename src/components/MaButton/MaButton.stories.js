import { select, text, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaGridRow from '@margarita/components/MaGridRow'
import MaButton from '@margarita/components/MaButton'
import MaIcon from '@margarita/components/MaIcon'
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
  const fluid = boolean('Fluid', false)
  const rounded = boolean('Rounded', false)
  const ariaLabel = text('Aria Label', '')
  const disabled = boolean('Disabled', false)
  const tag = select('HTML tag', HTML_TAGS, 'button')

  return {
    components: { MaButton },
    template: `
      <ma-button
        @click="action"
        :text="text"
        :rounded="rounded"
        :category="category"
        :tag="tag"
        :fluid="fluid"
        :disabled="disabled"
        :loading="loading"
        :aria-label="ariaLabel"
      >
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
      fluid: {
        default: fluid,
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
    components: { MaButton, MaIcon },

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

export const Examples = () => {
  return {
    components: { MaButton, MaGridColumn, MaGridRow, MaIcon },

    template: `
    <ma-grid-row>
      <ma-grid-column class="ma-grid-col--3">
        <ma-button category="gradient">
          This is a button with gradient and only text
        </ma-button>
      </ma-grid-column>
      <ma-grid-column class="ma-grid-col--3">
        <ma-button>
          This is a button with text and icon
          <ma-icon icon="Arrow" />
        </ma-button>
      </ma-grid-column>
      <ma-grid-column class="ma-grid-col--3">
        <ma-button
          category="no-background"
          href="https://www.holaluz.com/"
          tag="a"
        >
          This is a link with text and icon
          <ma-icon icon="Exit" />
        </ma-button>
      </ma-grid-column>
    </ma-grid-row>
    `,
  }
}
