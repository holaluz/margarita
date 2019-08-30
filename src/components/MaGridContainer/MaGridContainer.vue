<style lang="scss" src="./MaGridContainer.scss"></style>

<script>
import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'MaGridContainer',

  functional: true,

  props: {
    fluid: {
      type: Boolean,
      default: false,
    },

    form: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: 'div',
    },
  },

  render(createElement, { props, data, children }) {
    const componentData = {
      staticClass: 'ma-grid-container',
      class: {
        'ma-grid-container--fluid': props.fluid,
        'ma-grid-container--form': props.form,
      },
    }

    return createElement(props.tag, mergeData(data, componentData), children)
  },
}
</script>
