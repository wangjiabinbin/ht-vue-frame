<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 20:46:08
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 17:46:49
 * @Description: Please set Description
 * @FilePath: \src\views\detailProject\detailProject.vue
-->
<template>
  <div class="mainScrool">
    <ReturnUp :title="title" />
    <div class="projectTop">
      <div class="detailTitle">
        {{ queryS.name }}项目
        <!-- <span
          @click="areaList = !areaList"
          style="float: right; color: #4063e7"
          >切换省份</span
        > -->
      </div>

      <div class="projectDetail">
        <!-- 较上周增加数量 -->
        <div
          class="projectData"
          v-for="(item, index) in projectData"
          :class="{
            afterRight: index === 0 || index === 1 || index === 3 || index === 4,
          }"
          :key="index"
        >
          <span class="projectNum" :style="{ color: colorData[index].bjColor }">
            {{ projectDataNum.length ? projectDataNum[index] : '' }}
          </span>
          <span class="projectName"> {{ item.name }} </span>
        </div>
      </div>
      <!-- 项目分类 -->
      <div class="detailTitle">城市项目分布</div>
      <div class="mapProject">
        <!-- 组件传参到地图组件中 -->
        <ProjectProgress
          :serversData="serversDataOne"
          :jsonData="jsonData"
          :name="queryS.name"
        />
      </div>
      <!-- 组件传参到Table组件中 -->
      <Tables :tableData="tableData" />
    </div>
    <div class="bottomTitle" v-if="tableData.length ? true : false">没有更多啦</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ReturnUp from 'components/returnUp.vue';
import { ProjectProgress, Tables } from '../../utils/routers';
import { projectData, colorData } from '../../utils/mapConfig';

export default {
  components: {
    ProjectProgress,
    Tables,
    ReturnUp,
  },
  data() {
    return {
      title: '项目详情',
      areaList: false,
      queryS: {},
      projectData: projectData,
      colorData: colorData,
    };
  },
  async created() {
    this.queryS = this.$route.query;
    this.getAdcodeAsync(this.queryS.id);
    this.getMapJsonAsync(this.queryS.id);
    this.getMapInfoOneAsync(this.queryS.id);
  },
  mounted() {
    this.getTableDataAsync(this.queryS.id);
  },
  computed: {
    ...mapState('HomeStore', ['projectDataNum', 'jsonData', 'serversDataOne', 'tableData']),
  },
  methods: {
    ...mapActions('HomeStore', [
      'getAdcodeAsync',
      'getMapJsonAsync',
      'getMapInfoOneAsync',
      'getTableDataAsync',
    ]),
  },
};
</script>

<style scoped lang="scss">
@import '../../style/projectDetail/_projectDetail.scss';
.projectTop {
  padding: 0 3.46%;
  background: #f9f9fb;
  .projectDetail {
    width: 100%;
    background: #ffffff;
    .projectData {
      margin-bottom: 0.11rem;
      margin-top: 0.11rem;
    }
  }
  .detailTitle {
    height: 0.17rem;
    font-size: 0.18rem;
    font-family: 'CNBold';
    font-weight: bold;
    color: #000000;
    // margin-left: 0.14rem;
    padding: 0.14rem 0 0.14rem 0.14rem;
    position: relative;
  }
  .detailTitle::after {
    content: '';
    width: 0.03rem;
    height: 0.2rem;
    background: #4063e7;
    border-radius: 1px;
    position: absolute;
    left: 0;
  }
  .mapProject {
    // width: 3.45rem;
    width: 100%;
    height: 2.81rem;
    margin-bottom: 0.2rem;
  }
}
.bottomTitle {
  width: 100%;
  color: #969799;
  font-size: 0.14rem;
  line-height: 0.5rem;
  text-align: center;
}
</style>
