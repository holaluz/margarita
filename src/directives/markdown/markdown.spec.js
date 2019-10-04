import { render } from '@testing-library/vue'
import './markdown'

const component = {
  template: `
    <div
      v-markdown="'**bold** __italic__ [anchor](url.com){.class}'"
    />
  `,
}

describe('Markdown directive', () => {
  it('renders bold, italic, anchors and classes', () => {
    const { getByText } = render(component)

    getByText('bold')
    getByText('italic')
    const { classList } = getByText('anchor')
    expect(classList.contains('class')).toBe(true)
  })
})
