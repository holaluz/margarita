export function responsivePropValidator(validValues) {
  return function (propValue) {
    return Array.isArray(propValue)
      ? propValue.every((v) => validValues.includes(v))
      : validValues.includes(propValue)
  }
}
