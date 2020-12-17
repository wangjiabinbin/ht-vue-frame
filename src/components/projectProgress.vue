<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 20:46:09
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-16 17:15:40
 * @Description: Please set Description
 * @FilePath: \src\components\projectProgress.vue
-->
<template>
  <div ref="projectProgressMap" class="projectProgressMap"></div>
</template>

<script>
import echarts from 'echarts';
import { mapOption } from '../utils/mapConfig';
import { permissions } from '../utils/cookies';

export default {
  props: {
    serversData: Array,
    jsonData: Object,
    isShow: Boolean,
    name: String,
  },
  data() {
    return {
      option: [],
      jsonMapData: null,
      permissions: null,
    };
  },
  created() {
    this.permissions = permissions();
  },
  methods: {
    initMap() {
      const mapChart = echarts.init(this.$refs.projectProgressMap);
      mapChart.setOption(mapOption(this.isShow, this.option, this.name, this.permissions));
      mapChart.on('click', (e) => {
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
      mapChart.getZr().on('click', (e) => {
        if (!e.target) {
          mapChart.dispatchAction({
            type: 'hideTip',
          });
        }
      });
    },
  },
  // 监听父组件传过来的数据在渲染
  watch: {
    jsonData(val) {
      if (this.serversData.length !== 0) {
        echarts.registerMap(this.$props.name, this.$props.jsonData);
        this.option = val;
        this.initMap();
      }
    },
    serversData(val) {
      if (this.jsonData) {
        echarts.registerMap(this.$props.name, this.$props.jsonData);
        this.option = val;
        this.initMap();
      }
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
