/* eslint-disable no-console */
import { render } from '@margarita/margarita-test-utils'
import MaHidden from './MaHidden'
import { breakpoints } from '../../tokens'

describe('Hidden', () => {
  test.each`
    breakpoint   | props                                   | isHidden
    ${'mobile'}  | ${{ below: 'tablet' }}                  | ${true}
    ${'mobile'}  | ${{ above: 'mobile' }}                  | ${false}
    ${'mobile'}  | ${{ above: 'tablet' }}                  | ${false}
    ${'mobile'}  | ${{ above: 'mobile', below: 'tablet' }} | ${true}
    ${'tablet'}  | ${{ above: 'mobile' }}                  | ${true}
    ${'tablet'}  | ${{ above: 'tablet' }}                  | ${false}
    ${'tablet'}  | ${{ above: 'mobile' }}                  | ${true}
    ${'tablet'}  | ${{ above: 'tablet', below: 'tablet' }} | ${false}
    ${'desktop'} | ${{ below: 'desktop' }}                 | ${false}
    ${'desktop'} | ${{ above: 'tablet' }}                  | ${true}
  `(
    `hidden=$isHidden on $breakpoint when prop is $props`,
    ({ breakpoint, props, isHidden }) => {
      setCurrentBreakpoint(breakpoint)
      const { querySlot } = renderComponent(props)

      expect(querySlot === null).toBe(isHidden)
    }
  )

  test('warns on missing props', () => {
    const originalWarn = console.warn
    console.warn = jest.fn()

    renderComponent()

    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(`neither 'below' nor 'above' prop were provided`)
    )

    console.warn = originalWarn
  })

  describe('inline', () => {
    beforeEach(() => {
      setCurrentBreakpoint('desktop')
    })

    test('wraps content with a block non-semantic wrapper by default', () => {
      const { querySlot } = renderComponent({ below: 'tablet' })

      expect(querySlot.tagName).toBe('DIV')
    })

    test('wraps content with an inline non-semantic wrapper', () => {
      const { querySlot } = renderComponent({ below: 'tablet', inline: true })

      expect(querySlot.tagName).toBe('SPAN')
    })
  })
})

function renderComponent(props) {
  const utils = render(MaHidden, { props, slots: { default: 'content' } })

  const querySlot = utils.queryByText('content')

  return {
    ...utils,
    querySlot,
  }
}

function setCurrentBreakpoint(breakpoint) {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query === `(min-width: ${breakpoints[breakpoint]}px)`,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }
  })
}
