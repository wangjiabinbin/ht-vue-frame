<!--
 * @Author: 王佳宾
 * @Date: 2020-12-09 10:55:12
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-15 17:44:46
 * @Description: 招标信息列表
 * @FilePath: \src\views\invitationTender\invitationTender.vue
-->
<template>
  <div class="invitationRoute">
    <div class="invitationRouteMain">
      <div class="invitationRouteTop">
        <div @click="isShowLevel = true">
          {{ cityTitle }}<van-icon :name="isShowLevel ? 'arrow-down' : 'arrow-up'" />
        </div>
        <div class="seach">
          <input
            type="text"
            v-model="seachDataInput"
            class="seachInput"
            placeholder="请输入想要查询的投标信息"
          />
        </div>
        <div class="tabLable" v-show="isShowIcon">
          <ProjectType @sendData="takeDataHandle" />
          <div class="tablableIcon"></div>
        </div>
        <div class="iconImgType" @click="isShowIcon = !isShowIcon">
          <img :src="isShowIcon ? projectProgressOn : projectProgressOff" alt="" />
        </div>
      </div>

      <div class="invitationRouteCenter">
        <div class="amountMoney">
          中标总金额（万元）：<span>{{ totalPrice }}</span>
        </div>
        <div class="classifyProject">
          <div class="classifyAll" @click="seachTypeHandle(null)">全部</div>
          <div>
            <div
              class="classifyProgress"
              v-for="(item, index) in classifyProgressData"
              :key="index"
              @click="seachTypeHandle(item.type)"
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
              <div v-for="(i, n) in item.industryTypeListName" :key="n">
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
              <div>预算：{{ item.budgetAmount }}万元</div>
            </div>
          </div>
          <div v-show="isShowEmpty">暂时没有数据。。。</div>
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
import { mapState, mapActions, mapMutations } from 'vuex';
import LevelMenu from 'components/levelmenu/levelMenu.vue';
import ProjectType from 'components/projectType/projectType.vue';
import { selectAudit, selectParticipation } from 'utils/utils';

export default {
  components: {
    LevelMenu,
    ProjectType,
  },
  data() {
    return {
      seachDataInput: '',
      projectProgressOff: require('../../static/images/callBidsImg/projectProgressOff.png'),
      projectProgressOn: require('../../static/images/callBidsImg/projectProgress.png'),
      isShowLevel: false,
      columns: '1',
      isAdd: true,
      isShowIcon: false,
      cityTitle: '全国',
      selectAudit,
      selectParticipation,
    };
  },
  created() {
    this.getShowBidderAsync();
  },
  computed: {
    ...mapState('InvitationStore', [
      'classifyProgressData',
      'o_getData',
      'totalPrice',
      'projectDataList',
      'isShowEmpty',
    ]),
  },
  methods: {
    ...mapMutations('InvitationStore', ['setData']),
    ...mapActions('InvitationStore', ['getShowBidderAsync']),
    SelectLevel(value) {
      this.cityTitle = value[0].name;
      if (value[0].name === '全国') {
        this.setData(['province', null]);
      } else {
        this.setData(['province', value[0].code]);
      }
      this.isShowLevel = false;
      this.getShowBidderAsync();
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
    takeDataHandle(value) {
      this.setData(['industryTypeList', value]);
      this.getShowBidderAsync();
    },
    seachTypeHandle(type) {
      this.setData(['status', type]);
      this.getShowBidderAsync();
    },
    seachDataInputHandle() {
      if (window.lazy) {
        window.clearTimeout(window.lazy);
      }
      window.lazy = setTimeout(() => {
        this.getShowBidderAsync();
      }, 500);
    },
  },
  watch: {
    seachDataInput(value) {
      this.setData(['name', value]);
      this.seachDataInputHandle();
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
          z-index: -1;
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
