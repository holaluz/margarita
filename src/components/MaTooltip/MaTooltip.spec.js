import { render, fireEvent } from '@testing-library/vue'
import MaTooltip from './MaTooltip'

describe('Tooltip', () => {
  it('toggles a tooltip content on trigger slot click', async () => {
    const { getByText, queryByText } = render(MaTooltip, {
      slots: {
        content: 'something',
        trigger: 'Click me',
      },
    })

    expect(queryByText('something')).toBeNull()

    await fireEvent.click(getByText('Click me'))

    getByText('something')
  })
})
