/*
 * @Author: 王佳宾
 * @Date: 2020-12-15 17:06:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 17:45:14
 * @Description: Please set Description
 * @FilePath: \src\store\invitationStore.js
 */
import { getShowBidder } from 'api/api';

export default {
  namespaced: true,
  state: {
    classifyProgressData: [
      {
        name: '招标中',
        color: '#79CBEA',
        type: '1',
      },
      {
        name: '已中标',
        color: '#EF9228',
        type: '2',
      },
      {
        name: '未中标',
        color: '#C7DC52',
        type: '3',
      },
    ],
    o_getData: {
      name: null,
      province: null,
      industryTypeList: [],
      status: null,
    },
    totalPrice: '',
    projectDataList: [],
    isShowEmpty: true,
  },
  mutations: {
    getShowBidder(state, payload) {
      state.totalPrice = payload.totalPrice;
      state.classifyProgressData[0].num = payload.BD;
      state.classifyProgressData[1].num = payload.WBD;
      state.classifyProgressData[2].num = payload.NBD;
      if (payload.bidderList.length === 0) {
        state.isShowEmpty = true;
      } else {
        state.isShowEmpty = false;
      }
      state.projectDataList = payload.bidderList;
    },
    setData(state, payload) {
      state.o_getData[payload[0]] = payload[1];
    },
  },
  actions: {
    getShowBidderAsync({ commit, rootState }) {
      getShowBidder(rootState.InvitationStore.o_getData).then((res) => {
        commit('getShowBidder', res.data);
      });
    },
  },
};
