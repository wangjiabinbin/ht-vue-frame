/*
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 17:29:30
 * @Description: Please set Description
 * @FilePath: \src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import HomeStore from './homeStore';
import InvitationStore from './invitationStore';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    HomeStore,
    InvitationStore,
  },
});
