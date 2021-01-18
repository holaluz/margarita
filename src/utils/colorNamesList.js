import { color } from '../tokens'

export const colorNamesList = Object.entries(color).reduce(
  (acc, [colorName, tones]) => {
    const colorAndTones = Object.keys(tones).map(
      (toneName) => `${colorName}-${toneName}`
    )
    return [...acc, ...colorAndTones]
  },
  []
)
