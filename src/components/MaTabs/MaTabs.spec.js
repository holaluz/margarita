/* eslint-disable no-console */
import { render, waitFor } from '@margarita/margarita-test-utils'
import userEvent from '@testing-library/user-event'
import MaTabs from '.'
import MaTab from '../MaTab'

describe('Tabs', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})
  })

  test('toggles through tabs', async () => {
    const { queryByText, getByText } = renderComponent()

    await waitFor(() => expect(getByText('Content Tab1')).toBeVisible())
    expect(queryByText('Content Tab2')).not.toBeInTheDocument()
    expect(queryByText('Content Tab3')).not.toBeInTheDocument()

    userEvent.click(getByText('Header Tab2'))

    await waitFor(() => expect(getByText('Content Tab2')).toBeVisible())
    expect(queryByText('Content Tab1')).not.toBeInTheDocument()

    userEvent.click(getByText('Header Tab1'))

    await waitFor(() => expect(getByText('Content Tab1')).toBeVisible())
    expect(queryByText('Content Tab2')).not.toBeInTheDocument()
  })

  test('renders icon and pill for underline tabs', () => {
    const { getByTitle, getByText } = renderComponent({
      props: {
        variant: 'underline',
      },
      slots: {
        default: `
          <ma-tab icon="Gas" pill="481516" title="Header Tab1">
            Content Tab1
          </ma-tab>`,
      },
    })

    expect(getByText('481516')).toBeInTheDocument()
    expect(getByTitle('Gas-icon')).toBeInTheDocument()
  })

  test('renders header slot for gradient tabs', () => {
    const { getByText } = renderComponent({
      props: {
        variant: 'gradient',
      },
      slots: {
        default: `
          <ma-tab title="Header Tab1">
            <template #header>Additional header</template>
            Content Tab1
          </ma-tab>`,
      },
    })

    expect(getByText('Additional header')).toBeInTheDocument()
  })

  test('warns on bad combination of props and variant', () => {
    renderComponent({
      props: {
        variant: 'gradient',
      },
      slots: {
        default: `
          <ma-tab icon="whatever" pill="yeah" title="Header Tab1">
            Content Tab1
          </ma-tab>`,
      },
    })

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('[Tabs Error]')
    )
  })
})

function renderComponent(options = {}) {
  return render(MaTabs, {
    components: { MaTab },
    slots: {
      default: `
        <ma-tab title="Header Tab1">
          Content Tab1
        </ma-tab>
        <ma-tab title="Header Tab2">
          Content Tab2
        </ma-tab>
        <ma-tab title="Header Tab3">
          Content Tab3
        </ma-tab>
      `,
    },
    ...options,
  })
}
