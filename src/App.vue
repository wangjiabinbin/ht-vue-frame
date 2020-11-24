<!--
 * @Author: 陈娟
 * @Date: 2020-11-23 09:57:05
 * @LastEditTime: 2020-11-24 15:30:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ht-vue-frame\src\App.vue
-->
<template>
  <div id="app">
    <div id="nav">
      <span class='title'>业务分析子系统</span>
      <div class='sidebar'>
        <ly-tab
          v-model="selectedId"
          :items="items"
          :options="options"
          @change="handleChange"
        />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      selectedId: 0,
      items: [
        { label: '首页' },
        { label: '产品技术' },
        { label: '数据检索' },
        { label: '统计分析' },
        { label: '数据管理' },
        { label: '个人中心' },
        { label: '登录 | 注册' },
        { label: 'ol' },
        { label: 'cesium' },
      ],
      options: {
        activeColor: '#1460ea',
      },
      subRouteUrl: ['/', '/product', '/search', '/statistics', '/management', '/person', '/login', '/ol', '/cesium'],
    };
  },
  methods: {
    handleChange(item, index) {
      this.$router.replace(this.subRouteUrl[index]);
    },
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  line-height: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: calc(0.14 * 0.25rem);
  background-color: #2c3e50;
  width: 80%;
  margin: 0 auto;

  a {
    font-weight: bold;
    color: white;

    // &.router-link-exact-active .title {
    //   color: #1460ea;
    // }
  }
}

.ly-tabbar {
  background-color: #2c3e50;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  box-shadow: none;
  border-bottom: none;
}

.title {
  float: left;
  display: block;
  font-weight: bold;
  color: white;
  text-align:center;
  text-decoration:none;
  text-transform:uppercase;
  margin-right: 3rem;
  font-size: 16px;
}
</style>
