<template>
  <div>
    <div ref="modal-trigger">
      <!--
        @slot Modal trigger slot
        @binding function that handles the opening modal's action
        -->
      <slot name="trigger" :openModal="openModal" />
    </div>
    <ma-modal-portal>
      <transition name="modal-transition" @after-leave="closeModal">
        <div
          v-if="showModal"
          class="modal-wrapper"
          data-testid="overlay"
          @click.self="closeModal"
        >
          <div
            ref="modal"
            :aria-label="title"
            :class="`modal--width-${width}`"
            role="dialog"
            aria-modal="true"
            class="modal"
          >
            <div
              :class="`modal-header--${headerType}`"
              class="modal-header"
              data-testid="modal-header"
            >
              <ma-heading
                class="modal-title"
                :tone="headerType === 'gradient' ? 'white' : 'gray-dark'"
                size="xsmall"
              >
                {{ title }}
              </ma-heading>
              <ma-button
                ref="closeButton"
                category="no-background"
                data-testid="close-button"
                class="icon-close"
                @click="closeModal"
              >
                <ma-icon icon="Close"> </ma-icon>
              </ma-button>
            </div>
            <div ref="modal-content" class="modal-content">
              <!--
                @slot Modal's content slot
                @binding function that handles the closing modal's action
                -->
              <slot :closeModal="closeModal" name="content" />
            </div>
          </div>
        </div>
      </transition>
    </ma-modal-portal>
  </div>
</template>

<script>
import { Portal as MaModalPortal } from '@linusborg/vue-simple-portal/dist/index.umd'
import MaIcon from '@margarita/components/MaIcon'
import MaButton from '@margarita/components/MaButton'
import MaHeading from '@margarita/components/MaHeading'

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

const OVERFLOW_HIDDEN_CLASS = 'overflow-y-hidden'

/**
 * Renders a modal component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-modal--modal)
 */
export default {
  name: 'MaModal',

  components: {
    MaModalPortal,
    MaIcon,
    MaButton,
    MaHeading,
  },

  props: {
    /**
     * Sets modal's title
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Sets modal's width
     */
    width: {
      type: String,
      default: 'medium',
      validator: (w) => ['small', 'medium', 'large'].includes(w),
    },

    /**
     * Sets modal's header background color
     */
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
      /**
       * Open modal event
       *
       * @event open
       * @type {Event}
       */
      this.$emit('open')

      document.body.classList.add(OVERFLOW_HIDDEN_CLASS)
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
      /**
       * Close modal event
       *
       * @event close
       * @type {Event}
       */
      this.$emit('close')

      document.body.classList.remove(OVERFLOW_HIDDEN_CLASS)
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
      } else if (this.$refs.closeButton) {
        this.$refs.closeButton.$el.focus()
      }
    },

    flushQueue() {
      return new Promise((resolve) => setTimeout(resolve, 0))
    },

    async setFocusableElements() {
      await this.flushQueue()

      const { modal } = this.$refs

      // If we cannot find the modal let's fail gracefully.
      if (!modal) return

      this.focusableElements = modal.querySelectorAll(FOCUSABLE_ELEMENTS)
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

<style>
/* unscoped style to affect <body> */
.overflow-y-hidden {
  overflow-y: hidden;
}
</style>

<style src="./MaModal.css" scoped></style>
