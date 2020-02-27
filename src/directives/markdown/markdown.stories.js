import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'
import MaGridContainer from '@margarita/components/MaGridContainer'
import markdown from './'

storiesOf('Markdown', module)
  .addDecorator(withKnobs)
  .add('v-markdown', () => {
    const markdownText = text(
      'Markdown',
      'text in **bold**. text in _italics_. and also [links](https://url.com)<<.class>> and [links with target blank](https://url.com)<<blank>>'
    )

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
  })
