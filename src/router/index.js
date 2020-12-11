/*
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-10 22:50:58
 * @Description: Please set Description
 * @FilePath: \src\router\index.js
 */
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

    redirect: '/Home',
    meta: {
      index: 0,
    },
  },
  {
    path: '/Home',
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
      isShowLogin: true,
    },
  },
  {
    path: '/NewConIndex',
    name: 'newConIndex',
    component: () => import('../views/newCon/index.vue'),
    meta: {
      index: 2,
    },
  },
  {
    path: '/NewConDetail',
    name: 'newConDetail',
    component: () => import('../views/newCon/projectDetail.vue'),
    meta: {
      isShowLogin: true,
    },
  },
  // 个人中心
  {
    path: '/Person',
    name: 'person',
    component: () => import('../views/person/person.vue'),
    meta: {
      index: 4,
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
      isShowLogin: true,
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
  // 招标模块
  {
    path: '/InvitationTender',
    name: 'invitationTender',
    component: () => import('../views/invitationTender/invitationTender.vue'),
    meta: {
      index: 3,
    },
  },
  // 招标新建
  {
    path: '/InvitationAdd',
    name: 'invitationAdd',
    component: () => import('../views/invitationTender/invitationAdd.vue'),
    meta: {
      isShowLogin: true,
    },
  },
  // 招标详情
  {
    path: '/TenderDetails',
    name: 'tenderDetails',
    component: () => import('../views/invitationTender/invitationTenderDetails.vue'),
    meta: {
      isShowLogin: true,
    },
  },
];

export default new VueRouter({
  routes,
});
