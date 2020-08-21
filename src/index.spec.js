import { createLocalVue } from '@vue/test-utils'
import camelCase from 'lodash.camelcase'
import isVueComponent from 'is-vue-component'

import * as Margarita from './index'

// Get the default export...
const defaultExport = Margarita.default

// ...and remove it from the object, so we have the list of imported comps.
// eslint-disable-next-line no-import-assign
delete Margarita.default

test('exposes an install function', () => {
  expect(defaultExport).toHaveProperty('install')
})

test('installs Margarita components', () => {
  const localVue = createLocalVue()
  localVue.use(defaultExport)

  const installedComponents = Object.keys(localVue.options.components)
  const componentNames = Object.keys(Margarita)
    .filter((key) => key !== 'markdown')
    .map((key) => Margarita[key].name)

  expect(installedComponents.map(camelCase)).toStrictEqual(
    componentNames.map(camelCase)
  )
})

test.each(Object.entries(Margarita))(
  '%s is a valid exposed component',
  (name, component) => {
    if (name === 'markdown') return
    expect(isVueComponent(component)).toBe(true)
  }
)
