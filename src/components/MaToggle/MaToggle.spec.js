import { render, fireEvent } from '@margarita/margarita-test-utils'
import MaToggle from './MaToggle'

describe('MaToggle', () => {
  test('renders the component', () => {
    const { getByText } = renderComponent()

    expect(getByText(/On/i)).toBeInTheDocument()
  })

  test('emits a new value on change event', async () => {
    const { getByRole, emitted } = renderComponent()

    const toggle = getByRole('button')

    await fireEvent.click(toggle)

    expect(emitted()).toHaveProperty('change')
    expect(emitted().change).toHaveLength(1)
    expect(emitted().change[0][0]).toStrictEqual(false)
  })

  test('renders a disabled toggle', () => {
    const { getByRole } = renderComponent({
      disabled: true,
    })

    expect(getByRole('button')).toBeDisabled()
  })
})

function renderComponent(props) {
  return render(MaToggle, {
    props: {
      label: 'On',
      checked: true,
      ...props,
    },
  })
}
