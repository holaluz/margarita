import { colorPropValidator } from './colorPropValidator'

describe('colorPropValidator', () => {
  const validColor = 'gray'
  const validCompleteColor = 'gray-dark'
  const invalidColor = 'invalid-color'

  test(`allows valid colors withou 'base' key`, () => {
    expect(colorPropValidator(validColor)).toBe(true)
  })

  test('allows valid colors', () => {
    expect(colorPropValidator(validCompleteColor)).toBe(true)
  })

  test('fails for invalid color values', () => {
    expect(colorPropValidator(invalidColor)).toBe(false)
  })
})
