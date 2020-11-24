/*
 * @Author: 王磊
 * @Date: 2020-11-20 16:05:37
 * @LastEditTime: 2020-11-24 14:37:41
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
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-debugger': env === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'linebreak-style': ['off', 'windows'],
    'global-require': 0,
  },
};
