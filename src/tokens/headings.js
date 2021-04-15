const { breakpointsEnum } = require('./breakpoint')

const smallScreenHeadingSize = {
  xsmall: {
    'font-size': '1.5rem',
    'line-height': 1.35,
    'top-crop': '-0.3597em',
    'bottom-crop': '-0.3167em',
  },
  small: {
    'font-size': '1.75rem',
    'line-height': 1.15,
    'top-crop': '-0.2644em',
    'bottom-crop': '-0.2214em',
  },
  medium: {
    'font-size': '2rem',
    'line-height': 1.1,
    'top-crop': '-0.2399em',
    'bottom-crop': '-0.1969em',
  },
  large: {
    'font-size': '2.5rem',
    'line-height': 1.1,
    'top-crop': '-0.243em',
    'bottom-crop': '-0.2em',
  },
  xlarge: {
    'font-size': '2.5rem',
    'line-height': 1.1,
    'top-crop': '-0.243em',
    'bottom-crop': '-0.2em',
  },
}

const headingSize = {
  [breakpointsEnum.mobile]: smallScreenHeadingSize,
  [breakpointsEnum.tablet]: smallScreenHeadingSize,
  [breakpointsEnum.desktop]: {
    xsmall: {
      'font-size': '1.5rem',
      'line-height': 1.15,
      'top-crop': '-0.25em',
      'bottom-crop': '-0.2em',
    },
    small: {
      'font-size': '2rem',
      'line-height': 1.15,
      'top-crop': '-0.23em',
      'bottom-crop': '-0.2em',
    },
    medium: {
      'font-size': '3rem',
      'line-height': 1.1,
      'top-crop': '-0.22em',
      'bottom-crop': '-0.18em',
    },
    large: {
      'font-size': '3.5rem',
      'line-height': 1.1,
      'top-crop': '-0.22em',
      'bottom-crop': '-0.2em',
    },
    xlarge: {
      'font-size': '4rem',
      'line-height': 1.5,
      'top-crop': '-0.405em;',
      'bottom-crop': '-0.42em',
    },
  },
}

module.exports = {
  headingSize,
}
