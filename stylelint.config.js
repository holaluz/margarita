module.exports = {
  extends: [
    // Enables the stylelint-plugin-prettier plugin.
    // Enables the prettier/prettier rule.
    // Extends the stylelint-config-prettier configuration.
    // Extends the stylelint-config-concentric-order configuration.
    'stylelint-prettier/recommended',
    'stylelint-config-concentric-order',
  ],
  /*
   * Custom order rules:
   * - @include/@mixin
   * - CSS properties (with config-concentric-order)
   * - CSS pseudo-selectors
   * - @include mq
   * - nested selectors
   */
  rules: {
    'order/order': [
      'at-rules',
      'declarations',
      {
        type: 'rule',
        selector: /^&::?\w+$/,
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'mq',
        hasBlock: true,
      },
      'rules',
    ],
    'max-nesting-depth': [2, { ignore: ['pseudo-classes'] }],
  },
}
