<script>
import { text, tones } from '../../tokens'
import { mergeData } from 'vue-functional-data-merge'

/**
 * Renders text following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-text--text)
 */
export default {
  name: 'MaText',
  functional: true,

  props: {
    /**
     * Set the HTML element tag to ensure the document semantics are meaningful
     */
    tag: {
      type: String,
      default: 'p',
      validator: (val) => ['p', 'span', 'label'].includes(val),
    },

    /**
     * Sets the text element size according to our Design System
     */
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['xsmall', 'small', 'medium'].includes(val),
    },

    /**
     * Applies italic style to text
     */
    italic: {
      type: Boolean,
      default: false,
    },

    /**
     * Applies bold weigth to text
     */
    bold: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets the text element color tone
     * @values white, red, pink, blue, green, yellow, gray-darker, gray-dark, gray
     */
    tone: {
      type: String,
      default: 'gray-dark',
      validator: (val) => Object.keys(tones).includes(val),
    },
    /**
     * Set an horitzontal alignment to the text
     */
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center', 'right'].includes(value),
    },
  },

  render(createElement, { parent, props, slots, data }) {
    const size = parent.$layout.getResponsivePropValue(props.size)
    const sizeStyles = text.textSize[parent.$layout.currentBreakpoint][size]
    const componentData = {
      staticClass: 'ma-text',
      class: {
        'ma-text--bold': props.bold,
        'ma-text--italic': props.italic,
      },
      style: {
        fontSize: sizeStyles['font-size'],
        lineHeight: sizeStyles['line-height'],
        '--top-crop': sizeStyles['top-crop'],
        '--bottom-crop': sizeStyles['bottom-crop'],
        textAlign: props.align,
        color: tones[props.tone],
      },
    }
    return createElement(
      props.tag,
      mergeData(data, componentData),
      slots().default
    )
  },
}
</script>

<style src="./MaText.css"></style>
