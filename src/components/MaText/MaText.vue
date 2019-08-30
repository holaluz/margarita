<style scoped lang="scss" src="./MaText.scss"></style>

<template>
  <div class="ma-text">
    <div class="ma-text__label-wrapper">
      <label :for="id" class="ma-text__label" v-text="label" />
      <slot name="labelSibling" />
    </div>
    <div class="ma-text__field-wrapper">
      <input
        :id="id"
        v-model="lazyValue"
        v-bind="$attrs"
        :class="getComputedClass"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
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

const INPUT_CLASSES = {
  hasError: 'ma-text__field--error',
}

export default {
  name: 'MaText',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

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

    mask: {
      type: Function,
      default: () => {},
    },

    placeholder: {
      type: String,
      required: false,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
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
      const propKeys = Object.keys(INPUT_CLASSES)

      return propKeys
        .filter(this._filterByExistProp)
        .map(this._getClassNameByProp)
    },
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

    _filterByExistProp(className) {
      return !!this[className]
    },

    _getClassNameByProp(className) {
      return INPUT_CLASSES[className]
    },
  },
}
</script>
