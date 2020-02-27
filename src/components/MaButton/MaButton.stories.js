import { storiesOf } from '@storybook/vue'
import {
  withKnobs,
  select,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs'
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

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Button', () => {
    const category = select('Categories', BUTTON_CATEGORIES, 'primary')
    const textButton = text('Text', 'Click me')
    const loading = boolean('Loading', false)
    const icon = select('Icons', availableIcons, 'None')
    const iconSize = number('Icon height size in px', 18)
    const fluid = boolean('Fluid', false)
    const rounded = boolean('Rounded', false)
    const ariaLabel = text('Aria Label', '')
    const disabled = boolean('Disabled', false)
    const tag = select('HTML tag', HTML_TAGS, 'button')

    return {
      components: { MaButton, MaGridColumn, MaGridRow, MaIcon },

      template: `
      <div>
        <h2>Dynamic button:</h2>
        <ma-grid-row>
          <ma-grid-column
            class="ma-grid-col--3"
          >
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
              <template v-if="text">
                {{ text }}
              </template>
              <ma-icon
                v-if="getIcon"
                :width="iconSize"
                :height="iconSize"
                :icon="icon"
              />
            </ma-button>
          </ma-grid-column>
        </ma-grid-row>

        <h2>Examples:</h2>
        <ma-grid-row>
          <ma-grid-column
            class="ma-grid-col--3"
            align-start
          >
            <ma-button
              category="gradient"
            >
            This is a button with text only
            </ma-button>
          </ma-grid-column>
          <ma-grid-column
            class="ma-grid-col--1"
            align-start
          >
            <ma-button
              aria-label="Download PDF"
              rounded
              category="primary"
            >
              <ma-icon
                icon="DownloadContract"
                width="35"
                height="35"
              />
            </ma-button>
          </ma-grid-column>
          <ma-grid-column
            class="ma-grid-col--3"
            align-start
          >
            <ma-button>
              This is a button with text and icon
              <ma-icon
                icon="Arrow"
              />
            </ma-button>
          </ma-grid-column>
          <ma-grid-column
            class="ma-grid-col--3"
            align-start
          >
            <ma-button
              category="no-background"
              href="https://www.holaluz.com/"
              tag="a"
            >
              This is a link with text and icon
              <ma-icon
                icon="Exit"
              />
            </ma-button>
          </ma-grid-column>
        </ma-grid-row>
      </div>`,

      computed: {
        getIcon() {
          return this.icon === 'None' ? null : this.icon
        },
      },

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
        icon: {
          default: icon,
        },
        iconSize: {
          default: iconSize,
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
  })
