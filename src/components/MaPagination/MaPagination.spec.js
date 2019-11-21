import { render, fireEvent } from '@testing-library/vue'
import MaPagination from './MaPagination'

describe('Pagination', () => {
  test('shows arrow buttons properly when current page is the first page', () => {
    const { queryByTestId } = render(MaPagination, {
      props: { startPage: 1, totalItems: 10, itemsPerPage: 5 },
    })

    const prevPageButton = queryByTestId('previous-page')
    const nextPageButton = queryByTestId('next-page')

    expect(prevPageButton).toBeInTheDocument()
    expect(prevPageButton).not.toBeVisible()
    expect(nextPageButton).toBeVisible()
  })

  test('shows arrow buttons properly when current page is the last page', () => {
    const { queryByTestId } = render(MaPagination, {
      props: { startPage: 2, totalItems: 10, itemsPerPage: 5 },
    })

    const prevPageButton = queryByTestId('previous-page')
    const nextPageButton = queryByTestId('next-page')

    expect(prevPageButton).toBeVisible()
    expect(nextPageButton).toBeInTheDocument()
    expect(nextPageButton).not.toBeVisible()
  })

  test('shows arrow buttons properly when current page is a middle page', () => {
    const { queryByTestId } = render(MaPagination, {
      props: { startPage: 2, totalItems: 15, itemsPerPage: 5 },
    })

    const prevPageButton = queryByTestId('previous-page')
    const nextPageButton = queryByTestId('next-page')

    expect(prevPageButton).toBeVisible()
    expect(nextPageButton).toBeVisible()
  })

  test('emits when clicking the buttons', () => {
    const { queryAllByRole, emitted } = render(MaPagination, {
      props: { startPage: 2, totalItems: 15, itemsPerPage: 5 },
    })

    const paginationButtons = queryAllByRole('button')

    paginationButtons.forEach(async button => {
      await fireEvent.click(button)

      expect(emitted()).not.toHaveProperty('pagination')
      expect(emitted().pagination).toHaveLength(1)
    })
  })
})
