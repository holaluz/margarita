import { render } from '@testing-library/vue'
import markdown from './'

const markdownText = `
# title
**bold**
_italic_
[anchor](url.com)<<.class #id-name>>
`

const component = {
  template: `<div v-markdown="markdownText" />`,
  directives: {
    markdown,
  },
  data() {
    return { markdownText }
  },
}

describe('Markdown directive', () => {
  it('renders title, bold, italic, anchors and classes', () => {
    const { getByText } = render(component)

    const titleNode = getByText('title').nodeName
    expect(titleNode).toBe('H1')

    const boldNode = getByText('bold').nodeName
    expect(boldNode).toBe('STRONG')

    const italicNode = getByText('italic').nodeName
    expect(italicNode).toBe('EM')

    const { classList, id, nodeName } = getByText('anchor')
    expect(nodeName).toBe('A')
    expect(classList.contains('class')).toBe(true)
    expect(id).toBe('id-name')
  })
})
