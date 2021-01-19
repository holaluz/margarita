import { select, boolean } from '@storybook/addon-knobs'
import { text as TEXT_TOKENS } from '@margarita/tokens'
import { colorNamesList } from '@margarita/utils/colorNamesList'

const colorValues = colorNamesList
const textTags = ['p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const allowedTextSizes = Object.keys(TEXT_TOKENS.textSize.mobile)
  const tag = select('Tag', textTags, 'span')
  const color = select('Color', colorValues, 'gray-dark')
  const italic = boolean('Italic', false)

  return {
    template: `
        <ma-stack space="small">
          <ma-text
            v-for="textSize in allowedTextSizes"
            :key="textSize"
            :size="textSize"
            :tag="tag"
            :italic="italic"
            :color="color"
          >
            {{ textSize }} example text
          </ma-text>
        </ma-stack space="small">
      `,

    data() {
      return {
        allowedTextSizes,
      }
    },

    props: {
      tag: {
        default: tag,
      },
      color: {
        default: color,
      },
      italic: {
        default: italic,
      },
    },
  }
}
