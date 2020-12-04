/* eslint-disable */
/*
 * @Author: your name
 * @Date: 2020-11-29 11:47:25
 * @LastEditTime: 2020-11-29 12:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \survey_app_web\vue.config.js
 */

module.exports = {
  // 静态资源
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      echarts: 'echarts',
    },
  },
  publicPath: './',
  // 热更新
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://211.154.196.244:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  outputDir: 'build',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '航天宏图风险普查';
      return args;
    });
  },
};
