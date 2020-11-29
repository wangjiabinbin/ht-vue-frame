<template>
  <div class="footer">
    <div
      class="footerNav"
      v-for="(item, index) in tabbar"
      :key="index"
      @click="tabbarCut(index, item)"
    >
      <img :src="activeTap === index ? item.icons : item.iconsGrey" alt="" />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbar: [
        {
          name: '首页',
          path: 'home',
          icons: require('../../assets/icon_shouye_blue.png'),
          iconsGrey: require('../../assets/icon_shouye_grey.png'),
        },
        {
          name: '项目',
          path: 'projects',
          icons: require('../../assets/icon_xiangmu_blue.png'),
          iconsGrey: require('../../assets/icon_xiangmu_grey.png'),
        },
        {
          name: '新建',
          path: 'newCon',
          icons: require('../../assets/icon_xinjian_blue.png'),
          iconsGrey: require('../../assets/icon_xinjian_grey.png'),
        },
        {
          name: '我的',
          path: 'person',
          icons: require('../../assets/icon_wo_blue.png'),
          iconsGrey: require('../../assets/icon_wo_grey.png'),
        },
      ],
      activeTap: 0,
    };
  },
  methods: {
    tabbarCut(index, item) {
      this.activeTap = index;
      this.$router.push({
        name: item.path,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 0.49rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .footerNav {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.08rem;
    color: #a4a4a4;
    img {
      width: 0.21rem;
      height: 0.21rem;
    }
  }
}
.router-link-exact-active {
  color: #4063e7;
}
</style>
