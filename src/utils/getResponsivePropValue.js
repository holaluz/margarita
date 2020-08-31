import { breakpointsEnum } from './responsivePlugin'

export function getResponsivePropValue(responsiveProp, currentBreakpoint) {
  const normalizedResponsiveProp = normalizeResponsiveProp(responsiveProp)
  const index = Object.values(breakpointsEnum).indexOf(currentBreakpoint)

  return normalizedResponsiveProp[index]
}

function normalizeResponsiveProp(value) {
  if (!Array.isArray(value)) {
    return [value, value, value]
  }

  if (value.length === 1) {
    const [mobileValue] = value
    return [mobileValue, mobileValue, mobileValue]
  }

  if (value.length === 2) {
    const [mobileValue, tabletValue] = value
    return [mobileValue, tabletValue, tabletValue]
  }

  if (value.length === 3) {
    return value
  }

  throw new Error(`Invalid responsive prop value: ${JSON.stringify(value)}`)
}
