/* eslint-disable */
/*
 * @Author: your name
 * @Date: 2020-11-29 11:47:25
 * @LastEditTime: 2020-12-14 15:09:39
 * @LastEditors: 王佳宾
 * @Description: In User Settings Edit
 * @FilePath: \vue.config.js
 */
// 生产环境，测试和正式
'use strict';
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  echarts: 'echarts',
  vant: 'vant',
};
// // CDN外链，会插入到index.html中
const CDN = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.css'],
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js',
      'https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js',
    ],
  },
};
module.exports = {
  // 静态资源
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     vuex: 'Vuex',
  //     axios: 'axios',
  //     echarts: 'echarts',
  //   },
  // },
  publicPath: './',
  outputDir: 'build',
  // 热更新
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    proxy: {
      // '/app': {
      //   target: 'http://211.154.196.244:8081/app',
      //   changeOrigin: true, //跨域
      //   secure: false, // 使用的是http协议则设置为false，https协议则设置为true
      //   pathRewrite: {
      //     '^/app': '/',
      //   },
      // },
      '/app': {
        target: 'http://192.168.1.249:8080/app',
        changeOrigin: true, //跨域
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        pathRewrite: {
          '^/app': '/',
        },
      },
      '/json': {
        target: 'http://area.zzpeng.cn',
        changeOrigin: true, //跨域
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        pathRewrite: {
          '^/json': '/',
        },
      },
    },
  },
  chainWebpack: (config) => {
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test
    config.plugin('html').tap((args) => {
      args[0].title = '航天宏图风险普查';
      // if (IS_PROD) {
      //   args[0].cdn = CDN.build;
      // } else {
      //   args[0].cdn = CDN.dev;
      // }
      // args[0].cdn = CDN.build;
      return args;
    });
    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('utils', resolve('src/utils'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'));
  },
};
