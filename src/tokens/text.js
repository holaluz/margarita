const { breakpointsEnum } = require('./breakpoint')

const _defaultSmallScreenTextSize = {
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
  large: {
    'font-size': '1.5rem',
    'line-height': 1.35,
    'font-weight': 'bold',
  },
  xlarge: {
    'font-size': '1.75rem',
    'line-height': 1.15,
    'font-weight': 'bold',
  },
  '2-xlarge': {
    'font-size': '2rem',
    'line-height': 1.1,
    'font-weight': 'bold',
  },
  '3-xlarge': {
    'font-size': '2.5rem',
    'line-height': 1.1,
    'font-weight': 'bold',
  },
  '4-xlarge': {
    'font-size': '2.5rem',
    'line-height': 1.1,
    'font-weight': 'bold',
  },
}

const textSize = {
  [breakpointsEnum.mobile]: _defaultSmallScreenTextSize,
  [breakpointsEnum.tablet]: _defaultSmallScreenTextSize,
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
    large: {
      'font-size': '1.5rem',
      'line-height': 1.15,
      'font-weight': 'bold',
    },
    xlarge: {
      'font-size': '2rem',
      'line-height': 1.15,
      'font-weight': 'bold',
    },
    '2-xlarge': {
      'font-size': '3rem',
      'line-height': 1.1,
      'font-weight': 'bold',
    },
    '3-xlarge': {
      'font-size': '3.5rem',
      'line-height': 1.1,
      'font-weight': 'bold',
    },
    '4-xlarge': {
      'font-size': '4rem',
      'line-height': 1.1,
      'font-weight': 'bold',
    },
  },
}

const textStyle = {
  italic: 'italic',
  normal: 'normal',
}

const textTags = ['p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

module.exports = {
  textSize,
  textStyle,
  textTags,
}
