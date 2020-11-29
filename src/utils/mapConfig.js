export function randomData() {
  return Math.round(Math.random() * 100);
}

export const mydata = [
  {
    name: '北京',
    value: 54,
  },
  {
    name: '天津',
    value: 13,
  },
  {
    name: '上海',
    value: 40,
  },
  {
    name: '重庆',
    value: 75,
  },
  {
    name: '河北',
    value: 13,
  },
  {
    name: '河南',
    value: 83,
  },
  {
    name: '云南',
    value: 11,
  },
  {
    name: '辽宁',
    value: 19,
  },
  {
    name: '黑龙江',
    value: 15,
  },
  {
    name: '湖南',
    value: 69,
  },
  {
    name: '安徽',
    value: 60,
  },
  {
    name: '山东',
    value: 39,
  },
  {
    name: '新疆',
    value: 4,
  },
  {
    name: '江苏',
    value: 31,
  },
  {
    name: '浙江',
    value: 104,
  },
  {
    name: '江西',
    value: 36,
  },
  {
    name: '湖北',
    value: 1052,
  },
  {
    name: '广西',
    value: 33,
  },
  {
    name: '甘肃',
    value: 7,
  },
  {
    name: '山西',
    value: 9,
  },
  {
    name: '内蒙古',
    value: 7,
  },
  {
    name: '陕西',
    value: 22,
  },
  {
    name: '吉林',
    value: 4,
  },
  {
    name: '福建',
    value: 18,
  },
  {
    name: '贵州',
    value: 5,
  },
  {
    name: '广东',
    value: 98,
  },
  {
    name: '青海',
    value: 1,
  },
  {
    name: '西藏',
    value: 0,
  },
  {
    name: '四川',
    value: 44,
  },
  {
    name: '宁夏',
    value: 4,
  },
  {
    name: '海南',
    value: 22,
  },
  {
    name: '香港',
    value: 5,
  },
  {
    name: '澳门',
    value: 5,
  },
];
export const optionMap2 = {
  tooltip: {
    triggerOn: 'click',
    formatter: function (e, t, n) {
      // return .5 == e.value ? e.name + "：有疑似病例" : `${e.seriesName} ${e.name} ${e.value} `
      return '<div ></div>';
    },
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 26,
    bottom: 40,
    showLabel: !0,
    text: ['高', '低'],
    pieces: [
      {
        gt: 100,
        label: '> 100 人',
        color: '#7f1100',
      },
      {
        gte: 10,
        lte: 100,
        label: '10 - 100 人',
        color: '#ff5428',
      },
      {
        gte: 1,
        lt: 10,
        label: '1 - 9 人',
        color: '#ff8c71',
      },
      {
        gt: 0,
        lt: 1,
        label: '疑似',
        color: '#ffd768',
      },
      {
        value: 0,
        color: '#ffffff',
      },
    ],
    show: false, //控制左侧按钮显示
  },
  geo: {
    map: 'china',
    roam: !1,
    scaleLimit: {
      min: 1,
      max: 2,
    },
    zoom: 1.23, //地图大小
    top: 0,
    label: {
      normal: {
        show: !0,
        fontSize: '8',
        color: 'rgba(0,0,0,0.7)', //文字颜色
      },
    },
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 0.2)', //边框颜色
      },
      emphasis: {
        areaColor: '#f2d5ad', //划过背景色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
  },
  series: [
    {
      name: '确诊病例',
      type: 'map',
      geoIndex: 0,
      data: mydata,
    },
  ],
};
export const cityData = [
  {
    name: '南海诸岛',
    value: 0,
    isShow: false,
    provinceData: [
      {
        name: '商水',
        value: randomData(),
      },
      {
        name: '周口',
        value: randomData(),
      },
      {
        name: '衡水',
        value: randomData(),
      },
      {
        name: '三里屯',
        value: randomData(),
      },
    ],
  },
  {
    name: '北京',
    value: 54,
  },
  {
    name: '天津',
    value: 13,
  },
  {
    name: '上海',
    value: 40,
  },
  {
    name: '重庆',
    value: 75,
  },
  {
    name: '河北',
    value: 13,
  },
  {
    name: '河南',
    value: 83,
  },
  {
    name: '云南',
    value: 11,
  },
  {
    name: '辽宁',
    value: 19,
  },
  {
    name: '黑龙江',
    value: 15,
  },
  {
    name: '湖南',
    value: 69,
  },
  {
    name: '安徽',
    value: 60,
  },
  {
    name: '山东',
    value: 39,
  },
  {
    name: '新疆',
    value: 4,
  },
  {
    name: '江苏',
    value: 31,
  },
  {
    name: '浙江',
    value: 104,
  },
  {
    name: '江西',
    value: 36,
  },
  {
    name: '湖北',
    value: 1052,
  },
  {
    name: '广西',
    value: 33,
  },
  {
    name: '甘肃',
    value: 7,
  },
  {
    name: '山西',
    value: 9,
  },
  {
    name: '内蒙古',
    value: 7,
  },
  {
    name: '陕西',
    value: 22,
  },
  {
    name: '吉林',
    value: 4,
  },
  {
    name: '福建',
    value: 18,
  },
  {
    name: '贵州',
    value: 5,
  },
  {
    name: '广东',
    value: 98,
  },
  {
    name: '青海',
    value: 1,
  },
  {
    name: '西藏',
    value: 0,
  },
  {
    name: '四川',
    value: 44,
  },
  {
    name: '宁夏',
    value: 4,
  },
  {
    name: '海南',
    value: 22,
  },
  {
    name: '香港',
    value: 5,
  },
  {
    name: '澳门',
    value: 5,
  },
];

