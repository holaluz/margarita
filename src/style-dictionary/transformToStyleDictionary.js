const merge = require('lodash.merge')
const isPlainObject = require('lodash.isplainobject')

const addTokenType = (token) =>
  Object.entries(token).reduce((acc, [key, keyVal]) => {
    if (isPlainObject(keyVal)) {
      return merge(acc, {
        [key]: addTokenType(keyVal),
      })
    }

    return {
      ...acc,
      [key]: { value: keyVal },
    }
  }, {})

module.exports = addTokenType
