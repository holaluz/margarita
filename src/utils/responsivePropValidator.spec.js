import { responsivePropValidator } from './responsivePropValidator'

describe('responsivePropValidator', () => {
  const validValues = ['valid', 'values']
  const partiallyAppliedValidator = responsivePropValidator(validValues)

  test('allows string in valid array', () => {
    expect(partiallyAppliedValidator(validValues[0])).toBe(true)
  })

  test('fails for string not in valid array', () => {
    expect(partiallyAppliedValidator('invalid')).toBe(false)
  })

  test('allows valid arrays', () => {
    expect(partiallyAppliedValidator(validValues)).toBe(true)
  })

  test('fails for pseudo-valid arrays', () => {
    expect(partiallyAppliedValidator([validValues[0], 'invalid'])).toBe(false)
  })
})
