// main.js is the main point of configuration for storybook

module.exports = {
  stories: ['../src/**/*.stories.{js,mdx}'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
  ],
}
