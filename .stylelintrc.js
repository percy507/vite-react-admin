module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier', // Make sure this is always the last element in the array.
  ],
  plugins: ['stylelint-order'],
  rules: {
    'block-no-empty': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
