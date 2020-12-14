import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/vue'
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

      await fireEvent.keyDown(container, { key: 'Escape' })

      await assertModalIsClosed()
    })

    test('does not send closing event if modal is already closed', async () => {
      const { emitted, container } = renderComponent()

      await fireEvent.keyDown(container, { key: 'Escape' })

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

  test('accepts a width prop', async () => {
    const { openModal, getByRole, updateProps } = renderComponent()

    await openModal()

    expect(getByRole('dialog')).toHaveClass('modal--width-medium')

    await updateProps({ width: 'large' })

    expect(getByRole('dialog')).toHaveClass('modal--width-large')
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
})

function renderComponent({ props = {}, scopedSlots = null } = {}) {
  const title = 'my title'
  const utils = render(
    MaModal,
    {
      props: { title, ...props },
      scopedSlots: {
        trigger: `<button @click="props.openModal">open</button>`,
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
