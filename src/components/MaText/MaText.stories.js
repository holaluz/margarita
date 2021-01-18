import { select, boolean, text } from '@storybook/addon-knobs'
import MaText from '@margarita/components/MaText'
import { text as TEXT_TOKENS } from '@margarita/tokens'
import { colorNamesList } from '@margarita/utils/colorNamesList'

const { textSize, textTags } = TEXT_TOKENS
const colorValues = colorNamesList

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const textToDisplay = text('Text to display', 'Hello everybody')
  const size = select('Size', Object.keys(textSize.mobile), 'medium')
  const tag = select('Tag', textTags, 'span')
  const color = select('Color', colorValues, 'gray-dark')
  const italic = boolean('Italic', false)

  return {
    components: { MaText },
    template: `
        <ma-text
          :size="size"
          :tag="tag"
          :italic="italic"
          :color="color"
        >
          {{ textToDisplay }}
        </ma-text>
      `,

    props: {
      size: {
        default: size,
      },
      tag: {
        default: tag,
      },
      color: {
        default: color,
      },
      italic: {
        default: italic,
      },
      textToDisplay: {
        default: textToDisplay,
      },
    },
  }
}
