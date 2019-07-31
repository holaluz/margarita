<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${viewBoxWidth} 18`"
    class="ma-icon"
    :aria-labelledby="id"
    role="presentation"
  >
    <title :id="id">
      {{ iconName }}
    </title>
    <g :fill="iconColor">
      <component :is="componentLoader" />
    </g>
  </svg>
</template>

<script>
import uuid from '@margarita/utils/uuid'

import { AVAILABLE_ICONS } from './index'

export default {
  name: 'ma-icon',

  props: {
    icon: {
      type: String,
      default: '',
      validator: function(value) {
        if (!value) return true
        return AVAILABLE_ICONS.includes(value)
      },
    },

    id: {
      type: String,
      default: uuid,
    },

    width: {
      type: [Number, String],
      default: 18,
    },

    height: {
      type: [Number, String],
      default: 18,
    },

    viewBoxWidth: {
      type: [Number, String],
      default: 18,
    },

    iconColor: {
      type: String,
      default: 'currentColor',
    },

    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    componentLoader() {
      if (!this.icon) return null

      return () => import(/* webpackMode: "eager" */ `./Icons/${this.icon}.vue`)
    },

    iconName() {
      return this.title ? this.title : `${this.icon}-icon`
    },
  },
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
