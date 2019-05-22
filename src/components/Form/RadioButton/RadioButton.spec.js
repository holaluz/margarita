import { render, fireEvent, cleanup } from 'vue-testing-library'
import RadioButton from './RadioButton'

const RadioButtonBuilder = customProps =>
  render(RadioButton, {
    props: {
      items: [
        { value: 'value1', text: 'text1' },
        { value: 'value2', text: 'text2' },
        { value: 'value3', text: 'text3' },
      ],
      ...customProps,
    },
  })

describe('RadioButton', () => {
  afterEach(cleanup)

  it('should render a radio element', () => {
    const { getByDisplayValue, getByLabelText } = RadioButtonBuilder()

    getByLabelText(/text1/i)
    getByLabelText(/text2/i)
    getByLabelText(/text3/i)
    getByDisplayValue(/value1/i)
    getByDisplayValue(/value2/i)
    getByDisplayValue(/value3/i)
  })

  it('should render a link element on passing the right prop', async () => {
    const { getByLabelText, emitted } = RadioButtonBuilder()

    await fireEvent.click(getByLabelText(/text2/i))

    expect(emitted().change).toBeTruthy()
    expect(emitted().change[0]).toEqual(['value2'])
  })

  it('should render a disabled radio element', () => {
    const { getByDisplayValue } = RadioButtonBuilder({ disabled: true })

    expect(getByDisplayValue(/value3/i).disabled).toBe(true)
  })
})
