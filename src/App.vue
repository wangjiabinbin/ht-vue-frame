<template>
  <div id="app" ref="box">
    <div class="header">
      <Header v-if="this.$route.meta.isShow" />
    </div>
    <div class="main" ref="mainScrool">
      <router-view ref="scrollTop" />
    </div>
    <FooterTab class="footer" v-if="!this.$route.meta.isShowLogin" />
  </div>
</template>
<script>
import FooterTab from './components/footerTab/index.vue';
import Header from './components/header/index.vue';

export default {
  mounted() {},
  methods: {},
  components: {
    FooterTab,
    Header,
  },
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
    overflow: auto;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
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
