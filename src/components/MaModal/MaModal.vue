<template>
  <div class="modal-wrapper">
    <div ref="modal-trigger">
      <slot name="trigger" :openModal="openModal" />
    </div>
    <ma-modal-portal>
      <transition
        v-if="showModal"
        name="modal"
        appear
        @after-leave="closeModal"
      >
        <div
          class="modal-overlay"
          data-testid="overlay"
          @click.self="closeModal"
        >
          <div class="modal-content-wrapper">
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
                <button
                  class="icon-close"
                  :class="computedIconColor"
                  data-testid="close-button"
                  @click="closeModal"
                />
              </div>
              <div ref="modal-content" class="modal-content">
                <slot :closeModal="closeModal" name="content" />
              </div>
            </ma-stack>
          </div>
        </div>
      </transition>
    </ma-modal-portal>
  </div>
</template>

<script>
import { Portal as MaModalPortal } from '@linusborg/vue-simple-portal/dist/index.umd'
import MaStack from '@margarita/components/MaStack'

const MODAL_WIDTHS = ['small', 'medium', 'large']

const FOCUSABLE_ELEMENTS = [
  'button',
  'a[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const TAB_KEY = 9
const ESCAPE_KEY = 27

export default {
  name: 'MaModal',

  components: {
    MaStack,
    MaModalPortal,
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
      keyListenersMap: {
        [ESCAPE_KEY]: this.handleEscapeKey,
        [TAB_KEY]: this.handleTabKey,
      },
    }
  },

  computed: {
    computedIconColor() {
      return this.headerType === 'white'
        ? 'icon-close--pink'
        : 'icon-close--white'
    },
  },

  mounted() {
    document.addEventListener('keydown', this.keyListener)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keyListener)
  },

  methods: {
    keyListener(e) {
      const listener = this.keyListenersMap[e.keyCode]

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

<style src="./MaModal.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.modal-overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  transition: opacity 0.4s ease;
  z-index: 100;
  background-color: get-alpha-color(black, 0.5);
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.modal-content-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.modal {
  transition: transform 0.4s ease;
  border-radius: 0.25rem;
  box-shadow: 0 rem(2px) rem(8px) get-alpha-color(black, 0.67);
  background-color: get-color(white);
  width: 96vw;
  max-width: rem(500px);
  color: get-color(gray, dark);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: get-space('xsmall');
  border-radius: 0.25rem 0.25rem 0 0;
}

.modal-header--gradient {
  background: linear-gradient(to right, get-color(orange), get-color(pink));
  color: white;
}

.modal-header--gradient .modal-title {
  flex: 1;
  text-align: center;
}

.modal-title {
  @include font-weight(bold);
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0;
  padding-right: 3rem;
  min-height: 2.25rem;

  @include mq($from: md) {
    font-size: rem(24px);
  }
}

.icon-close {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.5rem;
  height: 1.5rem;

  &--pink {
    background-image: url('../../assets/icons/icon-close-pink.svg');

    &:hover,
    &:active,
    &:focus {
      background-image: url('../../assets/icons/icon-close-darkpink.svg');
    }
  }

  &--white {
    background-image: url('../../assets/icons/icon-close-white.svg');

    &:hover,
    &:active,
    &:focus {
      opacity: 0.75;
      background-image: url('../../assets/icons/icon-close-darkwhite.svg');
    }
  }
}

.modal-content {
  // because fuck standards, that's why
  // https://github.com/w3c/csswg-drafts/issues/129
  margin-bottom: get-space('xsmall');
  padding: 0 get-space('xsmall');
  // height management
  max-height: 85vh;
  overflow-y: auto;
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

.modal-leave-active,
.modal-enter {
  opacity: 0;

  .modal {
    transform: translateY(-100%);
  }
}
</style>
