<template>
  <div class="ma-text-field">
    <div class="ma-text-field__label-wrapper">
      <label
        :for="id"
        :class="labelClasses"
        class="ma-text-field__label"
        v-text="label"
      />
      <slot name="labelSibling" />
    </div>
    <div class="ma-text-field__input-wrapper">
      <input
        :id="id"
        v-model="lazyValue"
        v-bind="$attrs"
        :class="inputClasses"
        class="ma-text-field__input"
        v-on="inputListeners"
        @keyup.enter="removeFocus"
      />
      <slot name="inputSibling" />
    </div>
    <div
      v-if="hasError"
      class="ma-text-field__error-message"
      v-text="errorMessage"
    />
  </div>
</template>

<script>
import uuid from '@margarita/utils/uuid'

export default {
  name: 'MaTextField',

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

    label: {
      type: String,
      required: true,
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
        'ma-text-field__input--error': this.hasError,
      }
    },

    labelClasses() {
      return {
        'visually-hidden': this.$attrs['aria-label'],
      }
    },

    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: (e) => this.emit(e),
        change: (e) => this.emit(e),
        blur: (e) => this.emit(e),
      })
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

<style scoped lang="scss" src="./MaTextField.scss"></style>
