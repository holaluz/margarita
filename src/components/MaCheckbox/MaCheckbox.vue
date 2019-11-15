<style scoped lang="scss" src="./MaCheckbox.scss"></style>

<template>
  <ma-selector-card :card="card" class="ma-checkbox">
    <input
      :id="id"
      v-model="isChecked"
      :disabled="disabled"
      type="checkbox"
      class="input"
    />
    <span class="indicator" />
    <span class="description">
      <slot />
    </span>
  </ma-selector-card>
</template>

<script>
import uuid from '@margarita/utils/uuid'
import MaSelectorCard from '@margarita/components/MaSelectorCard/MaSelectorCard.vue'

export default {
  name: 'MaCheckbox',

  components: {
    MaSelectorCard,
  },

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
