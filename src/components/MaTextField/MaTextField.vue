<template>
  <div class="ma-text-field">
    <div class="ma-text-field__label-wrapper">
      <ma-text
        :for="id"
        :class="labelClasses"
        size="small"
        tag="label"
        class="ma-text-field__label"
        v-text="label"
      />
      <!-- @slot Label's sibling content slot -->
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
     * Component's model value
     * @model
     */
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
