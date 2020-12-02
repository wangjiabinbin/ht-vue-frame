<template>
  <div class="loginD">
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
  </div>
</template>

<script>
import { loginByPhone, getPhoneCode } from '../../api/api';
import { setStorage } from '../../utils/localstorageS';
import testPhone from '../../utils/verify';

export default {
  data() {
    return {
      code: '',
      phone: '',
      isClick: false,
      text: '发送验证码',
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
  .main {
    width: 2.8rem;
    margin: 0.6rem auto;
    /deep/.van-cell {
      background: none !important;
    }
    /deep/.van-field__body {
      width: 100%;
    }
    .sendCode {
      width: 1.8rem;
      font-size: 0.15rem;
      font-weight: 400;
      color: #4063e7;
      button {
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
}
</style>
