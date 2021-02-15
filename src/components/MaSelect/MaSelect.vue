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

/**
 * Renders a select component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-select--select)
 */
export default {
  name: 'MaSelect',

  inheritAttrs: false,

  model: {
    // By default, `v-model` reacts to the `input` event for updating the
    // value, we change this to `change` for similar behavior as the native
    // `<select>` element.
    event: 'change',
  },

  props: {
    /**
     * Available select component options
     */
    options: {
      type: Array,
      required: true,
    },

    /**
     * Component's model value
     * @model
     */
    value: {
      type: [String, Number, Boolean, Object],
      default: '',
    },

    /**
     * Sets component's id
     */
    id: {
      type: String,
      default: uuid,
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
     * Sets component's error message to display if `hasError === true`
     */
    errorMessage: {
      type: String,
      default: '',
    },

    /**
     * Displays or hides error message defined through `errorMessage` property
     */
    hasError: {
      type: Boolean,
      default: false,
    },

    /**
     * Formats the given options before rendering them
     *
     * ```ts
     * formattedOption = {
     *    disabled: boolean,
     *    label: string,
     *    text: string,
     *    value: string | number | boolean | object
     *  }
     * ```
     */
    formatter: {
      type: Function,
      default: (o) => ({
        disabled: o.disabled,
        label: o.label,
        text: o.text,
        value: o.value,
      }),
    },

    /**
     * Applies given styling class to component
     */
    fieldClass: {
      type: String,
      default: '',
    },

    /**
     * Applies given styling class to component
     */
    weight: {
      type: String,
      default: '',
      validator: (value) =>
        ['', 'bold', 'semibold', 'medium', 'regular'].includes(value),
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
        /**
         * Change event
         *
         * @event change
         * @type {Event}
         */
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

<style scoped src="./MaSelect.css"></style>
