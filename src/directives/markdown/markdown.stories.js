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
  argTypes: {
    markdownText: {
      control: 'text',
      defaultValue:
        'text in **bold**. text in _italics_. and also [links](https://url.com)<<.class>> and [links with target blank](https://url.com)<< blank >>',
    },
  },
  parameters: {
    controls: false,
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
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
})

export const VMarkdown = Template.bind({})
VMarkdown.storyName = 'v-markdown'
