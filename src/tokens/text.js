const { breakpointsEnum } = require('./breakpoint')

const smallScreenTextSize = {
  xsmall: {
    'font-size': '0.75rem',
    'line-height': 1.35,
    'top-crop': '-0.3597em',
    'bottom-crop': '-0.3167em',
  },
  small: {
    'font-size': '1rem',
    'line-height': 1.35,
    'top-crop': '-0.3805em',
    'bottom-crop': '-0.3375em',
  },
  medium: {
    'font-size': '1.125rem',
    'line-height': 1.35,
    'top-crop': '-0.3597em',
    'bottom-crop': '-0.3167em',
  },
}

const textSize = {
  [breakpointsEnum.mobile]: smallScreenTextSize,
  [breakpointsEnum.tablet]: smallScreenTextSize,
  [breakpointsEnum.desktop]: {
    xsmall: {
      'font-size': '0.75rem',
      'line-height': 1.35,
      'top-crop': '-0.3597em',
      'bottom-crop': '-0.3167em',
    },
    small: {
      'font-size': '1rem',
      'line-height': 1.35,
      'top-crop': '-0.3805em',
      'bottom-crop': '-0.3375em',
    },
    medium: {
      'font-size': '1.25rem',
      'line-height': 1.35,
      'top-crop': '-0.368em',
      'bottom-crop': '-0.325em',
    },
  },
}

module.exports = {
  textSize,
}
