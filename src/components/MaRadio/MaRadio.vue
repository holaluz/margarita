<style scoped lang="scss" src="./MaRadio.scss"></style>

<template>
  <ma-selector-card :card="card" class="ma-radio">
    <input
      :id="id"
      v-model="model"
      :value="value"
      :disabled="disabled"
      class="input visually-hidden"
      type="radio"
      v-bind="$attrs"
    />
    <span class="indicator" />
    <span class="description">
      <slot />
    </span>
  </ma-selector-card>
</template>

<script>
import uuid from '@margarita/utils/uuid'
import MaSelectorCard from '@margarita/components/MaSelectorCard'

export default {
  name: 'MaRadio',

  components: {
    MaSelectorCard,
  },

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
  },
}
</script>
