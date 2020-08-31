import { createLocalVue } from '@vue/test-utils'
import camelCase from 'lodash.camelcase'
import isVueComponent from 'is-vue-component'

import * as Margarita from './index'

// Get the default export
const defaultExport = Margarita.default

// Remove default export and directives, so we have the list of imported comps.
const margarita = { ...Margarita }
delete margarita.default
delete margarita.markdown
delete margarita.markdownSSR

test('exposes an install function', () => {
  expect(defaultExport).toHaveProperty('install')
})

test('installs Margarita components', () => {
  const localVue = createLocalVue()
  localVue.use(defaultExport)

  const installedComponents = Object.keys(localVue.options.components)
  const componentNames = Object.values(margarita).map((m) => m.name)

  expect(installedComponents.map(camelCase)).toStrictEqual(
    componentNames.map(camelCase)
  )
})

test.each(Object.entries(margarita))(
  '%s is a valid exposed component',
  (_, component) => {
    expect(isVueComponent(component)).toBe(true)
  }
)
