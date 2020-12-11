<!--
 * @Author: 王佳宾
 * @Date: 2020-12-10 15:44:58
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-10 15:56:37
 * @Description: 常用弹出层选择
 * @FilePath: \src\components\utilsPopup\utilsPopup.vue
-->
<template>
  <van-popup
    @close="closed"
    style="overflow: hidden"
    v-model="isShow"
    position="bottom"
    :style="{ height: '35%' }"
  >
    <van-picker
      :title="title"
      show-toolbar
      :columns="columns"
      @confirm="confirm"
      @cancel="cancel"
    />
  </van-popup>
</template>

<script>
export default {
  props: {
    confirm: Function,
    columns: Array,
    title: String,
    isShowUP: Boolean,
    closed: Function,
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      isShow: false,
    };
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
  },
  watch: {
    isShowUP(value) {
      this.isShow = value;
    },
  },
};
</script>

<style></style>
