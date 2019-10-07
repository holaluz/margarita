import { render } from '@testing-library/vue'
import './markdown'

const markdown = `
# title
**bold**
__italic__
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

    getByText('title')
    getByText('bold')
    getByText('italic')
    const { classList } = getByText('anchor')
    expect(classList.contains('class')).toBe(true)
  })
})
