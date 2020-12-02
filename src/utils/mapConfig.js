export function randomData() {
  return Math.round(Math.random() * 100);
}
// 地图数据
export function mapOption(isShow, option, name, permissions) {
  const m = {
    backgroundColor: '#f4f4f4',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(1, 7, 19, 0.5)',
      triggerOn: 'click',
      enterable: true, //可以进入悬浮层
      formatter: (e) => {
        if (!e.value && e.value !== 0) {
          e.value = '0';
        }
        const str = `
        <div style="width: 1rem;height: 0.74rem;padding: 0 0 0rem 0.05rem;border-bottom:1px solid  rgba(255, 255, 255, 0.5); z-index: 999;">
        <div style="width: 0.63rem;height: 0.39rem;">
        <div style="color:#ccccca">
        ${
          e.data.level === 'province'
            ? '省份'
            : e.data.level === 'city'
            ? '市'
            : e.data.level === 'district'
            ? '区'
            : ''
        }:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">${e.name}</span>
        </div>
        <div  style="color:#ccccca">
        ${
          isShow ? '新增项目' : '项目总量'
        }:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">${e.value}</span>
        </div>
        <div  style="color:#ccccca">
        负责人:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;"> ${e.data.charge}</span>
        </div>
        </div>
        </div>
        <div  id="skipRouter" style="height:0.2rem;float:right;display:${
          permissions ? 'none!important' : e.data.level === 'district' ? 'none' : 'block'
        }">详请></div>
        `;
        return str;
      },
    },
    visualMap: {
      min: 0,
      max: 1000,
      orient: 'vertical',
      bottom: 0,
      showLabel: true,
      textGap: 1,
      //两端字体间距
      itemWidth: 25,
      itemHeight: 8,
      //图元宽高
      itemGap: 6,
      // 图元间距
      textStyle: {
        fontSize: '10',
      },
      //lable文字大小
      pieces: [
        {
          gt: 30,
          label: ' > 30',
          color: '#7f1100',
        },
        {
          gt: 20,
          lt: 31,
          label: ' 21 ~ 30 ',
          color: '#f1bab5',
        },
        {
          gt: 10,
          lt: 21,
          label: ' 11 ~ 20',
          color: '#ff8c71',
        },
        {
          gt: 5,
          lt: 11,
          label: ' 6 ~ 10',
          color: '#fef3df',
        },
        {
          gt: 0,
          lt: 6,
          label: ' 1 ~ 5',
          color: '#ddeff1',
        },
        {
          value: 0,
          color: '#ffffff',
          label: ' 0',
        },
      ],
      show: true,
      //控制左侧按钮显示
    },
    geo: {
      map: name,
      roam: !1,
      scaleLimit: {
        min: 1,
        max: 2,
      },
      zoom: name === 'china' ? 1.6 : 1.2,
      //地图大小
      top: name === 'china' ? '80' : '30',
      left: 'center',
      label: {
        normal: {
          show: !0,
          fontSize: '8',
          color: 'rgba(0,0,0,0.7)',
          //文字颜色
        },
      },
      itemStyle: {
        normal: {
          //shadowBlur: 50,
          //shadowColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          //边框颜色
        },
        emphasis: {
          areaColor: '#f2d5ad',
          //划过背景色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderWidth: 0,
        },
      },
    },
    series: [
      {
        name: '总量',
        type: 'map',
        geoIndex: 0,
        data: option,
      },
    ],
  };
  return m;
}
/**
 * 项目进展文字
 */
export const projectData = [
  {
    name: '售前支持',
  },
  {
    name: '售前实施',
  },
  {
    name: '招标中',
  },
  {
    name: '已中标',
  },
  {
    name: '正式实施',
  },

  {
    name: '验收结项',
  },
];
/**
 * 项目进展颜色
 */
export const colorData = [
  {
    color: '#6cbd78',
    bjColor: '#6CBD78',
  },
  {
    color: '#f09329',
    bjColor: '#EF9228',
  },
  {
    color: '#5f6f93',
    bjColor: '#5E7093',
  },
  {
    color: '#79cbea',
    bjColor: '#79cbea',
  },
  {
    color: '#719bd5',
    bjColor: '#709BD2',
  },
  {
    color: '#8970b2',
    bjColor: '#8970B0',
  },
];
/**
 * 切换地图按钮文字
 */
export const tabMap = [
  {
    name: '累计项目总量',
  },
  {
    name: '每周新增数量',
  },
];
/**
 * 切换折线图文字
 */
export const tabLineMap = [
  {
    name: '新增中标',
  },
  {
    name: '新增验收',
  },
  {
    name: '售前支持',
  },
  {
    name: '售前实施',
  },
  {
    name: '已中标',
  },
  {
    name: '正式实施',
  },
  {
    name: '验收结项',
  },
];
