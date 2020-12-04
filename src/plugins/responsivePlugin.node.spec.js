/**
 * @jest-environment node
 * From docs: https://jestjs.io/docs/en/configuration.html#testenvironment-string
 */
import { createLocalVue } from '@vue/test-utils'
import responsivePlugin from './responsivePlugin'

const app = createLocalVue()
app.use(responsivePlugin)

test('sets desktop as default current breakpoint when running on node', () => {
  expect(app.prototype.$layout.currentBreakpoint).toBe('desktop')
})
