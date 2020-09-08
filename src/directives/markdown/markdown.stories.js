import { text } from '@storybook/addon-knobs'
import MaGridContainer from '@margarita/components/MaGridContainer'
import MaAlert from '@margarita/components/MaAlert'
import { markdown } from './'

const ssrCodeSnippet = `
import { markdownSSR } from '@holaluz/margarita'

export default {
  [...]
  render: {
    bundleRenderer: {
      directives: {
        markdown: markdownSSR
      }
    }
  }
}
`

export default {
  title: 'Plugins/Markdown',
}

export const VMarkdown = () => {
  const markdownText = text(
    'Markdown',
    'text in **bold**. text in _italics_. and also [links](https://url.com)<<.class>> and [links with target blank](https://url.com)<<blank>>'
  )

  return {
    directives: { markdown },

    components: { MaGridContainer, MaAlert },

    template: `
          <ma-grid-container>
            <p v-markdown="markdownText" />
            <ma-alert style="max-width: 700px; margin-top:3rem; overflow: auto">
              <p style="margin-top:0">
                In order to render markdown in Nuxt <b>universal mode</b>, we need to add this property to
                <b>nuxt.config.js</b>:
              </p>
              <pre>${ssrCodeSnippet}</pre>
            </ma-alert>
          </ma-grid-container>
        `,

    props: {
      markdownText: {
        default: markdownText,
      },
    },
  }
}

VMarkdown.storyName = 'v-markdown'
