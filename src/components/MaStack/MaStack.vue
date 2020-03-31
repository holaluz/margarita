<template>
  <div :class="['stack', ...cssClasses]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    vertical: {
      type: String,
      validator: v => ['top', 'center', 'bottom', 'fill'].includes(v),
      default: 'top',
    },
    horizontal: {
      type: String,
      validator: v => ['fill', 'left', 'center', 'right'].includes(v),
      default: 'fill',
    },
  },
  computed: {
    cssClasses() {
      return [`vertical-${this.vertical}`, `horizontal-${this.horizontal}`]
    },
  },
}
</script>

<style lang="scss" scoped>
.stack {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.vertical-center {
  justify-content: center;
}
.vertical-bottom {
  justify-content: flex-end;
}
.vertical-fill {
  justify-content: space-between;
}

.horizontal-center {
  align-items: center;
}
.horizontal-left {
  align-items: flex-start;
}
.horizontal-right {
  align-items: flex-end;
}
</style>
