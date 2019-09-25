import { render, fireEvent } from '@testing-library/vue'
import MaPopupModal from './MaPopupModal'

const defaultTitle = 'My popup'
const defaultButtonText = 'Close'
const defaultSlot = 'DefaultSlot'

const renderPopup = props => {
  const methods = render(MaPopupModal, {
    props: {
      show: false,
      title: defaultTitle,
      buttonText: defaultButtonText,
      ...props,
    },
    slots: { default: defaultSlot },
  })
  methods.openPopup = () => methods.updateProps({ show: true })
  return methods
}

describe('Popup Modal', () => {
  it('renders a modal if opened', async () => {
    const { queryByText, getByText, openPopup } = renderPopup()

    expect(queryByText(defaultTitle)).toBe(null)
    await openPopup()
    getByText(defaultTitle)
  })

  it('has a working slot', () => {
    const { getByText } = renderPopup({ show: true })
    getByText(defaultSlot)
  })

  it('emits close event if close button is pressed', async () => {
    const { getByText, emitted } = renderPopup({ show: true })
    await fireEvent.click(getByText(defaultButtonText))
    expect(emitted()).toHaveProperty('close')
  })
})
