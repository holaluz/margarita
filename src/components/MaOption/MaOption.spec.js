import { render, fireEvent } from '@testing-library/vue'
import MaOption from './MaOption'

const CHECKED_VALUE = '1'
const SLOT_TEXT = 'text slot'

describe('Option', () => {
  test('renders an unchecked radio element by default', () => {
    const { input } = OptionRadioBuilder()

    expect(input).not.toBeChecked()
  })

  test('renders an checked radio element if checked key matches own label', () => {
    const { input } = OptionRadioBuilder({ value: CHECKED_VALUE })

    expect(input).toBeChecked()
  })

  test('emits event on click', async () => {
    const value = 'checkboxvalue'
    const { input, emitted } = OptionRadioBuilder({ value })

    await fireEvent.click(input)

    expect(emitted()).toHaveProperty('change')
    expect(emitted().change).toHaveLength(1)
    expect(emitted().change[0][0]).toStrictEqual(value)
    expect(input).toBeChecked()
  })

  test(`doesn't emit events if input is disabled`, async () => {
    const { input, emitted } = OptionRadioBuilder({ disabled: true })

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

function OptionRadioBuilder(customProps) {
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
