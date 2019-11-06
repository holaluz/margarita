<style scoped lang="scss" src="./MaCheckbox.scss"></style>

<template>
  <label :class="checkboxClass">
    <input
      :id="id"
      v-model="isChecked"
      :disabled="disabled"
      type="checkbox"
      class="ma-checkbox__input"
    />
    <span class="ma-checkbox__indicator" />
    <span class="ma-checkbox__description">
      <slot />
    </span>
  </label>
</template>

<script>
import uuid from '@margarita/utils/uuid'

export default {
  name: 'MaCheckbox',

  props: {
    checked: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: uuid,
    },

    card: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isChecked: {
      get() {
        return this.checked
      },

      set(checkedValue) {
        this.$emit('input', checkedValue)
      },
    },

    checkboxClass() {
      return this.card ? 'ma-checkbox-card' : 'ma-checkbox'
    },
  },
}
</script>
