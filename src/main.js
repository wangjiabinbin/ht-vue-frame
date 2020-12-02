import Vue from 'vue';
import {
  NavBar,
  List,
  Loading,
  PullRefresh,
  Field,
  Overlay,
  Button,
  Form,
  Icon,
  Toast,
  Dialog,
} from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 轮播组件
import 'swiper/swiper-bundle.css';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.scss';
import './style/normalize.css';
import { isShowStorage } from './utils/localstorageS';

router.afterEach((to, from) => {
  // 跳转路由滚动条归零
  document.querySelector('.main').scrollTop = 0;
});

Vue.use(NavBar)
  .use(VueAwesomeSwiper)
  .use(List)
  .use(Loading)
  .use(PullRefresh)
  .use(Field)
  .use(Button)
  .use(Form)
  .use(Icon)
  .use(Overlay)
  .use(Toast)
  .use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
