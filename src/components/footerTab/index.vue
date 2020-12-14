<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-13 20:44:46
 * @Description: 底部标签
 * @FilePath: \src\components\footerTab\index.vue
-->
<template>
  <div class="footer">
    <div
      :class="{ footerNav: true, navAddProject: index === 2 }"
      v-for="(item, index) in tabbar"
      :key="index"
      @click="index === 2 ? popupHandle() : tabbarCut(index, item)"
    >
      <img
        :src="
          $route.meta.index === index ? item.icons : index === 2 ? item.icons : item.iconsGrey
        "
        alt=""
      />
      <div class="footer-nav-name" :class="{ active: $route.meta.index === index }">
        {{ index === 2 ? '' : item.name }}
      </div>
    </div>
    <van-overlay z-index="999999" :show="visible" @click="visible = false">
      <div class="newFolder" @click.stop>
        <div class="iconImgParent">
          <div
            v-for="(item, index) in cutProjectImg"
            :key="index"
            @mousedown="cutProjectHandle(item, index)"
          >
            <div
              :style="{
                'background-image': `url(${item.iconsGrey})`,
              }"
            >
              <!-- <img :src="cutProjectIndex === index ? item.iconsGrey : item.icons" alt="" /> -->
            </div>
            <span :class="{ iconCutImgColor: index === cutProjectIndex }">{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { ProjectReview } from 'utils/localstorageS';

export default {
  data() {
    return {
      tabbar: [
        {
          name: '首页',
          path: 'home',
          icons: require('../../static/icon_shouye_blue.png'),
          iconsGrey: require('../../static/icon_shouye_grey.png'),
        },
        {
          name: '项目',
          path: 'projects',
          icons: require('../../static/icon_xiangmu_blue.png'),
          iconsGrey: require('../../static/icon_xiangmu_grey.png'),
        },
        {
          name: '新建',
          path: 'newConIndex',
          icons: require('../../static/projectAddIcon.png'),
        },
        {
          name: '招标',
          path: 'invitationTender',
          icons: require('../../static/callBidsBlue.png'),
          iconsGrey: require('../../static/callBids.png'),
        },
        {
          name: '我的',
          path: 'person',
          icons: require('../../static/icon_wo_blue.png'),
          iconsGrey: require('../../static/icon_wo_grey.png'),
        },
      ],
      visible: false,
      activeTap: sessionStorage.getItem('activeTap') ? sessionStorage.getItem('activeTap') : 0,
      cutProjectImg: [
        {
          name: '项目新建',
          path: 'issue',
          iconsGrey: require('../../static/auditOnicon.png'),
        },
        {
          name: '招标新建',
          path: 'invitationAdd',
          iconsGrey: require('../../static/projectAddOn.png'),
        },
      ],
      cutProjectIndex: -1,
    };
  },
  created() {
    if (ProjectReview.ratingInfo() === 2) {
      this.tabbar[2].icons = require('../../static/projectOffIcon.png');
    }
  },
  methods: {
    tabbarCut(index, item) {
      this.activeTap = index;
      sessionStorage.setItem('activeTap', index);
      this.$router.push({
        name: item.path,
      });
    },
    popupHandle() {
      if (ProjectReview.ratingInfo() === 2) {
        return;
      }
      this.visible = !this.visible;
    },
    cutProjectHandle(item, index) {
      this.cutProjectIndex = index;
      this.$router.push({
        name: item.path,
      });
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 0.49rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .newFolder {
    .iconImgParent {
      width: 2.85rem;
      display: flex;
      position: absolute;
      bottom: 0.82rem;
      left: 50%;
      margin-left: -1.425rem;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        > div {
          width: 1.19rem;
          height: 1.19rem;
          border-radius: 0.05rem;
          background-size: 100% 100%;
        }
        > span {
          margin-top: 0.24rem;
          font-size: 0.15rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #010713;
        }
        .iconCutImgColor {
          font-weight: bold;
          color: #4063e7;
        }
      }
    }
  }
  .navAddProject {
    width: 0.5rem !important;
    height: 0.5rem;
    border-radius: 50%;
    position: relative;
    top: -0.15rem;
    z-index: 999;
    img {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .footerNav {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.08rem;
    color: #a4a4a4;
    width: 0.18rem;
    img {
      width: 0.18rem;
      height: 0.18rem;
      display: block;
    }
    > div {
      white-space: nowrap;
      // transform: scale(0.85);
    }
    .footer-nav-name {
      margin-top: 0.04rem;

      &.active {
        color: #4063e7;
      }
    }
  }
}
.router-link-exact-active {
  color: #4063e7;
}
</style>
