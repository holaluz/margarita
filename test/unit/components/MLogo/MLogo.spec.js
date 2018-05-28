import { shallowMount } from '@vue/test-utils'
import MLogo from '@/components/MLogo/MLogo.vue'

describe('MLogo', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(MLogo)
    expect(wrapper.is(MLogo)).toBe(true)
  })

  it('should have the default class', () => {
    const wrapper = shallowMount(MLogo)

    expect(wrapper.classes()).toContain('m-logo')
  })

  it('should add the wanted class names', () => {
    const wrapper = shallowMount(MLogo, {
      context: Object.assign({
        class: {
          'test-class': true
        }
      })
    })

    expect(wrapper.classes()).toContain('m-logo')
    expect(wrapper.classes()).toContain('test-class')
  })

  it('should add a src attr', () => {
    const wrapper = shallowMount(MLogo)
    expect(wrapper.attributes()).toHaveProperty('src', '')
  })
})
