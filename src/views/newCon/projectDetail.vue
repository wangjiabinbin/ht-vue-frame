<!--
 * @Author: 王佳宾
 * @Date: 2020-12-08 21:51:43
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-11 15:48:24
 * @Description: 新建项目详情页
 * @FilePath: \src\views\newCon\projectDetail.vue
-->
<template>
  <div class="newConDetailParent">
    <ReturnUp :title="title" />
    <div class="newConDetailMain">
      <div class="levelIMG">
        <img :src="levelIMG" alt="" />
      </div>
      <div v-for="(item, index) in titleList" :key="index">
        <div class="detailLable">
          {{ item.name }}
        </div>
        <div class="detalContent">
          {{ item.type === 'industryTypeName' ? industryType : projectDetailList[item.type] }}
        </div>
      </div>
      <div class="detailTextArea">
        <span class="detailText">备注：</span>
        <textarea
          class="textAreaInput"
          v-model="projectDetailList.remarkInfo"
          disabled
        ></textarea>
      </div>
      <div class="detailTextArea">
        <span class="detailText">审批意见：</span>
        <textarea
          class="textAreaInput"
          v-model="remarkInfo"
          :disabled="jurisdiction.principalIs"
        ></textarea>
      </div>
      <div v-if="!jurisdiction.principalIs" class="ifPass">
        <div @click="updateProject(2)">通过</div>
        <div @click="updateProject(3)">不通过</div>
      </div>
      <div v-if="jurisdiction.marketIs" class="upDateSubmit">
        <router-link
          tag="div"
          :to="{ name: 'issueCon', query: { isUpdate: true, id: projectId } }"
          >重新编辑</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getOneProject, updateOneProject } from 'api/api';
import { ProjectReview } from 'utils/localstorageS';
import ReturnUp from 'components/returnUp.vue';
import { levelJudgeImgS } from '../../utils/headerline';

export default {
  components: {
    ReturnUp,
  },
  data() {
    return {
      title: '项目详情',
      titleList: [
        {
          name: '项目名称：',
          type: 'name',
        },
        {
          name: '项目类型：',
          type: 'industryTypeName',
        },
        {
          name: '项目进展：',
          type: 'progressTypeName',
        },
        {
          name: '负责人：',
          type: 'chargePeople',
        },
        {
          name: '对接人：',
          type: 'meetPeople',
        },
        {
          name: '项目经理：',
          type: 'projectManager',
        },
        {
          name: '技术经理：',
          type: 'technicalManager',
        },
        {
          name: '时间：',
          type: 'createTime',
        },
        {
          name: '地点：',
          type: 'provinceName',
        },
      ],
      projectDetailList: {},
      jurisdiction: {
        marketIs: false,
        principalIs: true,
      },
      levelJudgeImgS: levelJudgeImgS,
      levelIMG: null,
      projectId: this.$route.query.id,
      industryType: '',
      remarkInfo: '',
    };
  },
  created() {
    this.levelIMG = this.iSLevelJudgeImg(this.$route.query.name);
    if (ProjectReview.ratingInfo() === 1) {
      switch (ProjectReview.stateMessages(this.$route.query.name)) {
        case 2:
          this.jurisdiction.marketIs = true;
          break;

        default:
          this.jurisdiction.marketIs = false;
          break;
      }
    } else if (!ProjectReview.ratingInfo()) {
      switch (ProjectReview.stateMessages(this.$route.query.name)) {
        case 0:
          this.jurisdiction.principalIs = false;
          break;
        default:
          this.jurisdiction.principalIs = true;
          break;
      }
    }
    getOneProject({
      id: this.projectId,
    }).then((res) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in res.data) {
        if (res.data[key] === null) {
          res.data[key] = '';
        }
      }
      const { data } = res;
      if (data.industryTypeName.length) {
        data.industryTypeName.forEach((item) => {
          this.industryType += item + ' ';
        });
      }
      if (!this.jurisdiction.principalIs) {
        this.remarkInfo = '';
      } else {
        this.remarkInfo = data.checkOpinion;
      }
      this.projectDetailList = data;
      this.projectDetailList.provinceName = `${data.provinceName}${
        data.cityName !== null ? data.cityName + '' : ''
      }${data.districtName !== null ? data.districtName : ''}`;
    });
  },
  methods: {
    iSLevelJudgeImg(type) {
      const { toAudit, auditIing, auditNot, auditPass } = this.levelJudgeImgS;
      switch (type) {
        case '待审核':
          return toAudit;
          // eslint-disable-next-line no-unreachable
          break;
        case '审核中':
          return auditIing;
          // eslint-disable-next-line no-unreachable
          break;
        case '审核不通过':
          return auditNot;
          // eslint-disable-next-line no-unreachable
          break;
        case '审核通过':
          return auditPass;
          // eslint-disable-next-line no-unreachable
          break;
        default:
          return '';
      }
    },
    updateProject(num) {
      updateOneProject({
        id: this.projectId,
        version: num,
        checkOpinion: this.remarkInfo,
      }).then((res) => {
        if (res.data.message === 'ok') {
          this.$router.push({
            name: 'person',
            repalce: true,
          });
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.newConDetailParent {
  height: 100%;
  .newConDetailMain {
    // height: 100%;
    padding: 0 0.15rem;
    margin-top: 0.16rem;
    position: relative;
    .ifPass {
      float: right;
      margin: 0.2rem 0 0.3rem 0;
      > div {
        width: 1.2rem;
        height: 0.32rem;
        background: #4063e7;
        border-radius: 0.16rem;

        text-align: center;
        line-height: 0.32rem;
        font-size: 0.12rem;
      }
      > div:first-child {
        background: #4063e7;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
      > div:last-child {
        color: #010713;
        background: #eaeef5;
        margin-left: 0.16rem;
      }
    }
    .upDateSubmit {
      margin: 0.13rem 0;
      > div {
        width: 100%;
        height: 0.43rem;
        background: #4063e7;
        border-radius: 0.22rem;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.43rem;
        text-align: center;
        margin: 0 0.13rem;
      }
    }
    .levelIMG {
      position: absolute;
      right: 0.21rem;
      top: 0.06rem;
      width: 0.7rem;
      height: 0.34rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    > div {
      display: flex;
      align-items: center;
      height: 0.43rem;
      .detailLable {
        min-width: 23%;
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #4a4a4a;
      }
      .detalContent {
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #4a4a4a;
      }
    }
    .detailTextArea {
      height: 0.9rem;
      margin-top: 0.13rem;
      .detailText {
        height: 100%;
        min-width: 23%;
        // vertical-align: middle;
      }
      .textAreaInput {
        border: none;
        height: 0.9rem !important;
        width: 100% !important;
        resize: none;
        caret-color: #555454;
        color: #010713;
      }
      .textAreaInput:disabled {
        background: #fff;
      }
    }
  }
}
</style>
>
