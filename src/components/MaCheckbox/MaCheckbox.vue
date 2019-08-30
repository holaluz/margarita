<style scoped lang="scss" src="./MaCheckbox.scss"></style>

<template>
  <label class="ma-checkbox">
    <input
      :id="id"
      v-model="isChecked"
      :disabled="disabled"
      type="checkbox"
      class="ma-checkbox__input"
    />
    <span class="ma-checkbox__description">{{ label }}</span>
    <span class="ma-checkbox__indicator" />
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

    label: {
      type: String,
      required: true,
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
  },
}
</script>
