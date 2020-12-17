/*
 * @Author: 王佳宾
 * @Date: 2020-12-15 09:17:34
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 11:49:21
 * @Description: cookie封装
 * @FilePath: \src\utils\cookies.js
 */
/**
 * @author
 * @description 保存cookie
 * @param {String} name 需要存储cookie的key
 * @param {String} value 需要存储cookie的value
 * @param {Number} timer 默认存储多少天
 */
function setCookie(name, value, timer = 1) {
  const Days = timer; //默认将被保存 1 天
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

/**
 * @author: 王佳宾
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
export function getCookie(name) {
  const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr != null) {
    return JSON.parse(unescape(arr[2]));
  } else {
    return null;
  }
}

/**
 * @author: 王佳宾
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */
function clearCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}
/**
 * @author: 王佳宾
 * @description: token有没有
 * @param {*}
 * @return {*}
 */
export function questionCookie() {
  if (getCookie('token')) {
    return true;
  }
  return false;
}
export function permissions() {
  if (getCookie('token').roleName === '高管' || getCookie('token').roleName === '管理人员') {
    return 0;
  } else {
    return 1;
  }
}
export const ProjectReview = {
  ratingInfo: () => {
    if (getCookie('token').roleName === '管理人员') {
      return 0;
    } else if (getCookie('token').roleName === '销售') {
      return 1;
    } else {
      return 2;
    }
  },
  stateMessages: (name) => {
    switch (name) {
      case '待审核':
        return 0;
      case '审核中':
        return 1;
      case '审核不通过':
        return 3;
      case '审核通过':
        return 2;
      default:
        return 0;
    }
  },
};

export default {
  setCookie,
  getCookie,
  clearCookie,
  questionCookie,
};
