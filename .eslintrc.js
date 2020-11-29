/*
 * @Author: 王磊
 * @Date: 2020-11-20 16:05:37
 * @LastEditTime: 2020-11-23 09:56:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ht-vue-frame\.eslintrc.js
 */
const env = process.env.NODE_ENV;

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-debugger': env === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'linebreak-style': ['off', 'windows'],
    'lines-around-comment': 'off',
    'no-inline-comments': 'off',
    'spaced-comment': 'off',
    'prefer-template': 'off',
    yoda: 'off',
    'no-undef': 'off',
    'no-template-curly-in-string': 1,
    quotes: 'off',
    'object-shorthand': 'off',
    'prefer-destructuring': 'off',
    'array-callback-return': 'off',
    'comma-dangle': 'off',
    'global-require': 'off',
    'no-else-return': 'off',
    'operator-linebreak': 'off',
    'arrow-body-style': 'off',
    'operator-assignment': 'off',
    'no-unused-expressions': 'off',
    'no-plusplus': 'off',
    'no-const-assign': 'off',
    'object-curly-newline': 'off',
    'newline-per-chained-call': 'off',
    indent: 'off',
  },
};
