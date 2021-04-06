<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
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

import availableIcons from './availableIcons'

/**
 * Renders an icon component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-icon--icon)
 */
export default {
  name: 'MaIcon',

  props: {
    /**
     * Sets which icon should be displayed
     * @values AddContract, Arrow, ArrowToEnd, BulbOn, Checkmark, Close, DetailsContract, DownloadContract, EditContract, Exit, Gas, Invoices, Link, Logo, LongArrow, Mail, Phone, Plug, Reassign, ReassignCircle, UploadContract, User,
     */
    icon: {
      type: String,
      default: '',
      validator: function (value) {
        if (!value) return true
        return availableIcons.includes(value)
      },
    },

    /**
     * Sets icon's id
     */
    id: {
      type: String,
      default: uuid,
    },

    /**
     * Sets icon's width
     */
    width: {
      type: [Number, String],
      default: 18,
    },

    /**
     * Sets icon's height
     */
    height: {
      type: [Number, String],
      default: 18,
    },

    /**
     * Sets icon's view box width
     */
    viewBoxWidth: {
      type: [Number, String],
      default: 18,
    },

    /**
     * Sets icon's view box height
     */
    viewBoxHeight: {
      type: [Number, String],
      default: 18,
    },

    /**
     * Sets icon's color
     */
    iconColor: {
      type: String,
      default: 'currentColor',
    },

    /**
     * Sets icon's title
     */
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
