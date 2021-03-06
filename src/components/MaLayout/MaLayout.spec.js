/* eslint-disable no-console */
import { render } from '@margarita/margarita-test-utils'
import MaLayout from './MaLayout'

describe('MaLayout', () => {
  test('adds only one stack if no columns are provided', () => {
    const { stacks, grids } = renderComponent({ columns: '' })

    expect(stacks).toHaveLength(1)
    expect(grids).toHaveLength(0)
  })

  test('adds one stack and one grid if columns and one slot children is provided', () => {
    const { stacks, grids } = renderComponent(
      {
        columns: '1',
      },
      `<div>child 1</div>`
    )

    expect(stacks).toHaveLength(1)
    expect(grids).toHaveLength(1)
  })

  test('adds one stack and two grids if two rows and two slot children are provided', () => {
    const { stacks, grids } = renderComponent(
      {
        columns: '1 - 1',
      },
      `
        <div>child 1</div>
        <div>child 2</div>
      `
    )
    expect(stacks).toHaveLength(1)
    expect(grids).toHaveLength(2)
  })

  test('adds one stack and no grids no slot children are provided', () => {
    const { stacks, grids } = renderComponent({ columns: '1' })

    expect(stacks).toHaveLength(1)
    expect(grids).toHaveLength(0)
  })

  test('keeps additional attributes', () => {
    const { getByTestId } = render({
      components: { MaLayout },
      template: `
        <ma-layout data-testid="layout" gap="small" columns="12" id="123" :class="['class1', 'class2']">
          <div data-testid="div" id="456" class="class"></div>
        </ma-layout>
      `,
    })

    const layout = getByTestId('layout')
    expect(layout).toHaveAttribute('id', '123')
    expect(layout).toHaveClass('ma-stack', 'class1', 'class2')

    const div = getByTestId('div')
    expect(div).toHaveAttribute('id', '456')
    expect(div).toHaveClass('class')
  })
})

function renderComponent(props, slots) {
  const utils = render(MaLayout, {
    props: { gap: 'small', columns: '12', space: 'small', ...props },
    slots: { default: slots || 'content' },
  })

  const stacks = utils.baseElement.querySelectorAll('.ma-stack')
  const grids = utils.baseElement.querySelectorAll('.ma-columns')

  return {
    ...utils,
    stacks,
    grids,
  }
}
