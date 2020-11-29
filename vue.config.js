// /*
//  * @Author: 王磊
//  * @Date: 2020-11-23 09:35:27
//  * @LastEditTime: 2020-11-23 09:40:32
//  * @LastEditors: Please set LastEditors
//  * @Description: webpack配置，覆盖vue脚手架内置webpack配置
//  * @FilePath: \uus-data2.0\vue.config.js
//  */
// /* eslint-disable */
// const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = {
//   publicPath: '/',
//   // 热更新
//   devServer: {
//     open: true,
//     hot: true,
//     compress: true,
//     disableHostCheck: true,
//     // proxy: {
//     //   '/app': {
//     //     target: 'http://211.154.196.244:8081',
//     //     changeOrigin: true,
//     //   },
//     // },
//     // },
//     // outputDir: 'build',
//     // configureWebpack: {
//     //   plugins: [
//     //     new CopyWebpackPlugin([
//     //       {
//     //         from: 'node_modules/cesium/Build/Cesium/Workers',
//     //         to: 'cesium/Workers',
//     //       },
//     //     ]),
//     //     new CopyWebpackPlugin([
//     //       {
//     //         from: 'node_modules/cesium/Build/Cesium/ThirdParty',
//     //         to: 'cesium/ThirdParty',
//     //       },
//     //     ]),
//     //     new CopyWebpackPlugin([
//     //       { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'cesium/Assets' },
//     //     ]),
//     //     new CopyWebpackPlugin([
//     //       {
//     //         from: 'node_modules/cesium/Build/Cesium/Widgets',
//     //         to: 'cesium/Widgets',
//     //       },
//     //     ]),
//     //     new webpack.DefinePlugin({
//     //       // Define relative base path in cesium for loading assets
//     //       CESIUM_BASE_URL: JSON.stringify('./cesium'),
//     //     }),
//     //   ],
//     // },
//   },
// };
module.exports = {
  publicPath: './',
};
