<script>
import { headings, tones } from '../../tokens'
import { mergeData } from 'vue-functional-data-merge'
const { headingSize } = headings
/**
 * Renders heading following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-heading--heading)
 */
export default {
  name: 'MaHeading',
  functional: true,

  props: {
    /**
     * Set the HTML element tag to ensure the document semantics are meaningful by specifying its level
     */
    level: {
      type: String,
      default: 'none',
      validator: (val) => ['none', '1', '2', '3', '4', '5', '6'].includes(val),
    },

    /**
     * Sets the text element size according to our Design System
     * @values xsmall, small, medium, large, xlarge
     */
    size: {
      type: String,
      default: 'medium',
      validator: (val) => Object.keys(headingSize.mobile).includes(val),
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
  },

  render(createElement, { parent, props, slots, data }) {
    const tag = props.level === 'none' ? 'div' : `h${props.level}`
    const size = parent.$layout.getResponsivePropValue(props.size)
    const sizeStyles = headingSize[parent.$layout.currentBreakpoint][size]
    const componentData = {
      staticClass: 'ma-heading',
      style: {
        fontSize: sizeStyles['font-size'],
        lineHeight: sizeStyles['line-height'],
        '--top-crop': sizeStyles['top-crop'],
        '--bottom-crop': sizeStyles['bottom-crop'],
        color: tones[props.tone],
      },
    }
    return createElement(tag, mergeData(data, componentData), slots().default)
  },
}
</script>

<style src="./MaHeading.css"></style>
