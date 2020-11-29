<template>
  <div class="lineChartsMap" ref="lineChartsMap"></div>
</template>

<script>
import echarts from 'echarts';

const option = {};
const lineOption = '';
export default {
  props: {
    lineMapData: Array,
    title: String,
  },
  data() {
    return {
      xAxisData: ['1.1', '1.8', '1.5', '1.12', '1.19', '1.26', '2.3'],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const mapChart = echarts.init(this.$refs.lineChartsMap);
      mapChart.setOption({
        backgroundColor: '#fff',
        textStyle: {
          fontFamily: 'Din-Light',
        },
        color: [
          '#123dac',
          '#73e2e2',
          '#ff7e85',
          '#9b52ff',
          '#fac524',
          '#46caff',
          '#a1e867',
          '#10b2b2',
          '#ec87f7',
          '#f4905a',
          '#00baba',
          '#facf24',
          '#e89d67',
          '#23c6c6',
          '#fa8699',
          '#40b7fc',
          '#006d75',
          '#595959',
          '#f4764f',
          '#a640fc',
          '#fda23f',
          '#2d7ae4',
          '#5092ff',
          '#9351ed',
          '#8a89fe',
          '#df89e8',
          '#2797ff',
          '#6ad089',
          '#7c92e8 ',
        ],
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
          top: 65,
          bottom: 200,
          borderWidth: 1,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.xAxisData,
          axisLabel: {
            interval: 0,
            color: '#a0a9bc',
            fontSize: 10,
            //     //X轴标签 label 做了特殊处理，防止左右溢出
            //   formatter: (value, index) => {
            //       if (index === 0 || index === xAxisData.length - 1) {
            //         return "";
            //       }
            //       return value;
            //     }
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
          axisLabel: {
            fontSize: 10,
          },
        },
        series: [
          {
            name: '项目新增',
            data: [100, 90, 94, 90, 60, 70, 60],
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
      });
    },
  },
  watch: {
    lineMapData(val) {},
  },
};
</script>

<style scoped lang="scss">
.lineChartsMap {
  width: 100%;
  height: 3.6rem;
}
</style>
