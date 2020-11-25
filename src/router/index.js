/*
 * @Author: your name
 * @Date: 2020-11-25 09:43:08
 * @LastEditTime: 2020-11-25 09:44:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \uus-data2.0-mobile\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
