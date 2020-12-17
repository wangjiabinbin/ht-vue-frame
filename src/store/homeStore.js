/*
 * @Author: 王佳宾
 * @Date: 2020-12-15 14:28:03
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 16:40:46
 * @Description: 首页数据获取
 * @FilePath: \src\store\homeStore.js
 */
import { getAllProject, getMapInfo, getMapJson, getTables, getAdcode } from 'api/api';
import { projectData } from 'utils/mapConfig';

export default {
  //限定在当前模块的命名空间中，可以使用点语法点该文件名来操作数据和方法
  namespaced: true,
  state: {
    serversDataTwo: [],
    serversDataOne: [],
    projectData,
    projectDataWeek: [],
    projectDataAll: [],
    lineCutData: {},
    jsonData: {},
    tableData: [],
    projectDataNum: [],
  },
  mutations: {
    getTables(state, payload) {
      state.arr = payload;
    },
    getMapInfo(state, payload) {
      state.serversDataTwo = payload;
    },
    getMapInfoOne(state, payload) {
      state.serversDataOne = payload;
    },
    getAllProject(state, payload) {
      state.projectData.forEach((i) => {
        payload.week.forEach((item) => {
          if (i.name === item.progress) {
            item.num === 0
              ? state.projectDataWeek.push('无变化')
              : item.num < 0
              ? state.projectDataWeek.push(item.num)
              : state.projectDataWeek.push('+' + item.num);
          }
        });
      });
      state.projectData.forEach((i) => {
        payload.All.forEach((item) => {
          if (i.name === item.progress) {
            state.projectDataAll.push(item.num);
          }
        });
      });
      state.lineCutData.XZZB = payload.Classify[0].addWBD;
      state.lineCutData.XZYS = payload.Classify[0].addCBA;
      state.lineCutData.SQZC = payload.Classify[0].PST;
      state.lineCutData.SQSS = payload.Classify[0].PIT;
      state.lineCutData.YZB = payload.Classify[0].WBD;
      state.lineCutData.ZSSS = payload.Classify[0].FIE;
      state.lineCutData.YSJX = payload.Classify[0].CBA;
    },
    getMapJson(state, payload) {
      state.jsonData = payload;
    },
    getTableData(state, payload) {
      state.tableData = payload;
    },
    getAdcode(state, payload) {
      state.projectData.forEach((i) => {
        payload.forEach((item) => {
          if (i.name === item.progress) {
            state.projectDataNum.push(item.num);
          }
        });
      });
    },
  },
  actions: {
    /**
     * @author: 王佳宾
     * @description: 获取地图数据项目新增
     * @param {*} 上下文可以使用commit派发
     * @return {*}
     */
    getMapInfoAsync(context) {
      getMapInfo({
        parent: 100000,
        type: 1,
      }).then((res) => {
        context.commit('getMapInfo', res.data);
      });
    },
    /**
     * @author: 王佳宾
     * @description: 获取地图项目总量
     * @param {*} context
     * @return {*}
     */
    getMapInfoOneAsync(context, id = 100000) {
      getMapInfo({
        parent: id,
        type: 0,
      }).then((res) => {
        context.commit('getMapInfoOne', res.data);
      });
    },
    /**
     * @author: 王佳宾
     * @description: 获取首页用的的项目信息
     * @param {*} context
     * @return {*}
     */
    getAllProjectAsync(context) {
      getAllProject().then((res) => {
        context.commit('getAllProject', res.data);
      });
    },
    /**
     * @author: 王佳宾
     * @description: 获取地图json数据
     * @param {*}
     * @return {*}
     */
    getMapJsonAsync(context, id = 100000) {
      getMapJson(id).then((res) => {
        context.commit('getMapJson', res);
      });
    },
    /**
     * @author: 王佳宾
     * @description: 获取table数据
     * @param {*} context
     * @return {*}
     */
    getTableDataAsync(context, id = 100000) {
      getTables({
        parent: id,
      }).then((res) => {
        context.commit('getTableData', res.data);
      });
    },
    getAdcodeAsync(context, id) {
      getAdcode({ adcode: id }).then((res) => {
        context.commit('getAdcode', res.data);
      });
    },
  },
  getters: {},
};
