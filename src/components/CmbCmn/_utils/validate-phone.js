const isValidPhone = (number, { hideExtraFields } = {}) => {
  if (hideExtraFields) return true
  return /^[6789]{1}[0-9]{8}$/g.test(number) || false
}

export default isValidPhone
