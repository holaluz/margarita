import { render } from '@margarita/margarita-test-utils'
import MaStepper from './MaStepper'

const slot = '<section>Content 1</section><section>Content 2</section>'

describe('Stepper', () => {
  test('renders content from slot', () => {
    const { getByText } = renderComponent({
      size: 'small',
    })

    expect(getByText('Content 1')).toBeInTheDocument()
  })

  test(`'small' property renders ma-stepper-number-small class`, () => {
    const { getByText } = renderComponent({
      size: 'small',
    })

    expect(getByText('Content 1').parentNode).toHaveClass(
      'ma-stepper-number-small'
    )
  })
})

function renderComponent(props = {}) {
  return render(MaStepper, {
    props,
    slots: { default: slot },
  })
}
