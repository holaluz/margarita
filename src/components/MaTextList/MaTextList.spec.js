import { render } from '@margarita/margarita-test-utils'
import MaTextList from './MaTextList'

describe('TextList', () => {
  test('renders item from list', () => {
    const { getByText } = renderComponent()

    expect(getByText('Item 1')).toBeInTheDocument()
  })

  test(`'tag' property renders the valid provided tag element`, () => {
    const { getByText } = renderComponent({ tag: 'ol' })

    expect(getByText('Item 1').parentNode.parentNode.nodeName).toBe('OL')
  })

  test(`'size' property assigns the valid provided size styles to text`, () => {
    const { getByText } = renderComponent({
      size: 'medium',
    })

    expect(getByText('Item 1').parentNode).toHaveStyle({
      'font-size': '1.125rem',
    })
  })

  test(`'tone' property assigns the provided style to text`, () => {
    const { getByText } = renderComponent({
      tone: 'gray',
    })

    expect(getByText('Item 1').parentNode).toHaveStyle({
      color: 'rgb(118, 118, 118)',
    }) //jest converts hex colors to rgb
  })

  test(`'icon' property assigns the provided icon to the ul list`, () => {
    const { getByText } = renderComponent({
      icon: 'bullet',
    })

    expect(getByText('Item 1').parentNode.parentNode).toHaveClass('bullet')
  })

  test(`icon is not shown in ol list`, () => {
    const { getByText } = renderComponent({
      tag: 'ol',
      icon: 'bullet',
    })

    expect(getByText('Item 1').parentNode.parentNode).not.toHaveClass('bullet')
  })
})

function renderComponent(props = {}) {
  return render(MaTextList, {
    props: {
      ...props,
    },
    slots: {
      default: ['<p>Item 1</p><p>Item 2</p>'],
    },
  })
}
