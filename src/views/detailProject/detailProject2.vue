<template>
  <div>
    <van-nav-bar
      :title="queryS.name + '项目'"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="projectTop">
      <div class="detailTitle">{{ queryS.name }}项目</div>
      <!-- 项目分类 -->
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
            {{ projectDataNum.length ? projectDataNum[index].num : '' }}
          </span>
          <span class="projectName"> {{ item.name }} </span>
        </div>
      </div>
      <!-- 项目分类 -->
      <div>
        <DetailMap :serversData="serversData" :jsonData="jsonData" :name="queryS.name" />
      </div>
      <Tables :tableData="tableData" />
    </div>
  </div>
</template>

<script>
import { getTables, getMapInfo, getMapJson, getAdcode } from '../../api/api';
import DetailMap from './detailMap.vue';
import Tables from '../home/tables.vue';

export default {
  data() {
    return {
      queryS: {},
      projectData: [
        {
          name: '售前支持',
        },
        {
          name: '售前实施',
        },
        {
          name: '已中标',
        },
        {
          name: '正式实施',
        },
        {
          name: '验收结项',
        },
      ],
      serversData: null,
      tableData: [],
      jsonData: null,
      colorData: [
        {
          color: '#6cbd78',
          bjColor: '#6CBD78',
        },
        {
          color: '#f09329',
          bjColor: '#EF9228',
        },
        {
          color: '#5f6f93',
          bjColor: '#5E7093',
        },
        {
          color: '#79CBEA',
          bjColor: 'e4f6fa',
        },
        {
          color: '#719bd5',
          bjColor: '#709BD2',
        },
        {
          color: '#8970b2',
          bjColor: '#8970B0',
        },
      ],
      projectDataNum: null,
    };
  },
  components: {
    DetailMap,
    Tables,
  },
  async created() {
    this.queryS = this.$route.query;
    await getAdcode({ adcode: this.queryS.id }).then((r) => {
      this.projectDataNum = r.data.data;
    });
    await getMapInfo({
      parent: this.queryS.id,
      type: 0,
    }).then((res) => {
      this.serversData = res.data.data;
    });
    await getMapJson(this.queryS.id).then((res) => {
      this.jsonData = res.data;
    });
    const res = await getTables({
      parent: this.queryS.id,
      pageNum: 1,
      pageSize: 10,
    });
    this.tableData = res.data.data.list;
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'home',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.projectTop {
  padding: 0 0.2rem;
}
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
.projectDetail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .afterRight::after {
    content: '';
    width: 0.01rem;
    height: 0.28rem;
    background: #d0d0d0;
    position: absolute;
    right: 0;
  }
  .projectData {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1.06rem;
    height: 0.68rem;
    background-color: #fff;
    margin-bottom: 0.22rem;
    .projectHead {
      min-width: 0.55rem;
      display: flex;
      justify-content: center;
      padding: 0.02rem 0.08rem;
      > span:nth-child(1) {
        margin-right: 0.05rem;
        font-size: 0.1rem;
        color: #848484;
      }
      > span:nth-child(2) {
        font-size: 0.1rem;
      }
    }
    .projectNum {
      display: inline-block;
      margin: 0.08rem 0;
      line-height: 0.24rem;
      font-size: 0.24rem;
      font-weight: bold;
    }

    .projectName {
      font-size: 0.12rem;
    }
  }
}
</style>
