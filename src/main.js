import Vue from 'vue';
import { Button } from 'ant-design-vue';
import LyTab from 'ly-tab';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.scss';
import './style/normalize.css';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(LyTab);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
