const { breakpointsEnum } = require('./breakpoint')

const smallScreenTextSize = {
  xsmall: {
    'font-size': '0.75rem',
    'line-height': 1.35,
    'font-weight': 'normal',
  },
  small: {
    'font-size': '1rem',
    'line-height': 1.35,
    'font-weight': 'normal',
  },
  medium: {
    'font-size': '1.125rem',
    'line-height': 1.35,
    'font-weight': 'normal',
  },
}

const textSize = {
  [breakpointsEnum.mobile]: smallScreenTextSize,
  [breakpointsEnum.tablet]: smallScreenTextSize,
  [breakpointsEnum.desktop]: {
    xsmall: {
      'font-size': '0.75rem',
      'line-height': 1.35,
      'font-weight': 'normal',
    },
    small: {
      'font-size': '1rem',
      'line-height': 1.35,
      'font-weight': 'normal',
    },
    medium: {
      'font-size': '1.25rem',
      'line-height': 1.35,
      'font-weight': 'normal',
    },
  },
}

module.exports = {
  textSize,
}
