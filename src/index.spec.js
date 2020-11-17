import { createLocalVue } from '@vue/test-utils'
import camelCase from 'lodash.camelcase'
import isVueComponent from 'is-vue-component'

import * as Margarita from './index'

// Get the default export
const defaultExport = Margarita.default

// Remove default export and directives, so we have the list of imported comps.
const margaritaComponents = { ...Margarita }
delete margaritaComponents.default
delete margaritaComponents.markdown
delete margaritaComponents.markdownSSR
delete margaritaComponents.responsivePlugin

test('exposes markdown directives', () => {
  expect(Margarita).toHaveProperty('markdown')
  expect(Margarita).toHaveProperty('markdownSSR')
})

test('exposes responsive plugin', () => {
  expect(Margarita).toHaveProperty('responsivePlugin')
})

test('exposes an install function', () => {
  expect(defaultExport).toHaveProperty('install')
})

test('installs Margarita components', () => {
  const localVue = createLocalVue()
  localVue.use(defaultExport)

  const installedComponents = Object.keys(localVue.options.components).map(
    camelCase
  )
  const componentNames = Object.values(margaritaComponents).map((m) =>
    camelCase(m.name)
  )

  expect(installedComponents.sort()).toStrictEqual(componentNames.sort())
})

test.each(Object.entries(margaritaComponents))(
  '%s is a valid exposed component',
  (_, component) => {
    expect(isVueComponent(component)).toBe(true)
  }
)
