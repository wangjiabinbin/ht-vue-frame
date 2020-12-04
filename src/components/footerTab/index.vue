<template>
  <div class="footer">
    <div
      class="footerNav"
      v-for="(item, index) in tabbar"
      :key="index"
      @click="tabbarCut(index, item)"
    >
      <img :src="$route.meta.index === index ? item.icons : item.iconsGrey" alt="" />
      <div class="footer-nav-name" :class="{ active: $route.meta.index === index }">
        {{ item.name }}
      </div>
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
          icons: require('../../static/icon_shouye_blue.png'),
          iconsGrey: require('../../static/icon_shouye_grey.png'),
        },
        {
          name: '项目',
          path: 'projects',
          icons: require('../../static/icon_xiangmu_blue.png'),
          iconsGrey: require('../../static/icon_xiangmu_grey.png'),
        },
        {
          name: '新建',
          path: 'newCon',
          icons: require('../../static/icon_xinjian_blue.png'),
          iconsGrey: require('../../static/icon_xinjian_grey.png'),
        },
        {
          name: '我的',
          path: 'person',
          icons: require('../../static/icon_wo_blue.png'),
          iconsGrey: require('../../static/icon_wo_grey.png'),
        },
      ],
      activeTap: sessionStorage.getItem('activeTap') ? sessionStorage.getItem('activeTap') : 0,
    };
  },
  methods: {
    tabbarCut(index, item) {
      this.activeTap = index;
      sessionStorage.setItem('activeTap', index);
      this.$router.push({
        name: item.path,
      });
    },
  },
  created() {},
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
      display: block;
    }

    .footer-nav-name {
      margin-top: 0.04rem;

      &.active {
        color: #4063e7;
      }
    }
  }
}
.router-link-exact-active {
  color: #4063e7;
}
</style>
