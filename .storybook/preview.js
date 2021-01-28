// preview.js configures the "preview" iframe that renders your components
import Vue from 'vue'
import margarita from '../src/index'
import { breakpoints, breakpointsEnum } from '../src/tokens'

Vue.use(margarita)

const chromaticViewports = [320, ...Object.values(breakpoints)]
const storybookViewports = {
  mobile: {
    name: breakpointsEnum.mobile,
    styles: {
      width: '320px',
      height: '568px',
    },
    type: breakpointsEnum.mobile,
  },
  tablet: {
    name: breakpointsEnum.tablet,
    styles: {
      width: `${breakpoints[breakpointsEnum.tablet]}px`,
      height: '896px',
    },
    type: breakpointsEnum.tablet,
  },
  desktop: {
    name: breakpointsEnum.desktop,
    styles: {
      width: `${breakpoints[breakpointsEnum.desktop]}px`,
      height: '1112px',
    },
    type: breakpointsEnum.desktop,
  },
}

export const parameters = {
  layout: 'centered',

  chromatic: { viewports: chromaticViewports },

  viewport: {
    viewports: storybookViewports,
  },

  options: {
    storySort: {
      order: ['Tokens', 'Layout', 'Components', 'Plugins'],
      method: 'alphabetical',
    },
  },
}
