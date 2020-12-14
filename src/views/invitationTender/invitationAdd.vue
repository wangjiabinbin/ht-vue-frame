<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-14 11:17:27
 * @Description: Please set Description
 * @FilePath: \src\views\invitationTender\invitationAdd.vue
-->
<template>
  <div class="issueCon">
    <div style="overflow: hidden">
      <ReturnUp :title="title" />
      <div class="issueConMain">
        <div class="headerTop">*为必填项</div>
        <div class="newConCenter">
          <!--  -->
          <van-cell>
            <template #title>
              <span class="custom-title">名称</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default>
              <van-field
                v-model="formList.name"
                input-align="right"
                placeholder="请填写项目名称"
              />
            </template>
          </van-cell>
          <!-- 招标单位 -->
          <van-cell>
            <template #title>
              <span class="custom-title">招标单位</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default>
              <van-field
                v-model="formList.tenderer"
                input-align="right"
                placeholder="请填写招标单位"
              />
            </template>
          </van-cell>
          <!--  -->
          <!-- 地点 -->
          <van-cell @click="isShowLevel = true" is-link :value="placeData">
            <template #title>
              <span class="custom-title">地点</span><span class="newConrequired">*</span>：
            </template>
            <template #default v-if="placeData ? false : true">
              <van-field input-align="right" disabled :placeholder="'请填写地点'" />
            </template>
          </van-cell>

          <!--  -->
          <!--  项目类型 -->
          <ProjectType @sendData="takeDataHandle" :industryTypeS="industryType" />
          <!-- 项目进展 -->

          <van-cell is-link @click="isShowParticipation = true" :value="pationDataValue">
            <template #title>
              <span class="custom-title">是否参与</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default v-if="pationDataValue ? false : true">
              <van-field input-align="right" disabled :placeholder="'请填写是否参与'" />
            </template>
          </van-cell>
          <van-cell is-link @click="isShowUP = true" :value="subjectStatus">
            <template #title>
              <span class="custom-title">标的状态</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default v-if="subjectStatus ? false : true">
              <van-field input-align="right" disabled :placeholder="'请填写标的状态'" />
            </template>
          </van-cell>
          <!-- 项目进展 -->
          <!--  -->
          <van-cell
            @click="selectTimeHandle(index)"
            v-for="(item, index) in timePopup"
            :key="index"
            is-link
            :value="formList[item.type]"
          >
            <template #title>
              <span class="custom-title">{{ item.name }}</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default v-if="formList[item.type] ? false : true">
              <van-field input-align="right" disabled :placeholder="'请填写' + item.name" />
            </template>
          </van-cell>
          <!-- 金额 -->
          <van-cell class="moneyStyles">
            <template #title>
              <span class="custom-title">预算金额</span>
              <span class="newConrequired">*</span><span class="moneyUnit">(万元)</span>
            </template>
            <template #default>
              <van-field
                class="paddingCell"
                v-model="formList.budgetAmount"
                input-align="right"
                placeholder="请填写预算金额"
              />
            </template>
          </van-cell>
          <van-cell class="moneyStyles">
            <template #title>
              <span class="custom-title">最高限额</span>
              <span class="newConrequired">*</span><span class="moneyUnit">(万元)</span>
            </template>
            <template #default>
              <van-field
                class="paddingCell"
                v-model="formList.ceilingPrice"
                input-align="right"
                placeholder="请填写最高限额"
              />
            </template>
          </van-cell>
          <van-cell>
            <template #title> <span class="custom-title">投标单位</span>： </template>
            <template #default>
              <van-field
                class="paddingCell"
                v-model="formList.bidder"
                input-align="right"
                placeholder="请填写投标单位"
              />
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <span class="custom-title">中标金额</span>
              <span class="moneyUnit">(万元)</span>：
            </template>
            <template #default>
              <van-field
                class="paddingCell"
                v-model="formList.acceptancePrice"
                input-align="right"
                placeholder="请填写中标金额"
              />
            </template>
          </van-cell>
          <div class="submitButton" @click="submitButton">提交</div>
          <PopupDate :closed="closedDate" :isShowDate="isShowDate" :SelectTime="SelectTime" />
          <LevelMenu
            :closed="closedDate"
            :confirm="SelectLevel"
            :isShowLevel="isShowLevel"
            :cityId="provinceId"
          />
          <UtilsPopup
            :isShowUP="isShowUP"
            :closed="closedDate"
            :confirm="selectUP"
            :columns="columns"
          />
          <UtilsPopup
            :isShowUP="isShowParticipation"
            :closed="closedDate"
            :confirm="selectParticipation"
            :columns="ParticipationData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopupDate from 'components/Popup.vue';
