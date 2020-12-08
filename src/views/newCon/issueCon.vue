<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-08 11:57:27
 * @Description: Please set Description
 * @FilePath: \src\views\newCon\issueCon.vue
-->
<template>
  <div class="issueCon">
    <div style="overflow: hidden">
      <div class="issueConMain">
        <div class="headerTop">*为必填项</div>
        <div class="newConCenter">
          <!--  -->
          <van-cell is-link>
            <template #title>
              <span class="custom-title">项目名称</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default>
              <van-field v-model="formList.name" input-align="right" placeholder="请输入" />
            </template>
            <template #right-icon>
              <van-icon name="arrow" />
            </template>
          </van-cell>
          <!--  项目类型 -->
          <van-cell>
            <template #title>
              <span class="custom-title">项目类型</span>
              <span class="newConrequired">*</span>：
            </template>
          </van-cell>
          <div class="Classification">
            <div
              :class="{
                actictyClassi: seachSekectHandle(item),
                actictyClassiAll: item.name === '总包' && checkefAll,
              }"
              v-for="(item, index) in ClassificationData"
              :key="index"
              @click="selectHandle(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 项目类型 -->
          <!-- 项目进展 -->
          <van-cell>
            <template #title>
              <span class="custom-title">项目进展</span>
              <span class="newConrequired">*</span>：
            </template>
          </van-cell>
          <div class="progressClassin">
            <div
              v-for="(item, index) in projectData"
              :key="index"
              :class="{ progressClassinActive: progressIndex === index }"
              @click="progressTap(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 项目进展 -->
          <!--  -->
          <van-cell v-for="(item, index) in vantCellData" :key="index" is-link>
            <template #title>
              <span class="custom-title">{{ item.title }}</span>
              <span class="newConrequired">{{ item.required ? '*' : '' }}</span
              >：
            </template>
            <template #default>
              <van-field
                v-model="formList[item.value]"
                input-align="right"
                placeholder="请输入"
              />
            </template>
            <template #right-icon>
              <van-icon name="arrow" />
            </template>
          </van-cell>
          <!--  -->
          <van-cell @click="isShowDate = true" is-link :value="formList.createTime">
            <template #title>
              <span class="custom-title">时间</span>
              <span class="newConrequired">*</span>：
            </template>
          </van-cell>
          <!--  -->
          <van-cell @click="isShowLevel = true" is-link :value="placeData">
            <template #title> <span class="custom-title">地点</span>： </template>
          </van-cell>
          <van-cell>
            <template #title> <span class="custom-title">备注</span>： </template>
          </van-cell>
          <textarea class="textAreaInput" v-model="formList.remarkInfo"></textarea>
          <div class="submitButton" @click="submitButton">提交</div>
          <PopupDate :closed="closedDate" :isShowDate="isShowDate" :SelectTime="SelectTime" />
          <LevelMenu :closed="closedDate" :confirm="SelectLevel" :isShowLevel="isShowLevel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopupDate from 'components/Popup.vue';
import LevelMenu from 'components/levelmenu/levelMenu.vue';
import { ClassificationData, projectData } from 'utils/mapConfig';
import { getPermission, addProject } from 'api/api';
import getNowFormatDate from 'utils/dateS';
import { getStorage } from '../../utils/localstorageS';

