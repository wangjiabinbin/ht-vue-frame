<!--
 * @Author: 王佳宾
 * @Date: 2020-12-10 22:49:07
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-11 14:58:06
 * @Description: Please set Description
 * @FilePath: \src\views\invitationTender\invitationTenderDetails.vue
-->
<template>
  <div class="tenderDetailBoss">
    <ReturnUp :title="title" />
    <div class="tenderDetailMain">
      <div class="tenderDetailTop">
        <div>
          <p>{{ formList.name }}</p>
          <div @click="toDetailSHandle">编辑</div>
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
          :is-link="index === 0 ? false : true"
          :class="{ paddingCell: index === 0 }"
          :key="index"
          :title="item.name"
          :value="formList[item.type]"
        />
        <van-cell class="moneyStyles" :value="formList.budgetAmount">
          <template #title>
            <span class="custom-title">预算金额</span>
            <span class="newConrequired">*</span><span class="moneyUnit">(单位/万元)</span>
          </template>
        </van-cell>
        <van-cell class="moneyStyles" :value="formList.ceilingPrice">
          <template #title>
            <span class="custom-title">最高限额</span>
            <span class="moneyUnit">(单位/万元)</span>
          </template>
        </van-cell>
        <!-- 单位 -->
        <van-cell title="投标单位" class="paddingCell" :value="formList.bidder"> </van-cell>
        <van-cell :value="1222" class="paddingCell">
          <template #title>
            <span class="custom-title">中标金额</span>
            <span class="moneyUnit">(单位/万元)</span>
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
import { ProjectReview } from '../../utils/localstorageS';

export default {
  components: {
    ReturnUp,
  },
  data() {
    return {
      title: '招标',
      bidderId: this.$route.query.id,
      formList: {},
      isTimerShaft: false,
      timePopup: [
        {
          name: '标的状态',
          type: 'participation',
        },
        {
          name: '开标时间',
          type: 'openTime',
        },
        {
          name: '投标截止时间',
          type: 'deadlineTime',
        },
        {
          name: '合同履行期限',
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
    getOneBidder({ id: this.bidderId }).then((res) => {
      if (res.data.subjectStatus === '2') {
        this.isTimerShaft = true;
        this.timerShaft[0].time = res.data.openTime;
        this.timerShaft[0].name = res.data.bidder;
        this.timerShaft[1].time = res.data.biddingTime;
        this.timerShaft[1].name = res.data.name;
      } else {
        this.isTimerShaft = false;
        this.timerShaftOff[0].time = res.data.biddingTime;
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
      } else {
        this.$toast.fail('没有权限编辑');
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
      height: 0.33rem;
      font-size: 0.15rem;
      font-family: Source Han Sans CN;
      font-weight: 600;
      color: #4a4a4a;
      > div {
        color: #4a4a4a;
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
    .timerShaft {
      height: 0.45rem;
      border-top: 0.01rem solid #e5e5e5;
      font-size: 0.15rem;
      font-family: Source Han Sans CN;
      font-weight: 550;
      color: #010713;
      line-height: 0.45rem;
    }
    .flowImgMain {
      height: 0.76rem;
      .flowImgMainTime {
        margin: 0 0.09rem 0 0.35rem;
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        float: left;
      }
      > div:last-child {
        padding-left: 0.09rem;
        display: flex;
        flex-direction: column;
        > span:first-child {
          font-size: 0.12rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #010713;
        }
        > span:last-child {
          font-size: 0.12rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #a4a4a4;
          margin-top: 0.04rem;
        }
      }
      .flowIcon {
        float: left;
        width: 0.12rem;
        height: 0.12rem;
        background: rgba(64, 99, 231, 0.3);
        border-radius: 50%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          width: 0.06rem;
          height: 0.06rem;
          background: #4063e7;
          border-radius: 50%;
        }
      }
      .flowIcon::after {
        content: '';
        width: 0.01rem;
        height: 0.75rem;
        background: rgba(64, 99, 231, 0.5);
        // background-image: linearge-gradient(red, blue);
        // background-image: linear-gradient(rgba(64, 99, 231, 0.5), 60%, #fff, 100%);
        position: absolute;
        top: 50%;
      }
    }
  }
}
</style>
