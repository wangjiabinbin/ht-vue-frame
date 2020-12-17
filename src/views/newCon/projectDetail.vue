<!--
 * @Author: 王佳宾
 * @Date: 2020-12-08 21:51:43
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-16 18:11:41
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
      <div
        v-for="item in titleList"
        :key="item.id"
        :class="{ lastChildren: item.type === 'provinceName' }"
      >
        <div class="detailLable">
          {{ item.name }}
        </div>
        <div class="detalContent">
          {{ item.type === 'industryTypeName' ? industryType : projectDetailList[item.type] }}
        </div>
      </div>
      <div class="detailTextArea" v-for="(item, index) in configDataList" :key="index">
        <div class="detailText">{{ item.title }}：</div>
        <textarea
          class="textAreaInput"
          v-model="projectDetailList[item.type]"
          disabled
        ></textarea>
      </div>
      <div class="detailTextArea">
        <div class="detailText">审批意见：</div>
        <textarea
          class="textAreaInput"
          :placeholder="jurisdiction.principalIs ? '请填写审批意见' : ''"
          v-model="remarkInfo"
          :disabled="!jurisdiction.principalIs"
        ></textarea>
      </div>
      <div class="timerShaft" v-if="projectDetailUpdate.length ? true : false">项目动态</div>
      <section class="flowImgMainParent" v-if="projectDetailUpdate.length ? true : false">
        <section
          class="flowImgMain"
          v-for="(item, index) in projectDetailUpdate"
          :key="index + 'ww'"
        >
          <div class="flowImgMainTime">
            <div>{{ item.updateTime.split(' ')[0] }}</div>
            <div>{{ item.updateTime.split(' ')[1].split('.')[0] }}</div>
          </div>
          <div class="flowIcon">
            <span></span>
          </div>
          <div>
            <span>{{
              index === projectDetailUpdate.length - 1 ? '项目新建' : '项目状态更新'
            }}</span>
            <span>更新人：{{ item.name }}</span>
            <span>{{ item.projectOperate }}</span>
          </div>
        </section>
      </section>
      <div v-if="jurisdiction.principalIs" class="ifPass">
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
      <div v-if="jurisdiction.isUpdateInfos" class="upDateSubmit">
        <router-link
          tag="div"
          :to="{ name: 'issueCon', query: { isUpdate: true, id: projectId } }"
          >更新</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getOneProject, updateOneProject } from 'api/api';
import { ProjectReview } from 'utils/cookies';
import ReturnUp from 'components/returnUp.vue';
import { levelJudgeImgS } from '../../utils/utils';

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
          id: '421',
        },
        {
          name: '项目类型：',
          type: 'industryTypeName',
          id: '422',
        },
        {
          name: '项目进展：',
          type: 'progressTypeName',
          id: '423',
        },
        {
          name: '销售负责人：',
          type: 'chargePeople',
          id: '424',
        },
        {
          name: '对接单位：',
          type: 'meetPeople',
          id: '425',
        },
        {
          name: '项目经理：',
          type: 'projectManager',
          id: '426',
        },
        {
          name: '技术经理：',
          type: 'technicalManager',
          id: '427',
        },
        {
          name: '时间：',
          type: 'createTime',
          id: '428',
        },
        {
          name: '地点：',
          type: 'provinceName',
          id: '429',
        },
      ],
      configDataList: [
        {
          title: '项目人员配置',
          type: 'peoplePositioning',
        },
        {
          title: '项目进展计划',
          type: 'progressPlan',
        },
        {
          title: '项目的问题',
          type: 'projectIssues',
        },
      ],
      projectDetailList: {},
      projectDetailUpdate: [],
      jurisdiction: {
        marketIs: false,
        principalIs: false,
        isUpdateInfos: false,
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
          this.jurisdiction.isUpdateInfos = true;
          break;
        case 3:
          this.jurisdiction.marketIs = true;
          break;

        default:
          this.jurisdiction.marketIs = false;
          break;
      }
    } else if (!ProjectReview.ratingInfo() || ProjectReview.ratingInfo() === 2) {
      switch (ProjectReview.stateMessages(this.$route.query.name)) {
        case 2:
          this.jurisdiction.isUpdateInfos = true;
          break;
        case 0:
          this.jurisdiction.principalIs = true;
          break;
        default:
          this.jurisdiction.principalIs = false;
          break;
      }
    }
    getOneProject({
      id: this.projectId,
    }).then((res) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in res.data.project) {
        if (res.data.project[key] === null) {
          res.data.project[key] = '';
        }
      }
      this.projectDetailUpdate = res.data.list.reverse();
      const { project } = res.data;
      if (project.industryTypeName.length) {
        project.industryTypeName.forEach((item) => {
          this.industryType += item + ' ';
        });
      }
      if (this.jurisdiction.principalIs) {
        this.remarkInfo = '';
      } else {
        this.remarkInfo = project.checkOpinion;
      }
      this.projectDetailList = project;
      this.projectDetailList.provinceName = `${project.provinceName}${
        project.cityName !== null ? project.cityName + '' : ''
      }${project.districtName !== null ? project.districtName : ''}`;
      this.projectDetailList.createTime = project.createTime.split(' ')[0];
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
    .lastChildren {
      border-bottom: 1px solid #e5e5e5;
    }
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
      height: 0.34rem !important;
      img {
        width: 100%;
        height: 100%;
      }
    }
    > div:not(.detailTextArea) {
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
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 0.13rem;
      .detailText {
        height: 0.48rem;
        min-width: 23%;
        line-height: 0.48rem;
        font-size: 0.14rem;
        color: #4a4a4a;
        // vertical-align: middle;
      }
      .textAreaInput {
        border: none;
        height: 0.64rem !important;
        width: 100% !important;
        resize: none;
        caret-color: #555454;
        color: #010713;
        border: 1px solid #ededed;
      }
      .textAreaInput:disabled {
        background: #fff;
      }
    }
    @import '../../style/timerShaft.scss';
  }
}
</style>
>
