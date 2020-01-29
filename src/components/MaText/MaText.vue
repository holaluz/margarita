<style scoped lang="scss" src="./MaText.scss"></style>

<template>
  <div class="ma-text">
    <div class="ma-text__label-wrapper">
      <label
        :for="id"
        :class="labelClasses"
        class="ma-text__label"
        v-text="label"
      />
      <slot name="labelSibling" />
    </div>
    <div class="ma-text__field-wrapper">
      <input
        :id="id"
        v-model="lazyValue"
        v-bind="$attrs"
        :class="inputClasses"
        class="ma-text__field"
        v-on="inputListeners"
        @keyup.enter="removeFocus"
      />
      <slot name="inputSibling" />
    </div>
    <div
      v-if="hasSucceed || hasError"
      :class="messageClasses"
      v-text="messageText"
    />
  </div>
</template>

<script>
import uuid from '@margarita/utils/uuid'

export default {
  name: 'MaText',

  inheritAttrs: false,

  props: {
    errorMessage: {
      type: String,
      default: 'Error message',
    },

    id: {
      type: String,
      default: uuid,
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    hasSucceed: {
      type: Boolean,
      default: false,
    },

    highContrast: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },

    successMessage: {
      type: String,
      default: 'Success message',
    },

    value: {
      type: [String, Number],
      default: '',
    },
  },

  data() {
    return {
      lazyValue: this.value,
    }
  },

  computed: {
    inputClasses() {
      return {
        'ma-text__field--error': this.hasError,
        'ma-text__field--success': this.hasSucceed,
      }
    },

    labelClasses() {
      return {
        'visually-hidden': this.$attrs['aria-label'],
      }
    },

    messageClasses() {
      return {
        'ma-text__error-message': this.hasError,
        'ma-text__error-high-contrast': this.hasError && this.highContrast,
        'ma-text__success-message': this.hasSucceed,
        'ma-text__success-high-contrast': this.hasSucceed && this.highContrast,
      }
    },

    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: e => this.emit(e),
        change: e => this.emit(e),
        blur: e => this.emit(e),
      })
    },

    messageText() {
      if (this.hasSucceed) return this.successMessage

      return this.errorMessage
    },
  },

  watch: {
    value(newValue) {
      this.lazyValue = newValue
    },
  },

  methods: {
    emit(e) {
      this.$emit(e.type, this.lazyValue)
    },

    removeFocus() {
      this.$emit('enter', this.lazyValue)
      this.$el.querySelector('input').blur()
    },
  },
}
</script>
