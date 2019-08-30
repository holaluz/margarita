<style scoped lang="scss" src="./MaRadio.scss"></style>

<template>
  <label :class="radioClass">
    <input
      :id="id"
      v-model="model"
      :value="value"
      :disabled="disabled"
      class="ma-radio__input visually-hidden"
      type="radio"
      v-bind="$attrs"
    />
    <span class="ma-radio__indicator" />
    <span class="ma-radio__description">
      <slot />
    </span>
  </label>
</template>

<script>
import uuid from '@margarita/utils/uuid'

export default {
  name: 'MaRadio',

  inheritAttrs: false,

  // Per docs: radio buttons use checked property and change event
  // Source: https://vuejs.org/v2/guide/forms.html#Basic-Usage
  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: {
      type: [String, Number],
      required: true,
    },

    id: {
      type: String,
      default: uuid,
    },

    value: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    card: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    model: {
      get() {
        return this.checked
      },

      set() {
        if (this.disabled) return false

        this.$emit('change', this.value)
      },
    },

    radioClass() {
      return this.card ? 'ma-radio-card' : 'ma-radio'
    },
  },
}
</script>
