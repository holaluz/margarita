import { render } from '@testing-library/vue'
import markdown from './'

describe('Markdown directive', () => {
  test.each`
    type        | markdown               | nodeName
    ${'title'}  | ${'# title'}           | ${'H1'}
    ${'bold'}   | ${'**bold**'}          | ${'STRONG'}
    ${'italic'} | ${'_italic_'}          | ${'EM'}
    ${'anchor'} | ${'[anchor](url.com)'} | ${'A'}
  `(
    'renders $type with $nodeName as node name',
    ({ type, markdown, nodeName }) => {
      const { getByText } = componentBuilder(markdown)

      const node = getByText(type).nodeName
      expect(node).toBe(nodeName)
    }
  )

  test('renders anchor with correct attributes', () => {
    const { getByText } = componentBuilder(
      '[anchor](https://url.com)<<.class-name #id-name>>'
    )

    const anchor = getByText('anchor')

    expect(anchor).toHaveClass('class-name')
    expect(anchor).toHaveAttribute('id', 'id-name')
    expect(anchor).toHaveAttribute('href', 'https://url.com')
  })
})

const componentBuilder = markdownText => {
  return render({
    template: `<div v-markdown="markdownText" />`,
    directives: {
      markdown,
    },
    data() {
      return { markdownText }
    },
  })
}
