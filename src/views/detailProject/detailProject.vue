<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="detailTitle">{{ title }}</div>
    <!-- 项目分类 -->
    <div class="projectClassify">
      <div v-for="(item, index) in projectData" :key="index" class="projectClassifyData">
        <span>{{ item.num }}</span>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <!-- 项目分类 -->
    <div><DetailMap :serversData="serversData" /></div>
    <Tables :tableData="tableData" />
  </div>
</template>

<script>
import { randomData, jiangsuData } from '../../utils/mapConfig';
import { getTables } from '../../api/api';
import DetailMap from './detailMap.vue';
import Tables from '../home/tables.vue';

export default {
  data() {
    return {
      title: '',
      projectData: [
        {
          name: '售前支持',
          num: randomData(),
          newNum: randomData(),
        },
        {
          name: '售前实施',
          num: randomData(),
          newNum: randomData(),
        },
        {
          name: '招标中',
          num: randomData(),
          newNum: randomData(),
        },
        {
          name: '中标',
          num: randomData(),
          newNum: randomData(),
        },
        {
          name: '正式实施',
          num: randomData(),
          newNum: randomData(),
        },
        {
          name: '验收',
          num: randomData(),
          newNum: randomData(),
        },
      ],
      serversData: jiangsuData,
      tableData: [],
    };
  },
  components: {
    DetailMap,
    Tables,
  },
  async created() {
    this.title = this.$route.query.name + '项目';
    const res = await getTables({
      parent: 100000,
      pageNum: 1,
      pageSize: 10,
    });
    this.tableData = res.data.data.list;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
.projectClassify {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 0.1rem;
  .projectClassifyData {
    width: 30%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0.1rem 0;
    > div {
      width: 100%;
      height: 0.3rem;
      border: 1px solid #232323;
      text-align: center;
      line-height: 0.3rem;
    }
  }
}
</style>
