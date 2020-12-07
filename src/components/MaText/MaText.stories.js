import { select } from '@storybook/addon-knobs'
import MaText from '@margarita/components/MaText'
import { fontSizes, fontTags } from '@margarita/tokens'

export default {
  title: 'Components/Text',
}

export const Text = () => {
  const size = select('Size', fontSizes, fontSizes[3])
  const tag = select('Tag', fontTags, fontTags[1])

  return {
    components: { MaText },
    template: `
        <ma-text
          :textSize="textSize"
          :tag="tag"
        >
          Hello everybody
        </ma-text>
      `,

    props: {
      textSize: {
        default: size,
      },
      tag: {
        default: tag,
      },
    },
  }
}
