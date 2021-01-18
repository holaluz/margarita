import { colorNamesList } from './colorNamesList'
import { color } from '@margarita/tokens'

describe('colorNamesList', () => {
  test('generates a list with all the tokenized colors', () => {
    Object.entries(color).forEach(([colorName, tones]) => {
      Object.keys(tones).forEach((toneName) => {
        expect(colorNamesList.includes(`${colorName}-${toneName}`)).toBe(true)
      })
    })
  })
})
