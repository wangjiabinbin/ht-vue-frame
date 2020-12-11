<!--
 * @Author: 王佳宾
 * @Date: 2020-12-07 17:15:10
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-10 22:39:17
 * @Description: 三级联动菜单 省市县
 * @FilePath: \src\components\levelmenu\levelMenu.vue
-->
<template>
  <van-popup
    @close="closed"
    style="overflow: hidden"
    v-model="isShow"
    position="bottom"
    :style="{ height: '35%' }"
  >
    <van-area
      v-model="cityId"
      @confirm="confirm"
      @cancel="cancel"
      :area-list="areaList"
      :columns-num="columns"
    >
      <template #title>
        <span></span>
      </template>
    </van-area>
  </van-popup>
</template>

<script>
/* eslint-disable */
import { getPermission } from 'api/api';

export default {
  props: {
    isShowLevel: {
      type: Boolean,
    },
    closed: Function,
    confirm: Function,
    cityId: String,
    columns: String,
    isAdd: Boolean,
  },
  data() {
    return {
      areaList: {},
      isShow: false,
    };
  },
  created() {
    getPermission().then((res) => {
      // const bbb = JSON.parse(
      //   JSON.stringify(res.data.province_list).replace(/110000/g, 110100)
      // );
      for (const prop in res.data.city_list) {
        for (const key in res.data.province_list) {
          if (prop === key) {
            res.data.city_list[Number(prop) + 100] = res.data.city_list[prop];
            delete res.data.city_list[prop];
          }
        }
      }
      if (this.isAdd) {
        res.data.province_list[100000] = '全国';
      }
      // res.data.province_list = bbb;
      this.areaList = res.data;
    });
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
  },
  watch: {
    isShowLevel(value) {
      this.isShow = value;
    },
  },
};
</script>

<style></style>
