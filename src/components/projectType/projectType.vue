<!--
 * @Author: 王佳宾
 * @Date: 2020-12-09 16:17:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-10 15:10:55
 * @Description: Please set Description
 * @FilePath: \src\components\projectType\projectType.vue
-->
<template>
  <div>
    <div class="Classification">
      <div
        :class="{
          actictyClassi: seachSekectHandle(item),
          actictyClassiAll: item.name === '总包' && checkefAll,
        }"
        v-for="(item, index) in ClassificationData"
        :key="index"
        @click="selectHandle(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ClassificationData } from 'utils/mapConfig';

export default {
  name: 'projectType',
  components: {},
  data() {
    return {
      ClassificationData: ClassificationData,
      industryType: [],
      checkefAll: false,
      formList: {
        industryType: [], // 行业类型
      },
    };
  },
  methods: {
    selectHandle(item, index) {
      const Data = this.industryType;
      const DataType = this.formList.industryType;
      if (item.name === '总包') {
        this.checkefAll = !this.checkefAll;
        if (this.checkefAll) {
          this.formList.industryType = [];
          this.industryType = [];
          ClassificationData.forEach((i) => {
            if (i.name === '总包') return;
            this.industryType.push(i.type);
          });
          this.formList.industryType.push(item.type);
        } else {
          this.formList.industryType = [];
          this.industryType = [];
        }
        this.$emit('sendData', this.formList.industryType);
        return;
      }
      if (Data.indexOf(item.type) !== -1) {
        Data.splice(Data.indexOf(item.type), 1);
        DataType.splice(Data.indexOf(item.type), 1);
        this.iSCheckefAll();
      } else {
        Data.push(item.type);
        DataType.push(item.type);
        this.iSCheckefAll();
      }
    },
    seachSekectHandle(item) {
      if (this.industryType.indexOf(item.type) !== -1) {
        return true;
      }
      return false;
    },
    iSCheckefAll() {
      if (this.industryType.length === ClassificationData.length - 1) {
        this.checkefAll = true;
        this.formList.industryType = ['IA'];
      } else {
        this.formList.industryType = [...this.industryType];
        this.checkefAll = false;
      }
      this.$emit('sendData', this.formList.industryType);
    },
    inputHandle() {
      console.warn(this.formList);
    },
  },
};
</script>

<style scoped lang="scss">
.Classification {
  background: #fff;
  height: 0.92rem;
  flex-direction: row-reverse;
  padding: 0.1rem 0.15rem 0 0.15rem;
  margin-left: -0.18rem;
  width: 102%;
  display: flex;
  flex-wrap: wrap;
  > div {
    float: right;
    width: 17.8%;
    height: 0.24rem;
    font-family: 'CNRegular';
    font-weight: 400;
    color: #010713;
    line-height: 0.24rem;
    text-align: center;
  }
  > div:not(:nth-child(1), :nth-child(6)) {
    margin: 0 1.06%;
  }
  > div:last-child {
    float: right;
  }
  // class 样式
  .actictyClassi {
    background: #4063e7;
    border-radius: 0.02rem;
    color: #fff;
    font-family: Source Han Sans CN;
  }
  .actictyClassiAll {
    background: #4063e7;
    border-radius: 0.02rem;
    color: #fff;
    font-family: Source Han Sans CN;
  }
  .progressIndex {
    width: 83px;
    height: 0.34rem;
    background: #e0e6f4;
    border-radius: 0.02rem;
  }
}
</style>
