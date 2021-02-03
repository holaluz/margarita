import { select, boolean } from '@storybook/addon-knobs'
import { text, tones } from '@margarita/tokens'

const textTags = ['p', 'span', 'label']

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const allowedTextSizes = Object.keys(text.textSize.mobile)
  const tag = select('Tag', textTags, 'span')
  const tone = select('Tone', Object.keys(tones), 'gray')
  const italic = boolean('Italic', false)
  const bold = boolean('Bold', false)

  return {
    template: `
      <div style="display: flex;">
        <ma-stack space="medium">
          <ma-text size="medium">
            MaText with different sizes
          </ma-text>
          <ma-text
            v-for="textSize in allowedTextSizes"
            :key="textSize"
            :size="textSize"
            :tag="tag"
            :italic="italic"
            :bold="bold"
            :tone="tone"
          >
            {{ textSize }} size example text
          </ma-text>
        </ma-stack>
        <ma-stack space="medium" style="margin-left: 4rem;">
          <ma-text size="medium">
            MaText displaying used line-height
          </ma-text>
          <ma-text
            v-for="textSize in allowedTextSizes"
            :key="textSize"
            :size="textSize"
            :tag="tag"
            :italic="italic"
            :bold="bold"
            :tone="tone"
            style="background-color:var(--color-blue-light)"
          >
            {{ textSize }} Example with UpperCase and LowerCase
          </ma-text>
        </ma-stack>
      </div>
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
