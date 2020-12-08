<!--
 * @Author: 王佳宾
 * @Date: 2020-12-07 15:24:23
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-07 21:46:46
 * @Description: Please set Description
 * @FilePath: \src\components\Popup.vue
-->
<template>
  <van-popup
    @close="closed"
    style="overflow: hidden"
    v-model="isShow"
    position="bottom"
    :style="{ height: '35%' }"
  >
    <van-datetime-picker
      ref="getDateVlue"
      :formatter="formatter"
      v-model="currentDate"
      type="date"
      @confirm="SelectTime"
      @cancel="cancel"
    />
  </van-popup>
</template>

<script>
export default {
  props: {
    isShowDate: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    SelectTime: Function,
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
    formatter(type, val) {
      if (type === 'year') {
        return `${val}`;
      } else if (type === 'month') {
        return `${val}`;
      }
      return val;
    },
    cancel() {
      this.isShow = false;
    },
  },
  watch: {
    isShowDate(value) {
      this.isShow = value;
    },
  },
};
</script>

<style></style>
