<!--
 * @Author: 王佳宾
 * @Date: 2020-12-07 18:21:47
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-07 18:37:52
 * @Description: 表单组件
 * @FilePath: \src\components\formItem.vue
-->
<template>
  <van-popup @close="closed" v-model="isShow" position="bottom" :style="{ height: '100%' }">
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
  </van-popup>
</template>

<script>
export default {
  props: {
    modelText: String,
  },
};
</script>

<style></style>
