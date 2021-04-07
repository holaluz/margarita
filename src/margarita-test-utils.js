/** @typedef {typeof import('@testing-library/vue').render} Render */

import { render as VTLrender } from '@testing-library/vue'
import margarita from '.'

/** @type {Render} */
function render(component, options = {}, callbackFn = () => {}) {
  return VTLrender(component, options, (vue) => {
    vue.use(margarita)

    callbackFn(vue)
  })
}

// Export useful packages from Vue Testing Library
export {
  fireEvent,
  logDOM,
  logRoles,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/vue'

// and override the render method with our own implementation
export { render }
