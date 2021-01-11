const breakpointsEnum = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
}

const breakpoints = {
  [breakpointsEnum.tablet]: 900,
  [breakpointsEnum.desktop]: 1440,
}

module.exports = {
  breakpoints,
  breakpointsEnum,
}
