/*
 * @Author: 王磊
 * @Date: 2020-11-23 09:35:27
 * @LastEditTime: 2020-11-25 09:44:09
 * @LastEditors: Please set LastEditors
 * @Description: webpack配置，覆盖vue脚手架内置webpack配置
 * @FilePath: \uus-data2.0\vue.config.js
 */

module.exports = {
  // 热更新
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
  },
  outputDir: 'build',
  configureWebpack: {
    plugins: [],
  },
};
