/*
 * @Author: 王佳宾
 * @Date: 2020-12-08 15:41:50
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 09:42:10
 * @Description: Please set Description
 * @FilePath: \src\utils\utils.js
 */
/**
 * 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
 * @return {}
 */
export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '/';
  const seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  let hours = date.getHours();
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours;
  }
  let minutef = date.getMinutes();
  if (minutef >= 0 && minutef <= 9) {
    minutef = '0' + minutef;
  }
  let seconds = date.getSeconds();
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }
  const currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    ' ' +
    hours +
    seperator2 +
    minutef +
    seperator2 +
    seconds;
  return {
    currentdate,
    date: ' ' + hours + ':' + minutef + ':' + seconds,
  };
}
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
/**
 * @author: 王佳宾
 * @description: 图片引入
 * @param {*}
 * @return {*}
 */
export const headerLineS = [
  {
    name: '数据说明',
  },
  {
    name: '1)数据来源：',
    children: ['各地区负责人的在线表格数据；'],
  },
  {
    name: '2)实时数据统计原则：',
    children: [
      'a.累计项目数据为各地上报的项目数据,数据会根据实时数据发生变化。',
      'b.[较上周+]数据使用当前全国数据总数减去上一周的数据总数，数据为截止至上周日的数据。',
    ],
  },
  {
    name: '3)风险普查趋势图：',
    children: ['全国数据使用各地公布上报的数量数据,数据会根据实时数据发生变化。'],
  },
];
export const Logo = require('../static/loginImages/logo.png');
export const WX = require('../static/loginImages/icon_w.png');
export const SJ = require('../static/loginImages/icon_i.png');
export const auditIing = require('../static/images/addProject/auditing.png');
export const auditNot = require('../static/images/addProject/auditNot.png');
export const auditPass = require('../static/images/addProject/auditPass.png');
export const toAudit = require('../static/images/addProject/toAudit.png');

export const levelJudgeImgS = {
  auditIing,
  auditNot,
  auditPass,
  toAudit,
};
/**
 * @author: 王佳宾
 * @description: 手机号验证
 * @param {String} value
 * @return {*}
 */
export function testPhone(value) {
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
}
