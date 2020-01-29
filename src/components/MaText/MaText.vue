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
      v-if="displayMessage"
      class="ma-text__message"
      :class="messageClasses"
      v-text="messageText"
    />
  </div>
</template>

<script>
import uuid from '@margarita/utils/uuid'

const ERROR = 'error'
const SUCCESS = 'success'

export default {
  name: 'MaText',

  inheritAttrs: false,

  props: {
    displayMessage: {
      type: Boolean,
      default: false,
    },

    messageText: {
      type: String,
      default: 'This is a message',
    },

    highContrast: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: uuid,
    },

    label: {
      type: String,
      required: true,
    },

    messageType: {
      type: String,
      default: 'error',
      validator: type => [ERROR, SUCCESS].includes(type),
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
        [`ma-text__field--${this.messageType}`]: this.displayMessage,
      }
    },

    labelClasses() {
      return {
        'visually-hidden': this.$attrs['aria-label'],
      }
    },

    messageClasses() {
      return {
        [`ma-text__message--${this.messageType}`]: true,
        'ma-text--high-contrast': this.highContrast,
      }
    },

    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: e => this.emit(e),
        change: e => this.emit(e),
        blur: e => this.emit(e),
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
