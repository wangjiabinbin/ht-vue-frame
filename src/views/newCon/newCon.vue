<template>
  <div class="newCon">
    <div class="yetCityS">
      <div class="yetCityBJ"></div>
      <div class="YetTitle">页面建设中，敬请期待~~</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // this.$dialog
    //   .confirm({ message: '页面建设中，敬请期待。' })
    //   .then(() => {
    //     this.$router.push({
    //       name: 'home',
    //     });
    //   })
    //   .catch(() => {
    //     this.$router.push({
    //       name: 'home',
    //     });
    //   });
  },
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
@import '../../style/yetCity/yetCity.scss'; // 却省
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
