<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 20:46:08
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 11:45:41
 * @Description: 登录
 * @FilePath: \src\views\login\login.vue
-->
<template>
  <div class="loginD">
    <div>
      <div class="logo">
        <img :src="Logo" alt="" />
        <div>
          <span>航天宏图</span>
          <span>风险普查</span>
        </div>
      </div>
      <div class="loginMain">
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
        <button
          class="submit"
          :disabled="phone.length && code.length ? false : true"
          @click="submitHandle"
          :style="{ background: phone.length && code.length === 6 ? '#4063E7' : '#E5E5E5' }"
        >
          <span>登录</span>
        </button>
      </div>
    </div>
    <!-- 版本 -->
    <div class="copy">
      <!-- <span>若手机号未注册，请返回&nbsp;微信登录</span> -->
      <span>若手机号未注册，请联系各省负责人。</span>
      <span>版本信息V0.2.0</span>
    </div>
  </div>
</template>

<script>
import { loginByPhone, getPhoneCode } from '../../api/api';
import { Logo, testPhone } from '../../utils/utils';

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
      if (testPhone(this.phone) && this.code.length === 6) {
        loginByPhone({
          phone: this.phone,
          code: this.code,
        }).then((res) => {
          if (res.code === 200) {
            sessionStorage.setItem('name', res.data.userName);
            this.$cookies.setCookie('token', JSON.stringify(res.data), 30);
            this.code = '';
            this.phone = '';
            this.$router.push({
              name: 'home',
              replace: true,
            });
          } else {
            this.$toast.fail('请输入正确验证码或手机');
          }
        });
      } else {
        this.$toast.fail('请输入正确验证码或手机');
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
          } else if (res.code === 501) {
            this.$toast.fail('没有权限登录');
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .logo {
    display: flex;
    margin: 0.6rem auto;
    width: 3.21rem;
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
  .loginMain {
    width: 3.21rem;
    margin: 0.6rem auto;

    /deep/.van-cell {
      background: none !important;
    }
    /deep/.van-field__body {
      width: 100%;
    }
    .sendCode {
      font-size: 0.15rem;
      font-weight: 400;
      color: #4063e7;
      button {
        min-width: 1rem;
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
      border: none;
      span {
        margin: auto;
      }
    }
  }
  .copy {
    height: 0.33rem;
    margin-bottom: 0.3rem;
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
