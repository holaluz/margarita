<script>
import { tones } from '../../tokens'
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

    /**
     * Sets the text element size according to our Design System
     */
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium'].includes(val),
    },

    /**
     * Sets the text element color tone
     * @values white, red, pink, blue, green, yellow, gray-darker, gray-dark, gray
     */
    tone: {
      type: String,
      default: 'gray',
      validator: (val) => Object.keys(tones).includes(val),
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
      const naturalIndex = index + 1

      // Pass MaList props down to each child. This way we can customize
      // their tone and so on.
      if (listItem.componentOptions?.propsData) {
        listItem.componentOptions.propsData = {
          ...props,
          ...listItem.componentOptions.propsData,
        }
      }

      return createElement('li', { ...data, staticClass: 'ma-list-item' }, [
        createElement(MaListMarker, {
          props: { ...props, index: naturalIndex },
        }),
        listItem,
      ])
    }
  },
}
</script>

<style scoped src="./MaList.css"></style>
