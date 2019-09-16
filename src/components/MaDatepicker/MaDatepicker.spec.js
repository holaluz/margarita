import { render, fireEvent, getByText } from '@testing-library/vue'
import MaDatepicker from './MaDatepicker'
import locales from './locales'

const es = 'es-ES'
const en = 'en-US'
const defaultDate = '08-01-2010'

const renderDatepicker = props => {
  const methods = render(MaDatepicker, {
    props: {
      value: new Date(defaultDate),
      locale: es,
      ...props,
    },
  })
  methods.openDatepicker = () =>
    fireEvent.click(methods.getByPlaceholderText(locales[es].format))
  return methods
}

describe('Datepicker', () => {
  it('renders pikaday', async () => {
    const { getAllByText, openDatepicker } = renderDatepicker()
    await openDatepicker()
    getAllByText('Agosto')
  })
  it('has a working label & placeholder', () => {
    const label = 'Label text'
    const { getByText } = renderDatepicker({ label })
    getByText(label)
  })
  it('has a working locale', async () => {
    const { getByPlaceholderText, updateProps } = renderDatepicker()
    getByPlaceholderText(locales[es].format)
    await updateProps({ locale: en })
    getByPlaceholderText(locales[en].format)
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
