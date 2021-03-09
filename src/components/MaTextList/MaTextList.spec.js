import { render } from '@margarita/margarita-test-utils'
import MaTextList from './MaTextList'

const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

describe('Text', () => {
  test('renders item from list', () => {
    const { getByText } = renderComponent()

    expect(getByText(listItems[0])).toBeInTheDocument()
  })

  test(`'tag' property renders the valid provided tag element`, () => {
    const { getByText } = renderComponent({ tag: 'ol' })

    expect(getByText(listItems[0]).parentNode.parentNode.nodeName).toBe('OL')
  })

  test(`'size' property assigns the valid provided size styles to text`, () => {
    const { getByText } = renderComponent({
      size: 'medium',
    })

    expect(getByText(listItems[0])).toHaveStyle({
      'font-size': '1.125rem',
    })
  })

  test(`'tone' property assigns the provided style to text`, () => {
    const { getByText } = renderComponent({
      tone: 'gray',
    })

    expect(getByText(listItems[0])).toHaveStyle({ color: 'rgb(118, 118, 118)' }) //jest converts hex colors to rgb
  })

  test(`'icon' property assigns the provided icon to the ul list`, () => {
    const { getByText } = renderComponent({
      icon: 'bullet',
    })

    expect(getByText(listItems[0]).parentNode.parentNode).toHaveClass('bullet')
  })

  test(`icon is not shown in ol list`, () => {
    const { getByText } = renderComponent({
      tag: 'ol',
      icon: 'bullet',
    })

    expect(getByText(listItems[0]).parentNode.parentNode).not.toHaveClass(
      'bullet'
    )
  })
})

function renderComponent(props = {}) {
  return render(MaTextList, {
    props: {
      listItems,
      ...props,
    },
  })
}
