<script>
import MaListMarker from './MaListMarker'

/**
 * Renders list following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-list--list)
 */
export default {
  name: 'MaList',

  functional: true,

  props: {
    /**
     * Sets the type of list
     * @values bullet, check, ordered
     */
    type: {
      type: String,
      default: 'bullet',
      validator: (val) => ['bullet', 'check', 'ordered'].includes(val),
    },
  },

  render(createElement, { slots, props, data }) {
    if (!slots().default) {
      // eslint-disable-next-line no-console
      console.warn(`[List component] No list items found`)

      // Now, this should not happen, but setting a void (or null) return makes
      // tests complain about a non-vue instance being created and removed.
      // Thus, we simply set an empty div.
      return createElement('div')
    }

    const tag = props.type === 'ordered' ? 'ol' : 'ul'

    return createElement(
      'ma-stack',
      { props: { space: 'small', tag } },
      slots()
        .default.filter((c) => c.tag)
        .map(createListElement)
    )

    function createListElement(listItem, index) {
      return createElement('li', { ...data, staticClass: 'ma-list-item' }, [
        createElement(MaListMarker, {
          props: { type: props.type, index: index + 1 },
        }),
        listItem,
      ])
    }
  },
}
</script>

<style scoped src="./MaList.css"></style>
