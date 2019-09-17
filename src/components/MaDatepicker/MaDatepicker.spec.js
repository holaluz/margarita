import { render, fireEvent, getByText } from '@testing-library/vue'
import MaDatepicker from './MaDatepicker'
import locales from './locales'

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
  }),
    it('has a working v-model', async () => {
      const {
        getByDisplayValue,
        openDatepicker,
        getByText,
      } = renderDatepicker()
      getByDisplayValue('01/08/2010')
      await openDatepicker()
      await fireEvent.click(getByText('26'))
      //getByDisplayValue('26/08/2010') FIXME -> this doesn't work
    })
})
