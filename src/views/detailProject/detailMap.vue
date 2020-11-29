<template>
  <div>
    <div ref="projectProgressMap" class="projectProgressMap"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import chinaJson from 'echarts/map/json/province/jiangsu.json';
import axios from 'axios';
import { mydata, servers, jiangsuData } from '../../utils/mapConfig';

echarts.registerMap('江苏', chinaJson);

export default {
  props: {
    serversData: Array,
  },
  data() {
    return {
      hookTip: null,
      option: [],
    };
  },
  created() {},
  async mounted() {
    this.initMap();
    // const res = await axios.get(
    //   'http://192.168.1.199:8099/area/getMapInfo?parent=100000&type=0'
    // );
    // await servers().then((res) => {
    //   this.option = res;
    // });
  },
  methods: {
    initMap() {
      const mapChart = echarts.init(this.$refs.projectProgressMap);
      mapChart.setOption({
        backgroundColor: '#f4f4f4',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.5)',
          triggerOn: 'click',
          enterable: true, //可以进入悬浮层
          formatter: (e) => {
            const str = `
            <div style="min-width: 0.86rem;height: 0.74rem;">
            <div style="min-width: 0.78rem;height: 0.64rem;margin:auto;border-bottom:1px solid #fff">
            <div>
            省份:<span style="color:#fff">${e.name}</span>
            </div>
            <div>
            项目总量:<span style="color:#fff">${e.value}</span>
            </div>
            <div>
            负责人:<span style="color:#fff">张三</span>
            </div>
            </div>
            <div id="skipRouter" style="height:0.2rem;float:right;margin:0.05rem 0">详请></div>
            </div>
            `;
            return str;
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          orient: 'horizontal',
          bottom: 0,
          showLabel: true,
          textGap: 1,
          //两端字体间距
          itemWidth: 10,
          //图元宽高
          itemGap: 5,
          // 图元间距
          textStyle: {
            fontSize: '10rpx',
          },
          //lable文字大小
          pieces: [
            {
              gt: 30,
              label: '> 30',
              color: '#7f1100',
            },
            {
              gte: 21,
              lte: 30,
              label: '21 ~ 30 ',
              color: '#f1bab5',
            },
            {
              gte: 11,
              lt: 20,
              label: '11 ~ 20',
              color: '#ff8c71',
            },
            {
              gt: 6,
              lt: 10,
              label: '6 ~ 10',
              color: '#fef3df',
            },
            {
              gt: 0,
              lt: 5,
              label: '1 ~ 5',
              color: '#ddeff1',
            },
            {
              value: 0,
              color: '#ffffff',
            },
          ],
          show: true,
          //控制左侧按钮显示
        },
        geo: {
          map: '江苏',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.2,
          //地图大小
          top: '30rpx',
          left: '40rpx',
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
            name: '项目总量',
            type: 'map',
            geoIndex: 0,
            data: this.$props.serversData,
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
              value: e.value,
            },
          });
        });
      });
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.projectProgressMap {
  width: 100%;
  height: 3.6rem;
}
</style>
