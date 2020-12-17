<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-16 17:57:49
 * @Description: Please set Description
 * @FilePath: \src\views\projects\projects.vue
-->
<template>
  <!-- <div class="projectS">
    <div class="yetCityS">
      <div class="yetCityBJ"></div>
      <div class="YetTitle">页面建设中，敬请期待~~</div>
    </div>
  </div> -->
  <div class="projectB">
    <div class="dataList" v-for="(item, index) in project" :key="index">
      <span>{{ item.name }}</span>
      <section>
        <div v-for="(i, n) in item.children" :key="n">
          <div :style="{ width: i.num - (n + 1) * 100 + '%' }"></div>
        </div>
      </section>
    </div>
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
      project: [
        {
          name: '梁子湖',
          children: [
            {
              num: 500,
            },
            {
              num: 500,
            },
            {
              num: 500,
            },
            {
              num: 500,
            },
          ],
        },
      ],
      activtiy: 0,
    };
  },
  created() {},
  methods: {
    // clickHandle(value) {
    //   this.activtiy = value;
    // },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import '../../style/yetCity/yetCity.scss';
.projectB {
  width: 100%;
  height: 100%;
  .dataList {
    display: flex;
    > section {
      display: flex;
      > div {
        height: 0.3rem;
        width: 0.6rem;
        background: rgb(199, 195, 195);
        margin-left: 0.1rem;
        > div {
          height: 0.3rem;
          background: red;
        }
      }
    }
  }
}
</style>
