import { render } from '@testing-library/vue'
import MaDatepicker from './MaDatepicker'

describe('Datepicker', () => {
  it('renders a datepicker', () => {
    const { getByText, getByRole } = render(MaDatepicker)
    // TODO
  })
})
