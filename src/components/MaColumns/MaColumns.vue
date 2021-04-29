<script>
/** @typedef {import('vue').VNodeData} VNodeData */
import { mergeData } from 'vue-functional-data-merge'
import { spacing } from '../../tokens'
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'

const columnCount = 12
const autoFlowOperator = '*'

export default {
  name: 'MaColumns',

  functional: true,

  props: {
    /**
     * Defines the columns layout.
     *
     * ```ts
     * <ma-column columns="6 6">...</ma-column>
     * <ma-column :columns="['12', '4 4 4', '6 6']">...</ma-column>
     * ```
     */
    columns: {
      type: [Array, String],
      required: true,
    },

    /**
     * Sets the space gap between children.
     *
     * If an array is passed, values will target the design system breakpoints.
     * ```ts
     * // This would apply medium on all the different breakpoints
     * space = 'small'
     * // This would apply none on mobile, small on tablet and large on desktop
     * :space="['none', 'small', 'large']"
     * ```
     *
     * [Spacing tokens documentation](https://holaluz.github.io/margarita/?path=/story/tokens-spacing--page)
     * @values none, xsmall, small, medium, large, xlarge, 2x-large, 3x-large, 4x-large, 5x-large, 6x-large
     */
    gap: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(Object.keys(spacing)),
    },

    /**
     * Defines how the space between and around content items is distributed. Defaults to start.
     *
     * @values space-around, space-between, start, end, center
     */
    justify: {
      type: String,
      default: 'start',
      validator: (value) =>
        ['space-around', 'space-between', 'start', 'end', 'center'].includes(
          value
        ),
    },

    /**
     * Sets the children vertical alignment. Defaults to fill.
     *
     * If an array is passed, values will target the design system breakpoints.
     * ```ts
     * // This would apply start on all the different breakpoints
     * align = 'start'
     * // This would apply fill on mobile, center on tablet and start on desktop
     * :align="['fill', 'center', 'start']"
     * ```
     * @values start, center, fill, end
     */
    verticalAlign: {
      type: String,
      default: 'fill',
      validator: (value) => ['start', 'center', 'fill', 'end'].includes(value),
    },
  },

  render(createElement, { parent, props, slots, data }) {
    const gap = getResponsiveGap({ parent, gap: props.gap })
    const columns = getResponsiveColumns({ parent, columns: props.columns })
    const style = { '--column-gap': gap }

    if (!hasAutoFlow({ columns })) {
      style.gridTemplateColumns = getGridTemplateColumns({ gap, columns })
      style.justifyContent = props.justify
    }

    /** @type {VNodeData} */
    const componentData = {
      staticClass: 'ma-columns',
      class: {
        'has-auto-flow': hasAutoFlow({ columns }),
        [`vertical-align-${props.verticalAlign}`]: true,
      },
      style,
    }

    return createElement('div', mergeData(data, componentData), slots().default)
  },
}

function getResponsiveGap({ parent, gap }) {
  return spacing[parent.$layout.getResponsivePropValue(gap)]
}

function getResponsiveColumns({ parent, columns }) {
  const responsiveColumns = parent.$layout
    .getResponsivePropValue(columns)
    .split(' ')

  validateColumnsProp(responsiveColumns)

  return responsiveColumns
}

function hasAutoFlow({ columns }) {
  return columns.includes(autoFlowOperator)
}

// Gets the size of each column without overflowing due to the gap
// https://stackoverflow.com/a/45092180
function getGridTemplateColumns({ gap, columns }) {
  const gapDistribution = (columns.length - 1) / columns.length

  return columns
    .map((c) => {
      const widthPercentile = (c / columnCount) * 100
      if (gap === spacing.none || gapDistribution === 0) {
        return `${widthPercentile}%`
      }

      return `calc(${widthPercentile}% - ${gap} * ${gapDistribution})`
    })
    .join(' ')
}

function validateColumnsProp(columns) {
  let columnsSum = 0

  // eslint-disable-next-line no-console
  const logError = (message) => console.error(`[Layout Error] ${message}`)

  columns.forEach((c, i) => {
    if (c === '*') {
      if (columns.length !== 1) {
        logError(
          'The autoFlow operator (*) cannot have other columns in the row.'
        )
      }
      return
    }
    const columnValue = parseFloat(c)
    if (isNaN(columnValue) || !Number.isInteger(columnValue)) {
      logError(`Column #${i} must be an integer.`)
    } else if (columnValue > columnCount || columnValue < 0) {
      logError(`Column #${i} must have a value from 0 to ${columnCount}.`)
    }
    columnsSum += columnValue
  })

  if (columnsSum > columnCount) {
    logError(`The row overflows the ${columnCount}-column layout.`)
  }
}
</script>

<style lang="postcss">
.ma-columns {
  display: grid;
  gap: var(--column-gap);

  &.has-auto-flow {
    grid-auto-flow: column;
  }
  &.vertical-align-center {
    align-items: center;
  }
  &.vertical-align-start {
    align-items: flex-start;
  }
  &.vertical-align-end {
    align-items: flex-end;
  }
}
</style>
