import { render, fireEvent, cleanup } from '@testing-library/vue'
import MaRadio from './Radio'

afterEach(cleanup)

const CHECKED_VALUE = '1'
const SLOT_TEXT = 'text slot'

const RadioBuilder = customProps => {
  const utils = render(MaRadio, {
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

describe('Radio', () => {
  it('should render an unchecked radio element by default', () => {
    const { input } = RadioBuilder()

    expect(input.checked).toBe(false)
  })

  it('should render an checked radio element if checked key matches own label', () => {
    const { input } = RadioBuilder({
      value: CHECKED_VALUE,
    })

    expect(input.checked).toBe(true)
  })

  it('should emit change event on click', async () => {
    const value = 'checkboxvalue'
    const { input, emitted } = RadioBuilder({
      value,
    })

    await fireEvent.click(input)

    expect(emitted().change).toBeTruthy()
    expect(emitted().change[0]).toEqual([value])
    expect(input.checked).toBe(true)
  })

  it('should not emit events if input is disabled', async () => {
    const { input, emitted } = RadioBuilder({
      disabled: true,
    })

    expect(input.disabled).toBe(true)

    await fireEvent.update(input)

    expect(emitted().change).toBeUndefined()
    expect(input.checked).toBe(false)
  })

  it('should toggle value between related checkboxes', async () => {
    const { getByLabelText } = render({
      components: { MaRadio },
      template: `
        <div>
          <ma-radio v-model="selected" value="id1">radio1</ma-radio>
          <ma-radio v-model="selected" value="id2">radio2</ma-radio>
        </div>
      `,
      data: () => ({ selected: 'id1' }),
    })

    const radio1 = getByLabelText('radio1')
    const radio2 = getByLabelText('radio2')

    expect(radio1.checked).toBe(true)
    expect(radio2.checked).toBe(false)

    await fireEvent.click(radio2)

    expect(radio1.checked).toBe(false)
    expect(radio2.checked).toBe(true)
  })
})