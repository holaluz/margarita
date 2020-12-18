import addTokenType from './addTokenType'

describe('Style Dictionary object formatter', () => {
  test('adds properly value and type keys to one level nested objects', () => {
    const plainObj = {
      test: 'irrelevant',
    }
    expect(addTokenType(plainObj, 'test')).toMatchObject({
      test: { value: 'irrelevant', type: 'test' },
    })
  })

  test('adds properly value and type properly deep nested objects', () => {
    const complexObj = {
      test: {
        testProp1: 'irrelevant',
        testProp2: 'irrelevant2',
      },
    }
    expect(addTokenType(complexObj, 'test')).toMatchObject({
      test: {
        testProp1: { value: 'irrelevant', type: 'test' },
        testProp2: { value: 'irrelevant2', type: 'test' },
      },
    })
  })
})
