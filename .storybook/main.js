// main.js is the main point of configuration for storybook

module.exports = {
  stories: ['../src/**/*.stories.js', '../docs/**/*.stories.{mdx,js}'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-essentials',
  ],
}
