/* eslint-disable no-console */
import { render } from '@margarita/margarita-test-utils'
import MaTextList from './MaTextList'

describe('TextList', () => {
  test('renders item from list', () => {
    const { getByText, getAllByRole } = renderComponent()

    const item1 = getByText('Item 1')
    expect(getAllByRole('listitem')[0]).toContainElement(item1)
  })

  test(`'tag' property renders the valid provided tag element`, () => {
    const { getByRole } = renderComponent({ tag: 'ol' })

    expect(getByRole('list').nodeName).toBe('OL')
  })

  test(`'size' property assigns the valid font size to list item`, () => {
    const { getByText } = renderComponent({
      size: 'medium',
    })

    expect(getByText('Item 1').parentNode).toHaveStyle({
      'font-size': '1.125rem',
    })
  })

  test(`'tone' property assigns the valid color to list item`, () => {
    const { getByText } = renderComponent({
      tone: 'gray',
    })

    expect(getByText('Item 1').parentNode).toHaveStyle({
      color: 'rgb(118, 118, 118)',
    }) //jest converts hex colors to rgb
  })

  test(`'icon' property assigns the provided icon to the ul list`, () => {
    const { getByRole } = renderComponent({
      icon: 'bullet',
    })
    expect(getByRole('list')).toHaveClass('bullet')
  })

  test(`icon is not shown in ol list`, () => {
    const { getByRole } = renderComponent({
      tag: 'ol',
      icon: 'bullet',
    })

    expect(getByRole('list')).not.toHaveClass('bullet')
  })

  test(`warns if no items have been defined`, () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})
    renderComponent(null, {
      slots: {
        default: [],
      },
    })

    expect(console.error).toHaveBeenCalledWith(
      '[TextList component] No list items found'
    )
  })
})

function renderComponent(props, params) {
  return render(MaTextList, {
    props: {
      ...props,
    },
    slots: {
      default: ['<p>Item 1</p><p>Item 2</p>'],
    },
    ...params,
  })
}
