module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 0,
    'no-debugger': 'off',
    'array-bracket-spacing': 0,
    'array-callback-return': 'warn',
    'arrow-parens': 0,
    'brace-style': [
      'error',
      'stroustrup'
    ],
    'computed-property-spacing': 0,
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'consistent-return': 'off',
    'func-call-spacing': 0,
    'import/prefer-default-export': 'warn',
    indent: [
      'error',
      2
    ],
    'linebreak-style': 0,
    'max-len': [
      1,
      120,
      2
    ],
    'no-multiple-empty-lines': [
      1,
      {
        max: 1
      }
    ],
    'no-param-reassign': 'off',
    'no-plusplus': 0,
    'no-spaced-func': 0,
    'no-warning-comments': 'warn',
    'no-whitespace-before-property': 0,
    'prefer-destructuring': 'warn',
    'prefer-template': 'warn',
    semi: [
      'error',
      'never'
    ],
    'space-in-parens': 0,
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'no-trailing-spaces': 2,
    'vue/html-self-closing': 'never'
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ]
}
