<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 20:46:08
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-16 16:49:39
 * @Description: 个人中心
 * @FilePath: \src\views\person\person.vue
-->
<template>
  <div class="person">
    <div class="myDetail">
      <div class="myDetailTop">
        <div class="myDetailTitle">
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
          <span>{{ userMessge.userName }}</span>
        </div>
        <div class="phoneTitle" @click="logout">退出</div>
      </div>
      <div class="myDetailBottom">
        <div>
          <span><img src="../../static/site.png" alt="" />{{ userMessge.provinceName }}</span>
          <span><img src="../../static/post.png" alt="" />{{ userMessge.roleName }}</span>
        </div>
        <div>手机号码：{{ userMessge.phone }}</div>
      </div>
    </div>
    <ListItems />
  </div>
</template>

<script>
import ListItems from '../newCon/listItems.vue';
import { ProjectReview } from '../../utils/cookies';

export default {
  components: {
    ListItems,
  },
  data() {
    return {
      userMessge: {},
      GGimg: require('../../static/person/GGimg.png'),
      GLRYimg: require('../../static/person/GLRYimg.png'),
      XSimg: require('../../static/person/XSimg.png'),
      // isJurisdiction: false,
    };
  },
  async created() {
    this.userMessge = this.$cookies.getCookie('token');
    // 权限判断
    // if (ProjectReview.ratingInfo() === 2) {
    //   this.isJurisdiction = true;
    // }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({ message: '您确认要退出吗？' })
        .then(() => {
          this.$cookies.clearCookie('token');
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
  .myDetail {
    margin: 0.15rem;
    height: 0.9rem;
    padding: 0 0.16rem 0 0.06rem;
    border-radius: 0.02rem;
    background: url('../../static/loginImages/bj.png') #4063e7;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .myDetailTop {
      height: 0.47rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .myDetailTitle {
        display: flex;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          top: -0.13rem;
          position: absolute;
        }
        > span {
          margin-left: 0.76rem;
          height: 0.17rem;
          font-size: 0.18rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .phoneTitle {
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .myDetailBottom {
      height: 0.42rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      :first-child {
        display: flex;
        > span {
          display: flex;
          align-items: center;
          font-size: 0.15rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #f9f9fb;
          img {
            width: 0.1rem;
            height: 0.13rem;
            margin-right: 0.06rem;
          }
        }
        > span:first-child {
          margin: 0 0.22rem 0 0.09rem;
        }
      }
      :last-child {
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #84a1ff;
      }
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
