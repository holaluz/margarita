import { render, fireEvent } from '@margarita/margarita-test-utils'
import MaPagination from './MaPagination'

describe('Pagination', () => {
  test('shows arrow buttons properly when current page is the first page', () => {
    const { getByLabelText } = renderComponent()
    const leftButton = getByLabelText('Previous page')
    const rightButton = getByLabelText('Next page')

    expect(leftButton).toBeInTheDocument()
    expect(leftButton).not.toBeVisible()
    expect(rightButton).toBeVisible()
  })

  test('shows arrow buttons properly when current page is a middle page', () => {
    const { getByLabelText } = renderComponent({ startPage: 2 })
    const leftButton = getByLabelText('Previous page')
    const rightButton = getByLabelText('Next page')

    expect(leftButton).toBeVisible()
    expect(rightButton).toBeVisible()
  })

  test('shows arrow buttons properly when current page is the last page', () => {
    const { getByLabelText } = renderComponent({ startPage: 3 })
    const leftButton = getByLabelText('Previous page')
    const rightButton = getByLabelText('Next page')

    expect(leftButton).toBeVisible()
    expect(rightButton).toBeInTheDocument()
    expect(rightButton).not.toBeVisible()
  })

  test.each`
    button             | startPage | expectedPage
    ${'Previous page'} | ${2}      | ${1}
    ${'Next page'}     | ${2}      | ${3}
    ${'Page number 1'} | ${2}      | ${1}
  `(
    'emits proper value when clicking $button button',
    async ({ button, startPage, expectedPage }) => {
      const { getByLabelText, emitted } = renderComponent({ startPage })
      const leftButton = getByLabelText(button)

      await fireEvent.click(leftButton)

      expect(emitted()).toHaveProperty('pagination')
      expect(emitted().pagination).toHaveLength(1)
      expect(emitted().pagination[0][0]).toBe(expectedPage)
    }
  )

  test('sets page 1 by default if property is not passed to component', () => {
    const { getByLabelText } = renderComponent()
    const numberButton = getByLabelText(`Page number 1`)

    expect(numberButton).toHaveClass('ma-button--primary')
  })

  test('does not display any pagination button if there are no items', () => {
    const { queryAllByRole } = renderComponent({ totalItems: 0 })
    const paginationButtons = queryAllByRole(`button`)

    expect(paginationButtons).toHaveLength(0)
  })

  test('uses proper amount of pagination buttons when end page is minor than set property', () => {
    const { queryByLabelText } = renderComponent({
      totalItems: 1,
      itemsPerPage: 1,
      buttonsNumber: 3,
    })

    const firstPage = queryByLabelText(`Page number 1`)
    const secondPage = queryByLabelText(`Page number 2`)

    expect(firstPage).toBeInTheDocument()
    expect(secondPage).not.toBeInTheDocument()
  })
})

function renderComponent(props) {
  return render(MaPagination, {
    props: { totalItems: 15, itemsPerPage: 5, ...props },
  })
}
