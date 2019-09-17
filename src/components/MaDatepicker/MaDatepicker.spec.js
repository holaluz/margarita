import { render, fireEvent, getByText } from '@testing-library/vue'
import MaDatepicker from './MaDatepicker'
import locales from './locales'
import { format, parse } from 'date-fns'

const es = 'es-ES'
const en = 'en-US'
const defaultDate = '08-01-2010'
const defaultLabel = 'Label text'

const renderDatepicker = props => {
  const methods = render(MaDatepicker, {
    props: {
      value: new Date(defaultDate),
      label: defaultLabel,
      locale: es,
      ...props,
    },
  })
  methods.openDatepicker = () =>
    fireEvent.click(methods.getByLabelText(defaultLabel))
  return methods
}

describe('Datepicker', () => {

  it('renders pikaday', async () => {
    const { getAllByText, openDatepicker } = renderDatepicker()
    await openDatepicker()
    getAllByText('Agosto')
  })

  it('has a working label', () => {
    const { getByLabelText } = renderDatepicker()
    getByLabelText(defaultLabel)
  })

  it('has a working locale', async () => {
    const {
      getAllByText,
      getByPlaceholderText,
      updateProps,
      openDatepicker,
    } = renderDatepicker()
    getByPlaceholderText(locales[es].format)
    await updateProps({ locale: en })
    getByPlaceholderText(locales[en].format)
    await openDatepicker()
    getAllByText('August')
  })

  it('has a working v-model', async () => {
    const {
      getByDisplayValue,
      openDatepicker,
      getByText,
      emitted
    } = renderDatepicker()

    await openDatepicker()
    await fireEvent.mouseDown(getByText('26'))

    const selectedDate = format(emitted().input[0][0], locales[es].format)
    const expectedDate = format(new Date('08-26-2010'), locales[es].format)
    expect(selectedDate).toStrictEqual(expectedDate)
    getByDisplayValue(selectedDate)
  })
})
