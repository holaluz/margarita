import { render, fireEvent } from '@testing-library/vue'
import MaRange from './MaRange'

const RangeBuilder = customProps =>
  render(MaRange, {
    props: {
      value: 'value1',
      steps: [
        { value: 'value1', text: 'step value' },
        { value: 'value2', text: 'second value' },
      ],
      ...customProps,
    },
  })

describe('Range', () => {
  it('renders a range input element', () => {
    const { getByRole, getByText } = RangeBuilder()

    getByText(/step value/i)
    getByText(/second value/i)

    expect(getByRole('textbox').value).toBe('0')
  })

  it('selects the clicked element', async () => {
    const { getByRole, getByText, emitted } = RangeBuilder()

    expect(getByRole('textbox').value).toBe('0')
    expect(emitted()).toMatchObject({})

    await fireEvent.click(getByText(/second value/i))

    expect(emitted()).toHaveProperty('input')
    expect(emitted().input[0][0]).toStrictEqual('value2')
  })

  it('renders a label if prop is passed', () => {
    const { getByLabelText } = RangeBuilder({
      label: 'Custom Label',
    })

    getByLabelText(/custom label/i)
  })
})
