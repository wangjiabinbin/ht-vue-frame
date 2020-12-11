<!--
 * @Author: 王佳宾
 * @Date: 2020-12-09 10:55:12
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-11 09:28:43
 * @Description: 招标信息列表
 * @FilePath: \src\views\invitationTender\invitationTender.vue
-->
<template>
  <div class="invitationRoute">
    <div class="invitationRouteMain">
      <div class="invitationRouteTop">
        <div @click="isShowLevel = true">
          全国<van-icon :name="isShowLevel ? 'arrow-down' : 'arrow-up'" />
        </div>
        <div class="seach">
          <input type="text" class="seachInput" placeholder="请输入想要查询的投标信息" />
        </div>
        <div class="tabLable" v-if="isShowIcon">
          <div class="tablableIcon"></div>
        </div>
        <div class="iconImgType" @click="isShowIcon = !isShowIcon">
          <img :src="isShowIcon ? projectProgressOn : projectProgressOff" alt="" />
        </div>
      </div>

      <div class="invitationRouteCenter">
        <div class="amountMoney">
          中标总金额（单位/万元）：<span>{{ totalPrice }}</span>
        </div>
        <div class="classifyProject">
          <div class="classifyAll">全部</div>
          <div>
            <div
              class="classifyProgress"
              v-for="(item, index) in classifyProgressData"
              :key="index"
            >
              <span :style="{ color: item.color }">{{ item.num }}</span>
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <!-- 项目列表 -->
        <div class="newConMainCenter">
          <div
            @click="tenderDetails(item)"
            v-for="(item, index) in projectDataList"
            :key="index"
          >
            <div>{{ item.name }}</div>
            <div class="projectType">
              <div v-for="(i, n) in item.industryType" :key="n">
                {{ i }}
              </div>
            </div>
            <div class="auditImg">
              <span :style="{ color: selectAudit(item.subjectStatus).color }">{{
                selectAudit(item.subjectStatus).name
              }}</span>
              <span>{{ selectParticipation(item.participation) }}</span>
            </div>
            <div>
              <div>
                开标时间：<span>{{ item.openTime }}</span>
              </div>
              <div>预算：{{ item.budgetAmount }}万</div>
            </div>
          </div>
        </div>
        <LevelMenu
          :closed="closedDate"
          :isAdd="isAdd"
          :confirm="SelectLevel"
          :isShowLevel="isShowLevel"
          :columns="columns"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LevelMenu from 'components/levelmenu/levelMenu.vue';
import { getShowBidder } from 'api/api';

export default {
  components: {
    LevelMenu,
  },
  data() {
    return {
      projectProgressOff: require('../../static/images/callBidsImg/projectProgressOff.png'),
      projectProgressOn: require('../../static/images/callBidsImg/projectProgress.png'),
      classifyProgressData: [
        {
          name: '招标中',
          color: '#79CBEA',
        },
        {
          name: '已中标',
          color: '#EF9228',
        },
        {
          name: '未中标',
          color: '#C7DC52',
        },
      ],
      totalPrice: '',
      projectDataList: [],
      isShowLevel: false,
      columns: '1',
      isAdd: true,
      isShowIcon: false,
      o_getData: {
        name: '',
        province: '',
        industryTypeList: [],
        status: '',
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getShowBidder().then((res) => {
        const { data } = res;
        this.totalPrice = data.totalPrice;
        this.classifyProgressData[0].num = data.BD;
        this.classifyProgressData[1].num = data.WBD;
        this.classifyProgressData[2].num = data.NBD;
        this.projectDataList = data.bidderList;
      });
    },
    selectAudit(type) {
      switch (type) {
        case '1':
          return { name: '招标中', color: '#79CBEA' };
          break;
        case '2':
          return { name: '已中标', color: '#EF9228' };
          break;
        case '3':
          return { name: '未中标', color: '#C7DC52' };
          break;
        default:
          return '';
          break;
      }
    },
    selectParticipation(type) {
      if (type === '0') {
        return '未参与';
      }
      return '参与';
    },
    SelectLevel(value) {
      console.warn(value);
    },
    closedDate() {
      this.isShowLevel = false;
    },
    tenderDetails(item) {
      this.$router.push({
        name: 'tenderDetails',
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/ListProject/listProject.scss';
@mixin flex() {
  display: flex;
  align-items: center;
  justify-content: center;
}
.invitationRoute {
  .invitationRouteMain {
    padding: 0 0.15rem;
    .invitationRouteTop {
      display: flex;
      height: 0.7rem;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .tabLable {
        width: 100%;
        background: #ffffff;
        box-shadow: 0rem 0.03rem 5px 0rem rgba(64, 99, 231, 0.1);
        border-radius: 0.02rem;
        height: 1.04rem;
        position: absolute;
        z-index: 9999;
        top: 0.73rem;
        .tablableIcon {
          background-color: #ffffff;
          width: 29px;
          height: 30px;
          transform: skewX(-25deg) rotate(-30deg);
          position: absolute;
          right: 13px;
          top: -0.1rem;
        }
      }
      > div:first-child {
        font-size: 0.15rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #010713;
        display: flex;
        align-items: center;
        > i {
          width: 0.1rem;
          margin-left: 0.13rem;
        }
      }
      .seach {
        .seachInput {
          width: 2.4rem;
          height: 0.29rem;
          background: #ffffff;
          border: 0.01rem solid #d0d0d0;
          border-radius: 15px;
          background: url('../../static/images/callBidsImg/seach.png') no-repeat;
          background-position: 0.39rem 50%;
          background-size: 0.14rem 0.15rem;
          text-indent: 0.56rem;
        }
        .seachInput::placeholder {
          font-size: 0.12rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #d0d0d0;
        }
      }
      > div:last-child {
        width: 0.18rem;
        height: 0.17rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .invitationRouteCenter {
      .amountMoney {
        background: #fbf7ec;
        border-radius: 0.02rem;
        height: 0.24rem;
        display: flex;
        align-items: center;
        text-indent: 0.13rem;
        > span {
          width: 0.53rem;
          font-size: 0.18rem;
          font-family: DIN Black;
          font-weight: bold;
          color: #4063e7;
        }
      }
      .classifyProject {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.91rem;
        > div:first-child {
          font-size: 0.24rem;
          font-family: JZhongYi;
          font-weight: bold;
          color: #010713;
          margin-left: 0.28rem;
        }
        > div:last-child {
          height: 100%;
          display: flex;
          align-items: center;
          > div {
            display: flex;
            position: relative;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 0.63rem;
            height: 100%;
            margin-left: 0.18rem;
            > span:first-child {
              font-size: 0.25rem;
              font-weight: 400;
              margin-bottom: 0.16rem;
              font-weight: bold;
              font-family: 'HeiTiStd';
            }
            > span:last-child {
              font-size: 0.12rem;
              font-family: Source Han Sans CN;
              font-weight: 600;
              color: #010713;
            }
          }
          > div::after {
            content: '';
            width: 0.01rem;
            height: 0.2rem;
            background: #d0d0d0;
            border-radius: 1px;
            position: absolute;
            left: -0.09rem;
          }
        }
      }
      .auditImg {
        width: 0.4rem;
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        text-align: right;
        > span:first-child {
          margin-bottom: 0.08rem;
        }
        > span:last-child {
          font-size: 0.12rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #a4a4a4;
        }
      }
    }
  }
}
</style>
