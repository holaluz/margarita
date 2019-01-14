<style scoped lang="scss" src="./TextInput.scss"></style>

<template>
  <div class="text-input">
    <label
      :for="id"
      class="text-input__label"
      v-text="label"
    />
    <input
      :id="id"
      :class="computedClass"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      class="text-input__field"
      v-on="inputListeners"
      @keyup.enter="removeFocus"
    >
    <div
      v-if="hasError"
      class="text-input__error-message"
      v-text="errorMessage"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    errorMessage: {
      type: String,
      default: 'Error message'
    },

    id: {
      type: String,
      default: () => `id_${new Date().getTime()}`
    },

    hasError: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text'
    },

    value: {
      type: [ String, Number ],
      default: '',
      required: true
    }
  },

  computed: {
    computedClass () {
      return {
        'text-input__field--error': this.hasError
      }
    },

    inputListeners () {
      return Object.assign({},
        this.$listeners,
        {
          input: (evt) => {
            // If we want to add some mask stuff, we can do it here
            this.$emit('input', evt.target.value)
          }
        }
      )
    }
  },

  methods: {
    removeFocus () {
      this.$el.querySelector('input').blur()
    }
  }
}
</script>
