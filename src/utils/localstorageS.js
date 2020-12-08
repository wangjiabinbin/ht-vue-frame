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
