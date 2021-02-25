<template>
  <label :class="computedClass">
    <input
      :id="id"
      v-model="model"
      :value="value"
      :disabled="disabled"
      class="input visually-hidden"
      :type="type"
      v-bind="$attrs"
    />
    <span class="indicator" />
    <span class="description">
      <slot />
    </span>
  </label>
</template>

<script>
import uuid from '@margarita/utils/uuid'

/**
 * Renders a radio or checkbox component following the Design System guidelines
 *
 * [Radio's component API documentation](https://holaluz.github.io/margarita/?path=/story/components-option--radio)
 * [Checkbox's component API documentation](https://holaluz.github.io/margarita/?path=/story/components-option--checkbox)
 */
export default {
  name: 'MaOption',

  inheritAttrs: false,

  // Per docs: radio buttons and checkboxes use checked property and change event
  // Source: https://vuejs.org/v2/guide/forms.html#Basic-Usage
  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    /**
     * Component's model value
     * @model
     */
    checked: {
      type: [String, Number, Boolean, Array],
      required: true,
    },
    /**
     * Sets the component's id
     */
    id: {
      type: String,
      default: uuid,
    },
    /**
     * Sets the option value
     */
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    /**
     * Sets if element should be disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets element's style to look like a card
     */
    card: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets element's input type
     */
    type: {
      type: String,
      default: 'radio',
      validator: (v) => ['radio', 'checkbox'].includes(v),
    },
  },

  computed: {
    model: {
      get() {
        return this.checked
      },

      set(newValue) {
        if (this.disabled) return false
        /**
         * Change event
         *
         * @event change
         * @type {Event}
         */
        this.$emit('change', newValue)
      },
    },

    computedClass() {
      return {
        'ma-selector-card': this.card,
        'ma-option': !this.card,
        [`ma-option--${this.type}`]: !this.card,
      }
    },
  },
}
</script>

<style src="./MaOption.css" scoped></style>
<style src="./MaOptionCheckbox.css" scoped></style>
<style src="./MaOptionRadio.css" scoped></style>
