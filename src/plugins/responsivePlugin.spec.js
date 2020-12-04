import { createLocalVue } from '@vue/test-utils'
import responsivePlugin from './responsivePlugin'

const app = createLocalVue()
app.use(responsivePlugin)

test('adds responsive plugin properties', () => {
  expect(app.prototype).toHaveProperty('$layout')
  expect(app.prototype.$layout).toHaveProperty('currentBreakpoint')
  expect(app.prototype.$layout).toHaveProperty('getResponsivePropValue')
})

describe('getResponsivePropValue', () => {
  const getResponsivePropValue = app.prototype.$layout.getResponsivePropValue

  test('sets mobile as default current breakpoint', () => {
    expect(app.prototype.$layout.currentBreakpoint).toBe('mobile')
  })

  test.each`
    currentBreakpoint | input                           | expected
    ${'mobile'}       | ${'small'}                      | ${'small'}
    ${'mobile'}       | ${['small']}                    | ${'small'}
    ${'tablet'}       | ${['small']}                    | ${'small'}
    ${'tablet'}       | ${['small', 'medium', 'large']} | ${'medium'}
    ${'desktop'}      | ${['small']}                    | ${'small'}
    ${'desktop'}      | ${['small', 'medium']}          | ${'medium'}
    ${'desktop'}      | ${['small', 'medium', 'large']} | ${'large'}
  `(
    'returns $expected from $input when displaying on $currentBreakpoint',
    ({ currentBreakpoint, input, expected }) => {
      app.prototype.$layout.currentBreakpoint = currentBreakpoint
      expect(getResponsivePropValue(input)).toStrictEqual(expected)
    }
  )
})
