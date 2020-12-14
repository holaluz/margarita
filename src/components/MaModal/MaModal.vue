<template>
  <div class="modal-wrapper">
    <div ref="modal-trigger">
      <slot name="trigger" :openModal="openModal" />
    </div>
    <portal-to-body>
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
            :aria-label="title"
            :class="`modal--width-${width}`"
            space="xsmall"
            role="dialog"
            aria-modal="true"
            class="modal"
          >
            <div class="modal-header">
              <span class="modal-title">{{ title }}</span>
              <button data-testid="close-button" @click="closeModal">x</button>
            </div>
            <div ref="modal-content" class="modal-content">
              <slot :closeModal="closeModal" name="content" />
            </div>
          </ma-stack>
        </div>
      </transition>
    </portal-to-body>
  </div>
</template>

<script>
import MaStack from '@margarita/components/MaStack'
import { Portal } from '@linusborg/vue-simple-portal'

const MODAL_WIDTHS = ['small', 'medium', 'large', 'content']

export default {
  name: 'MaModal',

  components: {
    PortalToBody: Portal,
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
  },

  data() {
    return {
      showModal: false,
    }
  },

  mounted() {
    document.addEventListener('keydown', this.escapeHandler)

    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', this.escapeHandler)
    })
  },

  methods: {
    async openModal() {
      this.showModal = true
      this.$emit('open')

      await this.setFocusWithin('modal-content')
    },

    async closeModal() {
      // Calling this method will trigger the transition,
      // which when finished, will disable the Portal
      // through the `afterLeave` hook callback.
      // Otherwise no leaving transition happens.
      this.showModal = false
      this.$emit('close')

      await this.setFocusWithin('modal-trigger')
    },

    escapeHandler(e) {
      if (this.showModal && e.key === 'Escape') {
        this.closeModal()
      }
    },

    async setFocusWithin(ref) {
      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

      // We need to wait until Vue flushes DOM updates, otherwise we can't get
      // refs references properly.
      await flushQueue()

      const element = this.$refs[ref]

      if (!element) return

      const firstFocusableElement = element.querySelector(focusableElements)

      if (firstFocusableElement) {
        firstFocusableElement.focus()
      }

      function flushQueue() {
        return new Promise((resolve) => setTimeout(resolve, 0))
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
  align-items: center;
  padding: get-space('xxsmall') get-space('xxsmall') 0;
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
  max-width: 400px;
}
.modal--width-medium {
  max-width: 600px;
}
.modal--width-large {
  max-width: 900px;
}
.modal--width-content {
  max-width: auto;
}
</style>
