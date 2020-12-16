import uuid from '@margarita/utils/uuid'
import isBrowser from '@/utils/isBrowser'
import MaModalTargetContainer from './MaModalTargetContainer'

/**
 * Credit for this component goes to:
 * https://github.com/LinusBorg/vue-simple-portal/
 * However, we could not directly use it because it yielded a different
 * Vue instance, which caused issues in dev mode.
 */
export default {
  name: 'MaModalPortal',

  data() {
    return {
      tag: 'div',
      selector: `#vue-portal-target-${uuid()}`,
    }
  },

  created() {
    if (!this.getTargetEl()) {
      this.insertTargetEl()
    }

    this.$nextTick(this.mount)
  },

  updated() {
    // Only update the target container component if the scoped slot is updated
    // The new slot syntax (since Vue 2.6) can cache unchanged slot functions
    // and we want to respect that here.
    this.$nextTick(() => {
      if (this.slotFn !== this.$scopedSlots.default) {
        this.container.updatedNodes = this.$scopedSlots.default
      }
      this.slotFn = this.$scopedSlots.default
    })
  },

  beforeDestroy() {
    this.destroyContainer()
  },

  methods: {
    // This returns the element into which the content should be mounted.
    getTargetEl() {
      if (!isBrowser()) return

      return document.querySelector(this.selector)
    },

    insertTargetEl() {
      if (!isBrowser()) return

      const body = document.querySelector('body')
      const child = document.createElement(this.tag)

      child.id = this.selector.substring(1)
      body.appendChild(child)
    },

    mount() {
      if (!isBrowser()) return

      const targetEl = this.getTargetEl()
      const el = document.createElement('DIV')

      targetEl.appendChild(el)

      this.container = new MaModalTargetContainer({
        el,
        parent: this,
        propsData: {
          tag: this.tag,
          nodes: this.$scopedSlots.default,
        },
      })
    },

    destroyContainer() {
      if (this.container) {
        this.container.$destroy()
        delete this.container
      }
    },
  },

  render(h) {
    return h()
  },
}
