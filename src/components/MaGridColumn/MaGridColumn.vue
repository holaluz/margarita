<style lang="scss" src="./MaGridColumn.scss"></style>

<script>
import { mergeData } from 'vue-functional-data-merge'

export default {
  name: 'MaGridColumn',

  functional: true,

  props: {
    directionColumn: {
      type: Boolean,
      default: false,
    },

    alignStart: {
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
      staticClass: 'ma-grid-col',
      class: {
        'ma-grid-col--direction-column': props.directionColumn,
        'ma-grid-col--align-start': props.alignStart,
      },
    }

    return createElement(props.tag, mergeData(data, componentData), children)
  },
}
</script>