export const lineChart = {
  legend: {
    data: ['邮件营销'],
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
    data: [],
  },
  dataZoom: [
    {
      type: 'slider',
      start: 30,
      end: 100,
      zoomLock: false,
    },
  ],
  grid: {
    left: 40,
    right: 40,
    bottom: 20,
    top: 40,
    containLabel: true,
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      color: ['#5eb4e2'], //折线条的颜色
    },
  ],
};
export const lineChart2 = {
  title: {
    text: '折线图堆叠',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
const myData2 = [
  {
    charge: 'test',
    name: '北京市',
    value: 0,
  },
  {
    charge: null,
    name: '天津市',
    value: 0,
  },
  {
    charge: null,
    name: '河北省',
    value: 0,
  },
  {
    charge: 'gaoguan',
    name: '山西省',
    value: 2,
  },
  {
    charge: null,
    name: '内蒙古自治区',
    value: 1,
  },
  {
    charge: null,
    name: '辽宁省',
    value: 0,
  },
  {
    charge: null,
    name: '吉林省',
    value: 0,
  },
  {
    charge: null,
    name: '黑龙江省',
    value: 0,
  },
  {
    charge: null,
    name: '上海市',
    value: 0,
  },
  {
    charge: null,
    name: '江苏省',
    value: 0,
  },
  {
    charge: null,
    name: '浙江省',
    value: 0,
  },
  {
    charge: null,
    name: '安徽省',
    value: 0,
  },
  {
    charge: null,
    name: '福建省',
    value: 0,
  },
  {
    charge: null,
    name: '江西省',
    value: 0,
  },
  {
    charge: null,
    name: '山东省',
    value: 0,
  },
  {
    charge: null,
    name: '河南省',
    value: 0,
  },
  {
    charge: null,
    name: '湖北省',
    value: 0,
  },
  {
    charge: null,
    name: '湖南省',
    value: 0,
  },
  {
    charge: null,
    name: '广东省',
    value: 0,
  },
  {
    charge: null,
    name: '广西壮族自治区',
    value: 0,
  },
  {
    charge: null,
    name: '海南省',
    value: 0,
  },
  {
    charge: null,
    name: '重庆市',
    value: 0,
  },
  {
    charge: null,
    name: '四川省',
    value: 0,
  },
  {
    charge: null,
    name: '贵州省',
    value: 0,
  },
  {
    charge: null,
    name: '云南省',
    value: 0,
  },
  {
    charge: null,
    name: '西藏自治区',
    value: 0,
  },
  {
    charge: null,
    name: '陕西省',
    value: 0,
  },
  {
    charge: null,
    name: '甘肃省',
    value: 0,
  },
  {
    charge: null,
    name: '青海省',
    value: 0,
  },
  {
    charge: null,
    name: '宁夏回族自治区',
    value: 0,
  },
  {
    charge: null,
    name: '新疆维吾尔自治区',
    value: 0,
  },
  {
    charge: null,
    name: '香港',
    value: 0,
  },
  {
    charge: null,
    name: '澳门',
    value: 0,
  },
];
const myData3 = [
  {
    charge: 'test',
    name: '北京市',
    value: randomData(),
  },
  {
    charge: null,
    name: '天津市',
    value: randomData(),
  },
  {
    charge: null,
    name: '河北省',
    value: randomData(),
  },
  {
    charge: 'gaoguan',
    name: '山西省',
    value: randomData(),
  },
  {
    charge: null,
    name: '内蒙古自治区',
    value: randomData(),
  },
  {
    charge: null,
    name: '辽宁省',
    value: randomData(),
  },
  {
    charge: null,
    name: '吉林省',
    value: randomData(),
  },
  {
    charge: null,
    name: '黑龙江省',
    value: randomData(),
  },
  {
    charge: null,
    name: '上海市',
    value: randomData(),
  },
  {
    charge: null,
    name: '江苏省',
    value: randomData(),
  },
  {
    charge: null,
    name: '浙江省',
    value: 0,
  },
  {
    charge: null,
    name: '安徽省',
    value: 0,
  },
  {
    charge: null,
    name: '福建省',
    value: 0,
  },
  {
    charge: null,
    name: '江西省',
    value: 0,
  },
  {
    charge: null,
    name: '山东省',
    value: 0,
  },
  {
    charge: null,
    name: '河南省',
    value: 0,
  },
  {
    charge: null,
    name: '湖北省',
    value: 0,
  },
  {
    charge: null,
    name: '湖南省',
    value: 0,
  },
  {
    charge: null,
    name: '广东省',
    value: 0,
  },
  {
    charge: null,
    name: '广西壮族自治区',
    value: 0,
  },
  {
    charge: null,
    name: '海南省',
    value: 0,
  },
  {
    charge: null,
    name: '重庆市',
    value: 0,
  },
  {
    charge: null,
    name: '四川省',
    value: 0,
  },
  {
    charge: null,
    name: '贵州省',
    value: 0,
  },
  {
    charge: null,
    name: '云南省',
    value: 0,
  },
  {
    charge: null,
    name: '西藏自治区',
    value: randomData(),
  },
  {
    charge: null,
    name: '陕西省',
    value: randomData(),
  },
  {
    charge: null,
    name: '甘肃省',
    value: 0,
  },
  {
    charge: null,
    name: '青海省',
    value: 0,
  },
  {
    charge: null,
    name: '宁夏回族自治区',
    value: randomData(),
  },
  {
    charge: null,
    name: '新疆维吾尔自治区',
    value: randomData(),
  },
  {
    charge: null,
    name: '香港',
    value: randomData(),
  },
  {
    charge: null,
    name: '澳门',
    value: 0,
  },
];
export function servers() {
  return new Promise((res, req) => {
    setInterval(() => {
      res(myData2);
    }, 1000);
  });
}
export function servers2() {
  return new Promise((res, req) => {
    setInterval(() => {
      res(myData3);
    }, 1000);
  });
}
export const jiangsuData = [
  {
    charge: 'test',
    name: '南京市',
    value: randomData(),
  },
  {
    charge: null,
    name: '无锡市',
    value: randomData(),
  },
  {
    charge: null,
    name: '徐州市',
    value: randomData(),
  },
  {
    charge: 'gaoguan',
    name: '常州市',
    value: randomData(),
  },
  {
    charge: null,
    name: '苏州市',
    value: randomData(),
  },
  {
    charge: null,
    name: '南通市',
    value: randomData(),
  },
  {
    charge: null,
    name: '连云港市',
    value: randomData(),
  },
  {
    charge: null,
    name: '淮安市',
    value: randomData(),
  },
  {
    charge: null,
    name: '盐城市',
    value: randomData(),
  },
  {
    charge: null,
    name: '扬州市',
    value: randomData(),
  },
  {
    charge: null,
    name: '镇江市',
    value: randomData(),
  },
  {
    charge: null,
    name: '泰州市',
    value: randomData(),
  },
  {
    charge: null,
    name: '宿迁市',
    value: randomData(),
  },
];
