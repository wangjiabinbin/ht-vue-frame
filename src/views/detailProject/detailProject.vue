<template>
  <div class="mainScrool">
    <van-nav-bar left-text="返回" title="项目详情" left-arrow @click-left="onClickLeft" />
    <div class="projectTop">
      <div class="detailTitle">
        {{ queryS.name }}项目
        <!-- <span
          @click="areaList = !areaList"
          style="float: right; color: #4063e7"
          >切换省份</span
        > -->
      </div>
      <!-- <van-popup
        v-model="areaList"
        position="bottom"
        :get-container="getContainer"
        :style="{ height: '50%' }"
      >
        <van-area title="标题" :area-list="areaList2" />
      </van-popup> -->
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
        <ProjectProgress :serversData="serversData" :jsonData="jsonData" :name="queryS.name" />
      </div>
      <!-- 组件传参到Table组件中 -->
      <Tables :tableData="tableData" />
    </div>
    <div class="bottomTitle" v-if="tableData.length ? true : false">没有更多啦</div>
  </div>
</template>

<script>
import { getTables, getMapInfo, getMapJson, getAdcode } from '../../api/api';
import { ProjectProgress, Tables } from '../../utils/routers';
import { projectData, colorData } from '../../utils/mapConfig';

export default {
  components: {
    ProjectProgress,
    Tables,
  },
  data() {
    return {
      areaList: false,
      queryS: {},
      projectData: projectData,
      colorData: colorData,
      projectDataNum: [],
      serversData: null,
      tableData: [],
      jsonData: null,
      areaList2: {
        province_list: {
          110000: '北京',
          120000: '天津',
        },
        city_list: {
          110100: '北京',
          120100: '天津',
        },
        county_list: {
          120103: '河西',
          120104: '南开',
          120105: '河北',
          110101: '东城',
          110102: '西城',
          110105: '朝阳',
          110106: '丰台',
          120101: '和平',
          120102: '河东',
        },
      },
    };
  },
  async created() {
    this.queryS = this.$route.query;
    getAdcode({ adcode: this.queryS.id }).then((r) => {
      this.projectData.forEach((i, n) => {
        r.data.data.forEach((item, index) => {
          if (i.name === item.progress) {
            this.projectDataNum.push(item.num);
          }
        });
      });
    });
    await getMapJson(this.queryS.id).then((res) => {
      this.jsonData = res.data;
    });
    getMapInfo({
      parent: this.queryS.id,
      type: 0,
    }).then((res) => {
      this.serversData = res.data.data;
    });
    getTables({
      parent: this.queryS.id,
    }).then((res) => {
      // this.tableData = res.data.data.list;
      // res.data.data.sort((a, b) => {
      //   return b.detail[0].num - a.detail[0].num;
      // });
      // res.data.data.forEach((item, index) => {
      //   if (item.name === '省厅' || item.name === '市局') {
      //     const city = res.data.data.splice(index, 1);
      //     res.data.data.unshift(city[0]);
      //   }
      // });
      this.tableData = res.data.data;
    });

    // 数据分类
  },
  methods: {
    getContainer() {
      return this.$parent.$refs.mainScrool;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
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
