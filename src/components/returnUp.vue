<!--
 * @Author: 王佳宾
 * @Date: 2020-12-08 14:20:58
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-09 11:12:03
 * @Description: 导航栏返回-1
 * @FilePath: \src\components\returnUp.vue
-->
<template>
  <van-nav-bar
    style="height: 0.46rem; box-shadow: 0px 4px 5px 0px rgba(64, 99, 231, 0.08); z-index: 999"
    left-text="返回"
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.van-nav-bar {
  height: 0.49rem;
}
/deep/.van-nav-bar__content {
  position: fixed;
  width: 100%;
  background: rgba(255, 255, 255, 1.2);
  z-index: 999;
}
</style>
