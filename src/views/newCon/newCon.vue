<template>
  <div class="newCon">
    <router-link :to="{ name: 'login' }">登录</router-link>
    <div class="issueCon" @click="issueHandle">发布</div>
  </div>
</template>

<script>
export default {
  methods: {
    issueHandle() {
      this.$router.push({
        name: 'issue',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.newCon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .issueCon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.16rem;
    width: 1rem;
    height: 1rem;
    border: 0.01rem solid black;
    border-radius: 50%;
  }
}
</style>
