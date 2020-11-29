<template>
  <div class="lineChartsMap" ref="lineChartsMap"></div>
</template>

<script>
import echarts from 'echarts';

const option = {
  backgroundColor: '#fff',
  textStyle: {
    fontFamily: 'Din-Light',
  },
  color: ['blue'],
  title: {
    text: '项目新增',
    left: 10,
    top: 8,
    textStyle: {
      fontSize: 12,
      color: '#010713',
      fontWeight: 400,
    },
  },
  grid: {
    left: 50,
    right: 40,
    top: 70,
    bottom: 200,
    borderWidth: 1,
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
    axisLabel: {
      color: '#a0a9bc',
      //X轴标签 label 做了特殊处理，防止左右溢出
      // formatter: (value, index) => {
      //   // if (value.endsWith('7')) return value;
      //   // return '';formatter: (value, index) => {
      //   // if (index === 0 || index === option.xAxis.data.length - 1) {
      //   //   return '';
      //   // }
      //   return value;
      // },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    name: '',
    nameTextStyle: {
      color: 'gray',
    },
    type: 'value',
    // axisLabel: {
    //   color: '#a0a9bc',
    //   inside: true,
    //   margin: 0,
    //   verticalAlign: 'bottom',
    // },
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    minInterval: 1,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: '项目新增',
      data: [],
      type: 'line',
      smooth: true,
      smoothMonotone: 'x',
      cursor: 'pointer',
      showSymbol: false,
      lineStyle: {
        shadowColor: 'rgba(18,61,172,0.5)',
        shadowBlur: 10,
      },
    },
  ],
};
const lineOption = '';
export default {
  props: {
    lineMapData: Array,
    name: String,
  },
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const mapChart = echarts.init(this.$refs.lineChartsMap);
      mapChart.setOption(option);
    },
  },
  watch: {
    lineMapData(val) {
      val.reverse().forEach((item) => {
        option.series[0].data.push(item.num);
        option.xAxis.data.push(item.projectDate);
        option.title.text = this.$props.name;
        option.series[0].name = this.$props.name;
      });
      this.initMap();
    },
  },
};
</script>

<style scoped lang="scss">
.lineChartsMap {
  width: 100%;
  height: 3.6rem;
}
</style>
