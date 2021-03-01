<script>
import { spacing } from '../../tokens'
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'

const columnCount = 12
const autoFlowOperator = '*'

export default {
  name: 'MaColumns',

  functional: true,

  props: {
    columns: {
      type: [Array, String],
      required: true,
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

  render(createElement, { parent, props, slots }) {
    const gap = getResponsiveGap({ parent, gap: props.gap })
    const columns = getResponsiveColumns({ parent, columns: props.columns })
    const style = { gap }

    if (!hasAutoFlow({ columns })) {
      style.gridTemplateColumns = getGridTemplateColumns({ gap, columns })
      style.justifyContent = props.justify
    }

    return createElement(
      'div',
      {
        class: {
          grid: true,
          'has-auto-flow': hasAutoFlow({ columns }),
          [`vertical-align-${props.verticalAlign}`]: true,
        },
        style,
      },
      slots().default
    )
  },
}

function getResponsiveGap({ parent, gap }) {
  return spacing[parent.$layout.getResponsivePropValue(gap)]
}

function getResponsiveColumns({ parent, columns }) {
  const responsiveColumns = parent.$layout
    .getResponsivePropValue(columns)
    .split(' ')
  validateColumnsProp({ columns: responsiveColumns })
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
      return `calc(${widthPercentile}% - ${gap} * ${gapDistribution})`
    })
    .join(' ')
}

function validateColumnsProp({ columns }) {
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

<style scoped>
.grid {
  display: grid;
}
.has-auto-flow {
  grid-auto-flow: column;
}
.vertical-align-center {
  align-items: center;
}
.vertical-align-start {
  align-items: flex-start;
}
.vertical-align-end {
  align-items: flex-end;
}
</style>
