<template>
  <div>
    <div ref="projectProgressMap" class="projectProgressMap"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { mapOption } from '../utils/mapConfig';
import { permissions } from '../utils/localstorageS';

export default {
  props: {
    serversData: Array,
    jsonData: Object,
    isShow: Boolean,
    name: String,
  },
  data() {
    return {
      hookTip: null,
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
        this.hookTip = e.dataIndex;
        document.getElementById('skipRouter').addEventListener('click', () => {
          this.$router.push({
            name: 'detailProject',
            query: {
              name: e.name,
              id: e.data.adcode,
              cache: new Date().getTime(),
            },
          });
        });
      });
    },
  },
  watch: {
    jsonData(val) {
      if (this.serversData) {
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
