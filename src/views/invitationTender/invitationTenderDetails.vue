<!--
 * @Author: 王佳宾
 * @Date: 2020-12-10 22:49:07
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-16 15:45:30
 * @Description: Please set Description
 * @FilePath: \src\views\invitationTender\invitationTenderDetails.vue
-->
<template>
  <div class="tenderDetailBoss">
    <ReturnUp :title="title" />
    <div class="tenderDetailMain">
      <div class="tenderDetailTop">
        <div>
          <span>{{ formList.name }}</span>
          <div v-if="isEditB" @click="toDetailSHandle" style="color: #4063e7">编辑</div>
        </div>
        <div class="projectList">
          <span v-for="(item, index) in formList.industryTypeListName" :key="index">
            {{ item }}
          </span>
        </div>
        <div class="projectStatus">
          <span>{{ selectParticipation(formList.participation) }}</span>
          <span :style="{ color: selectAudit(formList.subjectStatus).color }">{{
            selectAudit(formList.subjectStatus).name
          }}</span>
        </div>
        <div>
          <span>
            <img src="../../static/images/callBidsImg/bidsSite.png" alt="" />{{
              formList.provinceName
            }}
          </span>
          <span>
            <img src="../../static/images/callBidsImg/bidsDepartment.png" alt="" />{{
              formList.tenderer
            }}
          </span>
        </div>
      </div>
      <div class="tenderMain">
        <van-cell
          v-for="(item, index) in timePopup"
          :class="{ paddingCell: true }"
          :key="index"
          :title="item.name"
          :value="index === 0 ? selectAudit(formList.subjectStatus).name : formList[item.type]"
        />
        <van-cell class="moneyStyles">
          <template #title>
            <span class="custom-title">预算金额</span>
            <span class="moneyUnit">(万元)</span>
          </template>
          <template #default>
            <span class="paddingCell">{{ formList.budgetAmount }}</span>
          </template>
        </van-cell>
        <van-cell class="moneyStyles">
          <template #title>
            <span class="custom-title">最高限额</span>
            <span class="moneyUnit">(万元)</span>
          </template>
          <template #default>
            <span class="paddingCell">{{ formList.ceilingPrice }}</span>
          </template>
        </van-cell>
        <!-- 单位 -->
        <van-cell title="投标单位：" class="paddingCell" :value="formList.bidder"> </van-cell>
        <van-cell :value="formList.acceptancePrice" class="paddingCell">
          <template #title>
            <span class="custom-title">中标金额</span>
            <span class="moneyUnit">(万元)</span>：
          </template>
        </van-cell>
        <!-- 单位 -->
        <div class="timerShaft">时间轴</div>
        <div
          class="flowImgMain"
          v-for="(item, index) in isTimerShaft ? timerShaft : timerShaftOff"
          :key="index"
        >
          <div class="flowImgMainTime">
            <div>{{ item.time }}</div>
            <div></div>
          </div>
          <div class="flowIcon">
            <span></span>
          </div>
          <div>
            <span>{{ item.title }}</span
            ><span>{{ item.name }}</span>
          </div>
        </div>
        <div class="confirmHandle" @click="$router.go(-1)">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import ReturnUp from 'components/returnUp.vue';
import { getOneBidder } from 'api/api';
import { selectAudit, selectParticipation } from 'utils/utils';
import { ProjectReview } from '../../utils/cookies';

export default {
  components: {
    ReturnUp,
  },
  data() {
    return {
      title: '招标详情页',
      bidderId: this.$route.query.id,
      formList: {},
      isTimerShaft: false,
      isEditB: false,
      timePopup: [
        {
          name: '标的状态：',
          type: 'participation',
        },
        {
          name: '开标时间：',
          type: 'openTime',
        },
        {
          name: '投标截止时间：',
          type: 'deadlineTime',
        },
        {
          name: '合同履行期限：',
          type: 'contractTime',
        },
      ],
      timerShaft: [
        {
          time: '',
          title: '中标公示',
          name: '',
        },
        {
          time: '',
          title: '招标公示',
          name: '',
        },
      ],
      timerShaftOff: [
        {
          time: '',
          title: '招标公示',
          name: '',
        },
      ],
      selectAudit,
      selectParticipation,
    };
  },
  created() {
    if (ProjectReview.ratingInfo() !== 2) {
      this.isEditB = true;
    } else {
      this.isEditB = false;
    }
    getOneBidder({ id: this.bidderId }).then((res) => {
      if (res.data.subjectStatus === '2') {
        this.isTimerShaft = true;
        this.timerShaft[0].time = res.data.openTime;
        this.timerShaft[0].name = res.data.bidder + '中标';
        this.timerShaft[1].time = res.data.biddingTime.split(' ')[0];
        this.timerShaft[1].name = res.data.name;
      } else {
        this.isTimerShaft = false;
        this.timerShaftOff[0].time = res.data.biddingTime.split(' ')[0];
        this.timerShaftOff[0].name = res.data.name;
      }
      this.formList = res.data;
    });
  },
  methods: {
    toDetailSHandle() {
      if (ProjectReview.ratingInfo() !== 2) {
        this.$router.push({
          name: 'invitationAdd',
          query: { id: this.formList.id, update: true },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/vant.scss';
.tenderDetailBoss {
  .tenderDetailMain {
    padding: 0.15rem 0.15rem 0 0.15rem;
  }
  .tenderDetailTop {
    background: #fff;
    padding: 0.11rem 0.13rem;
    display: flex;
    flex-direction: column;
    position: relative;
    > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 0.33rem;
      font-size: 0.15rem;
      font-family: Source Han Sans CN;
      font-weight: 600;
      color: #4a4a4a;
      margin-bottom: 0.13rem;
      > div {
        color: #4a4a4a;
      }
      > span {
        width: 70%;
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      width: 78%;
      > span {
        width: 0.52rem;
        height: 0.18rem;
        background: #e0e6f4;
        border: 0.005rem solid #a4a4a4;
        border-radius: 0.02rem;
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #4063e7;
        line-height: 0.18rem;
        text-align: center;
        margin-right: 0.08rem;
        margin-bottom: 0.08rem;
      }
      margin-bottom: 0.1rem;
    }
    .projectStatus {
      position: absolute;
      bottom: 0.1rem;
      right: 0.13rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      > span:first-child {
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #a4a4a4;
      }
      > span:last-child {
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ef9228;
      }
    }
    > div:last-child {
      display: flex;
      align-items: center;
      > span {
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #010713;
        line-height: 0;
        > img {
          width: 0.1rem;
          height: 0.13rem;
          margin-right: 0.1rem;
        }
      }
      > span:first-child {
        margin-right: 0.35rem;
      }
    }
  }
  .tenderMain {
    margin-top: 0.26rem;

    .confirmHandle {
      width: 100%;
      height: 0.43rem;
      background: #4063e7;
      border-radius: 0.22rem;
      text-align: center;
      font-size: 0.18rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.43rem;
      margin-top: 0.13rem;
    }
    @import '../../style/timerShaft.scss';
  }
}
</style>
