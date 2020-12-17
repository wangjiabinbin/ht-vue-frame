/*
 * @Author: 王佳宾
 * @Date: 2020-12-02 20:46:08
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 13:42:35
 * @Description:
 * @FilePath: \src\main.js
 */
import Vue from 'vue';
import Vant from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 轮播组件
import 'swiper/swiper-bundle.css';
import 'vant/lib/index.css';
import cookies, { questionCookie } from 'utils/cookies';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.scss';
import './style/normalize.css';

Vue.use(Vant).use(VueAwesomeSwiper);
router.afterEach(() => {
  // 跳转路由滚动条归零
  document.querySelector('.main').scrollTop = 0;
});
router.beforeEach((to, from, next) => {
  if (!questionCookie() && to.name !== 'login') {
    next('/Login');
  }
  next();
});

Vue.config.productionTip = false;
Vue.prototype.$cookies = cookies;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
