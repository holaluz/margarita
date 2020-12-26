import { text } from '@storybook/addon-knobs'
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
  decorators: [
    () => ({
      template:
        '<div style="max-width: 700px; margin-top:3rem; overflow: auto"><story/></div>',
    }),
  ],
}

export const VMarkdown = () => {
  const markdownText = text(
    'Markdown',
    'text in **bold**. text in _italics_. and also [links](https://url.com)<<.class>> and [links with target blank](https://url.com)<<blank>>'
  )

  return {
    directives: { markdown },

    template: `
      <div>
        <p v-markdown="markdownText" />
        <ma-alert>
          <span>
            In order to render markdown in Nuxt <b>universal mode</b>, we need to add this property to
            <b>nuxt.config.js</b>:
          </span>
          <pre style="font-size:0.8rem">${ssrCodeSnippet}</pre>
        </ma-alert>
      </div>
    `,

    props: {
      markdownText: {
        default: markdownText,
      },
    },
  }
}

VMarkdown.storyName = 'v-markdown'
