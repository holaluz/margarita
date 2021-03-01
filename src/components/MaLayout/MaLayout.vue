<script>
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing } from '../../tokens'
import MaStack from '../MaStack'
import MaColumns from '../MaColumns'

export default {
  name: 'MaLayout',

  functional: true,

  props: {
    columns: {
      type: [Array, String],
      default: '',
    },

    gap: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(Object.keys(spacing)),
    },

    justify: {
      type: String,
      default: 'start',
      validator: (value) =>
        ['space-around', 'space-between', 'start', 'end'].includes(value),
    },

    verticalAlign: {
      type: String,
      default: 'fill',
      validator: (value) => ['start', 'center', 'fill', 'end'].includes(value),
    },
  },

  render(createElement, { parent, props, slots, data }) {
    const staticClass = data.staticClass || ''
    let dom = slots().default
    if (props.columns) {
      const grid = getGrid({ parent, columns: props.columns })
      dom = renderGrid({
        createElement,
        dom,
        grid,
        gap: props.gap,
        justify: props.justify,
        verticalAlign: props.verticalAlign,
      })
    }
    return renderStack({
      createElement,
      dom,
      gap: props.gap,
      staticClass,
    })
  },
}

function getGrid({ parent, columns }) {
  const responsiveColumns = parent.$layout.getResponsivePropValue(columns)
  return responsiveColumns.split(' - ').map((row) => row.split(' '))
}

function renderStack({ createElement, dom, gap, staticClass }) {
  return createElement(MaStack, { staticClass, props: { space: gap } }, dom)
}

function renderColumns({
  createElement,
  columns,
  children,
  gap,
  justify,
  verticalAlign,
}) {
  return createElement(
    MaColumns,
    {
      props: {
        gap,
        columns,
        justify,
        verticalAlign,
      },
    },
    children
  )
}

function renderGrid({ createElement, dom, grid, gap, justify, verticalAlign }) {
  let lastIdx = 0
  return grid.map((row, i) => {
    const isLast = i === grid.length - 1
    const children = dom.filter((c) => c.tag)
    const rowChildren = children.slice(
      lastIdx,
      isLast ? children.length : lastIdx + row.length
    )
    lastIdx += row.length
    return renderColumns({
      createElement,
      columns: row.join(' '),
      children: rowChildren,
      gap,
      justify,
      verticalAlign,
    })
  })
}
</script>
