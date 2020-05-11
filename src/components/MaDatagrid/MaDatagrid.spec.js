import { render, fireEvent } from '@testing-library/vue'
import MaDatagrid from './MaDatagrid'

describe('Datagrid', () => {
  test('renders no results label', () => {
    const { queryByText } = render(MaDatagrid, {
      props: { columns: [], rows: [] },
    })

    expect(queryByText(/no results/i)).toBeInTheDocument()
  })

  test('renders loading state', () => {
    const { queryByText, queryByTestId } = render(MaDatagrid, {
      props: { columns: [], rows: [], isLoading: true },
    })

    expect(queryByText(/no results/i)).not.toBeInTheDocument()
    expect(queryByTestId('datagrid-loader')).toBeInTheDocument()
  })

  test('renders headers', () => {
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

  test('emits sort event on click', async () => {
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
      column,
      dir: 'ASC',
    })

    await fireEvent.click(columnHeader)

    expect(emitted().sort[1][0]).toStrictEqual({
      column,
      dir: 'DESC',
    })
  })
})
