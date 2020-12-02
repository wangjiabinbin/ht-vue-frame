<template>
  <div class="loginD">
    <div class="logo">
      <img :src="Logo" alt="" />
      <div>
        <span>航天宏图</span>
        <span>风险普查</span>
      </div>
    </div>
    <div class="main">
      <div class="loginPhone afterBottom">
        <span>+86</span>
        <van-field v-model="phone" clearable placeholder="输入手机号" />
      </div>
      <div class="authCode afterBottom">
        <van-field @ v-model="code" @keyup="submitLogin" placeholder="输入验证码" />
        <div class="sendCode">
          <button @click="sendPhoneCode" :disabled="isClick">{{ text }}</button>
        </div>
      </div>
      <div class="submit" @click="submitHandle"><span>登录</span></div>
    </div>
    <!-- 版本 -->
    <div class="copy">
      <span
        >若手机号未注册，请返回<span @click="$router.push({ name: 'wxAccredit' })"
          >&nbsp;微信登录</span
        ></span
      >
      <span>版本信息1.0.0</span>
    </div>
  </div>
</template>

<script>
import { loginByPhone, getPhoneCode } from '../../api/api';
import { setStorage } from '../../utils/localstorageS';
import testPhone from '../../utils/verify';
import { Logo } from '../../utils/headerline';

export default {
  data() {
    return {
      code: '',
      phone: '',
      isClick: false,
      text: '发送验证码',
      Logo: Logo,
    };
  },
  methods: {
    submitHandle() {
      // testPhone(this.phone)
      if (this.phone || this.code) {
        loginByPhone({
          phone: this.phone,
          code: this.code,
        }).then((res) => {
          if (res.data.code === 200) {
            setStorage(JSON.stringify(res.data.data));
            this.code = '';
            this.phone = '';
            this.$router.push({
              name: 'home',
            });
          } else {
            this.$toast.fail('请输入正确验证码或手机');
          }
        });
      } else {
        this.$toast.fail('请输入手机号');
      }
    },
    sendPhoneCode(e) {
      if (testPhone(this.phone)) {
        getPhoneCode({
          phone: this.phone,
        }).then((res) => {
          if (res.code === 502) {
            this.$toast.fail('没有权限登录');
          } else if (res.code === 200) {
            this.$toast.success('已发送验证码');
          }
        });
        let timeo = 60;
        const timeStop = setInterval(() => {
          timeo--;
          if (timeo > 0) {
            this.text = '重新发送' + timeo + 's';
            this.isClick = true;
            e.target.style.color = '#A4A4A4';
          } else {
            timeo = 60; //当减到0时赋值为60
            this.text = '发送验证码';
            clearInterval(timeStop); //清除定时器
            this.isClick = false;
            e.target.style.color = '#4063E7';
          }
        }, 1000);
      } else {
        this.$toast.fail('请输入正确的手机号');
      }
    },
    submitLogin(e) {
      if (e.which === 13) {
        this.submitHandle();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.loginD {
  width: 100%;
  height: 100%;
  background: #f8f8fa;
  overflow: hidden;
  .logo {
    display: flex;
    margin: 0.6rem 0 0 0.28rem;
    img {
      width: 0.49rem;
      height: 0.49rem;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: left;
      margin-left: 0.1rem;
      > span:nth-child(1) {
        // width: 0.78rem;
        height: 0.19rem;
        font-size: 0.2rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #010713;
        line-height: 0.2rem;
      }
      > span:nth-child(2) {
        height: 0.14rem;
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #a4a4a4;
        line-height: 0.2rem;
      }
    }
  }
  .main {
    width: 2.8rem;
    margin: 0.6rem 0 0 0.28rem;

    /deep/.van-cell {
      background: none !important;
    }
    /deep/.van-field__body {
      width: 100%;
    }
    .sendCode {
      width: 1.5rem;
      font-size: 0.15rem;
      font-weight: 400;
      color: #4063e7;
      button {
        min-width: 0.9rem;
        box-sizing: border-box;
        background: none;
        border: none;
      }
    }
    div {
      display: flex;
      text-align: center;
      align-items: center;
      position: relative;
      img {
        width: 0.13rem;
        height: 0.13rem;
      }
    }
    .loginPhone {
      span {
        color: #a4a4a4;
      }
    }
    .loginPhone,
    .authCode {
      padding: 0 0.24rem;
    }
    .afterBottom::after {
      content: '';
      width: 2.8rem;
      height: 0.01rem;
      background: #e5e5e5;
      box-shadow: 0px 0.02rem 0.02rem 0px rgba(0, 0, 0, 0.05);
      position: absolute;
      bottom: 0;
    }
    .submit {
      width: 100%;
      height: 40px;
      background: #4063e7;
      border-radius: 20px;
      color: #ffffff;
      font-size: 0.18rem;
      line-height: 0.4rem;
      margin-top: 0.4rem;
      span {
        margin: auto;
      }
    }
  }
  .copy {
    height: 0.33rem;
    margin-left: -0.97rem;
    position: absolute;
    bottom: 0.3rem;
    left: 50%;
    width: 1.94rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > span:nth-child(1) {
      height: 0.12rem;
      font-size: 0.12rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #a4a4a4;
      line-height: 0;
      > span {
        color: #4063e7;
      }
    }
    > span:nth-child(2) {
      height: 0.12rem;
      font-size: 0.12rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #a4a4a4;
      line-height: 0;
    }
  }
}
</style>
