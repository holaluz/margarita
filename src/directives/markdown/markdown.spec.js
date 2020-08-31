import { render } from '@testing-library/vue'
import { markdown } from './'

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

  test('renders nested markdown nodes', () => {
    const { getByText } = componentBuilder(
      '[**text**<<.bold-class>>](http://ble)<<.anchor-class>>'
    )
    const text = getByText('text')

    expect(text.closest('a')).toHaveClass('anchor-class')
    expect(text).toHaveClass('bold-class')
  })

  test(`renders blank target' link with proper rel attribute values`, () => {
    const { getByText } = componentBuilder(
      '[anchor](http://ble)<<.anchor-class blank>>'
    )
    const anchor = getByText('anchor')

    expect(anchor).toHaveAttribute('target', '_blank')
    expect(anchor).toHaveAttribute('rel', 'noopener,nofollow')
  })
})

const componentBuilder = (markdownText) => {
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
