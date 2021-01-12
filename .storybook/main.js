const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@margarita': path.resolve(__dirname, 'src/'),
          },
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
}
