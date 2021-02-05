import { render, fireEvent } from '@margarita/margarita-test-utils'
import MaOption from './MaOption'

const CHECKED_VALUE = '1'
const SLOT_TEXT = 'text slot'

describe('Option', () => {
  describe('Radio', () => {
    test('renders an unchecked radio element by default', () => {
      const { input } = renderComponent()

      expect(input).not.toBeChecked()
    })

    test('renders an checked radio element if checked key matches own label', () => {
      const { input } = renderComponent({ value: CHECKED_VALUE })

      expect(input).toBeChecked()
    })

    test('emits event on click', async () => {
      const value = 'checkboxvalue'
      const { input, emitted } = renderComponent({ value })

      await fireEvent.click(input)

      expect(emitted()).toHaveProperty('change')
      expect(emitted().change).toHaveLength(1)
      expect(emitted().change[0][0]).toStrictEqual(value)
      expect(input).toBeChecked()
    })

    test(`doesn't emit events if input is disabled`, async () => {
      const { input, emitted } = renderComponent({ disabled: true })

      expect(input).toBeDisabled()

      await fireEvent.update(input)

      expect(emitted()).toMatchObject({})
    })

    test('toggles value between related checkboxes', async () => {
      const { getByLabelText } = render({
        components: { MaOption },
        template: `
          <div>
            <ma-option v-model="selected" value="id1">radio1</ma-option>
            <ma-option v-model="selected" value="id2">radio2</ma-option>
          </div>
        `,
        data: () => ({ selected: 'id1' }),
      })

      const radio1 = getByLabelText('radio1')
      const radio2 = getByLabelText('radio2')

      expect(radio1).toBeChecked()
      expect(radio2).not.toBeChecked()

      await fireEvent.click(radio2)

      expect(radio1).not.toBeChecked()
      expect(radio2).toBeChecked()
    })
  })

  describe('Checkbox', () => {
    test('renders a checkbox element', () => {
      const { input } = renderComponent({ type: 'checkbox' })

      expect(input).toBeInTheDocument()
    })

    test('renders a disabled checkbox', async () => {
      const { input, emitted } = renderComponent({
        type: 'checkbox',
        disabled: true,
      })

      expect(input).toBeDisabled()

      await fireEvent.click(input)

      expect(emitted()).toMatchObject({})
    })

    test('renders a checked checkbox', () => {
      const { input } = renderComponent({ type: 'checkbox', checked: true })

      expect(input).toBeChecked()
    })

    test('renders a custom id', () => {
      const id = 'customId'
      const { input } = renderComponent({ id })

      expect(input).toHaveAttribute('id', id)
    })

    test('emits event when checked', async () => {
      const { input, emitted } = renderComponent({
        type: 'checkbox',
        checked: false,
      })

      await fireEvent.click(input)

      expect(emitted()).toHaveProperty('change')
      expect(emitted().change).toHaveLength(1)
      expect(emitted().change[0][0]).toStrictEqual(true)

      await fireEvent.click(input)

      expect(emitted().change).toHaveLength(2)
      expect(emitted().change[1][0]).toStrictEqual(false)
    })
  })
})

function renderComponent(customProps) {
  const utils = render(MaOption, {
    props: {
      checked: CHECKED_VALUE,
      ...customProps,
    },
    slots: {
      default: SLOT_TEXT,
    },
  })

  return {
    ...utils,
    input: utils.getByLabelText(SLOT_TEXT),
  }
}
