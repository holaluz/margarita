import transformToStyleDictionary from './transformToStyleDictionary'

describe('Style Dictionary object formatter', () => {
  test('adds properly value to plain objects', () => {
    const plainObj = {
      test: 'irrelevant',
    }

    expect(transformToStyleDictionary(plainObj)).toMatchObject({
      test: { value: 'irrelevant' },
    })
  })

  test('adds properly value to deep objects', () => {
    const complexObj = {
      test: {
        testProp1: 'irrelevant',
        testProp2: 'irrelevant2',
      },
    }

    expect(transformToStyleDictionary(complexObj)).toMatchObject({
      test: {
        testProp1: { value: 'irrelevant' },
        testProp2: { value: 'irrelevant2' },
      },
    })
  })
})
