<style scoped lang="scss" src="./MaSelect.scss"></style>

<template>
  <div class="ma-select">
    <label
      :for="id"
      :class="getLabelClass"
      class="ma-select__label"
      v-text="label"
    />
    <select
      :id="id"
      v-model="selected"
      v-bind="$attrs"
      :class="computedClass"
      class="ma-select__field"
    >
      <option
        v-for="(option, index) in formattedOptions"
        :key="index"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
        v-text="option.text"
      />
    </select>
    <div
      v-if="hasError"
      class="ma-select__error-message"
      v-text="errorMessage"
    />
  </div>
</template>

<script>
import uuid from '@margarita/utils/uuid'

const AVAILABLE_WEIGHTS = ['bold', 'semibold', 'medium', 'regular']

export default {
  name: 'ma-select',

  inheritAttrs: false,

  model: {
    // By default, `v-model` reacts to the `input` event for updating the
    // value, we change this to `change` for similar behavior as the native
    // `<select>` element.
    event: 'change',
  },

  props: {
    options: {
      type: Array,
      required: true,
    },

    value: {
      type: [String, Number, Boolean, Object],
      default: '',
    },

    id: {
      type: String,
      default: uuid,
    },

    label: {
      type: String,
      required: true,
    },

    errorMessage: {
      type: String,
      default: '',
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    formatter: {
      type: Function,
      default: o => ({
        disabled: o.disabled,
        label: o.label,
        text: o.text,
        value: o.value,
      }),
    },

    fieldClass: {
      type: String,
      default: '',
    },

    weight: {
      type: String,
      default: '',
      validator: value => !value || AVAILABLE_WEIGHTS.includes(value),
    },
  },

  computed: {
    // Warning: select will be blank (empty) if `this.value` doesn't find a
    // match in the options list.
    selected: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('change', newVal)
      },
    },

    formattedOptions() {
      return this.options.map(this.formatter)
    },

    computedClass() {
      return {
        'ma-select__field--error': this.hasError,
        [`ma-select__field--${this.weight}`]: this.weight,
        [`${this.fieldClass}`]: this.fieldClass,
      }
    },

    getLabelClass() {
      return {
        'visually-hidden': this.$attrs['aria-label'],
      }
    },
  },

  mounted() {
    // By default, Select will not emit a change event on the initial
    // default select of one of the options. If an event is needed on this
    // default select, subscribe to the mount event.
    this.$emit('mount', this.selected)
  },
}
</script>
