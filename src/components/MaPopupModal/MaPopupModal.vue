<style lang="scss" scoped src="./MaPopupModal.scss"></style>

<template>
  <transition v-if="show" name="fade-in">
    <div class="modal__overlay" @click.self="$emit('close')">
      <div
        :class="['modal__container', containerClass]"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div class="modal__header" :class="computedBkClass">
          <h5 id="modal-title" class="modal__title" v-text="title" />
          <button
            class="modal__close"
            :class="iconColorClass"
            :aria-label="buttonText"
            @click="$emit('close')"
          >
            <ma-icon icon="Close" />
          </button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div v-if="footerButton" class="modal__footer">
          <slot name="footer">
            <ma-button
              class="modal__button-close"
              @click="$emit('close')"
              v-text="buttonText"
            />
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MaButton from '@/components/MaButton'
import MaIcon from '@/components/MaIcon'

export default {
  name: 'MaPopupModal',

  components: {
    MaButton,
    MaIcon,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      required: true,
    },

    large: {
      type: Boolean,
      default: false,
    },

    bkTitle: {
      type: Boolean,
      default: false,
    },

    footerButton: {
      type: Boolean,
      default: true,
    },

    buttonText: {
      type: String,
      required: true,
    },
  },

  computed: {
    containerClass() {
      return {
        'modal__container--lg': this.large,
      }
    },

    computedBkClass() {
      return {
        'modal__header--gradient-bk': this.bkTitle,
      }
    },

    iconColorClass() {
      return { 'modal__close--pink': !this.bkTitle }
    },
  },

  watch: {
    show(status) {
      if (status) {
        document.addEventListener('keyup', this.onPressEscape)
        document.querySelector('body').style.overflow = 'hidden'
      } else {
        document.removeEventListener('keyup', this.onPressEscape)
        document.querySelector('body').style.overflow = ''
      }
    },
  },

  methods: {
    onPressEscape({ key }) {
      if (key === 'Escape') {
        this.$emit('close')
      }
    },
  },
}
</script>
