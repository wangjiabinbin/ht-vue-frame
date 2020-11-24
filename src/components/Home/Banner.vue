<!--
 * @Author: 陈娟
 * @Date: 2020-11-23 10:22:44
 * @LastEditTime: 2020-11-24 15:26:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ht-vue-frame\src\components\Home\banner.vue
-->
<template>
  <div class="banner">
    <img :src='banner1' alt="轮播图" style="width: 80%">
  </div>
</template>

<script>

export default {
  name: 'Banner',
  data() {
    return {
      banner1: require('../../../public/images/banner1.jpg'),
    };
  },
};
</script>
