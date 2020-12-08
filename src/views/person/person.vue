<template>
  <div class="person">
    <div class="myDetali">
      <img
        :src="
          userMessge.roleName === '高管'
            ? GGimg
            : userMessge.roleName === '管理人员'
            ? GLRYimg
            : XSimg
        "
        alt=""
      />
      <div class="phoneTitle">
        <span>{{ userMessge.userName }}</span>
        <p>
          手机号码：<span>{{ userMessge.phone }}</span>
        </p>
      </div>
    </div>
    <div class="myMain">
      <div>
        <div>地区</div>
        <div>{{ userMessge.provinceName }}</div>
      </div>
      <div>
        <div>职务</div>
        <div>{{ userMessge.roleName }}</div>
      </div>
    </div>
    <section class="logout" @click="logout">退出登录</section>
  </div>
</template>

<script>
import { getTables } from '../../api/api';
import { getStorage } from '../../utils/localstorageS';

export default {
  data() {
    return {
      userMessge: {},
      GGimg: require('../../static/person/GGimg.png'),
      GLRYimg: require('../../static/person/GLRYimg.png'),
      XSimg: require('../../static/person/XSimg.png'),
    };
  },
  async created() {
    this.userMessge = getStorage();
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({ message: '您确认要退出吗？' })
        .then(() => {
          window.localStorage.removeItem('token');
          this.$router.push({
            name: 'wxAccredit',
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
.person {
  position: relative;
  width: 100%;
  height: 100%;

  .myDetali {
    height: 0.99rem;
    background: url('../../static/loginImages/bj.png') #4063e7;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      margin-left: 0.21rem;
    }
    .phoneTitle {
      margin-left: 0.15rem;
      margin-top: 0.12rem;
      overflow: hidden;
      > span {
        height: 0.17rem;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        line-height: 0.18rem;
      }
      > p {
        height: 0.12rem;
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #f9f9fb;
        // line-height: 0.32rem;
      }
    }
  }
  .myMain {
    > div {
      padding: 0 0.15rem;
      height: 0.5rem;
      display: flex;
      justify-content: space-between;
      margin: 0 0.15rem;
      height: 0.5rem;
      > div:nth-child(1) {
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #010713;
        line-height: 0.5rem;
        letter-spacing: 0.15rem;
      }
      > div:nth-child(2) {
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #a4a4a4;
        line-height: 0.5rem;
      }
    }
    > div:nth-child(1) {
      border-bottom: 1px solid #d0d0d0;
    }
  }

  // 退出登录
  .logout {
    background: #e5e5e5;
    border-radius: 20px;
    position: absolute;
    left: 12%;
    bottom: 0.35rem;
    width: 74%;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.4rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #010713;
  }
}
</style>
