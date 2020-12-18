<template>
  <div class="modal-wrapper">
    <div ref="modal-trigger">
      <slot name="trigger" :openModal="openModal" />
    </div>
    <ma-modal-portal>
      <transition
        v-if="showModal"
        name="modal-transition"
        appear
        @after-leave="closeModal"
      >
        <div>
          <div
            class="modal-overlay"
            data-testid="overlay"
            @click="closeModal"
          />
          <ma-stack
            ref="modal"
            :aria-label="title"
            :class="`modal--width-${width}`"
            space="xsmall"
            role="dialog"
            aria-modal="true"
            class="modal"
          >
            <div
              :class="`modal-header--${headerType}`"
              class="modal-header"
              data-testid="modal-header"
            >
              <span class="modal-title">{{ title }}</span>
              <button data-testid="close-button" @click="closeModal">x</button>
            </div>
            <div ref="modal-content" class="modal-content">
              <slot :closeModal="closeModal" name="content" />
            </div>
          </ma-stack>
        </div>
      </transition>
    </ma-modal-portal>
  </div>
</template>

<script>
import MaStack from '@margarita/components/MaStack'
import MaModalPortal from './components/MaModalPortal'

const MODAL_WIDTHS = ['small', 'medium', 'large']

const FOCUSABLE_ELEMENTS = [
  'button',
  'a[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default {
  name: 'MaModal',

  components: {
    MaModalPortal,
    MaStack,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      default: 'medium',
      validator: (w) => MODAL_WIDTHS.includes(w),
    },

    headerType: {
      type: String,
      default: 'white',
      validator: (h) => ['white', 'gradient'].includes(h),
    },
  },

  data() {
    return {
      showModal: false,
      focusableElements: [],
      keyListenersMap: new Map([
        [27, this.handleEscapeKey],
        [9, this.handleTabKey],
      ]),
    }
  },

  mounted() {
    document.addEventListener('keydown', this.keyListener)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keyListener)
  },

  methods: {
    keyListener(e) {
      const listener = this.keyListenersMap.get(e.keyCode)

      return listener && listener(e)
    },

    async openModal() {
      this.showModal = true
      this.$emit('open')

      await this.setFocusWithin('modal-content')
      await this.setFocusableElements()
    },

    handleEscapeKey() {
      if (!this.showModal) return

      this.closeModal()
    },

    // Calling this method will trigger the transition, which when finished,
    // will disable the Portal through the `afterLeave` hook callback.
    // Otherwise no leaving transition happens.
    async closeModal() {
      this.showModal = false
      this.$emit('close')

      await this.setFocusWithin('modal-trigger')
    },

    async setFocusWithin(ref) {
      // We need to wait until Vue flushes DOM updates, otherwise we can't get
      // refs references properly.
      // https://github.com/LinusBorg/vue-simple-portal/issues/45
      await this.flushQueue()

      const element = this.$refs[ref]

      // If we cannot find modal let's fail gracefully.
      if (!element) return

      const firstFocusableElement = element.querySelector(FOCUSABLE_ELEMENTS)

      if (firstFocusableElement) {
        firstFocusableElement.focus()
      }
    },

    flushQueue() {
      return new Promise((resolve) => setTimeout(resolve, 0))
    },

    async setFocusableElements() {
      await this.flushQueue()

      // If we cannot find modal let's fail gracefully.
      const modal = this.$refs['modal']

      if (!modal) return

      this.focusableElements = modal.$el.querySelectorAll(FOCUSABLE_ELEMENTS)
    },

    handleTabKey(e) {
      const firstElement = this.focusableElements[0]
      const lastElement = this.focusableElements[
        this.focusableElements.length - 1
      ]

      // If there was no SHIFT key pressed (i.e. only the TAB key was pressed)
      // and the current focused/active element is the last focusable element
      // in the modal, then we shift the focus to the first focusable element.
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }

      // If there was a SHIFT key pressed (i.e. SHIFT + TAB was pressed) and
      // the current focused/active element is the first focusable element in
      // the modal, then we shift the focus to the last focusable element.
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.25);
}

.modal {
  position: fixed;

  // centering
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // so that it doesn't reach end of viewport
  width: 96vw;

  // temporary, stylistic stuff
  background-color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: get-space('xxsmall');
}

.modal-header--gradient {
  background: linear-gradient(to right, get-color(orange), get-color(pink));
  color: white;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.modal-header--gradient .modal-title {
  flex: 1;
  text-align: center;
}

.modal-title {
  font-weight: bold;
  font-size: 1.3rem;
}

.modal-content {
  padding: 0 get-space('xxsmall');

  // because fuck standards, that's why
  // https://github.com/w3c/csswg-drafts/issues/129
  margin-bottom: get-space('xxsmall');

  // height management
  max-height: 85vh;
  overflow-y: auto;
}

.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.modal-transition-enter,
.modal-transition-leave-to {
  opacity: 0;
}

.modal--width-small {
  max-width: 300px;
}
.modal--width-medium {
  max-width: 500px;
}
.modal--width-large {
  max-width: 800px;
}
</style>
