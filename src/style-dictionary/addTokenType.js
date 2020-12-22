const merge = require('lodash.merge')
const isPlainObject = require('lodash.isplainobject')

const addTokenType = (token, type) =>
  Object.entries(token).reduce((acc, [key, keyVal]) => {
    if (isPlainObject(keyVal)) {
      return merge(acc, {
        [key]: addTokenType(keyVal, type),
      })
    }

    return {
      ...acc,
      [key]: { value: keyVal, type },
    }
  }, {})

module.exports = addTokenType
