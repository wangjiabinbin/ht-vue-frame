/*
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-09 10:32:37
 * @Description: Please set Description
 * @FilePath: \src\utils\headerline.js
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
