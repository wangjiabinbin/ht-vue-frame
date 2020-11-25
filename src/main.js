/*
 * @Author: 王磊
 * @Date: 2020-11-25 09:43:08
 * @LastEditTime: 2020-11-25 09:46:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uus-data2.0-mobile\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.scss';
import './style/normalize.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
