<template>
  <div class="tab">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MaTab',

  inject: ['variant'],

  // We need to declare these props so they are available through
  // child.componentOptions.propsData in MaTabs.vue
  props: {
    title: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: null,
    },

    pill: {
      type: [String, Number],
      default: null,
    },
  },

  mounted() {
    if (this.variant === 'gradient' && (this.icon || this.pill)) {
      // eslint-disable-next-line no-console
      console.error(
        `[Tabs Error] Tabs with variant="gradient" won't render icon or pill elements. Only Tabs with variant="underline" will.`
      )
    }
  },
}
</script>