import LevelMenu from 'components/levelmenu/levelMenu.vue';
import ReturnUp from 'components/returnUp.vue';
import UtilsPopup from 'components/utilsPopup/utilsPopup.vue';
import ProjectType from 'components/projectType/projectType.vue';
import { projectData } from 'utils/mapConfig';
import { bidderAdd, updateBidder, getOneBidder } from 'api/api';
import { dateFormat, selectAudit, selectParticipation, isEmpty } from '../../utils/utils';

export default {
  components: {
    PopupDate,
    LevelMenu,
    ReturnUp,
    ProjectType,
    UtilsPopup,
  },
  data() {
    return {
      ParticipationData: ['参与', '未参与'],
      columns: ['招标中', '已中标', '未中标'],
      title: this.$route.query.update ? '招标编辑页' : '招标新建',
      projectData: projectData,
      placeData: '',
      dateValue: null,
      pationDataValue: null,
      isShowDate: false,
      isShowLevel: false,
      isShowUP: false,
      isShowParticipation: false,
      provinceId: '',
      subjectStatus: '',
      industryType: [],
      timePopup: [
        {
          name: '发布时间',
          type: 'biddingTime',
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
      formList: {
        name: '',
        tenderer: '',
        subjectStatus: null, //项目状态
        budgetAmount: null, // 预算金额
        ceilingPrice: null, // 最高限价
        bidder: '', //投标单位
        participation: '', // 是否参与
        acceptancePrice: '', //中标金额
        industryTypeList: [], // 行业类型
        openTime: '', // 开标时间
        deadlineTime: '', //投标截止时间
        contractTime: '', // 合同履行期限
        province: '', // 省id
        city: '', // 市id
        district: '', // 县id
        biddingTime: '',
      },
      isUpdate: this.$route.query.update,
      requiredData: [
        { key: 'name', value: '名称' },
        { key: 'tenderer', value: '招标单位' },
        { key: 'province', value: '地点' },
        { key: 'industryTypeList', value: '行业类型' },
        { key: 'subjectStatus', value: '标的状态' },
        { key: 'participation', value: '是否参与' },
        { key: 'biddingTime', value: '发布时间' },
        { key: 'openTime', value: '开标时间' },
        { key: 'deadlineTime', value: '投标截止时间' },
        { key: 'contractTime', value: '合同履行期限' },
        { key: 'budgetAmount', value: '预算金额' },
        { key: 'ceilingPrice', value: '最高限额' },
      ], // 所有表单必填项
      id: this.$route.query.id,
    };
  },
  created() {
    if (this.isUpdate) {
      getOneBidder({ id: this.id }).then((res) => {
        const { data } = res;
        data.industryTypeList.forEach((item) => {
          this.industryType.push(item);
        });
        this.placeData = data.provinceName;
        data.district !== null
          ? (this.provinceId = data.district)
          : (this.provinceId = data.city);
        this.subjectStatus = selectAudit(data.subjectStatus).name;
        this.pationDataValue = selectParticipation(data.participation);
        this.formList = data;
      });
    }
  },
  methods: {
    SelectTime(value) {
      const FormList = this.formList;
      const createDate = dateFormat(new Date(value), 'yyyy-MM-dd');
      // createDate += ' ' + getNowFormatDate().date;
      this.dateValue === 0
        ? (FormList.biddingTime = createDate)
        : this.dateValue === 1
        ? (FormList.openTime = createDate)
        : this.dateValue === 2
        ? (FormList.deadlineTime = createDate)
        : (FormList.contractTime = createDate);
      this.isShowDate = false;
    },
    selectTimeHandle(index) {
      this.dateValue = index;
      this.isShowDate = true;
    },
    closedDate() {
      this.isShowDate = false;
      this.isShowLevel = false;
      this.isShowUP = false;
      this.isShowParticipation = false;
    },
    SelectLevel(value) {
      const [ProvinceName, CityName, DistrictName] = value;
      if (
        CityName.name === '北京' ||
        CityName.name === '天津' ||
        CityName.name === '上海' ||
        CityName.name === '重庆'
      ) {
        this.placeData = ProvinceName.name + '/' + DistrictName.name;
        this.formList.city = null;
      } else if (DistrictName) {
        this.placeData = ProvinceName.name + '/' + CityName.name + '/' + DistrictName.name;
        this.formList.city = CityName.code;
      } else {
        this.placeData = ProvinceName.name + '/' + CityName.name;
        this.formList.city = CityName.code;
      }
      this.formList.province = ProvinceName.code;
      if (DistrictName) {
        this.formList.district = DistrictName.code;
      } else {
        this.formList.district = null;
      }
      this.isShowLevel = false;
    },
    selectUP(value) {
      this.subjectStatus = value;
      const { formList } = this;
      value === '招标中'
        ? (formList.subjectStatus = '1')
        : value === '已中标'
        ? (formList.subjectStatus = '2')
        : (formList.subjectStatus = '3');
      this.isShowUP = false;
    },
    selectParticipation(value) {
      this.pationDataValue = value;
      value === '参与'
        ? (this.formList.participation = '1')
        : (this.formList.participation = '0');
      this.isShowParticipation = false;
    },
    submitButton() {
      const allFormItem = Object.entries(this.formList);
      const hasEmpty = isEmpty(this.requiredData, allFormItem);
      if (!hasEmpty) {
        if (this.isUpdate) {
          this.formList.bidder ? null : delete this.formList.bidder;
          this.formList.acceptancePrice ? null : delete this.formList.acceptancePrice;
          updateBidder(this.formList).then((res) => {
            if (res.data.updateBidderMessage === 'ok') {
              this.$toast.success('更新成功');
              this.$router.push({
                name: 'invitationTender',
                replace: true,
              });
            }
          });
        } else {
          this.formList.bidder ? null : delete this.formList.bidder;
          this.formList.acceptancePrice ? null : delete this.formList.acceptancePrice;
          bidderAdd(this.formList).then((res) => {
            this.$toast.success('新建成功');
            this.$router.push({
              name: 'invitationTender',
              replace: true,
            });
          });
        }
      } else {
        this.$toast.fail(`请输入\n${hasEmpty.value}`);
      }
    },
    takeDataHandle(value) {
      this.formList.industryTypeList = value;
    },
  },
};
</script>

<style scped lang="scss">
.issueCon {
  .issueConMain {
    height: 100%;
    margin: 0.15rem 0.15rem 0 0.15rem;
    // 必选
    .newConrequired {
      color: #4063e7;
    }
    .headerTop {
      width: 100%;
      height: 0.24rem;
      margin-bottom: 0.15rem;
      background: #e0e6f4;
      border-radius: 0.02rem;
      line-height: 0.24rem;
      text-indent: 0.06rem;
      font-size: 0.12rem;
      font-family: 'CNNormal';
      font-weight: 400;
      color: #4063e7;
    }
    .newConCenter {
      @import '../../style/vant.scss';

      .submitButton {
        height: 0.43rem;
        background: #4063e7;
        border-radius: 0.22rem;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.43rem;
        text-align: center;
        margin: 0.13rem;
      }
      .submitButton::before {
        content: '';
        margin-bottom: 0.13rem;
      }
      .moneyStyles {
        background: #fff !important;
        height: 0.4rem !important;
        padding: 0 0.19rem 0 0.15rem !important;
        margin-left: -0.15rem;
        width: 109%;
        // display: flex;
        // flex-wrap: wrap;
      }
      .moneyUnit {
        font-size: 0.1rem;
        color: #4063e7;
      }
    }
  }
}
</style>
