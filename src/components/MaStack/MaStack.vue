<script>
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing } from '../../tokens'
const alignment = ['left', 'center', 'right']

export default {
  name: 'MaStack',

  functional: true,

  props: {
    space: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(Object.keys(spacing)),
    },

    align: {
      type: [Array, String],
      default: null,
      validator: responsivePropValidator(alignment),
    },
  },

  render(h, { parent, props, slots }) {
    const currentSpacing = parent.$layout.getResponsivePropValue(props.space)
    const currentAlign = parent.$layout.getResponsivePropValue(props.align)

    return h(
      'div',
      {
        staticClass: 'stack',
        class: {
          [`stack--align-${currentAlign}`]: props.align,
        },
        style: {
          gap: spacing[currentSpacing],
        },
      },
      slots().default
    )
  },
}
</script>

<style scoped>
.stack {
  display: grid;
  grid-auto-flow: row;
}

.stack--align-left {
  justify-items: flex-start;
}

.stack--align-center {
  justify-items: center;
}

.stack--align-right {
  justify-items: flex-end;
}
</style>
