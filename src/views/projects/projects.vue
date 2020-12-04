<template>
  <div class="projectS">
    <div class="yetCityS">
      <div class="yetCityBJ"></div>
      <div class="YetTitle">页面建设中，敬请期待~~</div>
    </div>
    <!-- 缺省页 -->
    <!-- <div class="main">
      <div class="mainTitle">项目进展</div>
      项目进展
      <div class="projectEvolve">
        <div
          v-for="(item, index) in projectData"
          :key="index"
          class="projectClassifyData"
        >
          <span>{{ item.num }}</span>
          <div>{{ item.name }}</div>
        </div>
      </div>
      项目进展
      <div class="mainTitle">项目进展</div>
      项目类型
      <div class="projectPropress">
        <div
          v-for="(item, index) in projectData2"
          :key="index"
          class="projectClassifyData"
        >
          <div @click="clickHandle(index)" :class="{ actives: activtiy === index }">
            {{ item.name }}
          </div>
        </div>
      </div>
      项目类型
    </div> -->
  </div>
</template>

<script>
import { randomData } from '../../utils/mapConfig';

export default {
  data() {
    return {
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
        {
          name: '全部',
          num: randomData(),
          newNum: randomData(),
        },
      ],
      projectData2: [
        {
          name: '应急管理',
        },
        {
          name: '气象',
        },
        {
          name: '水利',
        },
        {
          name: '林业',
        },
        {
          name: '交通',
        },
        {
          name: '自然资源',
        },
        {
          name: '地震',
        },
        {
          name: '生态环境',
        },
        {
          name: '住房和城乡建设',
        },
        {
          name: '全部',
        },
      ],
      activtiy: 0,
    };
  },
  created() {},
  methods: {
    clickHandle(value) {
      this.activtiy = value;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/yetCity/yetCity.scss';
.projectS {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
// 缺省页
.projectEvolve {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 0 0.1rem;
  .projectClassifyData {
    width: 30%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0.05rem 0.05rem 0.05rem 0;
    > div {
      width: 100%;
      height: 0.3rem;
      border: 1px solid #232323;
      text-align: center;
      line-height: 0.3rem;
    }
  }
}
.projectPropress {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 0 0.1rem;
  .projectClassifyData {
    min-width: 19%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0.05rem 0.05rem 0.05rem 0;
    > div {
      width: 100%;
      height: 0.2rem;
      border: 1px solid #232323;
      text-align: center;
      line-height: 0.2rem;
      border-radius: 0.1rem;
    }
    .actives {
      background: rgb(145, 190, 192);
    }
  }
}
</style>
