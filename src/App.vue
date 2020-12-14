<!--
 * @Author: your name
 * @Date: 2020-11-29 11:47:25
 * @LastEditTime: 2020-12-14 17:48:15
 * @LastEditors: 王佳宾
 * @Description: In User Settings Edit
 * @FilePath: \src\App.vue
-->
<template>
  <div id="app" ref="box">
    <div class="header"></div>
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
    <FooterTab class="footer" v-if="isShowLogin" />
  </div>
</template>
<script>
/* eslint-disable */
import FooterTab from './components/footerTab/index.vue';
import Header from './components/header/index.vue';
import { isShowStorage } from './utils/localstorageS';

export default {
  data() {
    return {
      // isShowLogin: false,
      // docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      // showHeight: document.documentElement.clientHeight, //实时屏幕高度
      // isResize: false, //默认屏幕高度是否已获取
    };
  },
  mounted() {
    // window.onresize = () => {
    //   return (() => {
    //     if (!this.isResize) {
    //       //默认屏幕高度
    //       this.docmHeight = document.documentElement.clientHeight;
    //       this.isResize = true;
    //     }
    //     //实时屏幕高度
    //     this.showHeight = document.body.clientHeight;
    //   })();
    // };
  },
  created() {},
  methods: {},
  components: {
    FooterTab,
  },

  watch: {
    $route(to, from) {
      this.isShowLogin = !to.meta.isShowLogin;
    },
    // showHeight() {
    //   if (this.docmHeight >= this.showHeight) {
    //     this.isShowLogin = false;
    //   } else {
    //     this.isShowLogin = true;
    //   }
    // },
  },
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
    overflow-x: hidden;
    position: relative;
    background: #f8f9fb;
    .kkkk {
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999999999;
    }
  }
}
</style>
