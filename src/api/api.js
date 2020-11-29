import axios from 'axios';
import urlConfig from '../../public/config';
// import {config} from '../../static/config'
// const urlConfig = require("urlConfig");
// let base = urlConfig.url
// let base2 = urlConfig.url2
// let base3 = urlConfig.pcrqdlURL

//
// export const getAPfuncTree = (params) => {
//   return axios.post(`${base}sm/sm02/sm0201/getMkTree`, params).then((res) => res.data);
// };
// export const Login = (params) => {
//   return axios.post(`${base}sm/sm0105/login`, params);
// };
// export const GetUserData = (params) => {
//   return axios.post(`${base}sm/sm0105/select`, params);
// };

// parent id pageNum 起始页 pageSize 页数
export const getTables = (params) => {
  return axios.get(`${urlConfig.url}/area/getListInfo`, { params: params });
};
export const getMapInfo = (params) => {
  return axios.get(`${urlConfig.url}/area/getMapInfo`, { params: params });
};
export const getAllProject = () => {
  return axios.get(`${urlConfig.url}/home/getAllProject`);
};
// 分类数据
export const getAdcode = (params) => {
  return axios.get(`${urlConfig.url}/area/getAdcode`, { params: params });
};
// 全国省市县json数据

export const getMapJson = (id) => {
  return axios.get(`http://area.zzpeng.cn/${id}_full.json`);
};
