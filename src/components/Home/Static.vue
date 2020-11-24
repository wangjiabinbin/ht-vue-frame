<!--
 * @Author: 陈娟
 * @Date: 2020-11-24 14:08:21
 * @LastEditTime: 2020-11-24 15:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ht-vue-frame\src\components\Home\Static.vue
-->
<template>
  <div class="static">
    <span class="static-title">数据资源</span>
    <div class='static-container'>
      <div :key='staticData.title' v-for='staticData in staticDatas'>
        <div class="static-subContainer"
        :style="{ 'background-image': 'url(' + staticData.bgImg + ')'}">
          <div class="static-subTitle">{{ staticData.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Static',
  components: {
  },
  data() {
    return {
      staticDatas: [
        {
          title: '全分辨率遥感影像',
          bgImg: require('../../static/images/product1.png'),
        },
        {
          title: '气象观测服务资料',
          bgImg: require('../../static/images/product2.png'),
        },
        {
          title: '气象业务服务产品',
          bgImg: require('../../static/images/product3.png'),
        },
        {
          title: '地理社会基础数据',
          bgImg: require('../../static/images/product4.png'),
        },
        {
          title: '算法模型专家知识',
          bgImg: require('../../static/images/product5.png'),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.static {
  margin: 0.6rem 0;
  .static-title {
    font-size: 20px;
    display: block;
    margin-bottom: 0.2rem;
    font-weight: bold;
  }

  .static-container {
    display: flex;
    justify-content: center;

    .static-subContainer {
      display: inline-block;
      height: 2.6rem;
      width: 2rem;
      position: relative;
      background-repeat: no-repeat;
      background-size: cover;

      .static-subTitle {
        font-size: 16px;
        color: white;
        font-weight: 900;
        margin-top: 1rem;
      }
    }
  }
}
</style>
