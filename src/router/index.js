import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
  },
  // 新增发布
  {
    path: '/NewCon',
    name: 'newCon',
    component: () => import('../views/newCon/newCon.vue'),
  },
  // 个人中心
  {
    path: '/Person',
    name: 'person',
    component: () => import('../views/person/person.vue'),
  },
  // 项目
  {
    path: '/Projects',
    name: 'projects',
    component: () => import('../views/projects/projects.vue'),
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
  {
    path: '/DetailProjectS',
    name: 'detailProjectS',
    component: () => import('../views/detailProject/detailProject2.vue'),
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
];

export default new VueRouter({
  routes,
});
