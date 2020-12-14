/*
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-14 14:47:34
 * @Description: Please set Description
 * @FilePath: \src\utils\localstorageS.js
 */
export function getStorage() {
  return JSON.parse(localStorage.getItem('token'));
}
export function setStorage(value) {
  localStorage.setItem('token', value);
}
export function isShowStorage() {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
}
export function permissions() {
  if (getStorage().roleName === '高管' || getStorage().roleName === '管理人员') {
    return 0;
  } else {
    return 1;
  }
}
export const ProjectReview = {
  ratingInfo: () => {
    if (getStorage().roleName === '管理人员') {
      return 0;
    } else if (getStorage().roleName === '销售') {
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
