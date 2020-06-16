<style src="./MaOption.scss" lang="scss" scoped></style>
<style src="./MaOptionCheckbox.scss" lang="scss" scoped></style>
<style src="./MaOptionRadio.scss" lang="scss" scoped></style>

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

const AVAILABLE_TYPES = ['radio', 'checkbox']

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
    checked: {
      type: [String, Number, Boolean],
      required: true,
    },

    id: {
      type: String,
      default: uuid,
    },

    value: {
      type: [String, Number, Boolean],
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    card: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'radio',
      validator: v => AVAILABLE_TYPES.includes(v),
    },
  },

  computed: {
    model: {
      get() {
        return this.checked
      },

      set(newValue) {
        if (this.disabled) return false

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
