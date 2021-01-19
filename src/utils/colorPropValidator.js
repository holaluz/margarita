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

export function colorPropValidator(desiredColor) {
  const [color, tone] = desiredColor.split('-')
  return colorNamesList.includes(`${color}-${tone || 'base'}`)
}
