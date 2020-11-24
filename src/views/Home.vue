<!--
 * @Author: 陈娟
 * @Date: 2020-11-23 10:25:32
 * @LastEditTime: 2020-11-24 14:10:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ht-vue-frame\src\components\Home\index.vue
-->
<template>
  <div class="home">
    <Banner />
    <Product />
    <Static />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Home/Banner.vue';
import Product from '@/components/Home/Product.vue';
import Static from '@/components/Home/Static.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    Product,
    Static,
  },
};
</script>
