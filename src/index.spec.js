import { createLocalVue } from '@vue/test-utils'
import isVueComponent from 'is-vue-component'

import * as Margarita from './index'

// Get the default export...
const defaultExport = Margarita.default

// ...and remove it from the object, so we have the list of imported comps.
delete Margarita.default

describe('Margarita install function', () => {
  it('exposes an install function', () => {
    expect(defaultExport).toHaveProperty('install')
  })

  it(`installs Margarita components`, () => {
    const localVue = createLocalVue()
    localVue.use(defaultExport)

    const installedComponents = Object.keys(localVue.options.components)
    const componentNames = Object.values(Margarita).map(m => m.name)

    expect(installedComponents).toEqual(componentNames)
  })
})

describe('Margarita named exports', () => {
  Object.entries(Margarita).forEach(([name, component]) => {
    it(`${name} is a valid exposed component`, () => {
      expect(isVueComponent(component)).toBe(true)
    })
  })
})
