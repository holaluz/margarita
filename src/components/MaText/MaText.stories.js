import { select, boolean } from '@storybook/addon-knobs'
import { text as TEXT_TOKENS } from '@margarita/tokens'
import { colorNamesList } from '@margarita/utils/colorPropValidator'

const textTags = ['p', 'span', 'label']

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const allowedTextSizes = Object.keys(TEXT_TOKENS.textSize.mobile)
  const tag = select('Tag', textTags, 'span')
  const color = select('Color', colorNamesList, 'gray-dark')
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
