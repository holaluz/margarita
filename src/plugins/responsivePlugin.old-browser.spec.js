import { createLocalVue } from '@vue/test-utils'
import responsivePlugin from './responsivePlugin'

beforeEach(() => {
  // Let's modify the mock provided by npm-scripts to fake a browser
  // without `addEventListener`
  // https://github.com/holaluz/npm-scripts/blob/master/jest.setup.js#L18-L30
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: null, // this is the interesting line
      removeEventListener: null, // this one for consistency
    })),
  })
})

test('installs plugin on older browsers', () => {
  const app = createLocalVue()

  expect(() => {
    app.use(responsivePlugin)
  }).not.toThrow()

  expect(app.prototype).toHaveProperty('$layout')
  expect(app.prototype.$layout).toHaveProperty('currentBreakpoint')
  expect(app.prototype.$layout).toHaveProperty('getResponsivePropValue')
})
