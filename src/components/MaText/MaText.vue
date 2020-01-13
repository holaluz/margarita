<style scoped lang="scss" src="./MaText.scss"></style>

<template>
  <div class="ma-text">
    <div class="ma-text__label-wrapper">
      <label :for="id" :class="getLabelClass" v-text="label" />
      <slot name="labelSibling" />
    </div>
    <div class="ma-text__field-wrapper">
      <input
        :id="id"
        v-model="lazyValue"
        v-bind="$attrs"
        :class="getComputedClass"
        class="ma-text__field"
        @blur="emit"
        @change="emit"
        @input="emit"
        @keyup.enter="removeFocus"
      />
      <slot name="inputSibling" />
    </div>
    <div v-if="hasError" class="ma-text__error-message" v-text="errorMessage" />
  </div>
</template>

<script>
import uuid from '@margarita/utils/uuid'

export default {
  name: 'MaText',

  inheritAttrs: false,

  props: {
    errorMessage: {
      type: String,
      default: 'Error message',
    },

    id: {
      type: String,
      default: uuid,
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number],
      default: '',
    },
  },

  data() {
    return {
      lazyValue: this.value,
    }
  },

  computed: {
    getComputedClass() {
      return {
        'ma-text__field--error': this.hasError,
      }
    },

    getLabelClass() {
      return {
        'ma-text__label': true,
        'visually-hidden': this.$attrs['aria-label'],
      }
  },

  watch: {
    value(newValue) {
      this.lazyValue = newValue
    },
  },

  methods: {
    emit(e) {
      this.$emit(e.type, this.lazyValue)
    },

    removeFocus() {
      this.$emit('enter', this.lazyValue)
      this.$el.querySelector('input').blur()
    },
  },
}
</script>
