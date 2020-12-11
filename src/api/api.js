/*
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:53
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-11 13:22:31
 * @Description: Please set Description
 * @FilePath: \src\api\api.js
 */
import service from 'utils/request';
// import {config} from '../../static/config'
// const urlConfig = require("urlConfig");
// let base = urlConfig.url
// let base2 = urlConfig.url2
// let base3 = urlConfig.pcrqdlURL
//
// export const getAPfuncTree = (params) => {
//   return service.post(`${base}sm/sm02/sm0201/getMkTree`, params).then((res) => res.data);
// };
// export const Login = (params) => {
//   return service.post(`${base}sm/sm0105/login`, params);
// };
export const loginByPhone = (params) => {
  return service.post(`/app/sysUser/loginByPhone`, params);
};

/**
 * @author: 王佳宾
 * @description:
 * @param {*} params parent id pageNum 起始页 pageSize 页数
 * @return {*}
 */
export const getTables = (params) => {
  return service.get(`/app/area/getListInfos`, { params: params });
};
/**
 * @author: 王佳宾
 * @description:
 * @param {*} params type 1 type 0 全部 新增
 * @return {* }
 */
export const getMapInfo = (params) => {
  return service.get(`/app/area/getMapInfo`, { params: params });
};
/**
 * @author: 王佳宾
 * @description:
 * @param {*}
 * @return {*}
 */
export const getAllProject = () => {
  return service.get(`/app/home/getAllProject`);
};
/**
 * @author: 王佳宾
 * @description:
 * @param {*} id parent 编号
 * @return {*}
 */
// 分类数据
export const getAdcode = (params) => {
  return service.get(`/app/area/getAdcode`, { params: params });
};

export const getMapJson = (id) => {
  return service.get(`/json/${id}_full.json`);
};

export const getPermission = () => {
  return service.post(`/app/project/permission`, {
    roleKey: 2,
  });
};
/**
 * @author: 王佳宾
 * @description: 新建项目，对象
 * @param {*} params
 * @return {*}
 */
export const addProject = (params) => {
  return service.post(`/app/project/add`, params);
};
/**
 * @author: 王佳宾
 * @description: 查询项目进展
 * @param {*} params
 * @return {*}
 */
export const getUserPermission = (params) => {
  return service.post(`/app/project/userPermission`, params);
};
/**
 * @author: 王佳宾
 * @description: 查询单个项目数据信息
 * @param {*} params
 * @return {*}
 */
export const getOneProject = (params) => {
  return service.get(`/app/project/getOneProject`, { params: params });
};
/**
 * @author: 王佳宾
 * @description: 更新项目接口
 * @param {*} params
 * @return {*}
 */
export const updateOneProject = (params) => {
  return service.put(`/app/project/check`, params);
};
/**
 * @author: 王佳宾
 * @description: 招标新建接口
 * @param {*} params
 * @return {*}
 */
export const bidderAdd = (params) => {
  return service.post(`/app/bidder/add`, params);
};
/**
 * @author: 王佳宾
 * @description: 项目列表信息
 * @param {*} params
 * @return {*}
 */
export const getShowBidder = (params) => {
  return service.post(`/app/bidder/showBidder`, params);
};
/**
 * @author: 王佳宾
 * @description: 查询单个招标信息
 * @param {*} params
 * @return {*}
 */
export const getOneBidder = (params) => {
  return service.get(`/app/bidder/getOneBidder`, { params: params });
};
/**
 * @author: 王佳宾
 * @description: 更新单个招标信息
 * @param {*} params
 * @return {*}
 */
export const updateBidder = (params) => {
  return service.post(`/app/bidder/updateBidder`, params);
};
// 验证码
export const getPhoneCode = (params) => {
  return service.get(`/app/sysUser/getPhoneCode`, { params: params });
};
