<!--
 * @Author: 王佳宾
 * @Date: 2020-12-07 15:24:23
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 11:32:03
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
      :min-date="minDate"
      :max-date="maxDate"
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
    minDate: {
      type: Date,
      default() {
        return new Date(1999, 0, 1);
      },
    },
    maxDate: {
      type: Date,
    },
  },
  data() {
    return {
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
