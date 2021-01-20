import { select, boolean } from '@storybook/addon-knobs'
import { text, tones } from '@margarita/tokens'

const textTags = ['p', 'span', 'label']

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const allowedTextSizes = Object.keys(text.textSize.mobile)
  const tag = select('Tag', textTags, 'span')
  const tone = select('Tone', Object.keys(tones), 'neutral')
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
            :tone="tone"
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
