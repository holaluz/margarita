import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'
import MaGridContainer from '@margarita/components/MaGridContainer'
import notes from './markdown.md'
import markdown from './'

storiesOf('Markdown', module)
  .addDecorator(withKnobs)
  .add(
    'v-markdown',
    () => {
      const markdownText = text('Markdown', 'this is your **markdown**<<.meh>>')

      return {
        directives: { markdown },

        components: { MaGridContainer },

        template: `
          <ma-grid-container>
            <p v-markdown="markdownText" />
          </ma-grid-container>
        `,

        props: {
          markdownText: {
            default: markdownText,
          },
        },
      }
    },
    { notes }
  )
