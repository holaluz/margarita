import { select, boolean } from '@storybook/addon-knobs'
import { text as TEXT_TOKENS, color as COLOR_TOKENS } from '@margarita/tokens'

const textTags = ['p', 'span', 'label']

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const allowedTextSizes = Object.keys(TEXT_TOKENS.textSize.mobile)
  const tag = select('Tag', textTags, 'span')
  const color = select('Color', Object.keys(COLOR_TOKENS), 'gray')
  const tone = select(
    'Tone',
    ['lighter', 'light', 'base', 'dark', 'darker'],
    'base'
  )
  const italic = boolean('Italic', false)
  const bold = boolean('Bold', false)

  return {
    template: `
        <ma-stack space="small">
          <ma-text
            v-for="textSize in allowedTextSizes"
            :key="textSize"
            :size="textSize"
            :tag="tag"
            :italic="italic"
            :bold="bold"
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
      tone: {
        default: tone,
      },
      italic: {
        default: italic,
      },
      bold: {
        default: bold,
      },
    },
  }
}
