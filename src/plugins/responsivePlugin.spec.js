import Vue from 'vue'
import responsivePlugin from './responsivePlugin'

const vueStub = new Vue()

Vue.use(responsivePlugin)

test('adds responsive plugin properties', () => {
  expect(vueStub).toHaveProperty('$layout')
  expect(vueStub.$layout).toHaveProperty('currentBreakpoint')
  expect(vueStub.$layout).toHaveProperty('getResponsivePropValue')
})

describe('getResponsivePropValue', () => {
  const getResponsivePropValue = vueStub.$layout.getResponsivePropValue

  test('sets mobile as default current breakpoint', () => {
    expect(vueStub.$layout.currentBreakpoint).toBe('mobile')
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
      vueStub.$layout.currentBreakpoint = currentBreakpoint
      expect(getResponsivePropValue(input)).toStrictEqual(expected)
    }
  )
})
