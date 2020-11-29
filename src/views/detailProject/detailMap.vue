<template>
  <div>
    <div ref="projectProgressMap" class="projectProgressMap"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  props: {
    serversData: Array,
    jsonData: Object,
    name: String,
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
            <div style="width: 1rem;height: 0.74rem;padding: 0 0 0rem 0.05rem;border-bottom:1px solid  rgba(255, 255, 255, 0.5);">
            <div style="width: 0.63rem;height: 0.39rem;">
            <div style="color:#ccccca">
            省份:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">${e.name}</span>
            </div>
            <div  style="color:#ccccca">
            项目总量:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">${e.value}</span>
            </div>
            <div  style="color:#ccccca">
            负责人:<span style="color:#fff;margin: 0 0 0.055rem 0.05rem;">负责人</span>
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
          orient: 'horizontal',
          bottom: 0,
          showLabel: true,
          textGap: 1,
          //两端字体间距
          itemWidth: 10,
          //图元宽高
          itemGap: 10,
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
          map: this.$props.name,
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.17,
          //地图大小
          top: '30rpx',
          left: '40rpx',
          label: {
            normal: {
              show: !0,
              fontSize: '6',
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
        console.log(e);
        this.hookTip = e.dataIndex;
        document.getElementById('skipRouter').addEventListener('click', () => {
          this.$router.push({
            name: 'detailProjectS',
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
    jsonData(val) {
      echarts.registerMap(this.$props.name, val);
      this.option = this.$props.serversData;
      this.initMap();
    },
    serversData(val) {},
    deep: true,
  },
};
</script>

<style scoped lang="scss">
.projectProgressMap {
  width: 100%;
  height: 3.6rem;
}
</style>
