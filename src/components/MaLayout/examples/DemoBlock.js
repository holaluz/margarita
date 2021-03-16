export default {
  props: {
    height: {
      type: String,
      default: 'auto',
    },
    isVerticallyAligned: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: null,
    },
  },
  computed: {
    hasFixedHeight() {
      return this.index === 5 && this.isVerticallyAligned
    },
  },
  template: `
  <span
    style="width: 100%;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem;outline:1px solid #bbb"
    :style="{ height: hasFixedHeight ? '6rem' : 'auto' }"
  >
    <slot />
  </span>
  `,
}
