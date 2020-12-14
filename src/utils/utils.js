/*
 * @Author: 王佳宾
 * @Date: 2020-12-08 15:41:50
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-12 22:00:25
 * @Description: Please set Description
 * @FilePath: \src\utils\utils.js
 */

/**
 * 日期格式化
 * @param {*} data new Date()对象
 * @param {*} fmt yyyy-MM-dd hh:mm:ss
 */
export function dateFormat(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}
/**
 * @author: 王佳宾
 * @description: 筛选
 * @param {*} type
 * @return {*}
 */
export function selectAudit(type) {
  switch (type) {
    case '1':
      return { name: '招标中', color: '#79CBEA' };
      break;
    case '2':
      return { name: '已中标', color: '#EF9228' };
      break;
    case '3':
      return { name: '未中标', color: '#C7DC52' };
      break;
    default:
      return '';
      break;
  }
}
export function selectParticipation(type) {
  if (type === '0') {
    return '未参与';
  }
  return '参与';
}

/**
 * 表单必填项非空判断
 * @param {*} requiredData 所有必填项
 * @param {*} allFormItem 所有表单项
 */
export function isEmpty(requiredData, allFormItem) {
  for (let i = 0; i < requiredData.length; i++) {
    for (let j = 0; j < allFormItem.length; j++) {
      const requiredKey = requiredData[i].key;
      const itemKey = allFormItem[j][0];
      const itemValue = allFormItem[j][1];
      if (requiredKey === itemKey) {
        if (!itemValue || !itemValue.length) {
          return requiredData[i];
        }
        break;
      }
    }
  }
  return false;
}
