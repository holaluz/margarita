import { render, fireEvent } from '@testing-library/vue'
import MaRange from './MaRange'

describe('Range', () => {
  test('renders a range input element', () => {
    const { getByRole, getByText } = RangeBuilder()

    expect(getByText(/step value/i)).toBeInTheDocument()
    expect(getByText(/second value/i)).toBeInTheDocument()

    expect(getByRole('slider')).toHaveValue('0')
  })

  test('selects the clicked element', async () => {
    const { getByText, emitted } = RangeBuilder()

    await fireEvent.click(getByText(/second value/i))

    expect(emitted()).toHaveProperty('input')
    expect(emitted().input).toHaveLength(1)
    expect(emitted().input[0][0]).toStrictEqual('value2')
  })

  test('renders label if prop is passed', () => {
    const { getByLabelText } = RangeBuilder({
      label: 'Custom Label',
    })

    expect(getByLabelText(/custom label/i)).toBeInTheDocument()
  })
})

function RangeBuilder(customProps) {
  return render(MaRange, {
    props: {
      value: 'value1',
      steps: [
        { value: 'value1', text: 'step value' },
        { value: 'value2', text: 'second value' },
      ],
      ...customProps,
    },
  })
}
