import { render, fireEvent } from '@testing-library/vue'
import MaPagination from './MaPagination'

describe('Pagination', () => {
  test('shows arrow buttons properly when current page is the first page', () => {
    const { getByLabelText } = PaginationBuilder(1)
    const leftButton = getByLabelText('Previous page')
    const rightButton = getByLabelText('Next page')

    expect(leftButton).toBeInTheDocument()
    expect(leftButton).not.toBeVisible()
    expect(rightButton).toBeVisible()
  })

  test('shows arrow buttons properly when current page is a middle page', () => {
    const { getByLabelText } = PaginationBuilder(2)
    const leftButton = getByLabelText('Previous page')
    const rightButton = getByLabelText('Next page')

    expect(leftButton).toBeVisible()
    expect(rightButton).toBeVisible()
  })

  test('shows arrow buttons properly when current page is the last page', () => {
    const { getByLabelText } = PaginationBuilder(3)
    const leftButton = getByLabelText('Previous page')
    const rightButton = getByLabelText('Next page')

    expect(leftButton).toBeVisible()
    expect(rightButton).toBeInTheDocument()
    expect(rightButton).not.toBeVisible()
  })

  test('emits proper value when clicking left arrow button', async () => {
    const { getByLabelText, emitted } = PaginationBuilder(2)
    const leftButton = getByLabelText('Previous page')

    await fireEvent.click(leftButton)

    expect(emitted()).toHaveProperty('pagination')
    expect(emitted().pagination).toHaveLength(1)
    expect(emitted().pagination[0][0]).toBe(1)
  })

  test('emits proper value when clicking right arrow button', async () => {
    const { getByLabelText, emitted } = PaginationBuilder(2)
    const rightButton = getByLabelText('Next page')

    await fireEvent.click(rightButton)

    expect(emitted()).toHaveProperty('pagination')
    expect(emitted().pagination).toHaveLength(1)
    expect(emitted().pagination[0][0]).toBe(3)
  })

  test('emits proper value when clicking a number button', async () => {
    const { getByLabelText, emitted } = PaginationBuilder(1)
    const numberButton = getByLabelText(`Page number 1`)

    await fireEvent.click(numberButton)

    expect(emitted()).toHaveProperty('pagination')
    expect(emitted().pagination).toHaveLength(1)
    expect(emitted().pagination[0][0]).toBe(1)
  })

  test('sets page 1 by default if property is not passed to component', async () => {
    const { getByLabelText } = PaginationBuilder()
    const numberButton = getByLabelText(`Page number 1`)

    expect(numberButton).toHaveClass('ma-button--primary')
  })
})

function PaginationBuilder(startPage) {
  return render(MaPagination, {
    props: { startPage, totalItems: 15, itemsPerPage: 5 },
  })
}
