<template>
  <div class="ma-text-field">
    <div class="ma-text-field__label-wrapper">
      <ma-text
        :for="id"
        :class="labelClasses"
        size="small"
        tag="label"
        class="ma-text-field__label"
        :tone="tone"
        :bold="bold"
        v-text="label"
      />
      <!-- @slot Label's sibling content slot -->
      <slot name="labelSibling" />
    </div>
    <div class="ma-text-field__input-wrapper" :class="inputWrapperClasses">
      <input
        :id="id"
        v-model="lazyValue"
        v-bind="$attrs"
        class="ma-text-field__input"
        v-on="inputListeners"
        @keyup.enter="removeFocus"
      />
      <ma-text
        v-if="suffix"
        size="small"
        tag="span"
        tone="gray"
        class="ma-text-field__input-suffix"
        v-text="suffix"
      />
      <!-- @slot Input's sibling content slot -->
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
import MaText from '@margarita/components/MaText'
import uuid from '@margarita/utils/uuid'
import { tones } from '../../tokens'

/**
 * Renders an input text field component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-textfield--text-field)
 */
export default {
  name: 'MaTextField',

  components: {
    MaText,
  },

  inheritAttrs: false,

  props: {
    /**
     * Sets component's error message to display if `hasError === true`
     */
    errorMessage: {
      type: String,
      default: 'Error message',
    },

    /**
     * Sets component's id
     */
    id: {
      type: String,
      default: uuid,
    },

    /**
     * Displays or hides error message defined through `errorMessage` property
     */
    hasError: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets component's label
     *
     * ⚠️ If attribute aria-label is defined, input's label will be 'visually' hidden
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * Sets the label element color tone
     * @values white, red, pink, blue, green, yellow, gray-darker, gray-dark, gray
     */
    tone: {
      type: String,
      default: 'gray-dark',
      validator: (val) => Object.keys(tones).includes(val),
    },
    /**
     * Applies bold weigth to label
     */
    bold: {
      type: Boolean,
      default: false,
    },
    /**
     * Component's model value
     * @model
     */
    value: {
      type: [String, Number],
      default: '',
    },
    /**
     * Component's suffix inside the text field
     */
    suffix: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      lazyValue: this.value,
    }
  },
  computed: {
    labelClasses() {
      return {
        'visually-hidden': this.$attrs['aria-label'],
      }
    },

    inputWrapperClasses() {
      return {
        'ma-text-field__input-wrapper--disabled': this.$attrs.disabled,
        'ma-text-field__input--error': this.hasError,
        'ma-text-field__input--error-icon': this.hasError && !this.suffix,
      }
    },

    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: (e) => {
          /**
           * On input event
           *
           * @event input
           * @type {Event}
           */
          this.$emit(e.type, this.lazyValue)
        },
        change: (e) => {
          /**
           * On change event
           *
           * @event change
           * @type {Event}
           */
          this.$emit(e.type, this.lazyValue)
        },
        blur: (e) => {
          /**
           * On blur event
           *
           * @event blur
           * @type {Event}
           */
          this.$emit(e.type, this.lazyValue)
        },
      })
    },
  },

  watch: {
    value(newValue) {
      this.lazyValue = newValue
    },
  },

  methods: {
    removeFocus() {
      /**
       * On enter event.
       * In addition, blurs the input.
       *
       * @event enter
       * @type {Event}
       */
      this.$emit('enter', this.lazyValue)
      this.$el.querySelector('input').blur()
    },
  },
}
</script>

<style scoped src="./MaTextField.css"></style>
