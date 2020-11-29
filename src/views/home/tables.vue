<template>
  <div>
    <div class="projectCont">
      <div class="tableCont">
        <span> 地区</span>
        <span>售前支持</span>
        <span>售前实施</span>
        <span>已中标</span>
        <span>正式实施</span>
        <span>验收结项</span>
        <span> 详情</span>
      </div>
      <div class="tableBodyCont" v-for="(i, n) in tableData" :key="n + 'b'">
        <div class="tableTrCont" @click="clickHandle" :data-index="n">
          <span><img :src="cutDetail" alt="" />{{ i.name }}</span>
          <span>{{ i.detail[0].num }}</span>
          <span>{{ i.detail[1].num }}</span>
          <span>{{ i.detail[2].num }}</span>
          <span>{{ i.detail[3].num }}</span>
          <span>{{ i.detail[4].num }}</span>
          <router-link tag="div" :to="{ name: 'detailProject' }" class="iconDetail"
            >详情<img :src="iconDetail" alt=""
          /></router-link>
        </div>
        <div class="isShowTable">
          <div
            v-for="(item, index) in i.children"
            :key="index + 'a'"
            class="tableCityCont"
            @click="skipRouter(item)"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.detail[0].num }}</span>
            <span>{{ item.detail[1].num }}</span>
            <span>{{ item.detail[2].num }}</span>
            <span>{{ item.detail[3].num }}</span>
            <span>{{ item.detail[4].num }}</span>
            <router-link class="iconDetail" tag="div" :to="{ name: 'detailProject' }"
              >详情<img :src="iconDetail" alt=""
            /></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cityData } from '../../utils/mapConfig';

export default {
  props: {
    tableData: Array,
    isShowMinistries: Boolean,
  },
  data() {
    return {
      iconDetail: require('../../assets/icon_right_blue.png'),
      cutDetail: require('../../assets/icon_down.png'),
      finished: false,
      loading: false,
    };
  },
  components: {},
  created() {},
  methods: {
    skipRouter(e) {
      // const name = e.currentTarget.dataset.name;
    },
    // 点击显示隐藏e.currentTarget
    clickHandle(e) {
      const target = e.currentTarget.nextSibling;
      const imgs = e.currentTarget.children[0].children[0];
      // e.currentTarget.dataset.index 找到自定义data-xxx 标签的属性
      if (target.style.display === 'none' || !target.style.display) {
        target.style.display = 'block';
        imgs.style.transform = 'rotate(0deg)';
      } else {
        target.style.display = 'none';
        imgs.style.transform = 'rotate(-90deg)';
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.projectCont {
  .tableCont {
    display: flex;
    justify-content: space-between;
    // background-color: #808080;
    font-size: 0.12rem;
    height: 0.24rem;
    > span {
      text-align: center;
      line-height: 0.24rem;
      min-width: 0.4rem;
      color: #010713;
      font-weight: 500;
    }
    :first-child {
      width: 0.5rem;
      min-width: 0.4rem;
    }
  }
  .tableTrCont {
    font-size: 0.1rem;
    height: 0.3rem;
    background: #e8ebf6;
    margin-bottom: 0.05rem;
    border-radius: 0.05rem;
    display: flex;
    justify-content: space-between;
    > span,
    div {
      float: left;
      text-align: center;
      line-height: 0.3rem;
      min-width: 0.44rem;
      margin-right: 0.04rem;
    }
    :first-child {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 0.5rem;
      padding: 0 0 0 0.02rem;
      overflow: hidden;
      img {
        width: 0.1rem;
        height: 0.06rem;
        transition: all 0.2s;
        transform: rotate(-90deg);
        margin-right: 0.05rem;
      }
    }
    .iconDetail {
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0.92);
      // font-size: 0.09rem;
      color: #4063e7;
      img {
        width: 0.05rem;
        height: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
  // 二级菜单
  .isShowTable {
    display: none;

    .tableCityCont {
      display: flex;
      justify-content: space-between;
      font-size: 0.1rem;
      height: 0.3rem;
      margin-bottom: 0.05rem;
      border-bottom: 0.01rem solid #d0d0d0;
      &:last-child {
        border-bottom: none;
      }
      > span,
      div {
        // float: left;
        text-align: center;
        line-height: 0.3rem;
        min-width: 0.44rem;
        margin-right: 0.04rem;
      }
      :first-child {
        display: inline-block;
        width: 0.52rem;
        overflow: hidden;
      }
      .iconDetail {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.92);
        // font-size: 0.09rem;
        color: #4063e7;
        img {
          width: 0.05rem;
          height: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
  }
}
</style>
