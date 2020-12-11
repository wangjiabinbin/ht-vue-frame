<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-10 21:55:10
 * @Description: 新建页面
 * @FilePath: \src\views\newCon\listItems.vue
-->
<template>
  <div class="newCon">
    <div class="headerNav">
      <div
        v-for="(item, index) in navList"
        @click="tapNavHandle(index, item)"
        :class="{ navActivety: navActivetyIndex === index }"
        :key="index"
      >
        {{ item.name === '审核' ? isAudit : item.name }}
      </div>
    </div>
    <div class="newConMain">
      <!-- main -->
      <div class="newConMainCenter">
        <div v-for="(item, index) in dataList" :key="index">
          <div>{{ item.name }}</div>
          <div class="projectType">
            <div v-for="(i, n) in item.industryTypeName" :key="n">
              {{ i }}
            </div>
          </div>
          <div class="auditImg">
            <img :src="levelJudgeImg(item.versionName)" alt="" />
          </div>
          <div>
            <div>
              负责人：<span>{{ item.chargePeople }}</span>
            </div>
            <router-link
              tag="div"
              :to="{
                name: `newConDetail`,
                query: { id: item.id, name: item.versionName },
              }"
              >详情<van-icon style="margin-left: 0.1rem" name="arrow"
            /></router-link>
          </div>
        </div>
      </div>
      <div v-if="noEmpty">暂时没数据。。。</div>
    </div>
  </div>
</template>

<script>
import { getUserPermission } from 'api/api';
import { levelJudgeImgS } from '../../utils/headerline';
import { getStorage, ProjectReview } from '../../utils/localstorageS';

export default {
  data() {
    return {
      navActivetyIndex: 0,
      dataList: [],
      UserPermissionList: {},
      noEmpty: false,
      isAudit: '',
      navList: [
        {
          name: '全部',
          type: 'all',
        },
        {
          name: '审核',
          type: 'audit',
        },
        {
          name: '审核通过',
          type: 'pass',
        },
        {
          name: '审核未通过',
          type: 'notPass',
        },
      ],
      levelJudgeImgS: levelJudgeImgS,
    };
  },
  created() {
    getUserPermission(getStorage()).then((res) => {
      this.UserPermissionList = res.data;
      this.dataList = res.data.all;
    });
    if (!ProjectReview.ratingInfo()) {
      this.isAudit = '待审核';
    } else {
      this.isAudit = '审核中';
    }
  },
  methods: {
    tapNavHandle(index, item) {
      this.navActivetyIndex = index;
      this.dataList = this.UserPermissionList[item.type];
      if (this.dataList.length) {
        this.noEmpty = false;
      } else {
        this.noEmpty = true;
      }
    },
    prevRouterAdd() {
      this.$router.push({ name: 'issueCon', replace: true });
    },
    // eslint-disable-next-line consistent-return
    levelJudgeImg(type) {
      switch (type) {
        case '待审核':
          return this.levelJudgeImgS.toAudit;
          // eslint-disable-next-line no-unreachable
          break;
        case '审核中':
          return this.levelJudgeImgS.auditIing;
          // eslint-disable-next-line no-unreachable
          break;
        case '审核不通过':
          return this.levelJudgeImgS.auditNot;
          // eslint-disable-next-line no-unreachable
          break;
        case '审核通过':
          return this.levelJudgeImgS.auditPass;
          // eslint-disable-next-line no-unreachable
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/ListProject/listProject.scss';

.newCon {
  padding: 0 0.15rem;
  .headerNav {
    display: flex;
    height: 0.42rem;
    width: 100%;

    justify-content: space-around;
    background: rgb(248, 247, 250);
    z-index: 999;
    > div {
      font-size: 0.15rem;
      color: #4063e7;
      line-height: 0.42rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #4a4a4a;
    }
    .navActivety {
      font-weight: bold;
      color: #4063e7;
      border-bottom: 0.02rem solid #4063e7;
    }
  }
  .newConMain {
  }
}
</style>
