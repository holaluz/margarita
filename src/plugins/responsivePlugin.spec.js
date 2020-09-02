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

  describe('mobile', () => {
    vueStub.$layout.currentBreakpoint = 'mobile'

    test('returns first value from string', () => {
      const input = 'small'
      const expectedOutput = 'small'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })

    test('returns value from single-valued array', () => {
      const input = ['small']
      const expectedOutput = 'small'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })
  })

  describe('tablet', () => {
    vueStub.$layout.currentBreakpoint = 'tablet'

    test('returns first value from string', () => {
      const input = 'small'
      const expectedOutput = 'small'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })

    test('returns value from single-valued array', () => {
      const input = ['small']
      const expectedOutput = 'small'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })

    test('returns second value from multi-valued array', () => {
      const input = ['small', 'medium']
      const expectedOutput = 'medium'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })
  })

  describe('desktop', () => {
    vueStub.$layout.currentBreakpoint = 'desktop'

    test('returns first value from string', () => {
      const input = 'small'
      const expectedOutput = 'small'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })

    test('returns value from single-valued array', () => {
      const input = ['small']
      const expectedOutput = 'small'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })

    test('returns last value from multi-valued array', () => {
      const input = ['small', 'medium', 'large']
      const expectedOutput = 'large'

      expect(getResponsivePropValue(input)).toStrictEqual(expectedOutput)
    })
  })
})
