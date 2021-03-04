export default {
  props: {
    height: {
      type: String,
      default: 'auto',
    },
  },
  template: `
  <span 
    style="width: 100%;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem;outline:1px solid #bbb"
    :style="{ height }"
  >
     <slot />
  </span>
  `,
}
