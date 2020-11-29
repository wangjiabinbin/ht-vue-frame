<template>
  <div>
    <div ref="projectProgressMap" class="projectProgressMap"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
// import chinaJson from 'echarts/map/json/china.json';
// import axios from 'axios';

export default {
  props: {
    serversData: Array,
    jsonData: Object,
    isShow: Boolean,
  },
  data() {
    return {
      hookTip: null,
      option: [],
      jsonMapData: null,
    };
  },
  created() {},
  methods: {
    initMap() {
      const mapChart = echarts.init(this.$refs.projectProgressMap);
      mapChart.setOption({
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
            省份:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">${e.name}</span>
            </div>
            <div  style="color:#ccccca">
            ${
              this.isShow ? '项目总量' : '新增项目'
            }:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">${e.value}</span>
            </div>
            <div  style="color:#ccccca">
            负责人:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;"> ${
              e.data.charge
            }</span>
            </div>
            </div>
            </div>
            <div id="skipRouter" style="height:0.2rem;float:right;">详请></div>
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
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.6,
          //地图大小
          top: '80',
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
            data: this.option,
          },
        ],
      });
      mapChart.on('click', (e) => {
        this.hookTip = e.dataIndex;
        document.getElementById('skipRouter').addEventListener('click', () => {
          this.$router.push({
            name: 'detailProject',
            query: {
              name: e.name,
              id: e.data.adcode,
            },
          });
        });
      });
    },
  },
  watch: {
    jsonData(val) {},
    serversData(val) {
      echarts.registerMap('china', this.$props.jsonData);
      this.option = val;
      this.initMap();
    },
    deep: true,
  },
};
</script>

<style scoped lang="scss">
.projectProgressMap {
  width: 100%;
  height: 2.8rem;
}
</style>
