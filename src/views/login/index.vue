<template>
  <div class="WxAccredit">
    <div class="WxLogin">
      <div class="logo"></div>
      <div class="title">选择登录方式</div>
      <div class="login">
        <!-- <div class="WxLogind">
          <img src="../../static/loginImages/icon_w.png" alt="" />
          微信登录
        </div> -->
        <div class="phoneLogin" @click="loginPhone">
          <img src="../../static/loginImages/icon_i.png" alt="" />
          手机登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginPhone() {
      this.$router.push({
        name: 'login',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.WxAccredit {
  height: 100%;
  background: rgba(1, 7, 19, 0.08);
  overflow: hidden;
  .WxLogin {
    width: 2.49rem;
    height: 2.95rem;
    background: #ffffff;
    border-radius: 0.02rem;
    margin: 1.25rem auto;
    overflow: hidden;
    .logo {
      width: 0.64rem;
      height: 0.64rem;
      background: #143980;
      border-radius: 0.05rem;
      margin: 0.37rem auto;
      background: url('../../static/loginImages/logo.png') 100% 100%;
      background-size: 100% 100%;
    }
    .title {
      width: 1.33rem;
      height: 0.37rem;
      font-size: 0.12rem;
      font-weight: 400;
      color: #a4a4a4;
      line-height: 0.37rem;
      text-align: center;
      position: relative;
      margin: auto;
    }
    .title::after {
      content: '';
      width: 0.21rem;
      height: 0.01rem;
      background: #a4a4a4;
      position: absolute;
      right: 0;
      top: 50%;
    }
    .title::before {
      content: '';
      width: 0.21rem;
      height: 0.01rem;
      background: #a4a4a4;
      position: absolute;
      left: 0;
      top: 50%;
    }
    .login {
      width: 1.79rem;
      font-size: 0.12rem;
      font-weight: 400;
      color: #000000;
      line-height: 0;
      margin: auto;
      display: flex;
      // justify-content: space-between;//微信
      justify-content: center;
      img {
        width: 0.42rem;
        height: 0.42rem;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 0.73rem;
      }
    }
  }
}
</style>
