<template>
  <div class="ma-toggle">
    <input
      :id="id"
      v-model="selectedValue"
      class="ma-toggle__input"
      :disabled="disabled"
      role="button"
      v-bind="$attrs"
      type="checkbox"
    />
    <label class="ma-toggle__label" :for="id"></label>
    <ma-text class="ma-toggle__text" tag="span" size="medium" v-text="label" />
  </div>
</template>

<script>
import uuid from '@margarita/utils/uuid'

export default {
  name: 'MaToggle',

  MaTextinheritAttrs: false,

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
      type: Boolean,
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
     * Sets if element should be disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets toggle's label
     */
    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    selectedValue: {
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
  },
}
</script>

<style src="./MaToggle.css" scoped></style>
