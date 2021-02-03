const { breakpointsEnum } = require('./breakpoint')

const smallScreenTextSize = {
  xsmall: {
    'font-size': '0.75rem',
    'line-height': 1.35,
    'top-crop': '-0.35em',
    'bottom-crop': '-0.35em',
  },
  small: {
    'font-size': '1rem',
    'line-height': 1.35,
    'top-crop': '-0.3em',
    'bottom-crop': '-0.3em',
  },
  medium: {
    'font-size': '1.125rem',
    'line-height': 1.35,
    'top-crop': '-0.33em',
    'bottom-crop': '-0.33em',
  },
}

const textSize = {
  [breakpointsEnum.mobile]: smallScreenTextSize,
  [breakpointsEnum.tablet]: smallScreenTextSize,
  [breakpointsEnum.desktop]: {
    xsmall: {
      'font-size': '0.75rem',
      'line-height': 1.35,
      'top-crop': '-0.3em',
      'bottom-crop': '-0.33em',
    },
    small: {
      'font-size': '1rem',
      'line-height': 1.35,
      'top-crop': '-0.3em',
      'bottom-crop': '-0.3em',
    },
    medium: {
      'font-size': '1.25rem',
      'line-height': 1.35,
      'top-crop': '-0.35em',
      'bottom-crop': '-0.32em',
    },
  },
}

module.exports = {
  textSize,
}