export default {
  components: {
    PopupDate,
    LevelMenu,
  },
  data() {
    return {
      ClassificationData: ClassificationData,
      checkefAll: false,
      projectData: projectData,
      progressIndex: -1,
      placeData: '',
      isShowDate: false,
      isShowLevel: false,
      industryType: [],
      formList: {
        createUserId: '',
        name: '',
        industryType: [], // 行业类型
        progressType: '', // 进展类型
        chargePeople: '', // 负责人
        meetPeople: '', // 对接人员
        projectManager: '', // 项目经理
        technicalManager: '', // 技术经理
        createTime: '', // 创建时间
        provinceId: '', // 省id
        cityId: '', // 市id
        district: '', // 县id
        remarkInfo: '', // 备注信息
      },
      vantCellData: [
        {
          title: '负责人',
          value: 'chargePeople',
          required: true,
        },
        {
          title: '对接人',
          value: 'meetPeople',
          required: true,
        },
        {
          title: '项目经理',
          value: 'projectManager',
        },
        {
          title: '技术经理',
          value: 'technicalManager',
        },
      ],
    };
  },
  created() {
    this.formList.createUserId = getStorage().id;
  },
  methods: {
    selectHandle(item, index) {
      const Data = this.industryType;
      if (item.name === '总包') {
        this.checkefAll = !this.checkefAll;
        if (this.checkefAll) {
          this.formList.industryType = [];
          this.industryType = [];
          ClassificationData.forEach((i) => {
            if (i.name === '总包') return;
            this.industryType.push(i.type);
          });
          this.formList.industryType.push(item.type);
        } else {
          this.formList.industryType = [];
          this.industryType = [];
        }
        return;
      }
      if (Data.indexOf(item.type) !== -1) {
        Data.splice(Data.indexOf(item.type), 1);
        this.isCheckefAll();
      } else {
        Data.push(item.type);
        this.isCheckefAll();
      }
    },
    seachSekectHandle(item) {
      if (this.industryType.indexOf(item.type) !== -1) {
        return true;
      }
      return false;
    },
    isCheckefAll() {
      if (this.industryType.length === ClassificationData.length - 1) {
        this.checkefAll = true;
      } else {
        this.checkefAll = false;
      }
    },
    progressTap(item, index) {
      this.progressIndex = index;
      this.formList.progressType = item.type;
    },
    SelectTime() {
      console.warn(this.$children[5].$refs);
      let createDate = '';
      this.$children[5].$refs.getDateVlue
        .getPicker()
        .getValues()
        .forEach((item, index) => {
          if (index === 2) {
            createDate += item;
            return;
          }
          createDate += item + '-';
        });
      createDate += ' ' + getNowFormatDate().date;
      this.formList.createTime = createDate;
      this.isShowDate = false;
    },
    closedDate() {
      this.isShowDate = false;
      this.isShowLevel = false;
    },
    SelectLevel(value) {
      this.formList.provinceId = value[0].code;
      this.formList.cityId = value[1].code;
      if (value[2]) {
        this.formList.district = value[2].code;
      } else {
        this.formList.district = null;
      }
      this.isShowLevel = false;
    },
    isEmpty() {
      if (
        this.formList.name &&
        this.formList.industryType.length > 0 &&
        this.formList.progressType &&
        this.formList.chargePeople &&
        this.formList.meetPeople &&
        this.formList.createTime
      ) {
        return true;
      }
      return false;
    },
    submitButton() {
      if (this.isEmpty()) {
        addProject(this.formList).then((res) => {
          if (res.code === 200) {
            this.$toast.success('新建成功');
            this.$router.push({
              name: 'newCon',
              replace: true,
            });
          }
        });

        console.warn(this.formList);
      } else {
        this.$toast.fail('请填写必选项');
      }
    },
  },
};
</script>

<style scped lang="scss">
.issueCon {
  background: rgb(248, 247, 250);
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
      .Classification {
        background: #fff;
        height: 0.92rem;
        flex-direction: row-reverse;
        padding: 0.1rem 0.15rem 0 0.15rem;
        margin-left: -0.18rem;
        width: 102%;
        display: flex;
        flex-wrap: wrap;
        > div {
          float: right;
          width: 17.8%;
          height: 0.24rem;
          font-family: 'CNRegular';
          font-weight: 400;
          color: #010713;
          line-height: 0.24rem;
          text-align: center;
        }
        > div:not(:nth-child(1), :nth-child(6)) {
          margin: 0 1.06%;
        }
        > div:last-child {
          float: right;
        }
        // class 样式
        .actictyClassi {
          background: #4063e7;
          border-radius: 0.02rem;
          color: #fff;
          font-family: Source Han Sans CN;
        }
        .actictyClassiAll {
          background: #4063e7;
          border-radius: 0.02rem;
          color: #fff;
          font-family: Source Han Sans CN;
        }
        .progressIndex {
          width: 83px;
          height: 0.34rem;
          background: #e0e6f4;
          border-radius: 0.02rem;
        }
      }
      @import '../../style/progreesClassi/progressClassi.scss';
      .progressClassin {
        margin: 0;
      }
      .progressClassinActive {
        background-color: #e0e6f4 !important;
        color: #4063e7;
        border-color: transparent !important;
      }
      .textAreaInput {
        border: none;
        height: 0.9rem !important;
        width: 98% !important;
        resize: none;
        caret-color: #555454;
        text-indent: 0.05rem;
        color: #010713;
      }
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
    }
    /deep/.van-cell-clickable:first-child {
      border-bottom: 0.01rem solid #e5e5e5;
    }
    /deep/.van-cell:nth-child(2) {
      height: 0.5rem;
      line-height: 0.54rem;
    }
    /deep/.van-field__control {
      color: #010713;
    }
  }
}
</style>
