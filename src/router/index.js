import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
    meta: {
      index: 0,
    },
  },
  // 新增发布
  {
    path: '/NewCon',
    name: 'newCon',
    component: () => import('../views/newCon/newCon.vue'),
    meta: {
      index: 2,
    },
  },
  {
    path: '/IssueCon',
    name: 'issueCon',
    component: () => import('../views/newCon/issueCon.vue'),
    meta: {
      index: 2,
    },
  },
  // 个人中心
  {
    path: '/Person',
    name: 'person',
    component: () => import('../views/person/person.vue'),
    meta: {
      index: 3,
    },
  },
  // 项目
  {
    path: '/Projects',
    name: 'projects',
    component: () => import('../views/projects/projects.vue'),
    meta: {
      index: 1,
    },
  },
  //发布
  {
    path: '/Issue',
    name: 'issue',
    component: () => import('../views/newCon/issueCon.vue'),
    meta: {
      isShow: true,
    },
  },
  //详情
  {
    path: '/DetailProject',
    name: 'detailProject',
    component: () => import('../views/detailProject/detailProject.vue'),
    meta: {
      isShowCache: true,
    },
  },
  // 登录’
  {
    path: '/Login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      isShowLogin: true,
    },
  },
  {
    path: '/WxAccredit',
    name: 'wxAccredit',
    component: () => import('../views/login/index.vue'),
    meta: {
      isShowLogin: true,
    },
  },
];

export default new VueRouter({
  routes,
});
