<script>
import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'MaGridRow',

  functional: true,

  props: {
    directionColumn: {
      type: Boolean,
      default: false,
    },

    hasMarginTop: {
      type: Boolean,
      default: false,
    },

    noGutters: {
      type: Boolean,
      default: false,
    },

    noMarginBottom: {
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
      staticClass: 'ma-grid-row',
      class: {
        'ma-grid-row--no-gutters': props.noGutters,
        'ma-grid-row--no-margin-bottom': props.noMarginBottom,
        'ma-grid-row--direction-column': props.directionColumn,
        'ma-grid-row--has-margin-top': props.hasMarginTop,
      },
    }

    return createElement(props.tag, mergeData(data, componentData), children)
  },
}
</script>

<style lang="scss" src="./MaGridRow.scss"></style>
