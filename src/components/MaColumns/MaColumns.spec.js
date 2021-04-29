/* eslint-disable no-console */
import { render } from '@margarita/margarita-test-utils'
import MaColumns from './MaColumns'
import { spacing } from '../../tokens'

describe('MaColumns', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})
  })

  test('adds spacing styles', () => {
    const { contentWrapper } = renderComponent({ gap: 'large' })
    expect(contentWrapper).toHaveStyle({ '--column-gap': spacing.large })
  })

  test('adds spacing styles from array', () => {
    const { contentWrapper } = renderComponent({ gap: ['small', 'large'] })
    expect(contentWrapper).toHaveStyle({ '--column-gap': spacing.small })
  })

  test('adds justify styles', () => {
    const { contentWrapper } = renderComponent({ justify: 'space-between' })
    expect(contentWrapper).toHaveStyle({ justifyContent: 'space-between' })
  })

  test('adds vertical alignment class', () => {
    const { contentWrapper } = renderComponent({ verticalAlign: 'end' })
    expect(contentWrapper).toHaveClass('vertical-align-end')
  })

  test('warns if columns exceed 12 column layout', () => {
    renderComponent({ columns: '6 6 6' })
    expect(console.error).toHaveBeenCalledWith(
      '[Layout Error] The row overflows the 12-column layout.'
    )
  })

  test('warns if autoflow operator has other columns', () => {
    renderComponent({ columns: '1 * 1' })
    expect(console.error).toHaveBeenCalledWith(
      '[Layout Error] The autoFlow operator (*) cannot have other columns in the row.'
    )
  })

  test('warns if column is not an integer', () => {
    renderComponent({ columns: '1 1.5' })
    expect(console.error).toHaveBeenCalledWith(
      '[Layout Error] Column #1 must be an integer.'
    )
  })

  test('warns if column size is out of bounds', () => {
    renderComponent({ columns: '-3' })
    expect(console.error).toHaveBeenCalledWith(
      '[Layout Error] Column #0 must have a value from 0 to 12.'
    )
  })

  test('does not warn if columns are valid', () => {
    renderComponent({ columns: '2 3 4' })
    expect(console.error).not.toHaveBeenCalled()
  })

  test('adds auto flow if columns has autoFlow operator', () => {
    const { contentWrapper } = renderComponent({ columns: '*' })
    expect(contentWrapper).toHaveClass('has-auto-flow')
  })

  test('adds correct column size', () => {
    const { contentWrapper } = renderComponent({ columns: '6 6' })
    expect(contentWrapper).toHaveAttribute(
      'style',
      expect.stringContaining('50%')
    )
  })
})

function renderComponent(props) {
  const utils = render(MaColumns, {
    props: { gap: 'small', columns: '12', ...props },
    slots: { default: 'content' },
  })
  const contentWrapper = utils.getByText('content')
  return {
    ...utils,
    contentWrapper,
  }
}
