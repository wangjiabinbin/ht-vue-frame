<!--
 * @Author: 陈娟
 * @Date: 2020-11-23 15:39:48
 * @LastEditTime: 2020-11-24 14:13:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ht-vue-frame\src\components\Home\ProdFeature.vue
-->
<template>
  <div class="product">
    <span class="product-title">产品特性</span>
    <div class='product-container'>
      <div :key='product.title' v-for='product in productList'>
        <div class="product-subContainer">
          <img :src="product.image" alt="" class="product-img">
          <div class="product-subTitle">{{ product.title }}</div>
          <div>{{ product.content }}</div>
          <a-button type="primary" class="button-blue">了解详情</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { Button } from 'ant-design-vue';

export default {
  name: 'Product',
  components: {
    AButton: Button,
  },
  data() {
    return {
      productList: [],
    };
  },
  mounted() {
    axios.get('/data/home.json').then((res) => {
      this.productList = res.data;
    });
  },
};
</script>

<style lang="scss">
.product {
  margin: 0.2rem 0;
  .product-title {
    font-size: 20px;
    display: block;
    margin-bottom: 0.2rem;
    font-weight: bold;
  }
  .product-container {
    display: flex;
    justify-content: center;

    .product-subContainer {
      display: inline-block;
      margin-right: 0.3rem;
      height: 2.6rem;
      margin-bottom: 0.08rem;
      border: solid 1px #98968f;
      padding: 0.06rem;
      width: 2.5rem;
      position: relative;

      .product-img {
        margin-top: 0.1rem;
      }

      .product-subTitle {
        margin-top: 0.3rem;
        margin-bottom: 0.2rem;
        font-size: 16px;
        font-weight: bold;
      }

      .button-blue {
        position: absolute;
        bottom: 0.1rem;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
  }
}
</style>
