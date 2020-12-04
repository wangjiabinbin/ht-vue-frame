<!--
 * @Author: your name
 * @Date: 2020-11-29 11:47:25
 * @LastEditTime: 2020-11-29 13:23:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \survey_app_web\src\App.vue
-->
<template>
  <div id="app" ref="box">
    <div class="header">
      <Header v-if="this.$route.meta.isShow" />
    </div>
    <div class="main" ref="mainScrool">
      <van-loading v-show="false" size="24px" class="kkkk" vertical>加载中...</van-loading>
      <!-- <keep-alive>
        <router-view
          :key="$route.fullPath"
          v-if="this.$route.meta.isShowCache ? false : true"
          ref="scrollTop"
      /></keep-alive> -->
      <!-- v-if="this.$route.meta.isShowCache ? true : false" -->
      <transition name="slide-fade">
        <router-view :key="$route.fullPath" ref="scrollTop" />
      </transition>
    </div>
    <FooterTab class="footer" v-if="!this.$route.meta.isShowLogin" />
  </div>
</template>
<script>
/* eslint-disable */
import FooterTab from './components/footerTab/index.vue';
import Header from './components/header/index.vue';
import { isShowStorage } from './utils/localstorageS';

export default {
  mounted() {
    // document.addEventListener(
    //   'touchmove',
    //   (event) => {
    //     console.warn(event);
    //     if (event.touches.length > 1) {
    //       event.preventDefault();
    //     }
    //   },
    //   false
    // );
  },
  methods: {},
  components: {
    FooterTab,
    Header,
  },
  created() {},
  watch: {},
};
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    overflow-y: auto;
    position: relative;
    .kkkk {
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999999999;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.37rem;
  }
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
