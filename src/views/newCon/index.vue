<!--
 * @Author: 王佳宾
 * @Date: 2020-12-09 16:11:46
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-09 18:35:21
 * @Description: Please set Description
 * @FilePath: \src\views\newCon\index.vue
-->
<template>
  <div class="newConIndex">
    <div @click="$router.push({ name: 'issueCon' })">项目新建</div>
    <div @click="$router.push({ name: 'invitationAdd' })">招标新建</div>
    <button @click="visible = true">点击</button>
    <p></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style scoped lang="scss">
.newConIndex {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 100px;
    height: 100px;
    border: 1px solid #3c3c3c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:first-child {
    margin-bottom: 0.5rem;
  }
}
</style>
