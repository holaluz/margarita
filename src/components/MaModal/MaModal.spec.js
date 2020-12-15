import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import responsivePlugin from '@margarita/plugins/responsivePlugin'
import MaModal from './MaModal'

describe('MaModal', () => {
  test('shows modal content on clicking trigger element', async () => {
    const { openModal, assertModalIsOpen, queryByRole } = renderComponent()

    expect(queryByRole('dialog')).not.toBeInTheDocument()

    await openModal()

    assertModalIsOpen()
  })

  test('accepts a width prop', async () => {
    const { openModal, getByRole, updateProps } = renderComponent()

    await openModal()

    expect(getByRole('dialog')).toHaveClass('modal--width-medium')

    await updateProps({ width: 'large' })

    expect(getByRole('dialog')).toHaveClass('modal--width-large')
  })

  test('accepts a header type prop', async () => {
    const { openModal, getByTestId } = renderComponent({
      props: { headerType: 'gradient' },
    })

    await openModal()

    expect(getByTestId('modal-header')).toHaveClass('modal-header--gradient')
  })

  test('removes event listener on destruction', () => {
    jest.spyOn(document, 'removeEventListener')

    const { unmount } = renderComponent()

    unmount()

    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )
  })

  describe('closing modal', () => {
    // eslint-disable-next-line jest/expect-expect
    test('closes on hitting escape', async () => {
      const { openModal, container, assertModalIsClosed } = renderComponent()

      await openModal()

      userEvent.type(container, '{esc}')

      await assertModalIsClosed()
    })

    test('does not send closing event if modal is already closed', () => {
      const { emitted, container } = renderComponent()

      userEvent.type(container, '{esc}')

      expect(emitted()).not.toHaveProperty('close')
    })

    // eslint-disable-next-line jest/expect-expect
    test('closes on clicking close button', async () => {
      const { openModal, getByTestId, assertModalIsClosed } = renderComponent()

      await openModal()

      await fireEvent.click(getByTestId('close-button'))

      await assertModalIsClosed()
    })

    // eslint-disable-next-line jest/expect-expect
    test('closes on clicking overlay', async () => {
      const { openModal, getByTestId, assertModalIsClosed } = renderComponent()

      await openModal()

      await fireEvent.click(getByTestId('overlay'))

      await assertModalIsClosed()
    })

    // eslint-disable-next-line jest/expect-expect
    test('closes on clicking custom close element from slot', async () => {
      const { openModal, getByText, assertModalIsClosed } = renderComponent({
        scopedSlots: {
          content: `<button @click="props.closeModal">close</button>`,
        },
      })

      await openModal()

      await fireEvent.click(getByText('close'))

      await assertModalIsClosed()
    })
  })

  describe('focus management', () => {
    test('traps focus', async () => {
      const { openModal, getByTestId } = renderComponent({
        scopedSlots: {
          content: function () {
            return this.$createElement('div', [
              this.$createElement('input', {
                attrs: { 'data-testid': 'input' },
              }),
              this.$createElement('button', {
                attrs: { 'data-testid': 'button' },
              }),
            ])
          },
        },
      })

      expect(document.body).toHaveFocus()

      await openModal()

      const focusableElements = [
        getByTestId('input'),
        getByTestId('button'),
        getByTestId('close-button'),
      ]

      // Initial focus
      await waitFor(() => expect(focusableElements[0]).toHaveFocus())

      userEvent.tab()

      expect(focusableElements[1]).toHaveFocus()

      userEvent.tab()

      expect(focusableElements[2]).toHaveFocus()

      userEvent.tab()

      // Loops back to the first element
      expect(focusableElements[0]).toHaveFocus()

      userEvent.tab({ shift: true })

      expect(focusableElements[2]).toHaveFocus()

      userEvent.tab({ shift: true })

      expect(focusableElements[1]).toHaveFocus()
    })

    test('returns focus to trigger on close', async () => {
      const { openModal, getByTestId, getByText } = renderComponent()

      await openModal()

      userEvent.type(getByText('modal content'), '{esc}', { skipClick: true })

      await waitFor(() => expect(getByTestId('trigger')).toHaveFocus())
    })
  })
})

function renderComponent({ props = {}, scopedSlots = null } = {}) {
  const title = 'my title'
  const utils = render(
    MaModal,
    {
      props: { title, ...props },
      scopedSlots: {
        trigger: `<button data-testid="trigger" @click="props.openModal">open</button>`,
        content: `<div>modal content</div>`,
        ...scopedSlots,
      },
    },
    (vue) => {
      vue.use(responsivePlugin)
    }
  )

  const openModal = async () => {
    await fireEvent.click(utils.getByRole('button', { name: 'open' }))
    await waitFor(() => expect(utils.getByRole('dialog')).toBeInTheDocument())
  }

  const assertModalIsClosed = async () => {
    await waitForElementToBeRemoved(utils.getByRole('dialog'))

    expect(utils.emitted()).toHaveProperty('close')
    expect(utils.emitted().close).toHaveLength(1)
  }

  const assertModalIsOpen = () => {
    expect(utils.emitted()).toHaveProperty('open')
    expect(utils.emitted().open).toHaveLength(1)

    const modal = utils.getByRole('dialog')
    expect(modal).toHaveTextContent('modal content')
    expect(modal).toHaveTextContent(title)
    expect(modal).toHaveAttribute('aria-modal', 'true')
    expect(modal).toHaveAttribute('aria-label', title)
  }

  return {
    openModal,
    assertModalIsClosed,
    assertModalIsOpen,
    ...utils,
  }
}
