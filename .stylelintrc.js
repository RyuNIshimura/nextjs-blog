module.exports = {
  extends: ['stylelint-config-recommended-scss', "stylelint-config-standard"],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "extends",
        "tailwind"
      ]
    }],
    'order/properties-alphabetical-order': true,
    'scss/at-rule-no-unknown': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'no-invalid-position-at-import-rule': null
  },
}