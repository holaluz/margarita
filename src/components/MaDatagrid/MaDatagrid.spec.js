import { render, fireEvent } from '@testing-library/vue'
import MaDatagrid from './MaDatagrid'

describe('Datagrid', () => {
  test('renders no results label', () => {
    const noResultsText = 'irrelevant string'
    const { queryByText } = render(MaDatagrid, {
      props: { columns: [], rows: [], noResultsText },
    })

    expect(queryByText(noResultsText)).toBeInTheDocument()
  })

  test('renders loading state', () => {
    const { queryByText, queryByTestId } = render(MaDatagrid, {
      props: { columns: [], rows: [], isLoading: true },
    })

    expect(queryByText(/no results/i)).not.toBeInTheDocument()
    expect(queryByTestId('datagrid-loader')).toBeInTheDocument()
  })

  test('renders table', () => {
    const { queryAllByRole, queryByRole } = render(MaDatagrid, {
      props: {
        columns: [{ name: 'Column 1', value: 'text' }],
        rows: [{ text: 'cell content' }],
      },
    })

    expect(queryAllByRole('rowgroup')).toHaveLength(2)
    expect(queryByRole('columnheader')).toBeInTheDocument('Column 1')
    expect(queryByRole('cell')).toHaveTextContent('cell content')
  })

  test('emits sort event when clicking a column header', async () => {
    const column = { name: 'Column 1', value: 'text', sortableBy: 'text' }
    const { queryByRole, emitted } = render(MaDatagrid, {
      props: {
        columns: [column],
        rows: [{ text: 'cell content' }],
      },
    })

    const columnHeader = queryByRole('columnheader')

    await fireEvent.click(columnHeader)

    expect(emitted()).toHaveProperty('sort')
    expect(emitted().sort).toHaveLength(1)
    expect(emitted().sort[0][0]).toStrictEqual({
      sortingColumn: column,
      sortingDirection: 'ASC',
    })

    await fireEvent.click(columnHeader)

    expect(emitted().sort[1][0]).toStrictEqual({
      sortingColumn: column,
      sortingDirection: 'DESC',
    })
  })
})
