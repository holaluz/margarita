import { render } from '@margarita/margarita-test-utils'
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
      const { getByText } = renderComponent(markdown)

      const node = getByText(type).nodeName
      expect(node).toBe(nodeName)
    }
  )

  test('renders anchor with correct attributes', () => {
    const { getByText } = renderComponent(
      '[anchor](https://url.com)<<.class-name #id-name>>'
    )

    const anchor = getByText('anchor')

    expect(anchor).toHaveClass('class-name')
    expect(anchor).toHaveAttribute('id', 'id-name')
    expect(anchor).toHaveAttribute('href', 'https://url.com')
  })

  test('renders nested markdown nodes', () => {
    const { getByText } = renderComponent(
      '[**text**<<.bold-class>>](http://ble)<<.anchor-class>>'
    )
    const text = getByText('text')

    expect(text.closest('a')).toHaveClass('anchor-class')
    expect(text).toHaveClass('bold-class')
  })

  test(`renders blank target' link with proper rel attribute values`, () => {
    const { getByText } = renderComponent(
      '[anchor](http://ble)<<.anchor-class blank>>'
    )
    const anchor = getByText('anchor')

    expect(anchor).toHaveAttribute('target', '_blank')
    expect(anchor).toHaveAttribute('rel', 'noopener,nofollow')
  })
})

function renderComponent(markdownText) {
  const Component = {
    template: `<div v-markdown="markdownText" />`,
    directives: { markdown },
    props: ['markdownText'],
  }

  return render(Component, {
    props: { markdownText },
  })
}
