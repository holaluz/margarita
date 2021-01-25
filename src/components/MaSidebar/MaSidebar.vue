<template>
  <div>
    <transition :name="slideDirection">
      <aside v-if="show" class="ma-sidebar" :class="computeClass">
        <slot />
      </aside>
    </transition>
    <div v-if="show" :class="displayOverlay" @click="handleClick" />
  </div>
</template>

<script>
const SLIDE_DIRECTIONS = ['left', 'right']
const DRAWER_TYPES = ['attached', 'fixed']

export default {
  name: 'MaSidebar',

  props: {
    type: {
      type: String,
      default: 'attached',
      validator: (value) => DRAWER_TYPES.includes(value),
    },

    position: {
      type: String,
      default: 'left',
      validator: (value) => SLIDE_DIRECTIONS.includes(value),
    },

    overlay: {
      type: Boolean,
      default: true,
    },

    show: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    slideDirection() {
      return `horizontal-slide-animation-${this.position}`
    },

    computeClass() {
      return {
        [`ma-sidebar--${this.position}`]: this.position,
        [`ma-sidebar--${this.type}`]: this.type,
      }
    },

    displayOverlay() {
      return this.overlay && this.type === 'fixed' ? 'ma-sidebar--overlay' : ''
    },
  },

  methods: {
    handleClick(event) {
      this.$emit('click-overlay', event)
    },
  },
}
</script>

<style src="./MaSidebar.css" scoped></style>
