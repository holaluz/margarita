import { render } from '@testing-library/vue'
import './markdown'

const markdown = `
# title
**bold**
_italic_
[anchor](url.com)<<.class>>
`

const component = {
  template: `<div v-markdown="markdown" />`,
  data() {
    return { markdown }
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

    const { classList, nodeName } = getByText('anchor')
    expect(nodeName).toBe('A')
    expect(classList.contains('class')).toBe(true)
  })
})
