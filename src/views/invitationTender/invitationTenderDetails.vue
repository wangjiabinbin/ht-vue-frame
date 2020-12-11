<!--
 * @Author: 王佳宾
 * @Date: 2020-12-10 22:49:07
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-11 09:11:34
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
          <router-link tag="div" :to="{ name: 'login' }">编辑</router-link>
        </div>
        <div class="projectList">
          <span v-for="(item, index) in formList.industryTypeListName" :key="index">
            {{ item }}
          </span>
        </div>
        <div class="projectStatus">
          <span>参与</span>
          <span>已中标</span>
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
        <div class="confirmHandle">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import ReturnUp from 'components/returnUp.vue';
import { getOneBidder } from 'api/api';

export default {
  components: {
    ReturnUp,
  },
  data() {
    return {
      title: '招标详情',
      bidderId: this.$route.query.id,
      formList: {},
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
    };
  },
  created() {
    getOneBidder({ id: this.bidderId }).then((res) => {
      this.formList = res.data;
    });
  },
};
</script>

<style scoped lang="scss">
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
    .moneyStyles {
      background: #fff !important;
      height: 0.4rem !important;
      padding: 0 0.36rem 0 0.15rem !important;
      margin-left: -0.15rem;
      width: 109%;
      // display: flex;
      // flex-wrap: wrap;
    }
    .paddingCell {
      padding: 0 0.2rem 0 0;
    }
    .moneyUnit {
      font-size: 0.1rem;
      color: #4063e7;
    }
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
    }
  }
  /deep/.van-cell {
    padding: 0;
    height: 0.45rem;
    background: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  /deep/.van-cell::after {
    display: none !important;
  }
}
</style>
